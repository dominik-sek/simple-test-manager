import {MenuButtons} from "../../types/menuButtons.tsx";
import {useState} from "react";

interface MenuButtonProps {
    children: React.ReactNode;
    key: string | number;
    menuButtons?: MenuButtons;
    className?: string;
    icon?: string;
}

const arrowDown = () =>{
    return(
        <svg className="-mr-1 size-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"
             data-slot="icon">
            <path fill-rule="evenodd"
                  d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                  clip-rule="evenodd"/>
        </svg>
    )
}

export const MenuButton = (props: MenuButtonProps) =>{

    const [open, setOpen] = useState(false);

    //click on parent - remove hidden class from each child? useref?
    const explodeMenu = () =>{
        if(props.menuButtons){
            setOpen(!open);
        }
    }

    return(
       <li className={props.className + ' hover:bg-black/30 hover:cursor-pointer p-2 rounded-md '} onClick={explodeMenu}>
           <div className={" flex justify-between"}>
               <div>
               {props.icon} {props.children}
               </div>
               {props.menuButtons && arrowDown()}
           </div>

           {
               props.menuButtons &&
               <ul className={open ? " " : "hidden"}>
                   {
                       props.menuButtons.map((button)=>{
                           return (
                               <li>
                                   {button.button}
                               </li>
                           )
                       })
                   }
               </ul>
           }
       </li>
    )

}