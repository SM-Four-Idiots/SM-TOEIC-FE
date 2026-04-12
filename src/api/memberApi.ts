/*
 * 회원 정보 조회, 수정, 탈퇴 등 유저와 관련된 API 통신 함수들을 모아둔 파일입니다.
 */

import type { logoutResult, MemberResult } from "@/types/member";
import axiosInstance from "./axiosInstance";

/**
 * [회원 탈퇴 API]
 * 현재 로그인된 사용자의 계정을 삭제(탈퇴 처리)합니다.
 */
export type DeleteAccountResponse = logoutResult;

export const deleteAccountApi = async () => {
    const response =
        await axiosInstance.delete<DeleteAccountResponse>("/members");
    return response.data;
};

/**
 * [내 정보 조회 API]
 * 현재 로그인된 유저의 정보(학번, 이름, 학과 등)를 불러옵니다.
 */
export type MemberResponse = MemberResult;

export const getMyInfoApi = async () => {
    const response = await axiosInstance.get<MemberResponse>("/user/info");
    return response.data;
};
