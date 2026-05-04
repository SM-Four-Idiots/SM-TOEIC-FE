import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// 공통 버튼 컴포넌트 임포트 (경로 확인 필요)
import FormButton from "@/components/common/button/FormButton";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { resetTest } from "@/store/testSlice";
import { getTestSummary, type TestSummaryResponse } from "@/api/test";

export default function PromotionSummary() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    // Redux에서 유저가 푼 답안 기록 가져오기
    const { userAnswers } = useAppSelector((state) => state.test);

    // API 결과를 담을 상태
    const [summary, setSummary] = useState<TestSummaryResponse | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchSummary = async () => {
            // 🌟 방어 로직: 새로고침 등으로 스토어가 날아갔거나 푼 문제가 없을 경우 시작 페이지로 강제 이동
            if (userAnswers.length === 0) {
                void navigate("/promotion");
                return;
            }

            try {
                // 1. userAnswers 배열에서 API가 요구하는 wordIds 배열만 추출
                const wordIds = userAnswers.map((ans) => ans.wordId);

                // 2. 결과 요청 API 호출
                const data = await getTestSummary({ wordIds });
                setSummary(data);
            } catch (error) {
                alert("결과를 불러오는 중 오류가 발생했습니다.");
                void navigate("/promotion");
            } finally {
                setIsLoading(false);
            }
        };

        void fetchSummary();
    }, [userAnswers, navigate]);

    // 다시 풀기 핸들러
    const handleRetry = () => {
        dispatch(resetTest()); // 스토어 초기화
        void navigate("/promotion/test"); // 바로 문제 풀이 페이지로 이동
    };

    // 메인(안내) 페이지로 가기 핸들러
    const handleGoMain = () => {
        dispatch(resetTest()); // 스토어 초기화
        void navigate("/promotion");
    };

    if (isLoading || !summary) {
        return (
            <div className="mt-20 text-center text-gray-500">
                결과를 집계 중입니다...
            </div>
        );
    }

    // 합격 여부 계산 (70% 이상)
    const passThreshold = summary.total * 0.7;
    const isPassed = summary.correct >= passThreshold;

    return (
        <div className="w-full max-w-[480px] mx-auto px-6 flex flex-col items-center gap-6 mt-12">
            <section className="flex flex-col items-center gap-1">
                <h1 className="text-2xl font-bold text-gray-900">
                    테스트 결과
                </h1>
            </section>

            {/* 결과 카드 영역 */}
            <section className="w-full bg-white rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.05)] border border-gray-100 p-6 md:p-8 flex flex-col items-center">
                {/* 트로피 아이콘 */}
                <div className="w-16 h-16 bg-[#FDF1E8] rounded-full flex justify-center items-center mb-6">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="28"
                        height="28"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke={isPassed ? "#D67629" : "#8C8C8C"} // 불합격일 땐 회색 트로피
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M10 14.66v1.626a2 2 0 0 1-.976 1.696A5 5 0 0 0 7 21.978"></path>
                        <path d="M14 14.66v1.626a2 2 0 0 0 .976 1.696A5 5 0 0 1 17 21.978"></path>
                        <path d="M18 9h1.5a1 1 0 0 0 0-5H18"></path>
                        <path d="M4 22h16"></path>
                        <path d="M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1z"></path>
                        <path d="M6 9H4.5a1 1 0 0 1 0-5H6"></path>
                    </svg>
                </div>

                {/* 합격 / 불합격 텍스트 */}
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                    {isPassed
                        ? "테스트에 통과했습니다! 🎉"
                        : "아쉽게도 통과하지 못했어요 🥲"}
                </h2>
                <p className="text-sm text-gray-500 mb-8">
                    {isPassed
                        ? "훌륭합니다! 다음 단계로 넘어가볼까요?"
                        : "70% 이상 정답을 맞혀야 통과할 수 있습니다."}
                </p>

                {/* 점수 박스 */}
                <div className="w-full bg-[#F9F9F9] rounded-xl p-5 flex justify-between items-center mb-8 border border-[#EAEAEA]">
                    <div className="flex flex-col items-center flex-1 border-r border-[#EAEAEA]">
                        <span className="text-sm font-medium text-gray-500 mb-1">
                            정답
                        </span>
                        <span className="text-2xl font-bold text-[#D67629]">
                            {summary.correct}
                        </span>
                    </div>
                    <div className="flex flex-col items-center flex-1 border-r border-[#EAEAEA]">
                        <span className="text-sm font-medium text-gray-500 mb-1">
                            오답
                        </span>
                        <span className="text-2xl font-bold text-gray-800">
                            {summary.wrong}
                        </span>
                    </div>
                    <div className="flex flex-col items-center flex-1">
                        <span className="text-sm font-medium text-gray-500 mb-1">
                            총 문제
                        </span>
                        <span className="text-2xl font-bold text-gray-800">
                            {summary.total}
                        </span>
                    </div>
                </div>

                {/* 버튼 그룹 */}
                <div className="w-full flex flex-col gap-3">
                    <FormButton
                        text="다시 도전하기"
                        variant="main"
                        className="h-12 !bg-[#D67629] hover:!bg-[#BF6420] !text-white text-[15px]"
                        onClick={handleRetry}
                    />
                    <FormButton
                        text="처음으로 돌아가기"
                        variant="main" // 혹은 기본 버튼 스타일
                        className="h-12 !bg-gray-100 hover:!bg-gray-200 !text-gray-700 text-[15px]"
                        onClick={handleGoMain}
                    />
                </div>
            </section>
        </div>
    );
}
