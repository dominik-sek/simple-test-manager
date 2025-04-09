import { api } from '@/api/helper';
import Page from '@/components/page/Page';
import { useEffect, useState } from 'react';
import { DataTable } from '@/components/ui/data-table.tsx';
import { Button } from '@/components/ui/button';
import { ArrowUpDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ColumnDef } from '@tanstack/react-table';
import { test_caseModel } from '../../../../../shared';


export default function TestCases() {
  const [testCases, setTestCases] = useState<test_caseModel[]>([]);
  console.log(testCases);
  const columns: ColumnDef<test_caseModel>[] = [
    {
      accessorKey: 'id',
      header:({column})=>{
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Project ID
            <ArrowUpDown />
          </Button>
        )
      }
    },
    {
      accessorKey: 'name',
      header:'Project Name'
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
                Copy project name
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Edit Project</DropdownMenuItem>
              <DropdownMenuItem>View project</DropdownMenuItem>
              <DropdownMenuItem>Archive project</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )

      })
    }
  ]
  useEffect(() => {
    api('/test-case', { method: 'GET' })
      .then((res) => {
        setTestCases(res);
      })
      .catch((err) => {
        console.error('Failed to fetch test cases:', err);
      });
  }, []);




  return (
    <Page title={'Test Cases'}>
      <DataTable columns={columns} data={testCases} />

    </Page>
  )
}
