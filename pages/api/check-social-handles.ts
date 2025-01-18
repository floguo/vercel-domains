import { NextApiRequest, NextApiResponse } from 'next'
import fetch from 'node-fetch'

const PLATFORMS = [
  { name: 'X (Twitter)', url: 'https://twitter.com/' },
  { name: 'Instagram', url: 'https://www.instagram.com/' },
  { name: 'GitHub', url: 'https://github.com/' },
  { name: 'Facebook', url: 'https://www.facebook.com/' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/company/' },
  { name: 'YouTube', url: 'https://www.youtube.com/@' },
]

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { handle } = req.body

  if (!handle) {
    return res.status(400).json({ error: 'Handle is required' })
  }

  try {
    const results = await Promise.all(
      PLATFORMS.map(async (platform) => {
        const response = await fetch(`${platform.url}${handle}`)
        return {
          platform: platform.name,
          available: response.status === 404
        }
      })
    )

    return res.status(200).json(results)
  } catch (error) {
    console.error('Error checking handles:', error)
    return res.status(500).json({ error: 'Failed to check handles' })
  }
}

