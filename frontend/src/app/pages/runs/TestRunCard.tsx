import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button.tsx';
import { test_runModel } from '../../../../../shared';
import { useState } from 'react';
import { Progress } from '@/components/ui/progress.tsx';
interface TestRunCardProps {
    run: []
}

export const TestRunCard = (props: TestRunCardProps) =>{
  const [progressValue, setProgressValue] = useState(0);
  const calculateProgress = (value: number) => {
    return 
  }
  return(
    <Card className={'min-w-96  flex flex-col '}>
      <CardHeader className={'text-lg '}>
        <CardTitle className={'flex justify-between'}>
          {props.run.name}
          <div>
            badge
          </div>
        </CardTitle>
        {/*<CardDescription>{'desc'}</CardDescription>*/}
      </CardHeader>
      <CardContent className={'flex justify-between flex-col gap-4'}>
        <div className={'flex justify-between'}>
          {
            props.run.stats.map((stat)=>{
              return(
                <div className={'flex flex-col items-center '}>
                  <span className={'text-2xl'}>{stat.value}</span>
                  <span className={'text-slate-400'}>{stat.name}</span>
                </div>
              )

            })
          }
        </div>
        <div>
          <Progress value={66} />

        </div>

      </CardContent>
      <CardFooter className={'flex gap-4 justify-end'}>
        <Button className="">Edit</Button>
        <Button variant="secondary" className="">View details</Button>
        <Button variant="outline" className="">Archive</Button>
      </CardFooter>
    </Card>
  )
}
