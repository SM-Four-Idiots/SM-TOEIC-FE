import { Link, useLocation } from "react-router-dom";

export default function AdminSidebar() {
    const location = useLocation();
    const pathname = location.pathname;

    // 메뉴 활성화 여부를 확인하는 함수
    // 대시보드는 정확히 '/admin'일 때만 활성화, 나머지는 하위 경로 포함 시 활성화
    const isActive = (path: string) => {
        if (path === "/admin") return pathname === "/admin";
        return pathname.startsWith(path);
    };

    // 공통 스타일과 활성화 여부에 따른 스타일 분리
    const baseLinkClass =
        "flex items-center gap-3 px-4 py-3 font-medium transition-colors rounded-lg cursor-pointer";
    const activeClass = "text-white bg-[#DF7324]";
    const inactiveClass = "text-gray-600 hover:bg-gray-100 hover:text-gray-900";

    return (
        <aside className="flex flex-col justify-between w-64 h-screen bg-white border-r border-gray-200">
            <div>
                {/* 헤더 영역 */}
                <div className="p-6">
                    <h1 className="flex items-center gap-2 text-xl font-bold text-gray-800">
                        🍞 TOEST Admin
                    </h1>
                </div>

                {/* 메뉴 목록 영역 */}
                <nav className="px-4">
                    <ul className="flex flex-col gap-2">
                        {/* 대시보드 */}
                        <li>
                            <Link
                                to="/admin"
                                className={`${baseLinkClass} ${isActive("/admin") ? activeClass : inactiveClass}`}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="w-5 h-5 lucide lucide-layout-dashboard"
                                    aria-hidden="true"
                                >
                                    <rect
                                        width="7"
                                        height="9"
                                        x="3"
                                        y="3"
                                        rx="1"
                                    ></rect>
                                    <rect
                                        width="7"
                                        height="5"
                                        x="14"
                                        y="3"
                                        rx="1"
                                    ></rect>
                                    <rect
                                        width="7"
                                        height="9"
                                        x="14"
                                        y="12"
                                        rx="1"
                                    ></rect>
                                    <rect
                                        width="7"
                                        height="5"
                                        x="3"
                                        y="16"
                                        rx="1"
                                    ></rect>
                                </svg>
                                <span>대시보드</span>
                            </Link>
                        </li>

                        {/* 단어 관리 */}
                        <li>
                            <Link
                                to="/admin/words"
                                className={`${baseLinkClass} ${isActive("/admin/words") ? activeClass : inactiveClass}`}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="w-5 h-5 lucide lucide-book-open"
                                    aria-hidden="true"
                                >
                                    <path d="M12 7v14"></path>
                                    <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"></path>
                                </svg>
                                <span>단어 관리</span>
                            </Link>
                        </li>

                        {/* 사용자 관리 */}
                        <li>
                            <Link
                                to="/admin/users"
                                className={`${baseLinkClass} ${isActive("/admin/users") ? activeClass : inactiveClass}`}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="w-5 h-5 lucide lucide-users"
                                    aria-hidden="true"
                                >
                                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                                    <path d="M16 3.128a4 4 0 0 1 0 7.744"></path>
                                    <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                                    <circle cx="9" cy="7" r="4"></circle>
                                </svg>
                                <span>사용자 관리</span>
                            </Link>
                        </li>

                        {/* 설정 */}
                        <li>
                            <Link
                                to="/admin/settings"
                                className={`${baseLinkClass} ${isActive("/admin/settings") ? activeClass : inactiveClass}`}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="w-5 h-5 lucide lucide-settings"
                                    aria-hidden="true"
                                >
                                    <path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"></path>
                                    <circle cx="12" cy="12" r="3"></circle>
                                </svg>
                                <span>설정</span>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>

            {/* 하단 로그아웃 영역 */}
            <div className="p-4 border-t border-gray-200">
                <button className="flex items-center w-full gap-3 px-4 py-3 font-medium text-gray-600 transition-colors rounded-lg hover:bg-gray-100 hover:text-gray-900">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-5 h-5 lucide lucide-log-out"
                    >
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                        <polyline points="16 17 21 12 16 7"></polyline>
                        <line x1="21" x2="9" y1="12" y2="12"></line>
                    </svg>
                    <span>로그아웃</span>
                </button>
            </div>
        </aside>
    );
}
