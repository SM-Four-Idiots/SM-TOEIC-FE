import { Outlet } from "react-router-dom";
import Header from "./components/layout/Header";

function App() {
    return (
        <>
            <Header />
            {/* children element */}
            <main>
                <Outlet />
            </main>
        </>
    );
}

export default App;
