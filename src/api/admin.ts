import axiosInstance from "./axiosInstance";
import type { Word } from "@/types/word";

// 관리자 단어 목록 조회 API
export const getAdminWords = async (signal?: AbortSignal): Promise<Word[]> => {
    const response = await axiosInstance.get<Word[]>("/words", {
        signal,
    });
    if (!Array.isArray(response.data)) {
        // API 응답이 배열이 아니면 빈 배열 반환 (UI에서 안전하게 처리)
        return [];
    }
    return response.data;
};
