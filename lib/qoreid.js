// QoreId NIN Verification Service
const QOREID_API_URL = 'https://api.qoreid.com/token'
const QOREID_CLIENT_ID = process.env.QOREID_CLIENT_ID
const QOREID_CLIENT_SECRET = process.env.QOREID_CLIENT_SECRET

export const qoreIdService = {
  // Get access token
  async getAccessToken() {
    try {
      const response = await fetch(QOREID_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          client_id: QOREID_CLIENT_ID,
          client_secret: QOREID_CLIENT_SECRET,
          grant_type: 'client_credentials'
        }),
      })

      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to get access token')
      }

      return { token: data.access_token, error: null }
    } catch (error) {
      return { token: null, error: error.message }
    }
  },

  // Verify NIN
  async verifyNIN(nin, empowermentId) {
    try {
      // Get access token first
      const { token, error: tokenError } = await this.getAccessToken()
      if (tokenError) throw new Error(tokenError)

      // Verify NIN
      const response = await fetch('https://api.qoreid.com/v1/ng/identities/nin', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nin }),
      })

      const data = await response.json()
      
      const isVerified = response.ok && data.status === 'success'
      
      // Save verification result to database
      const { supabase } = await import('./supabase')
      await supabase.from('nin_verifications').insert([{
        nin,
        empowerment_id: empowermentId,
        verification_status: isVerified ? 'verified' : 'failed',
        qoreid_response: data,
        verified_data: isVerified ? data.data : null,
        error_message: isVerified ? null : data.message,
        verified_at: isVerified ? new Date().toISOString() : null
      }])

      // Update empowerment record
      if (isVerified) {
        await supabase
          .from('monthly_empowerment')
          .update({ 
            nin_verified: true,
            verification_data: data.data,
            verified_at: new Date().toISOString()
          })
          .eq('id', empowermentId)
      }

      return { 
        verified: isVerified, 
        data: isVerified ? data.data : null, 
        error: isVerified ? null : data.message 
      }
    } catch (error) {
      return { verified: false, data: null, error: error.message }
    }
  },

  // Batch verify multiple NINs
  async batchVerifyNINs(ninList) {
    const results = []
    
    for (const { nin, empowermentId } of ninList) {
      const result = await this.verifyNIN(nin, empowermentId)
      results.push({ nin, empowermentId, ...result })
      
      // Add delay to respect rate limits
      await new Promise(resolve => setTimeout(resolve, 1000))
    }

    return results
  },

  // Get verification history
  async getVerificationHistory(empowermentId) {
    try {
      const { supabase } = await import('./supabase')
      const { data, error } = await supabase
        .from('nin_verifications')
        .select('*')
        .eq('empowerment_id', empowermentId)
        .order('created_at', { ascending: false })

      if (error) throw error
      return { history: data, error: null }
    } catch (error) {
      return { history: [], error: error.message }
    }
  }
}