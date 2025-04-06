
import { SidebarItem } from './sidebar-items';
import { FaAngleDown } from "react-icons/fa6";
import { Link } from 'react-router';
import clsx from 'clsx';

interface SidebarButtonProps extends SidebarItem {
  isOpen: boolean;
  onClick: () => void;
}

export default function SidebarButton(props: SidebarButtonProps) {

  const hasChildren = props.children ? true : false;
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
      className={buttonClasses}
      onClick={!hasChildren ? undefined : props.onClick}>

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
  );

  return (
    <div className='w-full'>

      {!hasChildren ? (
        <Link to={props.route} onClick={props.onClick}>
          {buttonContent}
        </Link>

      ) : (
        <>
          {buttonContent}
          <div className={clsx('overflow-hidden transition-all duration-200 ease-in-out', props.isOpen ? 'max-h-96 ' : 'max-h-0 ')} >
            {
              props.children?.map((child, index) => (
                  <SidebarButton
                    label={child.label}
                    route={child.route}
                    icon={child.icon}
                    className='pl-6 mt-2'
                    requiresRole={child.requiresRole}
                    children={child.children}
                    isOpen={false}
                    onClick={() => { }}
                    key={index + child.label + child.route} // Ensure unique key
                  />
              )
              )
            }
          </div>

        </>
      )
      }
    </div>
  );

}
