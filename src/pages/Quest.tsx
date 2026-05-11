import LinkButton from "@/components/common/button/LinkButton";

export default function Quests() {
    return (
        // 전체 배경색(연한 베이지) 및 기본 텍스트 색상 적용
        <div className="w-full min-h-screen bg-[#FCFAF6] text-[#1A1A1A] font-sans pb-20">
            <div className="max-w-2xl mx-auto px-6 pt-10 flex flex-col gap-6">
                {/* 헤더 섹션 */}
                <header className="flex flex-col gap-1">
                    <h1 className="text-2xl font-bold">퀘스트</h1>
                    <p className="text-sm text-gray-500">
                        퀘스트를 완료하고 XP를 획득하세요
                    </p>
                </header>

                {/* 오늘 획득 가능한 XP 카드 */}
                <section className="flex items-center justify-between bg-[#FFF8F3] border border-[#F0E5D5] rounded-2xl p-5 shadow-sm">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-[#FDECE0] rounded-full flex items-center justify-center text-[#D67629]">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                stroke="none"
                                className="w-6 h-6"
                            >
                                <path
                                    d="M11 21.883l-6.235-7.527-.765.844 7.527 6.235.844-.765-1.371-8.67h5.83l-6.235 7.527.765-.844-7.527-6.235-.844.765 1.371 8.67h-5.83z"
                                    display="none"
                                />
                                <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <div className="flex flex-col gap-0.5">
                            <p className="text-sm text-gray-600 font-medium">
                                오늘 획득 가능한 XP
                            </p>
                            <p className="text-lg font-bold text-[#D67629]">
                                20 / 100 XP
                            </p>
                        </div>
                    </div>
                    <div className="bg-[#EBE2D4] text-[#7A6A53] text-sm font-bold px-3 py-1.5 rounded-full">
                        +100 보너스
                    </div>
                </section>

                {/* 주간 챌린지 카드 */}
                <section className="bg-white border border-[#F0E5D5] rounded-2xl p-6 flex flex-col gap-5 shadow-sm">
                    <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-[#FFF8F3] rounded-full flex items-center justify-center text-[#D67629]">
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
                                    className="w-6 h-6"
                                >
                                    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
                                    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
                                    <path d="M4 22h16"></path>
                                    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
                                    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
                                    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
                                </svg>
                            </div>
                            <div className="flex flex-col gap-0.5">
                                <h2 className="font-bold text-lg">
                                    주간 챌린지
                                </h2>
                                <p className="text-sm text-gray-500">
                                    일일 퀘스트 7개 완료
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-1.5 bg-[#F5F1EB] text-gray-600 px-3 py-1.5 rounded-full text-xs font-semibold">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <circle cx="12" cy="12" r="10"></circle>
                                <polyline points="12 6 12 12 16 14"></polyline>
                            </svg>
                            2일 남음
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <div className="flex justify-between text-sm font-medium">
                            <span className="text-gray-600">진행도</span>
                            <span className="text-gray-800">5 / 7</span>
                        </div>
                        {/* 프로그레스 바 */}
                        <div className="w-full h-3 bg-[#F0E5D5] rounded-full overflow-hidden">
                            <div
                                className="h-full bg-[#D67629] rounded-full"
                                style={{ width: "71%" }}
                            ></div>
                        </div>
                        <div className="flex justify-between items-center mt-1">
                            <span className="font-bold text-[#D67629]">
                                🍯 꿀 +100XP
                            </span>
                            <span className="text-xs text-gray-400 font-medium">
                                2개 더 완료하세요
                            </span>
                        </div>
                    </div>
                </section>

                {/* 일일 퀘스트 헤더 */}
                <div className="flex justify-between items-end mt-4">
                    <h2 className="text-lg font-bold">일일 퀘스트</h2>
                    <span className="text-sm text-gray-500 font-medium">
                        1 / 3 완료
                    </span>
                </div>

                {/* 일일 퀘스트 리스트 컨테이너 */}
                <div className="flex flex-col gap-4">
                    {/* 퀘스트 1: 진행 중 */}
                    <section className="bg-white border border-[#F0E5D5] rounded-2xl p-5 flex items-center justify-between shadow-sm">
                        <div className="flex items-center gap-4 w-full">
                            <div className="w-12 h-12 bg-[#F1F8F4] text-[#34C759] rounded-xl flex items-center justify-center shrink-0">
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
                                    className="w-6 h-6 text-current"
                                >
                                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                                </svg>
                            </div>
                            <div className="flex flex-col gap-1 w-full mr-4">
                                <h3 className="font-bold text-[15px]">
                                    오늘의 단어 학습
                                </h3>
                                <p className="text-xs text-gray-500">
                                    10개의 단어를 학습하세요
                                </p>
                                <div className="w-full h-1.5 bg-[#F0E5D5] rounded-full overflow-hidden mt-1">
                                    <div
                                        className="h-full bg-[#D67629] rounded-full"
                                        style={{ width: "70%" }}
                                    ></div>
                                </div>
                                <p className="text-[10px] text-gray-400 mt-0.5">
                                    7 / 10
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col items-end gap-2 shrink-0">
                            <p className="text-sm font-bold text-[#D67629]">
                                🌾 황금밀 +30XP
                            </p>
                            <LinkButton
                                text="시작"
                                url="/"
                                className="px-5 py-1.5 text-sm h-8"
                            />
                        </div>
                    </section>

                    {/* 퀘스트 2: 완료됨 */}
                    <section className="bg-[#FAFAFA] border border-[#F0E5D5] rounded-2xl p-5 flex items-center justify-between shadow-sm opacity-80">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-[#E8F8EE] rounded-xl flex items-center justify-center shrink-0">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="#34C759"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="w-6 h-6"
                                >
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                            </div>
                            <div className="flex flex-col gap-1">
                                <div className="flex items-center gap-2">
                                    <h3 className="font-bold text-[15px]">
                                        워들 퀴즈
                                    </h3>
                                    <span className="text-[10px] bg-[#E8F8EE] text-[#34C759] px-1.5 py-0.5 rounded font-bold">
                                        완료
                                    </span>
                                </div>
                                <p className="text-xs text-gray-500">
                                    워들 게임에서 단어를 맞추세요
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col items-end shrink-0">
                            <p className="text-sm font-bold text-[#D67629]">
                                🧈 버터 +20XP
                            </p>
                        </div>
                    </section>

                    {/* 퀘스트 3: 시작 전 */}
                    <section className="bg-white border border-[#F0E5D5] rounded-2xl p-5 flex items-center justify-between shadow-sm">
                        <div className="flex items-center gap-4 w-full">
                            <div className="w-12 h-12 bg-[#F3F4F6] text-gray-500 rounded-xl flex items-center justify-center shrink-0">
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
                                    className="w-6 h-6"
                                >
                                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                </svg>
                            </div>
                            <div className="flex flex-col gap-1 w-full mr-4">
                                <h3 className="font-bold text-[15px]">
                                    단어 테스트
                                </h3>
                                <p className="text-xs text-gray-500">
                                    5문제 이상 맞추세요
                                </p>
                                <div className="w-full h-1.5 bg-[#F0E5D5] rounded-full overflow-hidden mt-1">
                                    <div
                                        className="h-full bg-[#D67629] rounded-full"
                                        style={{ width: "0%" }}
                                    ></div>
                                </div>
                                <p className="text-[10px] text-gray-400 mt-0.5">
                                    0 / 5
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col items-end gap-2 shrink-0">
                            <p className="text-sm font-bold text-[#D67629]">
                                🍓 딸기잼 +50XP
                            </p>
                            <LinkButton
                                text="시작"
                                url="/"
                                className="px-5 py-1.5 text-sm h-8"
                            />
                        </div>
                    </section>
                </div>

                {/* 추가 퀘스트 (잠금 상태) */}
                <div className="mt-4 flex flex-col gap-4">
                    <h2 className="text-sm font-bold text-gray-600">
                        추가 퀘스트
                    </h2>
                    <section className="bg-transparent border-2 border-dashed border-[#E5D5C5] rounded-2xl p-5 flex items-center justify-between opacity-60">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-[#F0E5D5] rounded-xl flex items-center justify-center shrink-0 text-gray-400">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <rect
                                        x="3"
                                        y="11"
                                        width="18"
                                        height="11"
                                        rx="2"
                                        ry="2"
                                    ></rect>
                                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                                </svg>
                            </div>
                            <div className="flex flex-col gap-0.5">
                                <h3 className="font-bold text-gray-500 text-[15px]">
                                    보너스 퀘스트
                                </h3>
                                <p className="text-xs text-gray-400">
                                    Silver 티어 도달 시 해금됩니다
                                </p>
                            </div>
                        </div>
                        <div>
                            <p className="text-sm font-bold text-gray-400">
                                ⚡ +??? XP
                            </p>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
