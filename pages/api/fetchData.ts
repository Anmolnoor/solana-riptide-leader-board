// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const data = await axios.get(
    'https://solana.com/_next/data/3tk4-BGWLArvM8qSmMa54/en/riptide/voting.json'
  )
  const resp = await data.data
  res.status(200).json({ resp })
}

export default handler
