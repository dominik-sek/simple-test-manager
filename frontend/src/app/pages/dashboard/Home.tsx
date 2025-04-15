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
        <div className={'flex flex-col gap-5'}>

          //recently used projects/cases
        <Card className={'col-span-4 p-4'}>
          Recent test runs
          <DataTable columns={[]} data={[]} />
        </Card>
        <Card className={'col-span-4 p-4'}>
          Projects
          <DataTable columns={[]} data={[]} />
        </Card>
        </div>
        <div className={'flex flex-col gap-5'}>

          //recently used projects/cases
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


