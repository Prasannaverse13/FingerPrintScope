import { useEffect } from "react"
import { useLocation } from "wouter"
import { ScanningAnimation } from "@/components/scanning-animation"
import { getVisitorData } from "@/lib/fingerprint"
import { motion } from "framer-motion"
import { useToast } from "@/hooks/use-toast"

export default function Scan() {
  const [, setLocation] = useLocation()
  const { toast } = useToast()

  useEffect(() => {
    let mounted = true

    async function scanAndRedirect() {
      try {
        // Add a minimum delay for the animation
        const delay = new Promise(resolve => setTimeout(resolve, 3000))
        const dataPromise = getVisitorData()

        // Wait for both the delay and the data
        const [, data] = await Promise.all([delay, dataPromise])

        if (!mounted) return

        if (data && data.visitorId) {
          sessionStorage.setItem('visitorData', JSON.stringify(data))
          setLocation('/results')
        } else {
          throw new Error('Invalid visitor data received')
        }
      } catch (error) {
        console.error('Failed to get visitor data:', error)
        if (mounted) {
          toast({
            title: "Error",
            description: "Failed to analyze your digital aura. Please try again.",
            variant: "destructive"
          })
          setLocation('/')
        }
      }
    }

    scanAndRedirect()
    return () => { mounted = false }
  }, [setLocation, toast])

  return (
    <motion.div 
      className="fixed inset-0 bg-gradient-to-br from-black via-gray-900 to-purple-900 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Cyberpunk grid background */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(transparent_1px,_transparent_1px),_linear-gradient(90deg,_transparent_1px,_transparent_1px)] bg-[size:30px_30px] [background-position:center] opacity-20"
        style={{
          backgroundImage: `linear-gradient(transparent 2px, transparent 2px), linear-gradient(90deg, rgba(128, 0, 255, 0.1) 2px, transparent 2px)`,
          backgroundSize: '50px 50px',
          backgroundPosition: 'center'
        }}
      />

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative z-10">
          <div className="text-center space-y-8">
            <ScanningAnimation />
          </div>
        </div>
      </div>
    </motion.div>
  )
}