import { z } from 'zod';

export type PersonalityTrait = {
  title: string;
  description: string;
  emoji: string;
  auraLevel: number;
  auraColor: string;
}

export const auraLeaderboard = [
  { name: "CyberSage", auraLevel: 98, visitorId: "v1" },
  { name: "DigitalNinja", auraLevel: 95, visitorId: "v2" },
  { name: "TechShaman", auraLevel: 92, visitorId: "v3" },
  { name: "ByteMaster", auraLevel: 89, visitorId: "v4" },
  { name: "DataMystic", auraLevel: 87, visitorId: "v5" }
];

const personalities: PersonalityTrait[] = [
  {
    title: "Digital Nomad",
    description: "You're always on the move, connecting from different places. Your digital footprint shows a love for exploration!",
    emoji: "🌎",
    auraLevel: 85,
    auraColor: "#FF6B6B"
  },
  {
    title: "Night Owl Coder",
    description: "Your late-night browsing patterns reveal a nocturnal creative energy. The digital realm is your playground after dark!",
    emoji: "🦉",
    auraLevel: 88,
    auraColor: "#4ECDC4"
  },
  {
    title: "Tech Wizard",
    description: "A true power user! Your sophisticated device configuration shows masterful control over technology.",
    emoji: "🧙‍♂️",
    auraLevel: 92,
    auraColor: "#9B59B6"
  },
  {
    title: "Speed Demon",
    description: "Lightning-fast reactions and high-performance metrics reveal your need for digital speed!",
    emoji: "⚡",
    auraLevel: 90,
    auraColor: "#F1C40F"
  },
  {
    title: "Privacy Guardian",
    description: "Your security-conscious setup shows you value digital privacy and protection. A true defender of data!",
    emoji: "🛡️",
    auraLevel: 87,
    auraColor: "#3498DB"
  }
];

// Helper function to generate a consistent but random number from a string
function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash);
}

export function calculateAuraLevel(visitorId: string, browserData: any): number {
  // Use visitor ID to generate a base number between 0-15
  const baseNumber = hashCode(visitorId) % 15;

  // Browser-specific bonuses
  const browserBonus = (() => {
    const browser = browserData.browserName?.toLowerCase() || '';
    if (browser.includes('chrome')) return 4;
    if (browser.includes('firefox')) return 5;
    if (browser.includes('safari')) return 3;
    if (browser.includes('edge')) return 4;
    return 2;
  })();

  // OS-specific bonuses
  const osBonus = (() => {
    const os = browserData.os?.toLowerCase() || '';
    if (os.includes('linux')) return 6;
    if (os.includes('mac')) return 4;
    if (os.includes('windows')) return 5;
    return 3;
  })();

  // Time-based bonus (higher during night hours)
  const hour = new Date().getHours();
  const timeBonus = (hour >= 22 || hour <= 4) ? 5 : 
                    (hour >= 5 && hour <= 8) ? 3 :
                    (hour >= 9 && hour <= 17) ? 2 : 4;

  // Random daily variation (changes every day but consistent throughout the day)
  const today = new Date().toDateString();
  const dailyVariation = hashCode(today + visitorId) % 5;

  // Calculate final aura level (75-100 range)
  const auraLevel = 75 + baseNumber + browserBonus + osBonus + timeBonus + dailyVariation;

  // Ensure the value stays within bounds
  return Math.min(100, Math.max(75, auraLevel));
}

export function generatePersonality(visitorId: string, browserData: any): PersonalityTrait {
  // Use the visitor ID to consistently select a base personality
  const personalityIndex = hashCode(visitorId) % personalities.length;
  const basePersonality = personalities[personalityIndex];

  // Calculate the aura level
  const calculatedAuraLevel = calculateAuraLevel(visitorId, browserData);

  return {
    ...basePersonality,
    auraLevel: calculatedAuraLevel
  };
}

export function generateMood(browserName: string): string {
  const timeBasedMoods = {
    morning: ['Energetic', 'Focused', 'Productive'],
    afternoon: ['Creative', 'Balanced', 'Inspired'],
    evening: ['Relaxed', 'Contemplative', 'Artistic'],
    night: ['Mysterious', 'Innovative', 'Adventurous']
  };

  const hour = new Date().getHours();
  const timeOfDay = 
    hour >= 5 && hour < 12 ? 'morning' :
    hour >= 12 && hour < 17 ? 'afternoon' :
    hour >= 17 && hour < 22 ? 'evening' : 'night';

  // More varied browser-based personality traits
  const browserMoods: Record<string, string[]> = {
    'Chrome': ['Bold', 'Adventurous', 'Dynamic'],
    'Firefox': ['Free-spirited', 'Creative', 'Independent'],
    'Safari': ['Focused', 'Elegant', 'Precise'],
    'Edge': ['Balanced', 'Professional', 'Adaptable'],
  };

  // Get random mood based on browser
  const browserType = browserName?.toLowerCase() || '';
  let personalityTrait = 'Unique';

  Object.entries(browserMoods).forEach(([browser, moods]) => {
    if (browserType.includes(browser.toLowerCase())) {
      personalityTrait = moods[hashCode(Date.now().toString()) % moods.length];
    }
  });

  // Get random time-based mood
  const timeMood = timeBasedMoods[timeOfDay][hashCode(Date.now().toString()) % 3];

  return `${timeMood} & ${personalityTrait}`;
}

export function getAuraDescription(level: number): string {
  if (level >= 95) return "Legendary";
  if (level >= 90) return "Mythical";
  if (level >= 85) return "Extraordinary";
  if (level >= 80) return "Powerful";
  if (level >= 75) return "Strong";
  return "Emerging";
}