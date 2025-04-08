import { api } from '@/api/helper';
import DataTable from '@/components/data-table/DataTable';
import Page from '@/components/page/Page';
import { useEffect, useState } from 'react';

export default function TestCases() {
  const [testCases, setTestCases] = useState<any>(null);

  useEffect(() => {
    api('/test-case', { method: 'GET' })
      .then((res) => {
        setTestCases(res);
      })
      .catch((err) => {
        console.error('Failed to fetch test cases:', err);
      });
  }, []);

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
    {
      key: 'status',
      label: 'Status'
    },
    {
      key: 'parameters',
      label: 'Parameters'
    }
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



  return (
    <Page title={'Test Cases'}>
      <DataTable columns={columns} data={testCases} actions={actions} />
    </Page>
  )
}
