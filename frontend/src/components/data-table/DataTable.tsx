interface dataTableProps {
  columns: {
    [key: string]: string;
    label: string;
  }[]
  data: any[];
  actions: any[];
  //   onRowClick?: (row: any) => void;
  //   className?: string;
  //   style?: React.CSSProperties;
  //   striped?: boolean;
  //   bordered?: boolean;
  //   hoverable?: boolean;
  //   pagination?: boolean;
  //   pageSize?: number;
  //   onPageChange?: (page: number) => void;
  //   totalRecords?: number;
}
export default function DataTable(props: dataTableProps) {
  console.log(props.data); //array of objects
  return (
    <div className='flex flex-col gap-4 w-full'>
      <div className='flex flex-row items-center'>
        
        <p>mass actions select</p>
        <select>
          <option value="10">10</option>
        </select>

      </div>

      <table className='w-full bg-white shadow-md rounded-lg overflow-hidden'>
        <thead className='bg-palette-slate'>
          <tr>
            <th className='text-left p-2'>
              <input type="checkbox" className='w-4 h-4 ' />
            </th>
            {props.columns.map((column, index) => (
              <th key={index} className='text-left p-2'>{column.label}</th>
            ))}

            <th className='text-left p-2'>Actions</th>

          </tr>
        </thead>
        <tbody className='py-2'>
          {props.data && props.data.map((row, index) => (
            
            <tr key={index} className='hover:bg-palette-green/20'>
              <td className='p-2'>
                <input type="checkbox" className='w-4 h-4' />
              </td>
              {
                props.columns.map((column, index) => {
                  //if row is an object and column.key is a key in the object
                  if (typeof row[column.key] === 'object') {
                    return (
                      <td key={index} className='p-2'>
                        {JSON.stringify(row[column.key])}
                      </td>
                    )
                  }
                  //if row is an array and column.key is a key in the object
                  if (Array.isArray(row[column.key])) {
                    return (
                      <td key={index} className='p-2'>
                        {row[column.key].map((item: any, index: number) => (
                          <span key={index} className='block'>{item}</span>
                        ))}
                      </td>
                    )
                  }
                  
                  return (
                    <td key={index} className='p-2'>
                      {row[column.key]}
                    </td>
                  )
                })
              }
              <td className='p-2'>
                  {
                  props.actions.map((action, index) => (
                    
                    <button key={index} className='bg-palette-green text-white py-1 px-2 rounded-md hover:bg-palette-green/80 transition-all duration-200 ease-in-out'>
                      {action.label}
                    </button>
                  ))
                  }
              </td>
            </tr>
          ))}

        </tbody>
      </table>
    </div>
  );
}
