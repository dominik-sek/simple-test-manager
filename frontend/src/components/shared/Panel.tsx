import {PropsWithChildren} from "react";

export const Panel = ({children}: PropsWithChildren) =>{
    return(
        <div className={"border flex flex-col min-w-60 max-w-80 p-5 gap-10"}>
            {/*
            panel should be resizable
            */}
            {children}
        </div>
    )
}