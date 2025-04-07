import { api } from '@/api/helper';
import DataCard from '@/components/data-card/DataCard';
import Page from '@/components/page/Page';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

export default function TestProjectDetails() {

  const [testProject, setTestProject] = useState<any>(null);

  const params = useParams();
  useEffect(() => {
    api(`/test-project/${params.id}`, { method: 'GET' })
      .then((res) => {
        console.log(res);
        setTestProject(res); 
      })
      .catch((err) => {
        console.error('Failed to fetch projects:', err);
      });
  }, []);

  return (
    <Page title={'Test projects'}>
      {
        testProject && 
           (
            <DataCard key={testProject.id} title={testProject.name} description={testProject.description} icon={testProject.icon} href={`/projects/${testProject.id}`} />
          )
       }
      
      
    </Page>
  )
}
