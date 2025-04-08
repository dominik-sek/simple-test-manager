import { api } from '@/api/helper';
import { Button } from '@/components/ui/button'
import DataTable from '@/components/data-table/DataTable';
import Page from '@/components/page/Page';
import { l } from 'node_modules/react-router/dist/development/fog-of-war-1hWhK5ey.d.mts';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

export default function TestProjects() {

  const [testProjects, setTestProject] = useState<any>(null);
  const params = useParams();
  const columns = [
    {
      key: 'id',
      label: 'ID'
    },
    {
      key: 'name',
      label: 'Name'
    },
    {
      key: 'description',
      label: 'Description'
    },
  ]
  const actions = [
    {
      label: 'Edit',
      icon: 'edit',
      onClick: (row: any) => {
        console.log('Edit', row);
      }
    },
    {
      label: 'Delete',
      icon: 'delete',
      onClick: (row: any) => {
        console.log('Delete', row);
      }
    },
    {
      label: 'View',
      icon: 'view',
      onClick: (row: any) => {
        console.log('View', row);
      }
    }

  ]




  useEffect(() => {
    api('/test-project', { method: 'GET' })
      .then((res) => {
        console.log(res)
        setTestProject(res);
      })
      .catch((err) => {
        console.error('Failed to fetch projects:', err);
      });
  }, []);

  return (
    <Page title={'Test projects'}>
      {
        !testProjects || testProjects.length === 0 && (
          <div className='w-full h-full text-slate-500 items-center justify-center flex flex-col text-2xl '>
            <span>No projects yet</span>
            <Button >
              hello

            </Button>
          </div>
        )
        }
      {/*
      <DataTable columns={columns} data={testProject} actions={actions}  />
       {
        testProject && testProject.map((project: any) => {
          project = project.test_project
          return (
            <DataCard key={project.id} title={project.name} description={project.description} icon={project.icon} href={`/projects/${project.id}`} />
          )
        })
      } */}
      
    </Page>
  )
}
