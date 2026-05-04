/*
 * 유저 정보의 타입을 다루는 인터페이스입니다.
 * 해당 파일에는 유저의 상세 정보, 로그인 반환, 회원가입 반환, 토큰 재발급, 맴버 리스트에 관한 interface를 담고 있습니다.
 */

// 유저 상세 정보
export interface MemberResult {
    nickname: string;
}

// 로그인 성공
export interface LoginResult {
    accessToken: string;
}

// 회원가입 결과
export type RegisterResult = void;

// 로그아웃 결과
export type logoutResult = void;

// 토큰 재발급
export interface RefreshResult {
    accessToken: string;
}
