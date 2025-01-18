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
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  const { handle } = req.body

  if (!handle) {
    return res.status(400).json({ message: 'Handle is required' })
  }

  try {
    const results = await Promise.all(
      PLATFORMS.map(async (platform) => {
        const url = `${platform.url}${handle}`
        const response = await fetch(url, { method: 'HEAD' })
        return {
          platform: platform.name,
          available: response.status === 404,
          url,
        }
      })
    )

    res.status(200).json(results)
  } catch (error) {
    console.error('Error checking social handles:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

