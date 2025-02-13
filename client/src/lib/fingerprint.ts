import * as FingerprintJS from '@fingerprintjs/fingerprintjs-pro'

const FINGERPRINT_KEY = 'W0A4g9Q9hqyF16hMXTxD'

interface BrowserResult {
  visitorId: string
  browserName: string
  browserVersion: string
  os: string
  incognito: boolean
  confidence: number
  timestamp: number
}

export async function initFingerprint() {
  try {
    const fp = await FingerprintJS.load({
      apiKey: FINGERPRINT_KEY,
      // Use our proxy endpoint first, fall back to default if needed
      endpoint: [
        '/api/fingerprint',
        FingerprintJS.defaultEndpoint
      ]
    })
    return fp
  } catch (error) {
    console.error('Failed to initialize Fingerprint:', error)
    throw new Error('Failed to initialize fingerprint detection')
  }
}

export async function getVisitorData(): Promise<BrowserResult> {
  try {
    const fp = await initFingerprint()
    const result = await fp.get()

    if (!result?.visitorId) {
      throw new Error('No visitor ID received')
    }

    // Extract browser info from the result
    const browserInfo = result.components?.browserInfo || {}
    const osInfo = result.components?.osInfo || {}

    return {
      visitorId: result.visitorId,
      browserName: browserInfo.browser?.name || 'Unknown Browser',
      browserVersion: browserInfo.browser?.version || 'Latest',
      os: osInfo.os?.name || 'Unknown OS',
      incognito: Boolean(result.incognito),
      confidence: result.confidence || 0.5,
      timestamp: Date.now()
    }
  } catch (error) {
    console.error('Error getting visitor data:', error)
    throw error
  }
}