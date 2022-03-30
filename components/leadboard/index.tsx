import { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import Table from 'rc-table'
import useSWR from 'swr'

const LeaderBoard = (props: any) => {
  const fetcher = () => fetch('/api/fetchData').then((res) => res.json())

  const { data, error } = useSWR('/api/hello', fetcher, {
    refreshInterval: 10000,
  })

  console.log({ data })

  const reqData = data?.resp?.pageProps?.hackathonProjects
  reqData?.sort((a: any, b: any) => {
    return b.voteCount - a.voteCount
  })

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: 400,
    },
    {
      width: 100,
    },
    {
      title: 'Votes',
      dataIndex: 'voteCount',
      key: 'voteCount',
      width: 70,
    },
    {
      title: 'slug',
      dataIndex: 'slug',
      key: 'slug',
      render: (value: any) => (
        <a
          target={'_blank'}
          href={`https://solana.com/riptide/voting/${value}`}
        >
          Open!!
        </a>
      ),
    },
  ]

  return (
    <div>
      <div className="m-20 text-center text-5xl font-bold text-cyan-500">
        Solana Riptide Hackathon LeaderBoard
      </div>

      <div className="flex flex-row items-center justify-center">
        <Table
          columns={columns}
          data={reqData}
          rowKey={(record) => record.a}
          emptyText={() => (
            <div className="m-20 text-center text-3xl font-bold">
              Loading...
            </div>
          )}
        />
      </div>
    </div>
  )
}
export default LeaderBoard
