import { api } from '@/api/helper';
import Page from '@/components/page/Page';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { PageLoader } from '@/components/page-skeleton/PageLoader.tsx';

export default function TestProjectDetails() {

  const [testProject, setTestProject] = useState<any>({});
  const [loading, setLoading] = useState(true);

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    api(`/test-project/${params.id}`, { method: 'GET' })
      .then((res) => {
        setLoading(false);
        setTestProject(res); 
      })
      .catch((err) => {
        setLoading(false);
        console.error('Failed to fetch projects:', err);
      });
  }, [navigate]);

  if(loading) return <PageLoader />;
  return (
    <Page title={testProject.name}>
        Hello {testProject.name}!
    </Page>
  )
}
