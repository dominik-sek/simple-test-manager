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
import { test_collectionModel } from '../../../../../shared';


export default function TestCollections() {
  const [testCollections, setTestCollections] = useState<test_collectionModel[]>([]);
  console.log(testCollections);
  const columns: ColumnDef<test_collectionModel>[] = [
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
      header:'Collection name'
    },
    {
      accessorKey: 'description',
      header:'Collection description'
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
                Copy collection name
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
    api('/test-collection', { method: 'GET' })
      .then((res) => {
        setTestCollections(res);
      })
      .catch((err) => {
        console.error('Failed to fetch test cases:', err);
      });
  }, []);




  return (
    <Page title={'Test Collections'}>
      <DataTable columns={columns} data={testCollections} />

    </Page>
  )
}
