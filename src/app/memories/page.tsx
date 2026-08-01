'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, BookOpen, Plus, Calendar, MapPin, Heart, Image as ImageIcon } from 'lucide-react'
import { formatDate } from '@/lib/utils'

export default function MemoriesPage() {
  const router = useRouter()
  const [showAddForm, setShowAddForm] = useState(false)
  const [newMemory, setNewMemory] = useState({
    title: '',
    description: '',
    location: '',
    date: '',
  })

  // Mock memories data
  const [memories, setMemories] = useState([
    {
      id: '1',
      title: 'Beach Sunset',
      description: 'Our first Valentine\'s Day together. The sunset was absolutely beautiful.',
      location: 'Zanzibar',
      date: '2024-02-14',
      image: '🏖️',
    },
    {
      id: '2',
      title: 'Mountain Hike',
      description: 'We climbed Mount Kilimanjaro together. It was challenging but amazing!',
      location: 'Kilimanjaro',
      date: '2024-06-15',
      image: '🏔️',
    },
    {
      id: '3',
      title: 'City Adventure',
      description: 'Exploring Dar es Salaam and trying all the local street food.',
      location: 'Dar es Salaam',
      date: '2024-08-20',
      image: '🌆',
    },
  ])

  const handleAddMemory = () => {
    if (!newMemory.title || !newMemory.description) return

    const memory = {
      id: Date.now().toString(),
      title: newMemory.title,
      description: newMemory.description,
      location: newMemory.location,
      date: newMemory.date,
      image: '📸',
    }

    setMemories([memory, ...memories])
    setNewMemory({ title: '', description: '', location: '', date: '' })
    setShowAddForm(false)
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
              onClick={() => setShowAddForm(!showAddForm)}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg font-medium hover:shadow-lg transition-all"
            >
              <Plus size={18} />
              <span className="hidden sm:inline">Add Memory</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-pink-400 to-purple-600 rounded-full mb-4">
            <BookOpen className="text-white w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Memory Book</h1>
          <p className="text-gray-600">Your shared moments, forever preserved</p>
        </div>

        {/* Add Memory Form */}
        {showAddForm && (
          <div className="bg-love-50/90 rounded-2xl shadow-xl p-6 sm:p-8 border border-love-100 mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Add New Memory</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  value={newMemory.title}
                  onChange={(e) => setNewMemory({ ...newMemory, title: e.target.value })}
                  placeholder="Give this memory a title..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-4 focus:ring-pink-100 focus:border-pink-500 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                <textarea
                  value={newMemory.description}
                  onChange={(e) => setNewMemory({ ...newMemory, description: e.target.value })}
                  placeholder="Tell the story behind this memory..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-4 focus:ring-pink-100 focus:border-pink-500 transition-all resize-none h-24"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
                  <input
                    type="text"
                    value={newMemory.location}
                    onChange={(e) => setNewMemory({ ...newMemory, location: e.target.value })}
                    placeholder="Where was this?"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-4 focus:ring-pink-100 focus:border-pink-500 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Date</label>
                  <input
                    type="date"
                    value={newMemory.date}
                    onChange={(e) => setNewMemory({ ...newMemory, date: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-4 focus:ring-pink-100 focus:border-pink-500 transition-all"
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={handleAddMemory}
                  className="flex-1 bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
                >
                  Save Memory
                </button>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Memories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {memories.map((memory) => (
            <div
              key={memory.id}
              className="bg-love-50/90 rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-1"
            >
              {/* Memory Image */}
              <div className="bg-gradient-to-br from-pink-100 to-purple-100 p-8 flex items-center justify-center">
                <div className="text-6xl">{memory.image}</div>
              </div>

              {/* Memory Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{memory.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{memory.description}</p>

                {/* Metadata */}
                <div className="space-y-2 text-sm">
                  {memory.location && (
                    <div className="flex items-center gap-2 text-gray-500">
                      <MapPin size={16} />
                      <span>{memory.location}</span>
                    </div>
                  )}
                  {memory.date && (
                    <div className="flex items-center gap-2 text-gray-500">
                      <Calendar size={16} />
                      <span>{formatDate(new Date(memory.date))}</span>
                    </div>
                  )}
                </div>

                {/* Heart Icon */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-pink-500">
                    <Heart size={16} className="fill-pink-500" />
                    <span className="text-sm font-medium">Shared Memory</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {memories.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📸</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No memories yet</h3>
            <p className="text-gray-600 mb-4">Start creating memories together!</p>
            <button
              onClick={() => setShowAddForm(true)}
              className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
            >
              Add Your First Memory
            </button>
          </div>
        )}
      </main>
    </div>
  )
}
