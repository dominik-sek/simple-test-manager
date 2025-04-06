
import { SidebarItem } from './sidebar-items';
import { FaAngleDown } from "react-icons/fa6";
import { Link } from 'react-router';
import clsx from 'clsx';

interface SidebarButtonProps extends SidebarItem {
  isOpen: boolean;
  onClick: () => void;
}

export default function SidebarButton(props: SidebarButtonProps ) {


  const hasChildren = props.children ? true : false;
  const buttonClasses = clsx(`relative overflow-hidden
    h-12 w-full flex gap-3 p-2 rounded-md items-center font-bold text-slate-700
    cursor-pointer transition-all duration-200 ease-in-out
    hover:text-palette-green hover:bg-palette-green/20
    before:content-[""] before:absolute before:left-0 before:top-0
    before:h-full before:w-0 before:bg-palette-green before:rounded-r-md
    before:transition-all before:duration-200
    hover:before:w-1 ` + props.className + ' ' + (props.isOpen ? 'before:w-1 !text-palette-green !bg-palette-green/20' : 'before:w-0') )
  
  return (
    <div className='w-full'>
    <div
      className={buttonClasses}
      
      onClick={!hasChildren ? undefined : props.onClick}
    >
      <props.icon size={24} />
      
      <span className='text-sm font-bold  '>{props.label}</span>
      {
        hasChildren && (
          <span className={`absolute right-2 transition-all duration-200 ${props.isOpen ? 'rotate-180' : ''}`}>
            <FaAngleDown size={18} />
          </span>
        )
      }
        
        </div>


      {
        hasChildren && (
          props.children?.map((child, index) => (
            <div style={{maxHeight: props.isOpen ? '500px': '0px'}} className=' overflow-hidden transition-all duration-200 ease-in-out ' key={index}>
            <Link to={child.route} onClick={() => {}}>
              <SidebarButton 
                label={child.label}
                route={child.route}
                icon={child.icon}
                className='pl-6'
                requiresRole={child.requiresRole}
                children={child.children}
                isOpen={false}
                onClick={() => {}}

                />
              </Link>
              </div>
          ))
        )
      }

    </div>
  );
}
