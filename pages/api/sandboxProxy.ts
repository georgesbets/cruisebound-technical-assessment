import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const targetUrl = 'https://sandbox.cruisebound-qa.com/sailings';

  try {
    const response = await fetch(targetUrl, {
      method: req.method, // Forward GET, POST, etc.
      headers: {
        'Content-Type': 'application/json',
        ...(req.headers.authorization && {
          Authorization: req.headers.authorization,
        }), // Pass authorization header, if available
      },
      body: req.method !== 'GET' ? JSON.stringify(req.body) : undefined,
    });

    const data = await response.json();
    res.status(response.status).json(data); // Forward response to the client
  } catch (error) {
    console.error('Proxy failed:', error);
    res.status(500).json({ error: 'Failed to proxy the request' });
  }
}
