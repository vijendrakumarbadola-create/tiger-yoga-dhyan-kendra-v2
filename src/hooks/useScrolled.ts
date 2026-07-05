'use client'
import { useState, useEffect, useCallback } from 'react'

export function useScrolled(threshold = 80) {
  const [scrollY, setScrollY] = useState(0)
  const [scrolled, setScrolled] = useState(false)

  const onScroll = useCallback(() => {
    const y = window.scrollY
    setScrollY(y)
    setScrolled(y > threshold)
  }, [threshold])

  useEffect(() => {
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [onScroll])

  return { scrolled, scrollY }
}
