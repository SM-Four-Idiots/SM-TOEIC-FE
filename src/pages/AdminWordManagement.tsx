// [프론트엔드] 관리자 단어 관리 페이지 컴포넌트
// - 관리자 권한으로 단어 전체 목록을 조회하고 관리하는 화면입니다.
// - getAdminWords()를 통해 백엔드에서 단어 데이터를 받아와 렌더링합니다.
// - 비동기 통신, 에러 처리, 로딩 상태, UI 렌더링 등 모든 흐름을 담당합니다.
// - (백엔드/DB) '/admin/words' API는 DB의 Word 테이블(및 연관 테이블)을 조회하여 JSON 배열로 응답합니다.
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { getAdminWords } from "@/api/admin";
import type { Word } from "@/types/word";

/**
 * [프론트엔드] 난이도 뱃지 스타일 반환 함수
 * - tierLevel(숫자): DB에서 내려온 난이도 레벨(1~3 등)
 * - 각 레벨에 맞는 텍스트와 Tailwind CSS 스타일을 반환합니다.
 * - UI 일관성 및 성능 최적화를 위해 컴포넌트 외부에 선언합니다.
 */
const getBadgeStyle = (tierLevel: number) => {
    switch (tierLevel) {
        case 1:
            return { text: "Bronze", style: "bg-[#FDF3E1] text-[#D67629]" };
        case 2:
            return { text: "Silver", style: "bg-[#F0F4F8] text-[#6B7280]" };
        case 3:
            return { text: "Gold", style: "bg-[#FEF3C7] text-[#D97706]" };
        default:
            return {
                text: `Tier ${tierLevel}`,
                style: "bg-gray-100 text-gray-600",
            };
    }
};

export default function AdminWordManagement() {
    // [프론트엔드] 단어 목록 상태, 로딩/에러 상태 관리
    const [words, setWords] = useState<Word[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    /**
     * [프론트엔드] 관리자 단어 목록 비동기 조회 함수
     * - signal: AbortController의 signal 객체 (컴포넌트 언마운트 시 네트워크 요청 취소)
     * - getAdminWords()로 API 호출, 성공 시 setWords로 상태 갱신
     * - (백엔드/DB) '/words' API는 DB에서 단어 전체를 조회해 JSON 배열로 응답
     * - 에러/타임아웃/취소 등 모든 예외 상황을 안전하게 처리
     */
    const fetchWords = useCallback(async (signal?: AbortSignal) => {
        try {
            setIsLoading(true);
            setError(null);
            const data = await getAdminWords(signal);
            setWords(data);
        } catch (err: unknown) {
            if (axios.isCancel(err)) return; // [프론트엔드] 요청 취소(언마운트 등) 시 무시
            if (axios.isAxiosError<{ message?: string }>(err)) {
                if (
                    err.code === "ECONNABORTED" ||
                    err.message.includes("timeout")
                ) {
                    setError(
                        "요청 시간이 초과되었습니다. 인터넷 연결을 확인해주세요."
                    );
                } else {
                    setError(
                        err.response?.data?.message ||
                            "서버 통신 중 오류가 발생했습니다."
                    );
                }
            } else {
                setError("알 수 없는 에러가 발생했습니다.");
            }
        } finally {
            setIsLoading(false);
        }
    }, []);

    // [프론트엔드] 컴포넌트 마운트 시 단어 목록 조회, 언마운트 시 요청 취소
    useEffect(() => {
        const abortController = new AbortController();
        void fetchWords(abortController.signal);
        return () => {
            abortController.abort();
        };
    }, [fetchWords]);

    // [프론트엔드] API 응답이 배열이 아닐 경우 안전하게 빈 배열로 방어
    const safeWords = Array.isArray(words) ? words : [];

    /**
     * [프론트엔드] 메인 콘텐츠 렌더링 함수
     * - 로딩, 에러, 빈 데이터, 정상 데이터 등 상태별로 분기 렌더링
     * - 단어 목록은 map으로 반복 렌더링, 각 단어의 뱃지/카테고리/의미 표시
     */
    const renderContent = () => {
        if (isLoading) {
            return (
                <div className="py-20 text-center text-[#8C8C8C] flex flex-col items-center gap-3">
                    <div className="w-8 h-8 border-4 border-[#EAEAEA] border-t-[#1A1A1A] rounded-full animate-spin"></div>
                    <p>단어 목록을 불러오는 중입니다...</p>
                </div>
            );
        }
        if (error) {
            return (
                <div className="py-20 flex flex-col justify-center items-center gap-4">
                    <p className="text-red-500 font-medium">{error}</p>
                    <button
                        onClick={() => void fetchWords()}
                        className="px-4 py-2 bg-[#1A1A1A] text-white rounded-lg text-sm font-medium hover:bg-[#333333] transition-colors"
                    >
                        다시 시도
                    </button>
                </div>
            );
        }
        if (safeWords.length === 0) {
            return (
                <div className="py-20 text-center text-[#8C8C8C]">
                    등록된 단어가 없습니다.
                </div>
            );
        }
        return safeWords.map((item) => {
            const badge = getBadgeStyle(item.tierLevel);
            return (
                <article
                    key={item.id}
                    className="flex items-start justify-between p-6 bg-white rounded-2xl border border-[#EAEAEA] shadow-[0_2px_8px_rgba(0,0,0,0.02)] transition-transform hover:-translate-y-0.5"
                >
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-3">
                            <span className="text-xl font-bold text-[#1A1A1A]">
                                {item.english}
                            </span>
                            <span
                                className={`px-2.5 py-0.5 rounded-full text-[12px] font-bold ${badge.style}`}
                            >
                                {badge.text}
                            </span>
                            {item.category && (
                                <span className="px-2 py-0.5 rounded-md bg-gray-50 border border-gray-200 text-[11px] text-gray-500">
                                    {item.category}
                                </span>
                            )}
                        </div>
                        <div className="flex flex-col gap-1 mt-1">
                            <p className="text-[15px] font-medium text-[#444444]">
                                {item.meaning}
                            </p>
                        </div>
                    </div>
                </article>
            );
        });
    };

    // [프론트엔드] 전체 레이아웃 및 섹션 렌더링
    return (
        <div className="flex min-h-screen">
            <main className="flex-1 w-full max-w-200 mx-auto px-6 py-10 flex flex-col gap-8">
                <section className="flex flex-col gap-6">
                    <div className="flex flex-col gap-1.5">
                        <h1 className="text-2xl font-bold text-[#1A1A1A]">
                            단어 관리
                        </h1>
                        <p className="text-sm text-[#8C8C8C]">
                            등록된 단어를 관리하세요
                        </p>
                    </div>
                    {!isLoading && !error && (
                        <div className="flex gap-4 text-[14px] text-[#555555]">
                            <span>
                                총{" "}
                                <strong className="font-bold text-[#1A1A1A]">
                                    {safeWords.length}
                                </strong>
                                개 단어
                            </span>
                        </div>
                    )}
                </section>
                <section className="flex flex-col gap-4">
                    {renderContent()}
                </section>
            </main>
        </div>
    );
}
