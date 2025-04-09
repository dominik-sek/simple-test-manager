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

  return (
    <Page title={'Test projects'}>

      <DataTable columns={columns} data={testProjects} />
      
    </Page>
  )
}
