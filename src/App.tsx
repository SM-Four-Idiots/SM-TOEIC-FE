import { Outlet } from "react-router-dom";
import Header from "./components/layout/Header";

function App() {
    return (
        <div className="min-h-screen bg-[#FCFAF6]">
            <Header />
            {/* children element */}
            <main className="flex flex-col">
                <Outlet />
            </main>
        </div>
    );
}

export default App;
