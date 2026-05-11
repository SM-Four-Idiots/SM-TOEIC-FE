import { useState } from "react";

// 랭킹 데이터 (이미지의 이모지와 정확히 매칭되도록 icon 필드 추가)
const rankings = [
    {
        rank: 1,
        type: "crown",
        icon: "🎂",
        name: "빵왕",
        tier: "Diamond",
        level: 5,
        xp: "45,000 XP",
        isUser: false,
    },
    {
        rank: 2,
        type: "medal_silver",
        icon: "🍩",
        name: "토스트러버",
        tier: "Diamond",
        level: 3,
        xp: "38,000 XP",
        isUser: false,
    },
    {
        rank: 3,
        type: "medal_bronze",
        icon: "🥐",
        name: "단어마스터",
        tier: "Gold",
        level: 5,
        xp: "32,000 XP",
        isUser: false,
    },
    {
        rank: 4,
        type: "number",
        icon: "🥞",
        name: "영어천재",
        tier: "Gold",
        level: 4,
        xp: "29,000 XP",
        isUser: false,
    },
    {
        rank: 5,
        type: "number",
        icon: "🍞",
        name: "토스트마스터 (나)",
        tier: "Silver",
        level: 2,
        xp: "12,700 XP",
        isUser: true,
    },
];

// 티어별 뱃지 스타일 (배경색 + 글자색)
const tierStyles: Record<string, string> = {
    Diamond: "bg-cyan-50 text-cyan-600",
    Gold: "bg-yellow-50 text-yellow-600",
    Silver: "bg-gray-100 text-gray-600",
    Bronze: "bg-orange-50 text-orange-600",
};

// 순위 아이콘을 렌더링하는 함수 (심플한 아웃라인 형태로 수정)
const renderRankIcon = (rank: number, type: string) => {
    if (type === "crown") {
        return (
            <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#F5A623"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M5 21h14"></path>
                <path d="M4 7l3 5 5-7 5 7 3-5v14H4V7z"></path>
            </svg>
        );
    }
    if (type === "medal_silver") {
        return (
            <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#9CA3AF"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <circle cx="12" cy="8" r="6"></circle>
                <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"></path>
            </svg>
        );
    }
    if (type === "medal_bronze") {
        return (
            <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#D97706"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <circle cx="12" cy="8" r="6"></circle>
                <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"></path>
            </svg>
        );
    }
    return <span className="text-lg font-bold text-gray-500">{rank}</span>;
};

export default function Ranking() {
    return (
        // 전체 배경색을 따뜻한 베이지톤으로 맞추고 최대 너비를 약간 줄여 쾌적하게 구성
        <div className="min-h-screen py-10 px-4 font-sans bg-[#FCFAF6] flex justify-center">
            <div className="w-full max-w-4xl">
                {/* 1. 제목 섹션 */}
                <section className="mb-8 text-center">
                    <h1 className="text-[28px] font-bold text-[#333333]">
                        명예의 전당
                    </h1>
                    <p className="text-[14px] text-gray-500 mt-1">
                        토스트 마스터들의 랭킹을 확인하세요
                    </p>
                </section>

                {/* 2. 내 순위 카드 섹션 */}
                <section className="mb-10 bg-[#FCF6EE] border border-[#F3E5D4] rounded-3xl p-6 flex items-center justify-between shadow-sm">
                    <div className="flex items-center">
                        {/* 이미지 형태처럼 둥근 사각형 뱃지로 내 순위 번호 표시 */}
                        <div className="w-[56px] h-[56px] bg-[#F4DCC1] rounded-2xl flex items-center justify-center mr-5">
                            <span className="text-[22px] font-bold text-[#E67E22]">
                                #5
                            </span>
                        </div>
                        <div className="flex flex-col">
                            <h2 className="text-lg font-bold text-[#333333]">
                                내 순위
                            </h2>
                            <p className="text-[13px] text-gray-500 mt-0.5">
                                Silver Tier · Lv.2
                            </p>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-[12px] text-gray-500">누적 경험치</p>
                        <p className="text-[22px] font-bold text-[#E67E22] mt-0.5">
                            12,700 XP
                        </p>
                    </div>
                </section>

                {/* 3. 랭킹 표 카드 및 제목 섹션 */}
                <section className="bg-white border border-gray-100 rounded-3xl shadow-sm overflow-hidden">
                    {/* 카드 헤더 영역 */}
                    <div className="p-6 border-b border-gray-100">
                        <div className="flex items-center gap-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="22"
                                height="22"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#E67E22"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
                                <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
                                <path d="M4 22h16"></path>
                                <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
                                <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
                                <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
                            </svg>
                            <span className="text-xl font-bold text-[#333333]">
                                티어 랭킹
                            </span>
                        </div>
                        <p className="text-[13px] text-gray-500 mt-1">
                            누적 경험치 기준 순위
                        </p>
                    </div>

                    {/* 4. 리스트 영역 (Flex Layout 적용) */}
                    <div className="flex flex-col">
                        {rankings.map((user) => (
                            <div
                                key={user.rank}
                                className="flex items-center px-6 py-5 border-b border-gray-100 last:border-none"
                            >
                                {/* 순위 아이콘/번호 셀 */}
                                <div className="w-10 flex justify-center">
                                    {renderRankIcon(user.rank, user.type)}
                                </div>

                                {/* 사용자 아이콘 (이모지) */}
                                <div className="w-10 h-10 ml-4 flex items-center justify-center text-2xl">
                                    {user.icon}
                                </div>

                                {/* 사용자 이름 및 티어 정보 셀 */}
                                <div className="flex-1 ml-4 flex flex-col justify-center">
                                    <div
                                        className={`text-[16px] font-bold ${user.isUser ? "text-[#E67E22]" : "text-[#333333]"}`}
                                    >
                                        {user.name}
                                    </div>
                                    <div className="flex items-center mt-1">
                                        <span
                                            className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${tierStyles[user.tier]}`}
                                        >
                                            {user.tier}
                                        </span>
                                        <span className="text-[12px] text-gray-400 font-medium ml-2">
                                            Lv.{user.level}
                                        </span>
                                    </div>
                                </div>

                                {/* 경험치 셀 */}
                                <div className="text-right">
                                    <div className="text-[18px] font-bold text-[#E67E22]">
                                        {user.xp}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}
