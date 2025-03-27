import {MenuButtons} from "../../types/menuButtons.tsx";
import {useState} from "react";

interface MenuButtonProps {
    children: React.ReactNode;
    key: string | number;
    menuButtons?: MenuButtons;
    className?: string;
}


export const MenuButton = (props: MenuButtonProps) =>{
    const arrowDown = <svg className="-mr-1 size-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"
                           data-slot="icon">
        <path fill-rule="evenodd"
              d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
              clip-rule="evenodd"/>
    </svg>
    const [open, setOpen] = useState(false);

    //click on parent - remove hidden class from each child? useref?
    const explodeMenu = () =>{
        console.log(props.menuButtons)
        if(props.menuButtons){
            setOpen(!open);
        }
    }
    return(
        <li key={props.key}
                className={'cursor-pointer relative gap-1 w-full flex items-center p-1 min-h-10 hover:bg-black/5 rounded-md  justify-between ' +
                    ' before:absolute before:w-2 before:top-0 before:left-0 before:h-full before:rounded-4xl hover:before:bg-black/80 relative ' + props.className  }
                onClick={()=> explodeMenu()}>
            <div className={'relative flex justify-between w-full'}>
                🐥
                {props.children}
                {props.menuButtons && arrowDown}
            </div>

            {
                props.menuButtons &&
                props.menuButtons.length > 0 &&
                props.menuButtons.map((menuButton,index) => (
                    <ul className={'absolute w-full flex items-center p-1 min-h-0'}>

                        <MenuButton key={index + "" + props.key} className={open ? "bg-amber-100 translate-y-full translate-x-1/10" : "hidden "}>
                            {menuButton.button}
                        </MenuButton>
                    </ul>
                ))
            }
        </li>
    )

}