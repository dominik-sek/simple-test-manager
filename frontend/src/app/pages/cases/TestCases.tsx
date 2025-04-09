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
            Case ID
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
      accessorKey: 'status',
      header:'Status'
    },
    {
      accessorKey: 'parameters',
      header:'Parameters' //cell should be some kind of expandable?
    },
    {
      id:"actions",
      cell:(({row})=>{
        const testCase = row.original

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
                onClick={() => navigator.clipboard.writeText(String(testCase.name))}
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
