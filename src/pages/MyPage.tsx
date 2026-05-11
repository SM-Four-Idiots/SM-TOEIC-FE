import { Link } from "react-router-dom";

export default function MyPage() {
    return (
        <div className="min-h-screen flex flex-col items-center py-10 text-gray-800 font-sans">
            <div className="w-full max-w-3xl flex flex-col gap-6 px-4">
                {/* 헤더 섹션 */}
                <section className="flex flex-col mb-2">
                    <h1 className="text-2xl font-bold mb-1">마이페이지</h1>
                    <p className="text-gray-500 text-sm">
                        내 토스트 현황을 확인하세요
                    </p>
                </section>

                {/* 1. 프로필 카드 */}
                <section className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-[#8FB0C6] rounded-2xl flex items-center justify-center text-3xl">
                            <span>🥪</span>
                        </div>
                        <span className="flex flex-col">
                            <p className="text-xl font-bold">토스트마스터</p>
                            <p className="text-gray-500 text-sm">
                                toast@example.com
                            </p>
                        </span>
                    </div>
                    <span className="flex flex-col items-center bg-[#F8F9FA] px-6 py-3 rounded-2xl">
                        <p className="text-xl font-bold">Silver</p>
                        <p className="text-gray-400 text-xs">Tier</p>
                    </span>
                </section>

                {/* 2. 경험치 현황 카드 */}
                <section className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-1 font-bold text-gray-800">
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
                                className="text-orange-500"
                                aria-hidden="true"
                            >
                                <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"></path>
                            </svg>
                            <span>경험치 현황</span>
                        </div>
                        <p className="text-gray-500 text-sm ml-6">
                            20,000 XP 달성 시 Gold 승급
                        </p>
                    </div>

                    <div className="flex flex-col gap-2 mt-2">
                        <div className="flex justify-between text-sm font-bold text-gray-700">
                            <span>Silver</span>
                            <span className="text-gray-400">Gold</span>
                        </div>

                        {/* 프로그레스 바 구현 */}
                        <div className="w-full h-3.5 bg-orange-100 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-[#E57A2B] rounded-full"
                                style={{ width: "64.25%" }}
                            ></div>
                        </div>

                        <div className="flex justify-between items-center text-sm mt-1">
                            <span className="flex items-center gap-1 text-[#E57A2B] font-bold">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    aria-hidden="true"
                                >
                                    <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"></path>
                                </svg>
                                <span>12,850 XP</span>
                            </span>
                            <span className="text-gray-500">7,150 XP 남음</span>
                        </div>
                    </div>
                </section>

                {/* 3. 최근 XP 획득 카드 */}
                <section className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col gap-4">
                    <h2 className="font-bold text-lg">최근 XP 획득</h2>

                    <div className="flex flex-col gap-3">
                        {/* 획득 내역 아이템 - 오늘 */}
                        <article className="flex flex-col bg-[#FDFCF8] rounded-2xl p-5 gap-3">
                            <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                                <span className="font-bold">오늘</span>
                                <span className="flex items-center gap-1 text-[#E57A2B] font-bold">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        aria-hidden="true"
                                    >
                                        <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"></path>
                                    </svg>
                                    <span>총 +100XP</span>
                                </span>
                            </div>
                            <div className="flex gap-4 text-sm text-gray-600 font-medium">
                                <span className="flex items-center gap-1">
                                    <span>🌾</span>황금밀{" "}
                                    <span className="text-[#E57A2B]">
                                        +30XP
                                    </span>
                                </span>
                                <span className="flex items-center gap-1">
                                    <span>🧈</span>버터{" "}
                                    <span className="text-[#E57A2B]">
                                        +20XP
                                    </span>
                                </span>
                                <span className="flex items-center gap-1">
                                    <span>🍓</span>딸기잼{" "}
                                    <span className="text-[#E57A2B]">
                                        +50XP
                                    </span>
                                </span>
                            </div>
                        </article>

                        {/* 획득 내역 아이템 - 어제 */}
                        <article className="flex flex-col bg-[#FDFCF8] rounded-2xl p-5 gap-3">
                            <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                                <span className="font-bold">어제</span>
                                <span className="flex items-center gap-1 text-[#E57A2B] font-bold">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        aria-hidden="true"
                                    >
                                        <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"></path>
                                    </svg>
                                    <span>총 +130XP</span>
                                </span>
                            </div>
                            <div className="flex gap-4 text-sm text-gray-600 font-medium">
                                <span className="flex items-center gap-1">
                                    <span>🌾</span>황금밀{" "}
                                    <span className="text-[#E57A2B]">
                                        +30XP
                                    </span>
                                </span>
                                <span className="flex items-center gap-1">
                                    <span>🍯</span>꿀{" "}
                                    <span className="text-[#E57A2B]">
                                        +100XP
                                    </span>
                                </span>
                            </div>
                        </article>

                        {/* 획득 내역 아이템 - 2일 전 */}
                        <article className="flex flex-col bg-[#FDFCF8] rounded-2xl p-5 gap-3">
                            <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                                <span className="font-bold">2일 전</span>
                                <span className="flex items-center gap-1 text-[#E57A2B] font-bold">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        aria-hidden="true"
                                    >
                                        <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"></path>
                                    </svg>
                                    <span>총 +70XP</span>
                                </span>
                            </div>
                            <div className="flex gap-4 text-sm text-gray-600 font-medium">
                                <span className="flex items-center gap-1">
                                    <span>🧈</span>버터{" "}
                                    <span className="text-[#E57A2B]">
                                        +20XP
                                    </span>
                                </span>
                                <span className="flex items-center gap-1">
                                    <span>🧀</span>치즈{" "}
                                    <span className="text-[#E57A2B]">
                                        +50XP
                                    </span>
                                </span>
                            </div>
                        </article>
                    </div>
                </section>

                {/* 4. 통계 그리드 섹션 */}
                <section className="grid grid-cols-2 gap-4">
                    <article className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 flex items-center gap-4">
                        <div className="bg-orange-50 p-3 rounded-2xl text-orange-500">
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
                                aria-hidden="true"
                            >
                                <path d="M12 3q1 4 4 6.5t3 5.5a1 1 0 0 1-14 0 5 5 0 0 1 1-3 1 1 0 0 0 5 0c0-2-1.5-3-1.5-5q0-2 2.5-4"></path>
                            </svg>
                        </div>
                        <span className="flex flex-col">
                            <h3 className="text-xl font-bold">12일</h3>
                            <p className="text-gray-400 text-xs mt-1">
                                최대 연속 학습
                            </p>
                        </span>
                    </article>

                    <article className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 flex items-center gap-4">
                        <div className="bg-blue-50 p-3 rounded-2xl text-blue-500">
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
                                aria-hidden="true"
                            >
                                <path d="M12 7v14"></path>
                                <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"></path>
                            </svg>
                        </div>
                        <span className="flex flex-col">
                            <h3 className="text-xl font-bold">127개</h3>
                            <p className="text-gray-400 text-xs mt-1">
                                지금까지 학습한 단어
                            </p>
                        </span>
                    </article>

                    <article className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 flex items-center gap-4">
                        <div className="bg-green-50 p-3 rounded-2xl text-green-500">
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
                        <span className="flex flex-col">
                            <h3 className="text-xl font-bold">89개</h3>
                            <p className="text-gray-400 text-xs mt-1">
                                지금까지 완료한 일일 퀘스트
                            </p>
                        </span>
                    </article>

                    <article className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 flex items-center gap-4">
                        <div className="bg-purple-50 p-3 rounded-2xl text-purple-500">
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
                        <span className="flex flex-col">
                            <h3 className="text-xl font-bold">12개</h3>
                            <p className="text-gray-400 text-xs mt-1">
                                지금까지 완료한 주간 퀘스트
                            </p>
                        </span>
                    </article>
                </section>

                {/* 5. 하단 링크 섹션 */}
                <section className="bg-white rounded-3xl shadow-sm border border-gray-100 flex flex-col divide-y divide-gray-100 overflow-hidden">
                    <Link
                        to="/"
                        className="flex justify-between items-center p-5 font-bold hover:bg-gray-50 transition-colors"
                    >
                        <span>내 북마크 단어</span>
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
                            className="text-gray-400"
                        >
                            <path d="m9 18 6-6-6-6" />
                        </svg>
                    </Link>
                    <Link
                        to="/"
                        className="flex justify-between items-center p-5 font-bold hover:bg-gray-50 transition-colors"
                    >
                        <span>랭킹 확인</span>
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
                            className="text-gray-400"
                        >
                            <path d="m9 18 6-6-6-6" />
                        </svg>
                    </Link>
                </section>
            </div>
        </div>
    );
}
