import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Link } from "wouter"
import { HowItWorks } from "@/components/how-it-works"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-900 relative overflow-hidden">
      {/* Cyberpunk grid background */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(transparent_1px,_transparent_1px),_linear-gradient(90deg,_transparent_1px,_transparent_1px)] bg-[size:30px_30px] [background-position:center] opacity-20"
        style={{
          backgroundImage: `linear-gradient(transparent 2px, transparent 2px), linear-gradient(90deg, rgba(128, 0, 255, 0.1) 2px, transparent 2px)`,
          backgroundSize: '50px 50px',
          backgroundPosition: 'center'
        }}
      />

      <div className="relative z-10">
        <motion.div 
          className="absolute top-4 right-4"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <HowItWorks />
        </motion.div>

        <div className="min-h-screen grid place-items-center">
          <motion.div 
            className="text-center space-y-8 p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.h1 
              className="text-5xl md:text-6xl font-bold"
              animate={{ 
                textShadow: ["0 0 10px #fff", "0 0 20px #fff", "0 0 10px #fff"]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{
                background: 'linear-gradient(45deg, #FF1CF7 0%, #b249f8 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              🔮 FingerPrint-O-Scope
            </motion.h1>

            <motion.p 
              className="text-xl text-muted-foreground max-w-lg mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Discover your digital personality & mood! We analyze your device's unique fingerprint 
              to reveal fun insights about your tech soul.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Link href="/scan">
                <Button 
                  size="lg" 
                  className="bg-primary hover:bg-primary/80 text-xl px-8 py-6 relative overflow-hidden group"
                >
                  <span className="relative z-10">Get Started 🚀</span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity"
                    animate={{
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  />
                </Button>
              </Link>
            </motion.div>

            <motion.div 
              className="absolute bottom-10 left-0 right-0 text-center text-sm text-muted-foreground"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Press Start to Begin Your Digital Journey
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}