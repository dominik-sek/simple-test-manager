import {ScreenSizeWidget} from "./utility/ScreenSizeWidget.tsx";

export const App = () => {
    return (
        <div className={"flex h-screen flex-col"}>
            <ScreenSizeWidget />
        </div>
    )
}

export default App;