import { api } from '@/api/helper';
import Page from '@/components/page/Page';
import { useState } from 'react';

export default function TestProjectCreate() {
  const [formData, setFormData] = useState({
    projectName: '',
    description: ''
  });
  
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {

    event.preventDefault(); // Prevent the default form submission behavior
    const formData = new FormData(event.currentTarget); // Get the form data

    // You can now use the formData object to access the values of the form fields
    const projectName = formData.get('projectName');
    const description = formData.get('description');

    setFormData({
      projectName: projectName as string,
      description: description as string
    });

    // Perform any additional actions, such as sending the data to an API or updating state

    //send the data to the API
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
        // You can also redirect the user to another page or show a success message
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
