import { supabase } from './supabase'
import bcrypt from 'bcryptjs'

export const authService = {
  // Admin login
  async login(email, password) {
    try {
      // Get user from database
      const { data: user, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .single()

      if (userError || !user) {
        throw new Error('Invalid credentials')
      }

      // Verify password
      const isValidPassword = await bcrypt.compare(password, user.password_hash)
      if (!isValidPassword) {
        throw new Error('Invalid credentials')
      }

      // Update last login
      await supabase
        .from('users')
        .update({ last_login: new Date().toISOString() })
        .eq('id', user.id)

      // Create session
      const session = {
        user: {
          id: user.id,
          email: user.email,
          role: user.role
        },
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
      }

      return { session, error: null }
    } catch (error) {
      return { session: null, error: error.message }
    }
  },

  // Create admin user (for initial setup)
  async createAdmin(email, password) {
    try {
      const hashedPassword = await bcrypt.hash(password, 12)
      
      const { data, error } = await supabase
        .from('users')
        .insert([{
          email,
          password_hash: hashedPassword,
          role: 'admin'
        }])
        .select()
        .single()

      if (error) throw error

      return { user: data, error: null }
    } catch (error) {
      return { user: null, error: error.message }
    }
  },

  // Verify session
  async verifySession(sessionData) {
    if (!sessionData || !sessionData.user || new Date() > new Date(sessionData.expires)) {
      return false
    }

    // Verify user still exists and is active
    const { data: user, error } = await supabase
      .from('users')
      .select('id, email, role')
      .eq('id', sessionData.user.id)
      .single()

    return !error && user
  },

  // Logout
  logout() {
    // Clear session storage
    if (typeof window !== 'undefined') {
      localStorage.removeItem('admin_session')
      sessionStorage.removeItem('admin_session')
    }
  }
}