// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import path from 'path'

interface data {
  title: string
  votes: string
}
type Resp = data[]

let resp: Resp = []

const filepath = path.join(__dirname, '../../backupData.json')

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const htmlData = await axios.get('https://solana.com/riptide/voting')
    const projectlist: string = htmlData.data
    const projectlistary = projectlist
      .split(`<div class="project"><a class="" href="/riptide/voting/`)
      .map((el) => {
        return el.split(`"`)[0]
      })
    projectlistary.shift()
    // https://solana.com/api/hackathon/so-move

    projectlistary.map(async (el) => {
      try {
        const data = await axios.get(`https://solana.com/api/hackathon/${el}`)
        resp.push(data.data.hackathonProject)
      } catch (error) {
        return
      }
    })
    if (resp.length !== 0 && resp.length === 410) {
      fs.writeFileSync(filepath, JSON.stringify(resp))
      // console.log(`File is written successfully!`)
    }

    let data
    if (resp.length !== 0) {
      // console.log({ respd: 'live' })
      data = resp
    } else {
      // console.log({ respd: 'offline' })
      throw 'Too big'
    }
    resp = []
    res.status(200).json({ data, session: 'live Updates' })
  } catch (error) {
    const data = JSON.parse(fs.readFileSync(filepath, 'utf-8'))
    res.status(200).json({ data, session: 'offline backup' })
  }
}

export default handler
