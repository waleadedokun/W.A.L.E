'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { CreditCard, Smartphone, Bitcoin } from 'lucide-react'
import { usePaymentStore } from '@/store/useStore'

export default function PaymentWidget({ className = '' }) {
  const [amount, setAmount] = useState('')
  const [isCustomAmount, setIsCustomAmount] = useState(false)
  const { paymentMethod, setPaymentMethod, setPaymentStatus } = usePaymentStore()

  const predefinedAmounts = [1000, 2500, 5000, 10000, 25000, 50000]

  const handlePaystackPayment = async () => {
    setPaymentStatus('processing')
    // Paystack integration logic here
    console.log('Processing Paystack payment:', amount)
  }

  const handleCryptoPayment = async () => {
    setPaymentStatus('processing')
    // NowPayments integration logic here
    console.log('Processing crypto payment:', amount)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!amount) return

    if (paymentMethod === 'paystack') {
      handlePaystackPayment()
    } else {
      handleCryptoPayment()
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white rounded-xl shadow-lg p-6 ${className}`}
    >
      <h3 className="text-2xl font-bold text-center mb-6">Make a Donation</h3>
      
      {/* Payment Method Selection */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setPaymentMethod('paystack')}
          className={`p-4 rounded-lg border-2 transition-all ${
            paymentMethod === 'paystack'
              ? 'border-[#5DADE2] bg-blue-50'
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <CreditCard className="h-8 w-8 mx-auto mb-2 text-[#5DADE2]" />
          <p className="font-semibold">Card/Bank</p>
          <p className="text-sm text-gray-600">Naira (₦)</p>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setPaymentMethod('crypto')}
          className={`p-4 rounded-lg border-2 transition-all ${
            paymentMethod === 'crypto'
              ? 'border-[#5DADE2] bg-blue-50'
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <Bitcoin className="h-8 w-8 mx-auto mb-2 text-[#5DADE2]" />
          <p className="font-semibold">Crypto</p>
          <p className="text-sm text-gray-600">BTC, ETH, USDT</p>
        </motion.button>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Amount Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Amount {paymentMethod === 'paystack' ? '(₦)' : '(USD)'}
          </label>
          <div className="grid grid-cols-3 gap-2 mb-4">
            {predefinedAmounts.map((preAmount) => (
              <motion.button
                key={preAmount}
                type="button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setAmount(preAmount.toString())
                  setIsCustomAmount(false)
                }}
                className={`p-3 rounded-lg border text-sm font-medium transition-all ${
                  amount === preAmount.toString() && !isCustomAmount
                    ? 'border-[#5DADE2] bg-blue-50 text-[#5DADE2]'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {paymentMethod === 'paystack' ? '₦' : '$'}{preAmount.toLocaleString()}
              </motion.button>
            ))}
          </div>
          
          <button
            type="button"
            onClick={() => setIsCustomAmount(true)}
            className={`w-full p-3 rounded-lg border text-sm font-medium transition-all ${
              isCustomAmount
                ? 'border-[#5DADE2] bg-blue-50 text-[#5DADE2]'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            Custom Amount
          </button>

          {isCustomAmount && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-4"
            >
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder={`Enter amount in ${paymentMethod === 'paystack' ? 'Naira' : 'USD'}`}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DADE2] focus:border-transparent"
              />
            </motion.div>
          )}
        </div>

        {/* Donate Button */}
        <motion.button
          type="submit"
          disabled={!amount}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-[#5DADE2] text-white py-4 rounded-lg font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600 transition-colors"
        >
          Donate {amount ? `${paymentMethod === 'paystack' ? '₦' : '$'}${parseInt(amount).toLocaleString()}` : ''}
        </motion.button>
      </form>

      <p className="text-xs text-gray-500 text-center mt-4">
        Your donation is secure and helps provide meals and skills training to those in need.
      </p>
    </motion.div>
  )
}