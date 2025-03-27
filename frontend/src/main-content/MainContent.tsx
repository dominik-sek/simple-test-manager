import {Navbar} from "../navbar/Navbar.tsx";
import DataPanel from "../components/shared/DataPanel.tsx";

export const MainContent = () => {
    return(
        <div className={"w-full"}>
            <Navbar />
            <div className={"relative p-5 bg-blue-300"}>
                <DataPanel />
            </div>
        </div>
    )
}