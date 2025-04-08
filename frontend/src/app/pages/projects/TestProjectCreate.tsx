import { api } from '@/api/helper';
import Page from '@/components/page/Page';
import { useState } from 'react';

export default function TestProjectCreate() {
  const [formData, setFormData] = useState({
    projectName: '',
    description: ''
  });
  
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {

    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const projectName = formData.get('projectName');
    const description = formData.get('description');

    setFormData({
      projectName: projectName as string,
      description: description as string
    });


    api('/test-project', {
      method: 'POST',
      body: JSON.stringify({
        name: projectName,
        description: description
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((res) => {
        console.log(res); // good for debugging
      })
      .catch((err) => {
        console.error('Failed to create project:', err);
      });
  }


  return (
    <Page title={'Create Project'}>
    </Page>
  );
}
