// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
interface data {
  title: string
  votes: string
}
type Resp = data[]

let resp: Resp = []

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const htmlData = await axios.get('https://solana.com/riptide/voting')

  const projectlist: string = htmlData.data
  const projectlistary = projectlist
    .split(`<div class="project"><a class="" href="/riptide/voting/`)
    .map((el) => {
      return el.split(`"`)[0]
    })
  projectlistary.shift()
  // https://solana.com/api/hackathon/so-move
  try {
    projectlistary.map(async (el) => {
      const data = await axios.get(`https://solana.com/api/hackathon/${el}`)
      resp.push(data.data.hackathonProject)
    })
  } catch (error) {
    console.log(error)
  }

  const data = resp
  console.log({ resp })
  resp = []
  res.status(200).json({ data })
  // const resp = await data.data      fill="currentColor"></path></svg><span class="mx-2">Upvote</span><span>
}

export default handler
