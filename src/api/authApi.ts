/*
 * 로그인, 회원가입, 로그아웃 등 계정 보안과 관련된 API 통신 함수들을 모아둔 파일입니다.
 */

import type { ApiResponse } from "@/types/api";
import axiosInstance from "./axiosInstance";
import type { LoginResult } from "@/types/member";
import type { LoginType } from "@/schema/authSchema";

/**
 * [로그인 API]
 * 학번과 비밀번호를 받아 검증하고 토큰을 반환합니다.
 */
export type LoginResponse = ApiResponse<LoginResult>;
export const loginApi = async (data: LoginType) => {
    const response = await axiosInstance.post<LoginResponse>(
        "/auth/login",
        data
    );
    return response.data;
};

/**
 * [회원가입 최종 완료 API]
 * 샘물 인증을 통과한 유저의 정보와 새 비밀번호를 받아 최종 회원가입을 진행합니다.
 */
export interface SignupPayload {
    id: string;
    password: string;
    name: string;
}
export const signupApi = async (data: SignupPayload) => {
    const response = await axiosInstance.post<ApiResponse<string>>(
        "/auth/signup",
        data
    );
    return response.data;
};

/**
 * [로그아웃 API]
 * 서버에 로그아웃을 요청하여 Refresh Token 쿠키를 무효화(삭제)합니다.
 */
export const logoutApi = async () => {
    const response =
        await axiosInstance.post<ApiResponse<string>>("/auth/logout");
    return response.data;
};
