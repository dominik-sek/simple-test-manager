import {LeftPanel} from "./left-panel/LeftPanel.tsx";
import {MainContent} from "./main-content/MainContent.tsx";
import {RightPanel} from "./right-panel/RightPanel.tsx";

export const App = () => {
    return (
        <div className={"flex h-screen flex-col"}>
            <div className={"flex h-full"}>
                <LeftPanel />
                <MainContent />
                <RightPanel />
            </div>
        </div>
    )
}

export default App;