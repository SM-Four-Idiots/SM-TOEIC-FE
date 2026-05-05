import { isAxiosError } from "axios";
import axiosInstance from "./axiosInstance";

// 공통 에러 인터페이스
interface ErrorResponse {
    message?: string;
}

// ==========================================
// 1. 테스트 문제 목록 불러오기 (GET /api/test/questions)
// ==========================================
export interface Question {
    id: number;
    type: number; // ex) 1: 한글 뜻 맞추기, 0: 영문 철자 맞추기 등
    question: string;
}

export const getTestQuestions = async (): Promise<Question[]> => {
    try {
        const response = await axiosInstance.get<Question[]>("/test/questions");
        return response.data;
    } catch (error) {
        if (isAxiosError<ErrorResponse>(error)) {
            const errorMessage =
                error.response?.data?.message ||
                "문제 목록을 불러오는 중 문제가 발생했습니다.";
            throw new Error(errorMessage);
        }
        throw new Error("네트워크 오류가 발생했습니다.");
    }
};

// ==========================================
// 2. 단일 문제 정답 제출 (POST /api/test/submit)
// ==========================================
export interface SubmitAnswerRequest {
    wordId: number;
    answer: string;
}

export interface SubmitAnswerResponse {
    correct: boolean;
    correctAnswer: string;
    message: string;
}

export const submitTestAnswer = async (
    data: SubmitAnswerRequest
): Promise<SubmitAnswerResponse> => {
    try {
        const response = await axiosInstance.post<SubmitAnswerResponse>(
            "/test/submit",
            data
        );
        return response.data;
    } catch (error) {
        if (isAxiosError<ErrorResponse>(error)) {
            const errorMessage =
                error.response?.data?.message ||
                "답안 제출 중 문제가 발생했습니다.";
            throw new Error(errorMessage);
        }
        throw new Error("네트워크 오류가 발생했습니다.");
    }
};

// ==========================================
// 3. 최종 결과 요약 보기 (POST /api/test/summary)
// ==========================================
export interface TestSummaryRequest {
    wordIds: number[];
}

export interface TestSummaryResponse {
    total: number;
    correct: number;
    wrong: number;
}

export const getTestSummary = async (
    data: TestSummaryRequest
): Promise<TestSummaryResponse> => {
    try {
        const response = await axiosInstance.post<TestSummaryResponse>(
            "/test/summary",
            data
        );
        return response.data;
    } catch (error) {
        if (isAxiosError<ErrorResponse>(error)) {
            const errorMessage =
                error.response?.data?.message ||
                "결과를 불러오는 중 문제가 발생했습니다.";
            throw new Error(errorMessage);
        }
        throw new Error("네트워크 오류가 발생했습니다.");
    }
};
