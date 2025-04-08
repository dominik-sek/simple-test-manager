import { api } from '@/api/helper';
import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';
import { Link } from 'react-router';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuthSelector } from '@/store/hooks';


interface ProfileProps {
  isOpen: boolean;
  onClick: () => void;
}
export default function Profile(props: ProfileProps) {

  const [user, setUser] = useState<any>(null);

  const userFullName = useAuthSelector((state) => state.auth.user?.full_name)
  
  const userLetters = userFullName?.split(' ').map((name: string) => name.charAt(0).toUpperCase()).join('');
  

  return (
    <div className='flex items-center justify-end gap-5 min-w-48'>
    <button onClick={props.onClick} className='h-10 w-10 rounded-full flex items-center justify-center bg-palette-green/20 transition-all duration-200 ease-in-out'>
        <span className='text-sm text-slate-700 font-bold'>{userLetters}</span>
      </button>
      
      <div className='absolute right-15 top-14 w-48 bg-white shadow-md rounded-md p-2 flex flex-col gap-2 transition-all duration-200 ease-in-out' style={{ display: props.isOpen ? 'block' : 'none' }}>
        <ul className='flex flex-col gap-2'>
          <li className='text-slate-700 font-bold text-sm'>{user?.full_name}</li>
          <li className='text-slate-500 text-sm'>{user?.email}</li>
          </ul>
        <div className='h-[1px] w-full bg-slate-300 my-2'></div>

        <ul className='flex flex-col gap-2'>

          <li className=''>
            <Link className='text-slate-700  w-full h-8 flex items-center font-bold text-sm hover:text-palette-green hover:bg-palette-green/20 cursor-pointer' to='/logout'>
            Logout
            </Link>
          </li>
        </ul>
      </div>

  </div>
)
}
