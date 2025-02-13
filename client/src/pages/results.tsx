import { useEffect, useState } from "react"
import { useLocation } from "wouter"
import { PersonalityCard } from "@/components/personality-card"
import { AuraLeaderboard } from "@/components/aura-leaderboard"
import { generatePersonality, generateMood } from "@/lib/personality"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

export default function Results() {
  const [, setLocation] = useLocation()
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    const storedData = sessionStorage.getItem('visitorData')
    if (!storedData) {
      setLocation('/')
      return
    }
    setData(JSON.parse(storedData))
  }, [setLocation])

  if (!data) return null

  const personality = generatePersonality(data.visitorId, data)
  const mood = generateMood(data.browserName)
  const browserDetails = `Using ${data.browserName} ${data.browserVersion} on ${data.os}`

  return (
    <div className="min-h-screen py-12 bg-gradient-to-br from-black via-gray-900 to-purple-900 relative overflow-hidden">
      {/* Cyberpunk grid background */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(transparent_1px,_transparent_1px),_linear-gradient(90deg,_transparent_1px,_transparent_1px)] bg-[size:30px_30px] [background-position:center] opacity-20"
        style={{
          backgroundImage: `linear-gradient(transparent 2px, transparent 2px), linear-gradient(90deg, rgba(128, 0, 255, 0.1) 2px, transparent 2px)`,
          backgroundSize: '50px 50px',
          backgroundPosition: 'center'
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-bold text-primary mb-4">Your Digital Soul Revealed!</h1>
          <p className="text-muted-foreground">Based on your unique device fingerprint...</p>
        </motion.div>

        <PersonalityCard 
          personality={personality}
          mood={mood}
          browserDetails={browserDetails}
          visitorId={data.visitorId}
        />

        <AuraLeaderboard />

        <motion.div 
          className="text-center mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Button
            variant="outline"
            className="text-primary border-primary hover:bg-primary/20"
            onClick={() => setLocation('/')}
          >
            Try Again 🔄
          </Button>
        </motion.div>
      </div>
    </div>
  )
}