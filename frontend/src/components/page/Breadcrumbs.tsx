import { useLocation } from 'react-router'

export default function Breadcrumbs() {
  //create new hook that gets the current location in title format
  const location = useLocation();
  const path = location.pathname.split('/').filter(Boolean);
  console.log(path)
  return (
    <div className='flex items-center gap-2 text-slate-500 text-sm font-bold'>
    <span className='text-palette-green'>asd</span>
    <span>/</span>
    <span>Page</span>
    
  </div>
  )
}
