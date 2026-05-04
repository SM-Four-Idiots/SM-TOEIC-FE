import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FormButton from "@/components/common/button/FormButton";
import FormInput from "@/components/common/input/FormInput";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setQuestions, submitAnswer } from "@/store/testSlice";
import { getTestQuestions, submitTestAnswer } from "@/api/test";

export default function PromotionTest() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const { questions, currentIndex, isFinished } = useAppSelector(
        (state) => state.test
    );

    const [inputValue, setInputValue] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                if (questions.length === 0) {
                    const data = await getTestQuestions();
                    dispatch(setQuestions(data));
                }
            } catch (error) {
                alert(
                    error instanceof Error
                        ? error.message
                        : "문제를 불러오지 못했습니다."
                );
            } finally {
                setIsLoading(false);
            }
        };

        void fetchQuestions();
    }, [dispatch, questions.length]);

    useEffect(() => {
        if (isFinished) {
            void navigate("/promotion/test/summary");
        }
    }, [isFinished, navigate]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!inputValue.trim() || isSubmitting || questions.length === 0)
            return;

        setIsSubmitting(true);
        const currentQuestion = questions[currentIndex];

        try {
            const result = await submitTestAnswer({
                wordId: currentQuestion.id,
                answer: inputValue.trim(),
            });

            dispatch(
                submitAnswer({
                    wordId: currentQuestion.id,
                    submittedAnswer: inputValue.trim(),
                    isCorrect: result.correct,
                })
            );

            setInputValue("");
        } catch (error) {
            alert(
                error instanceof Error
                    ? error.message
                    : "제출 중 오류가 발생했습니다."
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading || questions.length === 0) {
        return (
            <div className="mt-20 text-center text-gray-500">
                문제를 불러오는 중입니다...
            </div>
        );
    }

    const currentQuestion = questions[currentIndex];
    const totalQuestions = questions.length;
    const progressPercent = ((currentIndex + 1) / totalQuestions) * 100;

    // 🌟 type에 따른 상태 분기 처리 (0: 한글 뜻 맞추기, 1: 영문 철자 맞추기 기준)
    // 백엔드 명세에 따라 0과 1의 역할이 반대라면 이 변수의 조건식을 수정해주세요.
    const isEnglishInput = currentQuestion.type === 0; // 영문 철자를 입력해야 하는 경우
    const inputPlaceholder = isEnglishInput
        ? "영어 단어를 입력하세요"
        : "한글 뜻을 입력하세요";

    return (
        <div className="w-full max-w-[520px] mx-auto px-4 flex flex-col gap-5 mt-20">
            <section className="flex flex-col gap-2">
                <div className="flex justify-between items-center text-sm font-bold text-[#1A1A1A] px-1">
                    <span>진행도</span>
                    <span>
                        {currentIndex + 1} / {totalQuestions}
                    </span>
                </div>
                <div className="w-full h-2.5 bg-[#F0E5D5] rounded-full overflow-hidden">
                    <div
                        className="h-full bg-[#D67629] rounded-full transition-all duration-300"
                        style={{ width: `${progressPercent}%` }}
                    />
                </div>
            </section>

            <section className="bg-white rounded-[20px] shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-[#EAEAEA] px-6 py-12 flex flex-col items-center w-full mt-2">
                <div className="px-4 py-1 bg-white border border-[#EAEAEA] rounded-full text-xs font-bold text-[#1A1A1A] mb-8 shadow-sm">
                    문제 {currentIndex + 1}
                </div>

                <h1 className="text-[28px] font-bold text-[#1A1A1A] mb-4 text-center">
                    {currentQuestion.question}
                </h1>

                <form
                    // 🌟 이렇게 화살표 함수로 e를 받아서 전달하고, 그 앞에 void를 붙여주면
                    // ESLint 규칙도 만족하고 폼 이벤트도 정상적으로 동작합니다!
                    onSubmit={(e) => {
                        void handleSubmit(e);
                    }}
                    className="w-full flex flex-col gap-3 px-2"
                >
                    <FormInput
                        name="answer"
                        value={inputValue}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setInputValue(e.target.value)
                        }
                        placeholder={inputPlaceholder}
                        className="text-center placeholder:text-center"
                        disabled={isSubmitting}
                    />
                    <FormButton
                        text={isSubmitting ? "제출 중..." : "제출"}
                        variant="main"
                        className={`h-11 !text-white transition-colors ${
                            !inputValue.trim() || isSubmitting
                                ? "!bg-[#E6B89C] cursor-not-allowed"
                                : "!bg-[#D67629] hover:!bg-[#BF6420]"
                        }`}
                        isLoading={!inputValue.trim() || isSubmitting}
                    />
                </form>
            </section>
        </div>
    );
}
