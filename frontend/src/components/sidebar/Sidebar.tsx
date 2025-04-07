import { useEffect, useState } from 'react';
import { sidebarItems } from './sidebar-items';
import SidebarButton from './SidebarButton';
import { api } from '@/api/helper';
import { jwtDecode } from 'jwt-decode';


export function Sidebar() {
  const [open, setOpen] = useState<number | null>(null);

  const handleClick = (index: number) => {
    setOpen((prevOpen) => (prevOpen === index ? null : index));
  };
  const localStorageToken = localStorage.getItem("token");
  const decoded = localStorageToken ? jwtDecode(localStorageToken) : null;
  const userId = decoded?.sub;
  useEffect(() => {

    api(`/user/projects/${userId}`, { method: 'GET' })
      .then((res) => {
        console.log(res); // good for debugging
        return res;
      })
      .catch((err) => {
        console.error('Failed to get user projects:', err);
      });

  }, []);
  return (
    <div className='p-8 pt-5 w-72 shadow-md flex flex-col bg-white gap-10 fixed top-0 left-0 h-screen overflow-auto'>
      <div className='flex flex-col justify-between'>
        <div className='max-h-14'>
          <h1 className='text-3xl font-bold'>STM</h1>
          <h2 className='text-md font-semibold text-black/30'>Company name</h2>
        </div>

        <div className='flex flex-col py-10'>
          report a bug button
        </div>

        <nav className='mt-4'>
          <ul className='space-y-2'>
            {sidebarItems.map((item, index) => (
              <SidebarButton
                key={index}
                label={item.label}
                children={item.children}
                icon={item.icon}
                route={item.route}
                className={item.className}
                requiresRole={item.requiresRole}
                isOpen={index === open}
                onClick={() => handleClick(index)}

              />
            ))}

          </ul>
        </nav>

      </div>

      <div>
        shameless plug for the company
        <a href="https://www.stm.com" target="_blank" rel="noopener noreferrer" className='text-sm text-black/30 hover:text-palette-green'>STM</a>

      </div>
    </div>
  );
}
