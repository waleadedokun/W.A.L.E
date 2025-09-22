'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Plus, Edit, Trash2, Upload, Calendar, User, DollarSign } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import toast from 'react-hot-toast'

export default function DailyDonationsManager() {
  const [donations, setDonations] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingDonation, setEditingDonation] = useState(null)
  const [formData, setFormData] = useState({
    recipient_name: '',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    platform: '',
    post_link: '',
    testimony: '',
    location: '',
    image_url: ''
  })

  useEffect(() => {
    loadDonations()
  }, [])

  const loadDonations = async () => {
    try {
      const { data, error } = await supabase
        .from('daily_donations')
        .select('*')
        .order('date', { ascending: false })

      if (error) throw error
      setDonations(data || [])
    } catch (error) {
      console.error('Error loading donations:', error)
      toast.error('Failed to load donations')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      const donationData = {
        ...formData,
        amount: parseFloat(formData.amount)
      }

      if (editingDonation) {
        const { error } = await supabase
          .from('daily_donations')
          .update(donationData)
          .eq('id', editingDonation.id)

        if (error) throw error
        toast.success('Donation updated successfully')
      } else {
        const { error } = await supabase
          .from('daily_donations')
          .insert([donationData])

        if (error) throw error
        toast.success('Donation recorded successfully')
      }

      resetForm()
      loadDonations()
    } catch (error) {
      console.error('Error saving donation:', error)
      toast.error('Failed to save donation')
    }
  }

  const handleEdit = (donation) => {
    setEditingDonation(donation)
    setFormData({
      recipient_name: donation.recipient_name,
      amount: donation.amount.toString(),
      date: donation.date,
      platform: donation.platform || '',
      post_link: donation.post_link || '',
      testimony: donation.testimony || '',
      location: donation.location || '',
      image_url: donation.image_url || ''
    })
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this donation record?')) return

    try {
      const { error } = await supabase
        .from('daily_donations')
        .delete()
        .eq('id', id)

      if (error) throw error
      toast.success('Donation deleted successfully')
      loadDonations()
    } catch (error) {
      console.error('Error deleting donation:', error)
      toast.error('Failed to delete donation')
    }
  }

  const resetForm = () => {
    setFormData({
      recipient_name: '',
      amount: '',
      date: new Date().toISOString().split('T')[0],
      platform: '',
      post_link: '',
      testimony: '',
      location: '',
      image_url: ''
    })
    setEditingDonation(null)
    setShowForm(false)
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}.${fileExt}`
      const filePath = `donations/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, file)

      if (uploadError) throw uploadError

      const { data: { publicUrl } } = supabase.storage
        .from('images')
        .getPublicUrl(filePath)

      setFormData({ ...formData, image_url: publicUrl })
      toast.success('Image uploaded successfully')
    } catch (error) {
      console.error('Error uploading image:', error)
      toast.error('Failed to upload image')
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#5DADE2]"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Daily Donations</h2>
          <p className="text-gray-600">Manage daily meal assistance records</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowForm(true)}
          className="bg-[#5DADE2] text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-600 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Record Donation</span>
        </motion.button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-6">
                {editingDonation ? 'Edit Donation' : 'Record New Donation'}
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Recipient Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.recipient_name}
                      onChange={(e) => setFormData({ ...formData, recipient_name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DADE2] focus:border-transparent"
                      placeholder="Enter recipient name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Amount (₦) *
                    </label>
                    <input
                      type="number"
                      required
                      step="0.01"
                      value={formData.amount}
                      onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DADE2] focus:border-transparent"
                      placeholder="0.00"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DADE2] focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Platform
                    </label>
                    <select
                      value={formData.platform}
                      onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DADE2] focus:border-transparent"
                    >
                      <option value="">Select platform</option>
                      <option value="Instagram">Instagram</option>
                      <option value="Facebook">Facebook</option>
                      <option value="Twitter">Twitter</option>
                      <option value="LinkedIn">LinkedIn</option>
                      <option value="WhatsApp">WhatsApp</option>
                      <option value="Direct">Direct</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Location
                    </label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DADE2] focus:border-transparent"
                      placeholder="Location where assistance was provided"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Post Link
                    </label>
                    <input
                      type="url"
                      value={formData.post_link}
                      onChange={(e) => setFormData({ ...formData, post_link: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DADE2] focus:border-transparent"
                      placeholder="https://..."
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Testimony/Story
                    </label>
                    <textarea
                      rows={3}
                      value={formData.testimony}
                      onChange={(e) => setFormData({ ...formData, testimony: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DADE2] focus:border-transparent resize-none"
                      placeholder="Share the recipient's story or testimony..."
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Image
                    </label>
                    <div className="flex items-center space-x-4">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="image-upload"
                      />
                      <label
                        htmlFor="image-upload"
                        className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg cursor-pointer flex items-center space-x-2 transition-colors"
                      >
                        <Upload className="h-4 w-4" />
                        <span>Upload Image</span>
                      </label>
                      {formData.image_url && (
                        <img
                          src={formData.image_url}
                          alt="Preview"
                          className="h-12 w-12 object-cover rounded-lg"
                        />
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-[#5DADE2] text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    {editingDonation ? 'Update' : 'Save'} Donation
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Donations List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Recipient
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Platform
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {donations.map((donation) => (
                <tr key={donation.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <User className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm font-medium text-gray-900">
                        {donation.recipient_name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <DollarSign className="h-4 w-4 text-gray-400 mr-1" />
                      <span className="text-sm text-gray-900">
                        ₦{parseFloat(donation.amount).toLocaleString()}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-900">
                        {new Date(donation.date).toLocaleDateString()}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {donation.platform || 'Direct'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {donation.location || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => handleEdit(donation)}
                        className="text-[#5DADE2] hover:text-blue-600 p-1"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(donation.id)}
                        className="text-red-600 hover:text-red-800 p-1"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {donations.length === 0 && (
          <div className="text-center py-12">
            <Utensils className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No donations recorded</h3>
            <p className="text-gray-500 mb-4">Start by recording your first daily donation.</p>
            <button
              onClick={() => setShowForm(true)}
              className="bg-[#5DADE2] text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Record First Donation
            </button>
          </div>
        )}
      </div>
    </div>
  )
}