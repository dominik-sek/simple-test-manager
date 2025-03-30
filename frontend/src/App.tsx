import {LeftPanel} from "./left-panel/LeftPanel.tsx";
import {MainContent} from "./main-content/MainContent.tsx";
import {RightPanel} from "./right-panel/RightPanel.tsx";
import {ScreenSizeWidget} from "./components/shared/ScreenSizeWidget.tsx";

export const App = () => {
    return (
        <div className={"flex h-screen flex-col"}>
            <div className={"flex h-full"}>
                <LeftPanel />
                <MainContent />
                <RightPanel />
            </div>
            <ScreenSizeWidget />
        </div>
    )
}

export default App;