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
import DialogCreate from '@/components/form-dialog/dialog-create';
import InlineLoader from '@/components/page-loaders/InlineLoader';
import { toast } from 'sonner';
import { DialogFormField } from '@/types/CreateDialogFormField';
import { z } from 'zod';


export default function TestCases() {
  const [testCases, setTestCases] = useState<test_caseModel[]>([]);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  
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
  }, [refresh]);

  const triggerRefresh = () => {
    console.log('triggering refresh');
    setRefresh((prev) => !prev);
  };

  const formSchema = z.object({
    name: z.string().min(2, {
      message: 'Name must be at least 2 characters.',
    }),
    description: z.string(),
  });


  const formFields: DialogFormField<test_caseModel>[] = [
    {
      name: "name",
      label: "Name",
      placeholder: "Test case name"

    },
    {
      name: "description",
      label: "Description",
      placeholder: "Test case description",
      type: "textarea"
    }
  ];
  const submitHandler = async (values: z.infer<typeof formSchema>) => {

    await api('/test-case', {
      method: 'POST', body: JSON.stringify({
        name: values.name,
        description: values.description,
      })
    });

    //todo: add text styling inside toast
    toast.success(`Created ${values.name} without any project`);

  };

  //add comboboxes to filter table
  //add search bar
  return (
    <Page title={'Test Cases'}>

      {
        loading ?
          (
            <InlineLoader />
          ) : (
            <DataTable columns={columns} data={testCases}>
              <DialogCreate
                buttonText='New test case'
                dialogDescription='Create a new test case'
                dialogTitle='New case'
                formFields={formFields}
                formSchema={formSchema}
                onCreated={triggerRefresh}
                submitButtonText='Create'
                submitHandler={submitHandler} />
            </DataTable>
          )

      }
    </Page>
  )
}
