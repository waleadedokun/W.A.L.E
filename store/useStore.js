import { create } from 'zustand'

export const useGlobalStore = create((set, get) => ({
  // UI State
  isLoading: false,
  setLoading: (loading) => set({ isLoading: loading }),

  // Admin Authentication
  isAdmin: false,
  adminSession: null,
  setAdminAuth: (isAdmin, session) => set({ isAdmin, adminSession: session }),

  // Donation State
  donations: [],
  totalDonations: 0,
  setDonations: (donations) => set({ donations }),
  setTotalDonations: (total) => set({ totalDonations: total }),

  // Success Stories
  successStories: [],
  setSuccessStories: (stories) => set({ successStories: stories }),

  // Form Management
  activeForms: [],
  setActiveForms: (forms) => set({ activeForms: forms }),

  // Statistics
  stats: {
    totalBeneficiaries: 0,
    mealsProvided: 0,
    skillsTraining: 0,
    fundsRaised: 0,
  },
  setStats: (stats) => set({ stats }),
}))

export const usePaymentStore = create((set) => ({
  paymentMethod: 'paystack',
  paymentStatus: 'idle',
  currentTransaction: null,
  setPaymentMethod: (method) => set({ paymentMethod: method }),
  setPaymentStatus: (status) => set({ paymentStatus: status }),
  setCurrentTransaction: (transaction) => set({ currentTransaction: transaction }),
}))