'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function AnimatedCounter({ end, duration = 2, prefix = '', suffix = '' }) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (isVisible && count < end) {
      const increment = end / (duration * 60) // 60 FPS
      const timer = setTimeout(() => {
        setCount(prev => Math.min(prev + increment, end))
      }, 1000 / 60)
      
      return () => clearTimeout(timer)
    }
  }, [count, end, duration, isVisible])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    const element = document.getElementById(`counter-${end}`)
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [end])

  return (
    <motion.span
      id={`counter-${end}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-4xl font-bold text-[#5DADE2]"
    >
      {prefix}{Math.floor(count).toLocaleString()}{suffix}
    </motion.span>
  )
}