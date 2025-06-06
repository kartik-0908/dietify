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
import { getWeightlogsforChart } from "@/app/actions/weight"
const chartConfig = {
  desktop: {
    label: "Weight",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export function WeightChart() {
  const [weightData, setWeightData] = useState<{ date: string, weight: number }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getWeightlogsforChart();
      setWeightData(response);
    }
    fetchData()
  }, [])
  return (
    <Card className="bg-black border-none w-full">
      <CardContent className="pl-0">
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={weightData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
            />
            <YAxis

            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="weight"
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
