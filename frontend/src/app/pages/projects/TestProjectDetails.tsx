import { api } from '@/api/helper';
import Page from '@/components/page/Page';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { PageLoader } from '@/components/page-loaders/PageLoader';
import DialogCreate from '@/components/form-dialog/dialog-create';
import { z } from 'zod';
import {test_collectionModel, test_projectModel} from '../../../../../shared'
import { DialogFormField } from '@/types/CreateDialogFormField';
import { toast } from 'sonner';
import InlineLoader from '@/components/page-loaders/InlineLoader';


export default function TestProjectDetails() {

  const [testProject, setTestProject] = useState<test_projectModel>();
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
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
  }, [navigate, refresh]);

  const triggerRefresh = () => {
    console.log('triggering refresh')
    setRefresh((prev) => !prev);
  };

  const formSchema = z.object({
    name: z.string().min(2, {
      message: 'Name must be at least 2 characters.',
    }),
    description: z.string(),
  });
  

  const formFields:DialogFormField<test_collectionModel>[] = [
    {
      name: "name",
      label: "Name",
      placeholder:"Test collection name"
      
    },
    {
      name:"description",
      label:"Description",
      placeholder:"Test collection description",
      type:"textarea"
    }
  ]
  const submitHandler = async (values: z.infer<typeof formSchema>) => {
    await api('/test-collection',{method: 'POST', body: JSON.stringify({
        name: values.name,
        description: values.description,
        project_id: Number(params.id)
    })
    })
    //todo: add text styling inside toast
    toast.success(`Created ${values.name} inside ${testProject?.name}`);

  }

  // if(loading) return <PageLoader />;
  return (
    <Page title={testProject?.name}>
      {
        loading ? (
          <InlineLoader />
        ) : (
          <DialogCreate
            buttonText='New collection'
            dialogDescription='Create a new test collection'
            dialogTitle='New collection'
            formFields={formFields}
            formSchema={formSchema}
            onCreated={triggerRefresh}
            submitButtonText='Create'
            submitHandler={submitHandler}      />
        )
      }
    </Page>
  )
}
