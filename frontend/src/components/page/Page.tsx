import Navbar from '@/components/navbar/Navbar';
import { Sidebar } from '@/components/sidebar/Sidebar';
import Breadcrumbs from './Breadcrumbs';
import { ReactNode } from 'react';
import { Toaster } from 'sonner';

interface PageProps {
  children: ReactNode;
  title: string;
  className?: string;
  actionBar?: ReactNode
}



export default function Page(props: PageProps) {
  return (

    <div className='flex flex-row w-full h-screen  '>
      <Toaster richColors  />

      <Sidebar />

      <div className="w-full flex flex-col relative ml-72 flex-1 ">
        <Navbar />

        <div className='py-14 px-14 gap-4 flex flex-col bg-slate-200 flex-1'>

          <Breadcrumbs />

          <div className={'flex items-center justify-between'}>
            <h1 className='text-3xl font-bold text-slate-700'>{props.title}</h1>
            {props.actionBar}
          </div>

          <div className='flex-1'>
          {props.children}
          </div>
          
        </div>

      </div>

    </div>

  );
}
