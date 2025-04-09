import Page from '@/components/page/Page';
import { Pie, PieChart, Label } from "recharts"
import {
  Card,
  CardContent,
  CardDescription, CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { useEffect, useMemo, useState } from 'react';
import { api } from '@/api/helper.ts';
import { DataTable } from '@/components/ui/data-table.tsx';
type TestCaseStatusSummary = {
  total: number;
  grouped: {
    status: 'running' | 'review' | 'todo' | 'done';
    count: number;
  }[];
};

export default function Home(){
  const [testCaseStats, setTestCaseStats] = useState<TestCaseStatusSummary>({total:0, grouped:[]})
  const [loading, setLoading] = useState<boolean>(true)
  useEffect(()=>{
    api('/test-case/stats', {method:'GET'})
      .then((res)=>{
        setTestCaseStats(res)
        setLoading(false)
      }).catch((err)=>{
      console.log(err)
    })
  },[])

  const statusColors: Record<TestCaseStatusSummary["grouped"][number]["status"], string> = {
    running: "#3b82f6", // blue-500
    review: "#f59e0b",  // amber-500
    todo: "#6b7280",    // gray-500
    done: "#10b981",    // green-500
  };

  const chartData = useMemo(()=>{
    return testCaseStats.grouped.map((item)=>({
      ...item,
      fill: statusColors[item.status],
    }))
  }, [testCaseStats])


  const chartConfig = {

    running:{
      label: "Running",
    },
    review:{
      label: "Review",
    },
    todo:{
      label: 'To-do'
    },
    done:{
      label: "Done",
    }

  } satisfies ChartConfig
  const totalTestCases = testCaseStats?.total

  return (
    <Page title={'Dashboard'}>
      <div className={'w-full grid  grid-flow-row gap-4'}>
        <Card className={''}>
        <CardHeader>
          <CardTitle className={'text-md text-slate-500'}>Active Projects</CardTitle>
        </CardHeader>
        <CardContent>
          <span className={'text-3xl'}>
            5
          </span>
        </CardContent>
        <CardFooter>
          Trends ^
        </CardFooter>
      </Card>
        <Card className={''}>
          <CardHeader>
            <CardTitle className={'text-md text-slate-500'}>Test cases</CardTitle>
          </CardHeader>
          <CardContent>
          <span className={'text-3xl'}>
            5
          </span>
          </CardContent>
          <CardFooter>
            Trends ^
          </CardFooter>
        </Card>
        <Card className={''}>
          <CardHeader>
            <CardTitle className={'text-md text-slate-500'}>Pass Rate</CardTitle>
          </CardHeader>
          <CardContent>
          <span className={'text-3xl'}>
            5
          </span>
          </CardContent>
          <CardFooter>
            Trends ^
          </CardFooter>
        </Card>
        <Card className={''}>
          <CardHeader>
            <CardTitle className={'text-md text-slate-500'}>Test runs</CardTitle>
          </CardHeader>
          <CardContent>
          <span className={'text-3xl'}>
            5
          </span>
          </CardContent>
          <CardFooter>
            Trends ^
          </CardFooter>
        </Card>
        <Card className="flex h-fit flex-col col-span-2!">
          <CardHeader className="items-center pb-0 ">
            <CardTitle>Test cases</CardTitle>
            <CardDescription></CardDescription>
          </CardHeader>
          <CardContent className="flex-1 pb-0! ">
            {
              loading
                ? (
                  <div>Loading...</div>
                ) : (
                  <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-video"
                  >
                    <PieChart>
                      <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent hideLabel />}
                      />
                      <Pie
                        data={chartData}
                        dataKey="count"
                        nameKey="status"
                        innerRadius={60}
                        strokeWidth={5}
                      >
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
                                    y={viewBox.cy}
                                    className="fill-foreground text-3xl font-bold"
                                  >
                                    {totalTestCases}
                                  </tspan>
                                  <tspan
                                    x={viewBox.cx}
                                    y={(viewBox.cy || 0) + 24}
                                    className="fill-muted-foreground"
                                  >
                                    Testcases
                                  </tspan>
                                </text>
                              )
                            }
                          }}
                        />
                      </Pie>
                    </PieChart>
                  </ChartContainer>
                )
            }
          </CardContent>

        </Card>

        <Card className="flex flex-col col-span-2!">
          <CardHeader className="items-center pb-0 ">
            <CardTitle>Test cases</CardTitle>
            <CardDescription></CardDescription>
          </CardHeader>
          <CardContent className="flex-1 pb-0! ">
            {
              loading
                ? (
                  <div>Loading...</div>
                ) : (
                  <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-video"
                  >
                    <PieChart>
                      <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent hideLabel />}
                      />
                      <Pie
                        data={chartData}
                        dataKey="count"
                        nameKey="status"
                        innerRadius={60}
                        strokeWidth={5}
                      >
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
                                    y={viewBox.cy}
                                    className="fill-foreground text-3xl font-bold"
                                  >
                                    {totalTestCases}
                                  </tspan>
                                  <tspan
                                    x={viewBox.cx}
                                    y={(viewBox.cy || 0) + 24}
                                    className="fill-muted-foreground"
                                  >
                                    Testcases
                                  </tspan>
                                </text>
                              )
                            }
                          }}
                        />
                      </Pie>
                    </PieChart>
                  </ChartContainer>
                )
            }
          </CardContent>

        </Card>
        <Card className={'col-span-4 p-4'}>
          Recent test runs
          <DataTable columns={[]} data={[]} />
        </Card>
        <Card className={'col-span-4 p-4'}>
          Projects
          <DataTable columns={[]} data={[]} />
        </Card>
      </div>
    </Page>
  )
}


