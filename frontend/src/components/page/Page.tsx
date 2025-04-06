import Navbar from '@/components/navbar/Navbar';
import { Sidebar } from '@/components/sidebar/Sidebar';
import Breadcrumbs from './Breadcrumbs';

interface PageProps {
  children: React.ReactNode;
  title: string;
}

export default function Page(props: PageProps) {
  return (

    <div className='flex flex-row w-full h-screen bg-slate-200'>
      <Sidebar />

      <div className="w-full bg-slate-200 flex flex-col relative ml-72">
        <Navbar />

        <div className='pt-14 px-14 gap-4 flex flex-col'>

          <Breadcrumbs />

          <h1 className='text-3xl font-bold text-slate-700'>{props.title}</h1>
          
          <div className='flex flex-wrap gap-10 pb-10 '>
          {props.children}
          </div>
          
        </div>

      </div>

    </div>

  );
}
