"use client"
import {
    Label,
    PolarGrid,
    PolarRadiusAxis,
    RadialBar,
    RadialBarChart,
} from "recharts"

import {
    Card,
    CardContent,
} from "@/components/ui/card"
import { ChartConfig, ChartContainer } from "../ui/chart"


const chartConfig = {
    visitors: {
        label: "Visitors",
    },
    safari: {
        label: "Safari",
        color: "hsl(var(--chart-2))",
    },
} satisfies ChartConfig

export function Component({endAngle, text, data}: {endAngle: number, text: string, data: number}) {
    const chartData = [
        { browser: "safari", visitors: data, fill: "#007aff" },
    ]
    return (
        <Card className="flex flex-col bg-[#232545] border-0 shadow-none">
            <CardContent className="flex-1 p-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto w-full"
                >
                    <RadialBarChart
                        data={chartData}
                        startAngle={0}
                        endAngle={endAngle}
                        innerRadius={30.9}
                        outerRadius={38.3}
                    >
                        <PolarGrid
                            gridType="circle"
                            radialLines={false}
                            stroke="#232545"
                            className="first:fill-white last:fill-[#92A3FD]"
                            polarRadius={[31.9, 29]}
                        />
                        <RadialBar dataKey="visitors" background cornerRadius={10} />
                        <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                            <Label
                                content={({ viewBox }) => {
                                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                        return (
                                            <text
                                                x={viewBox.cx}
                                                y={viewBox.cy}
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                            >
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) -5}
                                                    className="fill-foreground text-xsm font-bold"
                                                >
                                                    {chartData[0].visitors.toLocaleString()}
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 10}
                                                    className="fill-white text-xsm"
                                                >
                                                    {text}
                                                </tspan>
                                            </text>
                                        )
                                    }
                                }}
                            />
                        </PolarRadiusAxis>
                    </RadialBarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
