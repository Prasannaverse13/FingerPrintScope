import { motion } from 'framer-motion'

export function ScanningAnimation() {
  return (
    <div className="relative w-64 h-64">
      <motion.div 
        className="absolute inset-0 border-4 border-primary rounded-lg"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [1, 0.5, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
      />
      
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/20"
        animate={{
          y: [0, 100, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
        }}
      />

      <div className="absolute inset-0 grid place-items-center">
        <div className="space-y-2 text-center">
          <motion.div 
            className="text-2xl font-bold"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            Scanning...
          </motion.div>
          <div className="text-sm text-muted-foreground">
            Analyzing your digital aura
          </div>
        </div>
      </div>
    </div>
  )
}
