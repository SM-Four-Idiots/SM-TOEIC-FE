import { useAppSelector } from "@/store/hooks";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// 임시 단어 데이터
const DUMMY_WORDS = [
    {
        id: 1,
        word: "accomplish",
        level: "Bronze",
        meaning: "성취하다, 달성하다",
        example: "She accomplished her goal.",
    },
    {
        id: 2,
        word: "acknowledge",
        level: "Bronze",
        meaning: "인정하다, 승인하다",
        example: "He acknowledged his mistake.",
    },
    {
        id: 3,
        word: "acquire",
        level: "Bronze",
        meaning: "얻다, 습득하다",
        example: "She acquired new skills.",
    },
    {
        id: 4,
        word: "adequate",
        level: "Silver",
        meaning: "충분한, 적절한",
        example: "The salary is adequate.",
    },
];

export default function Words() {
    const user = useAppSelector((state) => state.authState.user);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            void navigate("/login", { replace: true });
        }
    });

    // 깜빡임 방지
    if (!user) {
        return null;
    }

    // 캡처본에 맞춘 뱃지 색상 매핑 함수
    const getBadgeStyle = (level: string) => {
        switch (level) {
            case "Bronze":
                return "bg-[#FDF3E1] text-[#D67629]"; // 연한 주황 배경, 브랜드 오렌지 글씨
            case "Silver":
                return "bg-[#F0F4F8] text-[#6B7280]"; // 연한 회색/파랑 배경, 회색 글씨
            default:
                return "bg-gray-100 text-gray-600";
        }
    };

    return (
        // 전체 배경색이 약간 베이지톤인 것을 감안하여 bg-[#F9F8F6] 느낌을 줄 수 있게 설정 (부모 컴포넌트에서 설정했다면 bg-transparent로 두어도 됨)
        <div className="w-full max-w-200 mx-auto px-6 py-10 flex flex-col gap-8 min-h-screen">
            {/* 상단 헤더 및 검색 섹션 */}
            <section className="flex flex-col gap-6">
                <div className="flex flex-col gap-1.5">
                    <h1 className="text-2xl font-bold text-[#1A1A1A]">
                        단어장
                    </h1>
                    <p className="text-sm text-[#8C8C8C]">
                        토익 필수 단어를 학습하세요
                    </p>
                </div>

                <form
                    className="flex gap-3 h-12"
                    onSubmit={(e) => e.preventDefault()}
                >
                    {/* 검색바 */}
                    <div className="relative flex-1">
                        <svg
                            className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8C8C8C]"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <circle cx="11" cy="11" r="8"></circle>
                            <path d="m21 21-4.3-4.3"></path>
                        </svg>
                        <input
                            placeholder="단어 또는 뜻 검색..."
                            className="w-full h-full pl-11 pr-4 rounded-[10px] bg-white border border-[#EAEAEA] outline-none text-[15px] placeholder:text-[#8C8C8C] focus:border-[#D67629] focus:ring-1 focus:ring-[#D67629] transition-all"
                        />
                    </div>
                    {/* 필터 버튼 */}
                    <button
                        type="button"
                        className="flex items-center gap-2 h-full px-5 rounded-[10px] bg-white border border-[#EAEAEA] text-[#1A1A1A] font-medium hover:bg-gray-50 transition-colors shrink-0"
                    >
                        <svg
                            className="w-4 h-4 text-[#8C8C8C]"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
                        </svg>
                        전체
                        <svg
                            className="w-4 h-4 text-[#8C8C8C]"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="m6 9 6 6 6-6"></path>
                        </svg>
                    </button>
                </form>

                <div className="flex gap-4 text-[14px] text-[#555555]">
                    <span>
                        총{" "}
                        <strong className="font-bold text-[#1A1A1A]">8</strong>
                        개 단어
                    </span>
                    <span>
                        북마크{" "}
                        <strong className="font-bold text-[#1A1A1A]">2</strong>
                        개
                    </span>
                </div>
            </section>

            {/* 단어 리스트 섹션 */}
            <section className="flex flex-col gap-4">
                {DUMMY_WORDS.map((item) => (
                    <article
                        key={item.id}
                        className="flex items-start justify-between p-6 bg-white rounded-2xl border border-[#EAEAEA] shadow-[0_2px_8px_rgba(0,0,0,0.02)] transition-transform hover:-translate-y-0.5"
                    >
                        <div className="flex flex-col gap-3">
                            {/* 단어 & 뱃지 */}
                            <div className="flex items-center gap-3">
                                <span className="text-xl font-bold text-[#1A1A1A]">
                                    {item.word}
                                </span>
                                <span
                                    className={`px-2.5 py-0.5 rounded-full text-[12px] font-bold ${getBadgeStyle(item.level)}`}
                                >
                                    {item.level}
                                </span>
                            </div>

                            {/* 뜻 & 예문 */}
                            <div className="flex flex-col gap-1 mt-1">
                                <p className="text-[15px] font-medium text-[#444444]">
                                    {item.meaning}
                                </p>
                                <p className="text-[14px] text-[#8C8C8C] italic">
                                    {item.example}
                                </p>
                            </div>
                        </div>

                        {/* 액션 버튼들 (발음 듣기, 북마크) */}
                        <div className="flex items-center gap-2 mt-1">
                            <button className="p-2 text-[#A0A0A0] hover:text-[#D67629] hover:bg-orange-50 rounded-lg transition-colors">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="22"
                                    height="22"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                                    <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
                                </svg>
                            </button>
                            <button className="p-2 text-[#D67629] hover:bg-orange-50 rounded-lg transition-colors">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="22"
                                    height="22"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M12 7v6"></path>
                                    <path d="M15 10H9"></path>
                                    <path d="M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z"></path>
                                </svg>
                            </button>
                        </div>
                    </article>
                ))}
            </section>
        </div>
    );
}
