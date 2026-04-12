import { Link } from "react-router-dom";

export default function Header() {
    return (
        <header className="sticky top-0 z-50 w-full h-20 bg-white/80 backdrop-blur-md border-b border-[#EAEAEA]">
            <div className="flex items-center justify-between w-full h-full max-w-300 px-8 mx-auto">
                {/* 1. 좌측 로고 영역 */}
                <Link to="/" className="flex items-center gap-2 w-40">
                    <span className="text-2xl" aria-hidden="true">
                        🍞
                    </span>
                    <span className="text-xl font-bold text-[#1A1A1A] tracking-tight">
                        TOEST
                    </span>
                </Link>
                {/* 2. 중앙 네비게이션 영역 */}
                <nav className="flex items-center gap-2">
                    <Link
                        to="/"
                        className="flex items-center gap-1.5 px-4 py-2 rounded-[10px] font-medium transition-all duration-200 bg-[#D67629] text-white"
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
                            className="w-4 h-4"
                            aria-hidden="true"
                        >
                            <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
                            <path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                        </svg>
                        <span>홈</span>
                    </Link>
                    <Link
                        to="/words"
                        className="flex items-center gap-1.5 px-4 py-2 rounded-[10px] font-medium transition-all duration-200 text-[#8C8C8C] hover:text-[#1A1A1A] hover:bg-gray-50"
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
                            className="w-4 h-4"
                            aria-hidden="true"
                        >
                            <path d="M12 7v14"></path>
                            <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"></path>
                        </svg>
                        <span>단어장</span>
                    </Link>
                    <Link
                        to="/quests"
                        className="flex items-center gap-1.5 px-4 py-2 rounded-[10px] font-medium transition-all duration-200 text-[#8C8C8C] hover:text-[#1A1A1A] hover:bg-gray-50"
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
                            className="w-4 h-4"
                            aria-hidden="true"
                        >
                            <polyline points="14.5 17.5 3 6 3 3 6 3 17.5 14.5"></polyline>
                            <line x1="13" x2="19" y1="19" y2="13"></line>
                            <line x1="16" x2="20" y1="16" y2="20"></line>
                            <line x1="19" x2="21" y1="21" y2="19"></line>
                            <polyline points="14.5 6.5 18 3 21 3 21 6 17.5 9.5"></polyline>
                            <line x1="5" x2="9" y1="14" y2="18"></line>
                            <line x1="7" x2="4" y1="17" y2="20"></line>
                            <line x1="3" x2="5" y1="19" y2="21"></line>
                        </svg>
                        <span>퀘스트</span>
                    </Link>
                    <Link
                        to="/ranking"
                        className="flex items-center gap-1.5 px-4 py-2 rounded-[10px] font-medium transition-all duration-200 text-[#8C8C8C] hover:text-[#1A1A1A] hover:bg-gray-50"
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
                            className="w-4 h-4"
                            aria-hidden="true"
                        >
                            <path d="M10 14.66v1.626a2 2 0 0 1-.976 1.696A5 5 0 0 0 7 21.978"></path>
                            <path d="M14 14.66v1.626a2 2 0 0 0 .976 1.696A5 5 0 0 1 17 21.978"></path>
                            <path d="M18 9h1.5a1 1 0 0 0 0-5H18"></path>
                            <path d="M4 22h16"></path>
                            <path d="M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1z"></path>
                            <path d="M6 9H4.5a1 1 0 0 1 0-5H6"></path>
                        </svg>
                        <span>랭킹</span>
                    </Link>
                    <Link
                        to="/mypage"
                        className="flex items-center gap-1.5 px-4 py-2 rounded-[10px] font-medium transition-all duration-200 text-[#8C8C8C] hover:text-[#1A1A1A] hover:bg-gray-50"
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
                            className="w-4 h-4"
                            aria-hidden="true"
                        >
                            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                        <span>마이페이지</span>
                    </Link>
                </nav>
                {/* 3. 우측 로그아웃 영역 */}
                <div className="flex justify-end w-40">
                    <button className="flex items-center gap-1.5 text-sm font-medium text-[#8C8C8C] transition-colors hover:text-[#1A1A1A]">
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
                            className="w-4 h-4"
                        >
                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                            <polyline points="16 17 21 12 16 7"></polyline>
                            <line x1="21" x2="9" y1="12" y2="12"></line>
                        </svg>
                        <span>로그아웃</span>
                    </button>
                </div>
            </div>
        </header>
    );
}
