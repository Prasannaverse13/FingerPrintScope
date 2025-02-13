import { motion } from 'framer-motion'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { InfoIcon } from "lucide-react"

export function HowItWorks() {
  const steps = [
    {
      title: "Device Fingerprinting",
      description: "We analyze unique characteristics of your device like browser settings, screen resolution, and installed fonts.",
      icon: "🔍"
    },
    {
      title: "Aura Analysis",
      description: "Our algorithm calculates your digital aura level based on various technical signals.",
      icon: "✨"
    },
    {
      title: "Personality Matching",
      description: "Your device fingerprint is matched with archetypal digital personalities.",
      icon: "🎭"
    },
    {
      title: "Mood Detection",
      description: "Current browser state and time patterns reveal your digital mood.",
      icon: "🌈"
    }
  ]

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <InfoIcon className="w-4 h-4" />
          How It Works
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-black/90 backdrop-blur text-white">
        <DialogHeader>
          <DialogTitle>How FingerPrint-O-Scope Works</DialogTitle>
          <DialogDescription className="text-gray-400">
            Discover the magic behind your digital personality reading
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 mt-4">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="flex gap-3 p-3 rounded-lg bg-gray-800/50"
            >
              <div className="text-2xl">{step.icon}</div>
              <div>
                <h3 className="font-semibold text-primary">{step.title}</h3>
                <p className="text-sm text-gray-400">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
