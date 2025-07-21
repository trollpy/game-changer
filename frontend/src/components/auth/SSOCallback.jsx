import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSignIn } from '@clerk/clerk-react'

const SSOCallback = () => {
  const { signIn, isLoaded } = useSignIn()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoaded) return

    const handleCallback = async () => {
      try {
        await signIn.handleRedirectCallback()
        navigate('/')
      } catch (err) {
        console.error('Error handling callback:', err)
        navigate('/login')
      }
    }

    handleCallback()
  }, [isLoaded, signIn, navigate])

  return <div className="flex justify-center items-center h-screen">Loading...</div>
}

export default SSOCallback