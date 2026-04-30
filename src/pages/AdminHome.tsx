export default function AdminHome() {
    return (
        // 전체 배경색 설정 (이미지와 유사한 따뜻한 톤의 밝은 배경)
        <div className="w-full min-h-screen bg-[#FDFCF9] p-8 flex flex-col gap-8 font-sans text-gray-900">
            {/* 1. 헤더 영역 */}
            <section className="flex flex-col gap-1">
                <h1 className="text-2xl font-bold">대시보드</h1>
                <p className="text-sm text-gray-500">
                    TOEST 서비스 현황을 확인하세요
                </p>
            </section>

            {/* 2. 상단 요약 카드 영역 (Grid 사용) */}
            <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                {/* 총 사용자 */}
                <article className="flex flex-col bg-white p-6 rounded-2xl border border-gray-100 shadow-sm gap-4">
                    <div className="flex justify-between items-center text-sm font-semibold text-gray-600">
                        <span>총 사용자</span>
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
                            className="lucide lucide-users w-5 h-5 text-gray-400"
                            aria-hidden="true"
                        >
                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                            <path d="M16 3.128a4 4 0 0 1 0 7.744"></path>
                            <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                            <circle cx="9" cy="7" r="4"></circle>
                        </svg>
                    </div>
                    <div className="flex flex-col gap-1">
                        <h2 className="text-3xl font-bold">1,234</h2>
                        <div className="flex items-center gap-1.5 text-sm">
                            <span className="text-emerald-500 font-medium">
                                +12%
                            </span>
                            <span className="text-gray-400">지난 달 대비</span>
                        </div>
                    </div>
                </article>

                {/* 등록된 단어 */}
                <article className="flex flex-col bg-white p-6 rounded-2xl border border-gray-100 shadow-sm gap-4">
                    <div className="flex justify-between items-center text-sm font-semibold text-gray-600">
                        <span>등록된 단어</span>
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
                            className="lucide lucide-book-open w-5 h-5 text-gray-400"
                            aria-hidden="true"
                        >
                            <path d="M12 7v14"></path>
                            <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"></path>
                        </svg>
                    </div>
                    <div className="flex flex-col gap-1">
                        <h2 className="text-3xl font-bold">500</h2>
                        <div className="flex items-center gap-1.5 text-sm">
                            <span className="text-emerald-500 font-medium">
                                +50
                            </span>
                            <span className="text-gray-400">이번 주 추가</span>
                        </div>
                    </div>
                </article>

                {/* 일일 활성 사용자 */}
                <article className="flex flex-col bg-white p-6 rounded-2xl border border-gray-100 shadow-sm gap-4">
                    <div className="flex justify-between items-center text-sm font-semibold text-gray-600">
                        <span>일일 활성 사용자</span>
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
                            className="lucide lucide-trending-up w-5 h-5 text-gray-400"
                            aria-hidden="true"
                        >
                            <path d="M16 7h6v6"></path>
                            <path d="m22 7-8.5 8.5-5-5L2 17"></path>
                        </svg>
                    </div>
                    <div className="flex flex-col gap-1">
                        <h2 className="text-3xl font-bold">342</h2>
                        <div className="flex items-center gap-1.5 text-sm">
                            <span className="text-emerald-500 font-medium">
                                +8%
                            </span>
                            <span className="text-gray-400">지난 주 대비</span>
                        </div>
                    </div>
                </article>

                {/* 평균 퀘스트 완료율 */}
                <article className="flex flex-col bg-white p-6 rounded-2xl border border-gray-100 shadow-sm gap-4">
                    <div className="flex justify-between items-center text-sm font-semibold text-gray-600">
                        <span>평균 퀘스트 완료율</span>
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
                            className="lucide lucide-trophy w-5 h-5 text-gray-400"
                            aria-hidden="true"
                        >
                            <path d="M10 14.66v1.626a2 2 0 0 1-.976 1.696A5 5 0 0 0 7 21.978"></path>
                            <path d="M14 14.66v1.626a2 2 0 0 0 .976 1.696A5 5 0 0 1 17 21.978"></path>
                            <path d="M18 9h1.5a1 1 0 0 0 0-5H18"></path>
                            <path d="M4 22h16"></path>
                            <path d="M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1z"></path>
                            <path d="M6 9H4.5a1 1 0 0 1 0-5H6"></path>
                        </svg>
                    </div>
                    <div className="flex flex-col gap-1">
                        <h2 className="text-3xl font-bold">67%</h2>
                        <div className="flex items-center gap-1.5 text-sm">
                            <span className="text-emerald-500 font-medium">
                                +5%
                            </span>
                            <span className="text-gray-400">목표: 70%</span>
                        </div>
                    </div>
                </article>
            </section>

            {/* 3. 하단 상세 데이터 영역 (Grid로 좌우 배치) */}
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* 좌측: 티어 분포 */}
                <article className="flex flex-col bg-white p-6 rounded-2xl border border-gray-100 shadow-sm gap-8">
                    <div className="flex flex-col gap-1">
                        <h3 className="text-lg font-bold">티어 분포</h3>
                        <p className="text-sm text-gray-500">
                            사용자 티어별 분포 현황
                        </p>
                    </div>
                    <div className="flex flex-col gap-5">
                        {/* Bronze */}
                        <div className="flex flex-col gap-2">
                            <div className="flex justify-between items-center text-sm">
                                <span className="font-semibold">Bronze</span>
                                <span className="text-gray-500">
                                    567명 (46%)
                                </span>
                            </div>
                            <div className="w-full bg-[#f4ebd9] rounded-full h-2">
                                <div
                                    className="bg-orange-500 h-2 rounded-full"
                                    style={{ width: "46%" }}
                                ></div>
                            </div>
                        </div>
                        {/* Silver */}
                        <div className="flex flex-col gap-2">
                            <div className="flex justify-between items-center text-sm">
                                <span className="font-semibold">Silver</span>
                                <span className="text-gray-500">
                                    423명 (34%)
                                </span>
                            </div>
                            <div className="w-full bg-[#f4ebd9] rounded-full h-2">
                                <div
                                    className="bg-slate-400 h-2 rounded-full"
                                    style={{ width: "34%" }}
                                ></div>
                            </div>
                        </div>
                        {/* Gold */}
                        <div className="flex flex-col gap-2">
                            <div className="flex justify-between items-center text-sm">
                                <span className="font-semibold">Gold</span>
                                <span className="text-gray-500">
                                    189명 (15%)
                                </span>
                            </div>
                            <div className="w-full bg-[#f4ebd9] rounded-full h-2">
                                <div
                                    className="bg-yellow-400 h-2 rounded-full"
                                    style={{ width: "15%" }}
                                ></div>
                            </div>
                        </div>
                        {/* Diamond */}
                        <div className="flex flex-col gap-2">
                            <div className="flex justify-between items-center text-sm">
                                <span className="font-semibold">Diamond</span>
                                <span className="text-gray-500">55명 (5%)</span>
                            </div>
                            <div className="w-full bg-[#f4ebd9] rounded-full h-2">
                                <div
                                    className="bg-cyan-400 h-2 rounded-full"
                                    style={{ width: "5%" }}
                                ></div>
                            </div>
                        </div>
                    </div>
                </article>

                {/* 우측: 최근 활동 (더미 교체) */}
                <article className="flex flex-col bg-white p-6 rounded-2xl border border-gray-100 shadow-sm gap-8">
                    <div className="flex flex-col gap-1">
                        <h3 className="text-lg font-bold">최근 활동</h3>
                        <p className="text-sm text-gray-500">
                            서비스 내 최근 활동 로그
                        </p>
                    </div>

                    <div className="flex flex-col gap-6">
                        {/* 리스트 아이템 1 */}
                        <div className="flex gap-4 items-start">
                            <div className="w-2 h-2 rounded-full bg-orange-500 mt-1.5 shrink-0"></div>
                            <div className="flex flex-col flex-1 gap-0.5">
                                <div className="flex justify-between w-full">
                                    <span className="font-semibold text-sm">
                                        새 단어 추가
                                    </span>
                                    <span className="text-xs text-gray-400">
                                        10분 전
                                    </span>
                                </div>
                                <span className="text-sm text-gray-500">
                                    accomplish, acknowledge 외 8개
                                </span>
                            </div>
                        </div>

                        {/* 리스트 아이템 2 */}
                        <div className="flex gap-4 items-start">
                            <div className="w-2 h-2 rounded-full bg-orange-500 mt-1.5 shrink-0"></div>
                            <div className="flex flex-col flex-1 gap-0.5">
                                <div className="flex justify-between w-full">
                                    <span className="font-semibold text-sm">
                                        사용자 티어 승급
                                    </span>
                                    <span className="text-xs text-gray-400">
                                        25분 전
                                    </span>
                                </div>
                                <span className="text-sm text-gray-500">
                                    토스트마스터 → Silver
                                </span>
                            </div>
                        </div>

                        {/* 리스트 아이템 3 */}
                        <div className="flex gap-4 items-start">
                            <div className="w-2 h-2 rounded-full bg-orange-500 mt-1.5 shrink-0"></div>
                            <div className="flex flex-col flex-1 gap-0.5">
                                <div className="flex justify-between w-full">
                                    <span className="font-semibold text-sm">
                                        단어 수정
                                    </span>
                                    <span className="text-xs text-gray-400">
                                        1시간 전
                                    </span>
                                </div>
                                <span className="text-sm text-gray-500">
                                    adequate 뜻 수정
                                </span>
                            </div>
                        </div>

                        {/* 리스트 아이템 4 */}
                        <div className="flex gap-4 items-start">
                            <div className="w-2 h-2 rounded-full bg-orange-500 mt-1.5 shrink-0"></div>
                            <div className="flex flex-col flex-1 gap-0.5">
                                <div className="flex justify-between w-full">
                                    <span className="font-semibold text-sm">
                                        신규 가입
                                    </span>
                                    <span className="text-xs text-gray-400">
                                        2시간 전
                                    </span>
                                </div>
                                <span className="text-sm text-gray-500">
                                    뉴비123
                                </span>
                            </div>
                        </div>

                        {/* 리스트 아이템 5 */}
                        <div className="flex gap-4 items-start">
                            <div className="w-2 h-2 rounded-full bg-orange-500 mt-1.5 shrink-0"></div>
                            <div className="flex flex-col flex-1 gap-0.5">
                                <div className="flex justify-between w-full">
                                    <span className="font-semibold text-sm">
                                        주간 퀘스트 완료
                                    </span>
                                    <span className="text-xs text-gray-400">
                                        3시간 전
                                    </span>
                                </div>
                                <span className="text-sm text-gray-500">
                                    빵왕
                                </span>
                            </div>
                        </div>
                    </div>
                </article>
            </section>
        </div>
    );
}
