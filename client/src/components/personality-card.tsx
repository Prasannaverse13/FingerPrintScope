import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PersonalityTrait, getAuraDescription } from "@/lib/personality"
import { motion } from "framer-motion"
import html2canvas from "html2canvas"
import { Progress } from "@/components/ui/progress"

interface PersonalityCardProps {
  personality: PersonalityTrait
  mood: string
  browserDetails: string
  visitorId: string
}

export function PersonalityCard({ personality, mood, browserDetails, visitorId }: PersonalityCardProps) {
  const shareResults = async () => {
    const card = document.getElementById('personality-card')
    if (!card) return

    const canvas = await html2canvas(card)
    const image = canvas.toDataURL('image/png')

    const link = document.createElement('a')
    link.href = image
    link.download = 'fingerprint-personality.png'
    link.click()
  }

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto"
    >
      <Card 
        id="personality-card" 
        className="bg-black/50 backdrop-blur border-primary overflow-hidden"
        style={{
          boxShadow: `0 0 20px ${personality.auraColor}`,
          transition: 'box-shadow 0.3s ease'
        }}
      >
        <CardHeader className="text-center border-b border-primary/20">
          <motion.div
            animate={{
              textShadow: [
                `0 0 10px ${personality.auraColor}`,
                `0 0 20px ${personality.auraColor}`,
                `0 0 10px ${personality.auraColor}`
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <CardTitle className="text-3xl font-pixel">{personality.emoji} {personality.title}</CardTitle>
          </motion.div>
        </CardHeader>

        <CardContent className="mt-4 space-y-6">
          <motion.div 
            className="space-y-2"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-xl font-semibold text-primary">Aura Level</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>{getAuraDescription(personality.auraLevel)}</span>
                <span className="text-primary">{personality.auraLevel}/100</span>
              </div>
              <Progress 
                value={personality.auraLevel} 
                className="h-2"
                style={{
                  background: `linear-gradient(90deg, ${personality.auraColor} ${personality.auraLevel}%, transparent ${personality.auraLevel}%)`
                }}
              />
            </div>
          </motion.div>

          <motion.div 
            className="space-y-2"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-xl font-semibold text-primary">Digital Personality</h3>
            <p className="text-muted-foreground">{personality.description}</p>
          </motion.div>

          <motion.div 
            className="space-y-2"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-xl font-semibold text-primary">Current Mood</h3>
            <p className="text-muted-foreground">{mood}</p>
          </motion.div>

          <motion.div 
            className="space-y-2"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <h3 className="text-xl font-semibold text-primary">Tech Profile</h3>
            <p className="text-muted-foreground">{browserDetails}</p>
          </motion.div>

          <motion.div 
            className="pt-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <Button 
              onClick={shareResults}
              className="w-full bg-primary hover:bg-primary/80"
            >
              Share Results 📤
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  )
}