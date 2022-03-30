import { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import Table from 'rc-table'
import useSWR from 'swr'

const LeaderBoard = (props: any) => {
  const fetcher = () => fetch('/api/fetchData').then((res) => res.json())

  const { data, error } = useSWR('/api/', fetcher, {
    refreshInterval: 10000,
  })

  const reqData = data?.data
  reqData?.sort((a: any, b: any) => {
    return b.votes - a.votes
  })

  const columns = [
    {
      title: 'Name',
      dataIndex: 'title',
      key: 'title',
      width: 400,
    },
    {
      width: 100,
    },
    {
      title: 'Votes',
      dataIndex: 'votes',
      key: 'votes',
      width: 70,
    },
    {
      title: 'Links',
      dataIndex: 'title',
      key: 'title',
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
      <div className="mt-20 mb-10 text-center text-5xl font-bold text-cyan-500">
        Solana Riptide Hackathon LeaderBoard 2.0
      </div>
      <div className="text-1xl m-10 text-center font-bold text-blue-500">
        Auto reload after 10 seconds
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
