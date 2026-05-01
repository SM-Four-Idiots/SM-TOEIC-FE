import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { getWords } from "@/api/wordApi";
import type { Word } from "@/types/word";

// [Front-end] 컴포넌트 내부 상태(State)에 의존하지 않는 순수 함수.
// 파라미터(tierLevel): DB에서 응답받은 숫자 형태의 난이도 레벨.
// 역할: 전달받은 난이도 숫자에 매칭되는 프론트엔드 UI 텍스트와 렌더링 스타일(Tailwind CSS) 객체를 반환합니다.
// 최적화: 불필요한 메모리 재할당을 막기 위해 컴포넌트 외부에 선언되었습니다.
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

export default function Words() {
    // [Front-end] 컴포넌트의 렌더링을 제어하는 상태 변수들.
    // words: 화면에 그려질 단어 목록 배열
    // isLoading: 데이터 통신 진행 여부 (로딩 스피너 제어)
    // error: 비동기 통신 실패 시 사용자에게 보여줄 에러 메시지 텍스트
    const [words, setWords] = useState<Word[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // [Front-end] 재시도(Retry) 기능과 마운트 시 자동 호출을 위해 캡슐화된 비동기 Fetch 함수.
    // useCallback을 사용하여 의존성 배열([])이 변하지 않는 한 메모리에서 재생성되지 않습니다.
    // 파라미터(signal): AbortController의 signal 객체. 네트워크 요청 중단(Cancel) 처리에 사용됩니다.
    const fetchWords = useCallback(async (signal?: AbortSignal) => {
        try {
            setIsLoading(true);
            setError(null);

            // [Back-end & DB 흐름]
            // 1. 프론트엔드에서 '/api/words' 엔드포인트로 GET 요청을 전송합니다.
            // 2. 백엔드 Controller가 요청을 받아 Service 계층으로 전달합니다.
            // 3. Service 계층에서 데이터베이스(MySQL 등)의 'Word' 테이블에 SELECT 쿼리를 실행하여 단어 목록을 조회합니다.
            // 4. (백엔드 최적화 포인트) 이때 카테고리 등 연관 데이터가 있다면 DB 쿼리에서 JOIN 처리하여 N+1 문제를 방지한 상태로 데이터를 가져옵니다.
            // 5. 조회된 데이터를 DTO로 변환 후, JSON 배열 형태로 프론트엔드에 응답(Response)합니다.
            const data = await getWords(signal);

            // [Front-end] 정상적으로 응답받은 배열 데이터를 React 상태에 업데이트하여 UI 렌더링을 트리거합니다.
            setWords(data);
        } catch (err: unknown) {
            // [Front-end] 유저가 로딩 도중 페이지를 벗어나서 발생하는 의도적인 요청 취소 에러는 무시(return)합니다.
            if (axios.isCancel(err)) {
                console.warn("API 요청 취소됨");
                return;
            }

            // [Front-end] isAxiosError 제네릭을 활용하여 백엔드 에러 응답 객체의 타입을 안전하게 추론합니다.
            if (axios.isAxiosError<{ message?: string }>(err)) {
                if (
                    err.code === "ECONNABORTED" ||
                    err.message.includes("timeout")
                ) {
                    setError(
                        "요청 시간이 초과되었습니다. 인터넷 연결을 확인해주세요."
                    );
                } else {
                    // [Back-end 흐름] 백엔드에서 비즈니스 로직 예외 발생 시 내려준 커스텀 에러 메시지(message 필드)를 우선 노출합니다.
                    setError(
                        err.response?.data?.message ||
                            "서버 통신 중 오류가 발생했습니다."
                    );
                }
            } else {
                setError("알 수 없는 에러가 발생했습니다.");
            }
        } finally {
            // [Front-end] 성공/실패 여부에 상관없이 로딩 상태를 종료하여 UI 차단을 해제합니다.
            setIsLoading(false);
        }
    }, []);

    // [Front-end] 컴포넌트 라이프사이클 관리 훅
    useEffect(() => {
        // 네트워크 요청의 생명주기를 컴포넌트의 생명주기에 결합시키는 안전장치입니다.
        const abortController = new AbortController();

        // 마운트 시 즉시 단어 데이터 조회를 시작합니다.
        void fetchWords(abortController.signal);

        // [Front-end Cleanup] 컴포넌트가 언마운트(화면에서 사라짐)될 때 실행됩니다.
        // 진행 중이던 API 백엔드 통신을 강제 취소하여 메모리 누수와 상태 업데이트 충돌(Race Condition)을 방지합니다.
        return () => {
            abortController.abort();
        };
    }, [fetchWords]);

    // [Front-end] 백엔드가 만약의 상황에 JSON 배열이 아닌 다른 타입을 내려주었을 때
    // .map() 함수 호출 시 발생하는 런타임 에러(화면 백지화)를 막기 위한 최종 방어선입니다.
    const safeWords = Array.isArray(words) ? words : [];

    // [Front-end] 메인 콘텐츠 영역의 렌더링을 담당하는 헬퍼 함수입니다.
    // 상태에 따라 스켈레톤(스피너), 에러+재시도 화면, 빈 데이터 화면, 정상 리스트 화면 중 하나를 반환합니다.
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
            // 가져온 숫자형 tierLevel을 바탕으로 시각적 뱃지 UI 스타일을 결정합니다.
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

    return (
        <div className="w-full max-w-200 mx-auto px-6 py-10 flex flex-col gap-8 min-h-screen">
            {/* [Front-end UX] 통신 상태(로딩/에러)와 무관하게 상단 헤더의 뼈대는 고정 렌더링합니다.
                사용자가 다른 페이지로 이동한 듯한 혼란(레이아웃 시프트, CLS)을 방지합니다. */}
            <section className="flex flex-col gap-6">
                <div className="flex flex-col gap-1.5">
                    <h1 className="text-2xl font-bold text-[#1A1A1A]">
                        단어장
                    </h1>
                    <p className="text-sm text-[#8C8C8C]">
                        토익 필수 단어를 학습하세요
                    </p>
                </div>

                {/* 로딩과 에러가 모두 없을 때만 정상적인 데이터 총개수를 표시합니다. */}
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

            {/* 위에서 정의한 조건부 렌더링 함수를 실행하여 데이터 상태에 맞는 화면을 출력합니다. */}
            <section className="flex flex-col gap-4">{renderContent()}</section>
        </div>
    );
}
