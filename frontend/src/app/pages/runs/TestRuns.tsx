import Page, { PageTitleAction } from '@/components/page/Page';
import { api } from '@/api/helper.ts';
import { test_runModel } from '../../../../../shared';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card.tsx';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input.tsx';
import { Button } from '@/components/ui/button.tsx';
import { TestRunCard } from '@/app/pages/runs/TestRunCard.tsx';
import { Progress } from '@/components/ui/progress';
import { Table, TableCaption } from '@/components/ui/table';
import { Download } from 'lucide-react';

export default function TestRuns() {
  // api('/test-run').then(result => {
  //   console.log(result);
  // })
  const runs: [] = [
    {
      id: 1,
      name: 'Login testing',
      started_at: new Date().toJSON().slice(0, 10).replace(/-/g, '/'),
      finished_at: new Date().toJSON().slice(0, 10).replace(/-/g, '/'),
      stats: [
        {
          name: "step_count",
          value: 100
        },
        {
          name: "case_count",
          value: 100
        },
        {
          name: "passed",
          value: 100
        },
        {
          name: "failed",
          value: 100
        },
      ]

    },
    {
      id: 2, name: 'Registration testing', started_at: new Date().toJSON().slice(0, 10).replace(/-/g, '/'), finished_at: null,
      stats: [
        {
          name: "step_count",
          value: 100
        },
        {
          name: "case_count",
          value: 100
        },
        {
          name: "passed",
          value: 100
        },
        {
          name: "failed",
          value: 100
        },
      ]
    },

  ];

  const actionBar = () => (
    <div className={'flex gap-2'}>
      <Input className={'bg-white'} placeholder={'Search test runs'}></Input>
      <Button>
        Create test run
      </Button>
    </div>
  );
  return (
    <Page title={'Test runs'} actionBar={actionBar()} >

      <Tabs defaultValue="default" className=" h-full w-full gap-10 ">

        <TabsList className={"w-full h-full flex flex-col p-0 bg-transparent"} >
          <TabsTrigger className='hidden' value={'default'} />

          {
            runs.map((run) => {
              return (
                <TabsTrigger className={'w-full'} value={run.id}>

                  <Card className='w-full flex justify-between flex-row p-4'>
                    <div className='flex gap-2'>
                      <div className='flex items-center'>
                        icon
                      </div>

                      <div className='text-left'>
                        <CardTitle className='text-lg'>
                          {run.name}
                        </CardTitle>
                        <CardDescription>
                          {run.started_at}
                        </CardDescription>
                      </div>
                    </div>

                    <div>
                      <CardFooter className='flex flex-col' >
                        <div>
                          x/x
                        </div>
                        <span>
                          X tests
                        </span>
                      </CardFooter>
                    </div>

                  </Card>
                </TabsTrigger>
              );
            })
          }

          </TabsList>
        <TabsContent value={'default'}>
                <Card className='p-4'>
                  Nothingness
                </Card>
              </TabsContent>
        {
          runs.map((run) => {
            return (
              <TabsContent value={run.id}>
                <Card className='p-0'>
                <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white p-6 rounded-t-xl">

                  <CardTitle className=' text-xl flex justify-between'>
                    <div>{run.name}</div>
                    <Button><Download />Export</Button>
                  </CardTitle>
                  </CardHeader>

                  <CardDescription className='flex gap-4'>
                    {run.started_at && <div><span className='font-bold'>Started at:</span> {run.started_at}</div>}
                    {run.finished_at && <div><span className='font-bold'>Finished at:</span> {run.finished_at}</div>}

                  </CardDescription>
                  <CardContent>
                    <div className='flex flex-col gap-2'>
                      <span className='text-lg font-medium'>Progress</span>
                      <Progress value={100} />
                      <span className='text-sm text-slate-500'>x out of X test cases completed</span>
                    </div>


                  </CardContent>
                  <CardFooter>
                    <Table>
                      <TableCaption>
                        table
                      </TableCaption>
                    </Table>
                  </CardFooter>
                </Card>
              </TabsContent>
            );
          })
        }
      </Tabs>

    </Page>
  );
}
