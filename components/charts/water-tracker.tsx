"use client"
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { useEffect, useState } from "react"
import { getWaterDataforChart } from "@/app/actions/water"
const chartConfig = {
  amount: {
    label: "amount",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export function WaterChart() {
  const [waterData, setWaterData] = useState<{date: string, amount: number}[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getWaterDataforChart();
      setWaterData(response);
    }
    fetchData()
  }, [])
  return (
    <Card className="bg-black border-none w-full">
      <CardContent className="pl-0">
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={waterData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              type="category"
              tickLine={false}
              axisLine={false}
              // tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis

            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="amount"
              type="natural"
              stroke="white"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
