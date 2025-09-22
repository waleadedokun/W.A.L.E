import { supabase } from './supabase'

// Paystack configuration
const PAYSTACK_PUBLIC_KEY = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY
const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY

// NowPayments configuration
const NOWPAYMENTS_API_KEY = process.env.NOWPAYMENTS_API_KEY
const NOWPAYMENTS_API_URL = 'https://api.nowpayments.io/v1'

export const paystackService = {
  // Initialize Paystack payment
  async initializePayment(amount, email, metadata = {}) {
    try {
      const response = await fetch('https://api.paystack.co/transaction/initialize', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${PAYSTACK_SECRET_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: amount * 100, // Convert to kobo
          email,
          currency: 'NGN',
          metadata: {
            ...metadata,
            source: 'hopehelps_website'
          },
          callback_url: `${process.env.NEXT_PUBLIC_SITE_URL}/payment/success`,
          cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/payment/cancel`
        }),
      })

      const data = await response.json()
      
      if (!data.status) {
        throw new Error(data.message || 'Payment initialization failed')
      }

      // Save transaction to database
      await supabase.from('transactions').insert([{
        type: 'donation',
        amount,
        currency: 'NGN',
        payment_method: 'paystack',
        reference: data.data.reference,
        status: 'pending',
        donor_email: email,
        paystack_data: data.data
      }])

      return { data: data.data, error: null }
    } catch (error) {
      return { data: null, error: error.message }
    }
  },

  // Verify Paystack payment
  async verifyPayment(reference) {
    try {
      const response = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
        headers: {
          'Authorization': `Bearer ${PAYSTACK_SECRET_KEY}`,
        },
      })

      const data = await response.json()
      
      if (!data.status) {
        throw new Error(data.message || 'Payment verification failed')
      }

      // Update transaction in database
      const status = data.data.status === 'success' ? 'completed' : 'failed'
      await supabase
        .from('transactions')
        .update({ 
          status,
          paystack_data: data.data,
          updated_at: new Date().toISOString()
        })
        .eq('reference', reference)

      return { data: data.data, error: null }
    } catch (error) {
      return { data: null, error: error.message }
    }
  },

  // Get payment link for admin distributions
  async createPaymentLink(amount, description, recipientEmail) {
    try {
      const response = await fetch('https://api.paystack.co/paymentrequest', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${PAYSTACK_SECRET_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: amount * 100,
          description,
          line_items: [{
            name: description,
            amount: amount * 100,
            quantity: 1
          }],
          customer: recipientEmail,
          currency: 'NGN'
        }),
      })

      const data = await response.json()
      return { data: data.data, error: null }
    } catch (error) {
      return { data: null, error: error.message }
    }
  }
}

export const cryptoService = {
  // Get available cryptocurrencies
  async getCurrencies() {
    try {
      const response = await fetch(`${NOWPAYMENTS_API_URL}/currencies`, {
        headers: {
          'x-api-key': NOWPAYMENTS_API_KEY,
        },
      })

      const data = await response.json()
      return { currencies: data.currencies, error: null }
    } catch (error) {
      return { currencies: [], error: error.message }
    }
  },

  // Get exchange rate
  async getExchangeRate(fromCurrency, toCurrency, amount) {
    try {
      const response = await fetch(
        `${NOWPAYMENTS_API_URL}/exchange-amount/${amount}/${fromCurrency}/${toCurrency}`,
        {
          headers: {
            'x-api-key': NOWPAYMENTS_API_KEY,
          },
        }
      )

      const data = await response.json()
      return { rate: data, error: null }
    } catch (error) {
      return { rate: null, error: error.message }
    }
  },

  // Create crypto payment
  async createPayment(amount, currency, orderDescription, customerEmail) {
    try {
      const orderId = `hopehelps_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      
      const response = await fetch(`${NOWPAYMENTS_API_URL}/payment`, {
        method: 'POST',
        headers: {
          'x-api-key': NOWPAYMENTS_API_KEY,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          price_amount: amount,
          price_currency: 'usd',
          pay_currency: currency,
          order_id: orderId,
          order_description: orderDescription,
          success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/payment/success`,
          cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/payment/cancel`
        }),
      })

      const data = await response.json()

      // Save transaction to database
      await supabase.from('transactions').insert([{
        type: 'donation',
        amount,
        currency: currency.toUpperCase(),
        payment_method: 'crypto',
        reference: orderId,
        status: 'pending',
        donor_email: customerEmail,
        crypto_data: data
      }])

      return { payment: data, error: null }
    } catch (error) {
      return { payment: null, error: error.message }
    }
  },

  // Check payment status
  async getPaymentStatus(paymentId) {
    try {
      const response = await fetch(`${NOWPAYMENTS_API_URL}/payment/${paymentId}`, {
        headers: {
          'x-api-key': NOWPAYMENTS_API_KEY,
        },
      })

      const data = await response.json()
      
      // Update transaction status
      const status = data.payment_status === 'finished' ? 'completed' : 
                    data.payment_status === 'failed' ? 'failed' : 'pending'
      
      await supabase
        .from('transactions')
        .update({ 
          status,
          crypto_data: data,
          updated_at: new Date().toISOString()
        })
        .eq('reference', data.order_id)

      return { payment: data, error: null }
    } catch (error) {
      return { payment: null, error: error.message }
    }
  }
}

export const transactionService = {
  // Get donation statistics
  async getDonationStats() {
    try {
      const { data: donations, error } = await supabase
        .from('transactions')
        .select('amount, currency, created_at')
        .eq('type', 'donation')
        .eq('status', 'completed')

      if (error) throw error

      const totalNaira = donations
        .filter(d => d.currency === 'NGN')
        .reduce((sum, d) => sum + parseFloat(d.amount), 0)

      const totalCrypto = donations
        .filter(d => d.currency !== 'NGN')
        .reduce((sum, d) => sum + parseFloat(d.amount), 0)

      const monthlyData = donations.reduce((acc, donation) => {
        const month = new Date(donation.created_at).toISOString().slice(0, 7)
        acc[month] = (acc[month] || 0) + parseFloat(donation.amount)
        return acc
      }, {})

      return {
        stats: {
          totalDonations: donations.length,
          totalNaira,
          totalCrypto,
          monthlyData
        },
        error: null
      }
    } catch (error) {
      return { stats: null, error: error.message }
    }
  },

  // Record manual transaction
  async recordTransaction(transactionData) {
    try {
      const { data, error } = await supabase
        .from('transactions')
        .insert([transactionData])
        .select()
        .single()

      if (error) throw error
      return { transaction: data, error: null }
    } catch (error) {
      return { transaction: null, error: error.message }
    }
  }
}