import { motion } from 'framer-motion'
import { auraLeaderboard } from '@/lib/personality'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function AuraLeaderboard() {
  return (
    <Card className="w-full max-w-md mx-auto mt-8 bg-black/50 backdrop-blur border-primary">
      <CardHeader>
        <CardTitle className="text-2xl text-center text-primary">🏆 Top Aura Leaders</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {auraLeaderboard.map((leader, index) => (
            <motion.div
              key={leader.visitorId}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-3 rounded-lg bg-gray-800/50"
            >
              <div className="flex items-center gap-3">
                <div className="text-2xl">
                  {index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : "✨"}
                </div>
                <div className="font-semibold">{leader.name}</div>
              </div>
              <div className="text-primary font-mono">
                {leader.auraLevel}
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
