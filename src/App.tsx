import { Outlet, useLocation } from "react-router-dom";
import AdminSidebar from "./components/layout/AdminSidebar"; // AdminSidebar 경로를 실제 위치에 맞게 수정해주세요.
import Header from "./components/layout/Header";

function App() {
    const location = useLocation();

    // 현재 경로가 '/admin'으로 시작하는지 확인
    const isAdminRoute = location.pathname.startsWith("/admin");

    // 1. 관리자(Admin) 레이아웃: 좌측 사이드바 + 우측 메인 콘텐츠
    if (isAdminRoute) {
        return (
            <div className="flex min-h-screen bg-[#FCFAF6]">
                {/* 좌측 고정 사이드바 */}
                <AdminSidebar />

                {/* 우측 메인 콘텐츠 영역 */}
                {/* flex-1로 남은 공간을 모두 차지하게 하고, 내용이 길어지면 이 영역만 스크롤되도록 overflow-y-auto를 줍니다. */}
                <main className="flex flex-col flex-1 h-screen p-8 overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        );
    }

    // 2. 일반 사용자(User) 레이아웃: 상단 헤더 + 하단 메인 콘텐츠
    return (
        <div className="min-h-screen bg-[#FCFAF6]">
            <Header />
            <main className="flex flex-col h-[90vh]">
                <Outlet />
            </main>
        </div>
    );
}

export default App;
