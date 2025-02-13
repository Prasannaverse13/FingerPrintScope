import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export function registerRoutes(app: Express): Server {
  // Proxy endpoint for the Fingerprint API
  app.get('/api/fingerprint', async (req, res) => {
    try {
      const response = await fetch('https://api.fingerprint.com/v3/visits', {
        headers: {
          'Auth-API-Key': process.env.FINGERPRINT_KEY || 'W0A4g9Q9hqyF16hMXTxD'
        }
      });

      if (!response.ok) {
        throw new Error(`Fingerprint API error: ${response.status}`);
      }

      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error('Fingerprint API error:', error);
      res.status(500).json({ 
        error: 'Failed to fetch fingerprint data',
        details: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}