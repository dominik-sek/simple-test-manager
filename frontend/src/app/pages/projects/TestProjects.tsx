import { api } from '@/api/helper';
import Page from '@/components/page/Page';
import { useEffect, useState } from 'react';
import {test_projectModel} from '../../../../../shared'
import { ColumnDef } from '@tanstack/react-table';
import { DataTable } from '@/components/ui/data-table.tsx';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {Button} from '@/components/ui/button';
import { ArrowUpDown } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card.tsx';
import CreateProjectDialog from '@/app/pages/projects/CreateProjectDialog.tsx';
export default function TestProjects() {

  const [testProjects, setTestProject] = useState<test_projectModel[]>([]);
  const columns: ColumnDef<test_projectModel>[] = [
    {
      accessorKey: 'id',
      header:({column})=>{
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            ID
            <ArrowUpDown />
          </Button>
        )
      }
    },
    {
      accessorKey: 'name',
      header:'Name'
    },
    {
      accessorKey: 'description',
      header:'Description'
    },
    {
      id:"actions",
      cell:(({row})=>{
        const project = row.original

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                ...
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(String(project.name))}
              >
                Copy name
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DropdownMenuItem>View</DropdownMenuItem>
              <DropdownMenuItem>Archive</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )

      })
    }
  ]
  useEffect(() => {
    api('/test-project', { method: 'GET' })
      .then((res) => {
        console.log('fetching projects')
        console.log(res)
        setTestProject(res);
      })
      .catch((err) => {
        console.error('Failed to fetch projects:', err);
      });
  }, []);

  const stats = [
    {
      label:"Test collections",
      count: 4
    },
    {
      label:"Test cases",
      count: 120
    },
    {
      label:"Test members",
      count: 12
    },
    {
      label:"Last activity",
      count: "5 minutes ago"
    }
  ]

  return (
    <Page title={'Test projects'}>
      <div className={'flex flex-wrap gap-4'}>
      {/*<DataTable columns={columns} data={testProjects} />*/}
      {testProjects?.map((project)=>{
        return(
        <Card className={'min-w-96  flex flex-col '}>
          <CardHeader className={'text-lg '}>
          <CardTitle>{project.name}</CardTitle>
          <CardDescription>{project.description}</CardDescription>
          </CardHeader>
        <CardContent>
          <div className={'flex flex-col justify-between'}>
            {
              stats.map((stat)=>{
                  console.log(stat)
                return(
                  <div className={'flex justify-between gap-4'}>
                    <span className={'text-slate-500'}>{stat.label}</span>

                    <span>{stat.count}</span>
                  </div>
                )
              })
            }


          </div>
        </CardContent>
          <CardFooter className={'flex gap-4 justify-end'}>
            <Button className="">Edit</Button>
            <Button variant="secondary" className="">View details</Button>
            <Button variant="outline" className="">Archive</Button>
          </CardFooter>
        </Card>
        )
      })}
      </div>
      <CreateProjectDialog />
    </Page>
  )
}
