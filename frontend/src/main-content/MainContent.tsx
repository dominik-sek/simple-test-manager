import {Navbar} from "../navbar/Navbar.tsx";

export const MainContent = () => {
    return(
        <div className={"w-full"}>
            <Navbar />
            <div className={"relative p-5 bg-blue-300"}>
                main content
            </div>
        </div>
    )
}