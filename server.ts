import { createServer } from 'http'
import { parse } from 'url'
import next from 'next'
import { Server as SocketIOServer } from 'socket.io'

const dev = process.env.NODE_ENV !== 'production'
const hostname = dev ? 'localhost' : '0.0.0.0'
const port = parseInt(process.env.PORT || '3000', 10)

const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url!, true)
      await handle(req, res, parsedUrl)
    } catch (err) {
      console.error('Error occurred handling', req.url, err)
      res.statusCode = 500
      res.end('internal server error')
    }
  })

  const io = new SocketIOServer(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST']
    }
  })

  // Store connected users by their couple ID
  const coupleRooms = new Map<string, Set<string>>()

  io.on('connection', (socket) => {
    console.log('User connected:', socket.id)

    // Join a couple room for real-time updates
    socket.on('join-couple', (coupleId: string) => {
      socket.join(`couple-${coupleId}`)
      
      if (!coupleRooms.has(coupleId)) {
        coupleRooms.set(coupleId, new Set())
      }
      coupleRooms.get(coupleId)!.add(socket.id)
      
      console.log(`Socket ${socket.id} joined couple room: ${coupleId}`)
      
      // Notify other users in the couple that someone joined
      socket.to(`couple-${coupleId}`).emit('user-joined', { socketId: socket.id })
    })

    // Leave couple room
    socket.on('leave-couple', (coupleId: string) => {
      socket.leave(`couple-${coupleId}`)
      
      const room = coupleRooms.get(coupleId)
      if (room) {
        room.delete(socket.id)
        if (room.size === 0) {
          coupleRooms.delete(coupleId)
        }
      }
      
      console.log(`Socket ${socket.id} left couple room: ${coupleId}`)
    })

    // Real-time couple updates
    socket.on('couple-update', (data: { coupleId: string, update: any }) => {
      socket.to(`couple-${data.coupleId}`).emit('couple-updated', data.update)
    })

    // Real-time memory updates
    socket.on('memory-update', (data: { coupleId: string, memory: any }) => {
      socket.to(`couple-${data.coupleId}`).emit('memory-updated', data.memory)
    })

    // Real-time love note updates
    socket.on('love-note-update', (data: { coupleId: string, note: any }) => {
      socket.to(`couple-${data.coupleId}`).emit('love-note-updated', data.note)
    })

    // Game activity
    socket.on('game-activity', (data: { coupleId: string, activity: any }) => {
      socket.to(`couple-${data.coupleId}`).emit('game-activity', data.activity)
    })

    // Daily Question - Submit answer
    socket.on('submit-answer', (data: { coupleId: string, userId: string, answer: string, questionId: string }) => {
      socket.to(`couple-${data.coupleId}`).emit('partner-answer', {
        userId: data.userId,
        answer: data.answer,
        questionId: data.questionId
      })
    })

    // Guess My Answer - Submit secret answer
    socket.on('submit-secret-answer', (data: { coupleId: string, userId: string, answer: string, questionId: string }) => {
      socket.to(`couple-${data.coupleId}`).emit('partner-secret-answer', {
        userId: data.userId,
        answer: data.answer,
        questionId: data.questionId
      })
    })

    // Guess My Answer - Submit guess
    socket.on('submit-guess', (data: { coupleId: string, userId: string, guess: string, questionId: string }) => {
      socket.to(`couple-${data.coupleId}`).emit('partner-guess', {
        userId: data.userId,
        guess: data.guess,
        questionId: data.questionId
      })
    })

    // Guess My Answer - Send result
    socket.on('guess-result', (data: { coupleId: string, result: string, xpEarned: number, partnerGuess: string, secretAnswer: string }) => {
      socket.to(`couple-${data.coupleId}`).emit('guess-result', data)
    })

    // Partner joined game
    socket.on('joined-game', (data: { coupleId: string, gameType: string }) => {
      socket.to(`couple-${data.coupleId}`).emit('partner-joined-game', {
        userId: socket.id,
        gameType: data.gameType
      })
    })

    // Partner left game
    socket.on('left-game', (data: { coupleId: string }) => {
      socket.to(`couple-${data.coupleId}`).emit('partner-left-game', {
        userId: socket.id
      })
    })

    // Typing indicator
    socket.on('typing', (data: { coupleId: string, userId: string, isTyping: boolean }) => {
      socket.to(`couple-${data.coupleId}`).emit('user-typing', {
        userId: data.userId,
        isTyping: data.isTyping
      })
    })

    // WebRTC - Call offer
    socket.on('call-offer', (data: { coupleId: string, offer: any }) => {
      socket.to(`couple-${data.coupleId}`).emit('call-offer', {
        offer: data.offer,
        callerId: socket.id
      })
    })

    // WebRTC - Call answer
    socket.on('call-answer', (data: { coupleId: string, answer: any, callerId: string }) => {
      socket.to(`couple-${data.coupleId}`).emit('call-answer', {
        answer: data.answer
      })
    })

    // WebRTC - Call ended
    socket.on('call-ended', (data: { coupleId: string }) => {
      socket.to(`couple-${data.coupleId}`).emit('call-ended')
    })

    // Handle disconnection
    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id)
      
      // Remove from all couple rooms
      coupleRooms.forEach((sockets, coupleId) => {
        if (sockets.has(socket.id)) {
          sockets.delete(socket.id)
          socket.to(`couple-${coupleId}`).emit('user-left', { socketId: socket.id })
          
          if (sockets.size === 0) {
            coupleRooms.delete(coupleId)
          }
        }
      })
    })
  })

  server
    .once('error', (err) => {
      console.error(err)
      process.exit(1)
    })
    .listen(port, hostname, () => {
      console.log(`> Ready on http://${hostname}:${port}`)
    })
})
