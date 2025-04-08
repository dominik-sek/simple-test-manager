
import { SidebarItem } from './sidebar-items';
import { FaAngleDown } from "react-icons/fa6";
import { Link } from 'react-router';
import clsx from 'clsx';
import { jwtDecode } from 'jwt-decode';

interface SidebarButtonProps extends SidebarItem {
  isOpen: boolean;
  onClick: () => void;
}

export default function SidebarButton(props: SidebarButtonProps) {
  const localStorageToken = localStorage.getItem("token");
  const decoded = localStorageToken ? jwtDecode(localStorageToken) : null;
  const isValidRole = (decoded: any) => {
    
    if (!decoded) return false;
    if (!props.requiresRole) return true;
    if (!decoded.role) return false;
    console.log(decoded.role)
    return props.requiresRole ? props.requiresRole.includes(decoded.role) : true;
  };

  const hasChildren = !!props.children;
  const buttonClasses = clsx(`relative overflow-hidden
    h-12 w-full flex gap-3 p-2 rounded-md items-center font-bold text-slate-700
    cursor-pointer 
    hover:text-palette-green hover:bg-palette-green/20
    before:content-[""] before:absolute before:left-0 before:top-0
    before:h-full before:w-0 before:bg-palette-green before:rounded-r-md
    before:transition-all before:duration-200
    hover:before:w-1 ` + props.className + ' ' + (props.isOpen ? 'before:w-1  !bg-palette-green/20' : 'before:w-0'));

  const buttonContent = (
    <div
      className={clsx(buttonClasses, { 'hidden': !isValidRole(decoded) })}
      onClick={!hasChildren ? undefined : props.onClick}>

      <props.icon size={24} />
      <span className='text-sm font-bold  '>{props.label}</span>

    </div>
  );

  return (
    <div className='w-full'>
        <Link to={props.route} onClick={props.onClick}>
          {buttonContent}
        </Link>

    </div>
    )
}
