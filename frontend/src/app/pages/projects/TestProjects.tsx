import { api } from '@/api/helper';
import DataCard from '@/components/data-card/DataCard';
import Page from '@/components/page/Page';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

export default function TestProjects() {

  const [testProject, setTestProject] = useState<any>(null);

  const params = useParams();
  console.log(params); // good for debugging
  useEffect(() => {
    api('/test-project', { method: 'GET' })
      .then((res) => {
        console.log(res); // good for debugging
        setTestProject(res); // <-- store it in state
      })
      .catch((err) => {
        console.error('Failed to fetch projects:', err);
      });
  }, []);
  return (
    <Page title={'Test projects'}>
      {
        testProject && testProject.map((project: any) => {
          project = project.test_project
          return (
            <DataCard key={project.id} title={project.name} description={project.description} icon={project.icon} href={`/projects/${project.id}`} />
          )
        })
      }
      
    </Page>
  )
}
