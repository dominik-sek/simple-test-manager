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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { useAuthSelector } from '@/store/hooks';


interface ProfileProps {
  isOpen: boolean;
  onClick: () => void;
}
export default function Profile(props: ProfileProps) {
  const user:user = useAuthSelector((state) => state.auth.user)
  
  const userLetters = user.full_name?.split(' ').map((name: string) => name.charAt(0).toUpperCase()).join('');
  

  return (
    <div className='flex items-center justify-end gap-5 min-w-48'>



      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar className={'cursor-pointer h-10 w-10'}>
            <AvatarFallback>{userLetters}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuLabel>{user.email}</DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DropdownMenuItem className={'cursor-pointer hover:bg-palette-green/20!'}>
            <Link to={'/logout'} className={'w-full '}>
              Logout
            </Link>
          </DropdownMenuItem>

        </DropdownMenuContent>
      </DropdownMenu>


  </div>
)
}
