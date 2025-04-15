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
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from '@tanstack/react-table';
import { test_collectionModel } from '../../../../../shared';
import InlineLoader from '@/components/page-loaders/InlineLoader';
import DialogCreate from '@/components/form-dialog/dialog-create';
import { toast } from 'sonner';
import { DialogFormField } from '@/types/CreateDialogFormField';
import { z } from 'zod';


export default function TestCollections() {
  const [testCollections, setTestCollections] = useState<test_collectionModel[]>([]);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  const columns: ColumnDef<test_collectionModel>[] = [
    {
      accessorKey: 'id',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            ID
            <ArrowUpDown />
          </Button>
        );
      }
    },
    {
      accessorKey: 'name',
      header: 'Name'
    },
    {
      accessorKey: 'description',
      header: 'Description'
    },
    {
      id: "actions",
      cell: (({ row }) => {
        const collection = row.original;

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
                onClick={() => navigator.clipboard.writeText(String(collection.name))}
              >
                Copy name
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DropdownMenuItem>View</DropdownMenuItem>
              <DropdownMenuItem>Archive</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );

      })
    }
  ];
  useEffect(() => {
    setLoading(true);
    api('/test-collection', { method: 'GET' })
      .then((res) => {
        setTestCollections(res);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch test cases:', err);
        setLoading(false);
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


  const formFields: DialogFormField<test_collectionModel>[] = [
    {
      name: "name",
      label: "Name",
      placeholder: "Test collection name"

    },
    {
      name: "description",
      label: "Description",
      placeholder: "Test collection description",
      type: "textarea"
    }
  ];
  const submitHandler = async (values: z.infer<typeof formSchema>) => {

    await api('/test-collection', {
      method: 'POST', body: JSON.stringify({
        name: values.name,
        description: values.description,
      })
    });

    //todo: add text styling inside toast
    toast.success(`Created ${values.name} without any project`);

  };

  return (
    <Page title={'Test Collections'}>

      <DialogCreate
        buttonText='New collection'
        dialogDescription='Create a new test collection'
        dialogTitle='New collection'
        formFields={formFields}
        formSchema={formSchema}
        onCreated={triggerRefresh}
        submitButtonText='Create'
        submitHandler={submitHandler} />




      {
             loading ?
             (
               <InlineLoader />
             ) : (
               <DataTable columns={columns} data={testCollections} />
             )
   
 }
    </Page>
  );
}
