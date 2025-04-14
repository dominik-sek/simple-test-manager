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
import { toast } from 'sonner';
import { z } from 'zod';
import DialogCreate from '@/components/form-dialog/dialog-create.tsx';
import { useNavigate } from 'react-router';
import { DialogFormField } from '@/types/CreateDialogFormField';

export default function TestProjects() {

  const [testProjects, setTestProject] = useState<test_projectModel[]>([]);
  const [refreshProjects, setRefreshProjects] = useState(false);
  const navigate = useNavigate();

  const columns: ColumnDef<test_projectModel>[] = [
    {
      accessorKey: 'id',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            ID
            <ArrowUpDown />
          </Button>
        );
      },
    },
    {
      accessorKey: 'prefix',
      header: 'Prefix',
    },
    {
      accessorKey: 'name',
      header: 'Name',
    },
    {
      accessorKey: 'description',
      header: 'Description',
    },
    {
      accessorKey: 'test_project_collection.length',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Test collections
            <ArrowUpDown />
          </Button>
        );
      },
    },
    {
      id: 'actions',
      cell: (({ row }) => {
        const project = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                ...
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Settings</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(String(project.name))}
              >
                Copy name
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  navigate(`/projects/${project.id}`);
                }}
              >
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => console.log(project.id)}
              >Archive</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );

      }),
    },
  ];

  useEffect(() => {
    api('/test-project', { method: 'GET' })
      .then((res) => {
        console.log(res)
        setTestProject(res);
      })
      .catch((err) => {
        toast.error(err.message);
        console.error('Failed to fetch projects:', err);
      });
  }, [refreshProjects]);

  const triggerRefresh = () => {
    console.log('triggering refresh')
    setRefreshProjects((prev) => !prev);
  };

  const formSchema = z.object({
    name: z.string().min(2, {
      message: 'Name must be at least 2 characters.',
    }),
    prefix: z.string()
      .min(1, { message: 'Prefix must be at least 1 character' })
      .max(6, { message: 'Prefix must have no more than 6 characters' }),
    description: z.string(),
  });

  const formFields:DialogFormField[] = [
    {
      name:"name",
      label:"Name",
      placeholder:"Project name",
    },
    {
      name:"prefix",
      label:"Prefix",
      placeholder:"Project prefix eg. TST",
    },
    {
      name:"description",
      label:"Description",
      placeholder:"Project description",
      type:"textarea"
    }
  ]
  const submitHandler = async (values: z.infer<typeof formSchema>) => {
    await api('/test-project',{method: 'POST', body: JSON.stringify({
        name: values.name,
        description: values.description
      })})
    toast.success('Project successfully created');
  }

  return (
    <Page title={'Test projects'}>


      <div className={'flex flex-wrap gap-4'}>
      <DataTable columns={columns} data={testProjects}>
        <DialogCreate
          buttonText={'New project'}
          dialogTitle={'New project'}
          dialogDescription={'Create a new project'}
          submitButtonText={'Create'}
          formSchema={formSchema}
          onCreated={triggerRefresh}
          submitHandler={submitHandler}
          formFields={formFields}
        />
      </DataTable>
      </div>

    </Page>
  )
}
