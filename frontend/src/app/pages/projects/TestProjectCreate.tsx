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
      <div>
      <h1>Create a new project</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="projectName">Project Name:</label>
          <input className='bg-white' type="text" id="projectName" name="projectName" required />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea className='bg-white' id="description" name="description"></textarea>
        </div>
        <button  type="submit">Create Project</button>
      </form>
    </div>
    </Page>
  );
}
