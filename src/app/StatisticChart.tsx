"use client"

import { AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, Area } from "recharts"

// TODO: change this
type Data = {
  name: string
  count: number
}

type StatisticChartProps = {
  data: Data[]
}

export default function StatisticChart(props: StatisticChartProps) {
  return (
    <AreaChart width={1200} height={250} data={props.data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
      <defs>
        <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#00B4BD" stopOpacity={0.8} />
          <stop offset="95%" stopColor="#00B4BD" stopOpacity={0} />
        </linearGradient>
      </defs>
      <XAxis dataKey="name" />
      <YAxis />
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip />
      <Area type="monotone" dataKey="count" stroke="#00B4BD" fillOpacity={1} fill="url(#colorCount)" />
    </AreaChart>
  )
}
