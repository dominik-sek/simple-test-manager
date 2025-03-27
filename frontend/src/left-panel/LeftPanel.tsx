import {Panel} from "../components/shared/Panel.tsx";
import {MenuButton} from "../components/shared/MenuButton.tsx";
import {User} from "./User.tsx";
import {useState} from "react";
import {MenuButtons} from "../types/menuButtons.tsx";

export const LeftPanel = () =>{
    const [menuButtons, setMenuButtons] = useState<MenuButtons>
    ([
        {
            button: "menu",
            icon: ""
        },
        {
            button: "search",
            icon: ""
        },
        {
            button: "projects",
            children:[
                {
                    button: "project1",
                    icon: ""
                }
            ],
            icon: ""
        },
        {
            button: "suites",
            icon: ""
        },
        {
            button: "cases",
            icon: ""
        },
    ])


    return(
        <Panel>
            <User />

            {/*<Shortcuts>*/}
            {/*    */}
            {/*</Shortcuts>*/}

            <ul className={'flex flex-col gap-1'}>
                <span className={"text-zinc-400 cursor-default"}>Dashboard</span>
                {
                    menuButtons.map((button, idx)=>{
                        return <MenuButton key={idx} menuButtons={button.children}>{button.button}</MenuButton>
                    })
                }
            </ul>
        </Panel>
    )
}