import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/layout/Header";

function App() {
    const location = useLocation();

    // 현재 경로가 '/admin'으로 시작하는지 확인
    const isAdminRoute = location.pathname.startsWith("/admin");

    return (
        <div className="min-h-screen bg-[#FCFAF6]">
            {/* 어드민 라우트가 아닐 때만 Header 렌더링 */}
            {!isAdminRoute && <Header />}

            <main className="flex flex-col h-[90vh]">
                <Outlet />
            </main>
        </div>
    );
}

export default App;
