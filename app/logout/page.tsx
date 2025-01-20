'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export default function LogoutPage() {
  const router = useRouter()

  useEffect(() => {
    localStorage.removeItem('isAuthenticated')
    document.cookie = 'isAuthenticated=false; path=/'
    toast.success('Logged out successfully')
    router.push('/login')
  }, [router])

  return null
}

