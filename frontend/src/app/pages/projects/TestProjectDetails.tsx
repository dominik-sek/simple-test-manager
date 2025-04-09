import { api } from '@/api/helper';
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

    </Page>
  )
}
