'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Mail, Plus, Heart, Lock, Calendar, Send, Sparkles } from 'lucide-react'

export default function LoveNotesPage() {
  const router = useRouter()
  const [showComposeForm, setShowComposeForm] = useState(false)
  const [newNote, setNewNote] = useState({
    message: '',
    unlockCondition: 'immediate',
    unlockDate: '',
  })

  // Mock love notes data
  const [notes, setNotes] = useState([
    {
      id: '1',
      message: 'I love how you always know how to make me smile, even on my worst days. You are my sunshine.',
      senderName: 'Partner Two',
      isUnlocked: true,
      unlockCondition: 'immediate',
      createdAt: '2024-07-30',
    },
    {
      id: '2',
      message: 'Open this when you\'re having a bad day. Remember that I believe in you and I\'m always here for you. You\'re stronger than you think.',
      senderName: 'Partner Two',
      isUnlocked: false,
      unlockCondition: 'Open When You\'re Sad',
      createdAt: '2024-07-29',
    },
    {
      id: '3',
      message: 'Happy Birthday! I\'m so grateful to celebrate another year with you. Here\'s to many more adventures together!',
      senderName: 'Partner Two',
      isUnlocked: false,
      unlockCondition: 'Open On Your Birthday',
      createdAt: '2024-07-28',
    },
  ])

  const unlockConditions = [
    { value: 'immediate', label: 'Send Now' },
    { value: 'tomorrow', label: 'Open Tomorrow' },
    { value: 'sad', label: 'Open When You\'re Sad' },
    { value: 'birthday', label: 'Open On Your Birthday' },
    { value: 'anniversary', label: 'Open On Our Anniversary' },
    { value: 'level20', label: 'Open After Reaching Level 20' },
  ]

  const handleSendNote = () => {
    if (!newNote.message.trim()) return

    const note = {
      id: Date.now().toString(),
      message: newNote.message,
      senderName: 'You',
      isUnlocked: newNote.unlockCondition === 'immediate',
      unlockCondition: unlockConditions.find(c => c.value === newNote.unlockCondition)?.label || 'immediate',
      createdAt: new Date().toISOString().split('T')[0],
    }

    setNotes([note, ...notes])
    setNewNote({ message: '', unlockCondition: 'immediate', unlockDate: '' })
    setShowComposeForm(false)
  }

  const handleUnlock = (noteId: string) => {
    setNotes(notes.map(note => 
      note.id === noteId ? { ...note, isUnlocked: true } : note
    ))
  }

  const handleBack = () => {
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-love-100 via-romantic-50 to-blush-100">
      {/* Header */}
      <header className="bg-love-50/80 backdrop-blur-lg border-b border-love-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <ArrowLeft size={20} />
              <span>Back to Dashboard</span>
            </button>
            <button
              onClick={() => setShowComposeForm(!showComposeForm)}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg font-medium hover:shadow-lg transition-all"
            >
              <Plus size={18} />
              <span className="hidden sm:inline">Send Love Note</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-400 to-pink-600 rounded-full mb-4">
            <Mail className="text-white w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Love Notes</h1>
          <p className="text-gray-600">Send messages that unlock at special moments</p>
        </div>

        {/* Compose Form */}
        {showComposeForm && (
          <div className="bg-love-50/90 rounded-2xl shadow-xl p-6 sm:p-8 border border-love-100 mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Send a Love Note</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Your Message</label>
                <textarea
                  value={newNote.message}
                  onChange={(e) => setNewNote({ ...newNote, message: e.target.value })}
                  placeholder="Write something special for your partner..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-4 focus:ring-red-100 focus:border-red-500 transition-all resize-none h-32"
                  rows={4}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">When should they open it?</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {unlockConditions.map((condition) => (
                    <button
                      key={condition.value}
                      onClick={() => setNewNote({ ...newNote, unlockCondition: condition.value })}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        newNote.unlockCondition === condition.value
                          ? 'border-red-500 bg-red-50 text-red-700'
                          : 'border-gray-200 hover:border-red-300 hover:bg-red-50/50'
                      }`}
                    >
                      <span className="text-sm font-medium">{condition.label}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={handleSendNote}
                  className="flex-1 bg-gradient-to-r from-red-500 to-pink-500 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <Send size={18} />
                  <span>Send Note</span>
                </button>
                <button
                  onClick={() => setShowComposeForm(false)}
                  className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Notes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes.map((note) => (
            <div
              key={note.id}
              className={`bg-love-50/90 rounded-2xl shadow-lg overflow-hidden border transition-all hover:-translate-y-1 ${
                note.isUnlocked
                  ? 'border-pink-200 hover:shadow-xl'
                  : 'border-gray-200 hover:shadow-lg'
              }`}
            >
              {/* Note Header */}
              <div className={`p-4 ${
                note.isUnlocked
                  ? 'bg-gradient-to-r from-pink-50 to-red-50'
                  : 'bg-gradient-to-r from-gray-50 to-gray-100'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {note.isUnlocked ? (
                      <Heart className="text-pink-500 w-5 h-5 fill-pink-500" />
                    ) : (
                      <Lock className="text-gray-400 w-5 h-5" />
                    )}
                    <span className="font-semibold text-gray-800">{note.senderName}</span>
                  </div>
                  {!note.isUnlocked && (
                    <button
                      onClick={() => handleUnlock(note.id)}
                      className="text-sm text-red-500 hover:text-red-700 font-medium"
                    >
                      Unlock
                    </button>
                  )}
                </div>
              </div>

              {/* Note Content */}
              <div className="p-6">
                {note.isUnlocked ? (
                  <p className="text-gray-800 leading-relaxed mb-4">{note.message}</p>
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-gray-500">
                      <Sparkles size={16} />
                      <span className="text-sm font-medium">{note.unlockCondition}</span>
                    </div>
                    <div className="bg-gray-100 rounded-lg p-4 flex items-center justify-center">
                      <Lock className="text-gray-400 w-8 h-8" />
                    </div>
                    <p className="text-sm text-gray-500 text-center italic">
                      This note is locked until the condition is met
                    </p>
                  </div>
                )}

                {/* Date */}
                <div className="flex items-center gap-2 text-sm text-gray-400 mt-4 pt-4 border-t border-gray-100">
                  <Calendar size={14} />
                  <span>{new Date(note.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {notes.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">💌</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No love notes yet</h3>
            <p className="text-gray-600 mb-4">Send your first love note to your partner!</p>
            <button
              onClick={() => setShowComposeForm(true)}
              className="px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
            >
              Send Your First Note
            </button>
          </div>
        )}
      </main>
    </div>
  )
}
