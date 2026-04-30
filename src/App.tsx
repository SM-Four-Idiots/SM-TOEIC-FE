import axios from "axios";
import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import axiosInstance from "./api/axiosInstance";
import AdminSidebar from "./components/layout/AdminSidebar"; // AdminSidebar 경로를 실제 위치에 맞게 수정해주세요.
import Header from "./components/layout/Header";
import {
    login,
    logout,
    setAccessToken,
    setAuthInitialized,
} from "./store/authSlice";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import type { RefreshResult } from "./types/member";
import { fetchUser } from "./utils/auth";

function App() {
    const location = useLocation();

    /* 기본 변수 선언 */
    const dispatch = useAppDispatch();

    /* Redux store 접근 */
    // authInitialized의 경우 false일 경우 아직 부팅중인 상태
    const authInitialized = useAppSelector(
        (state) => state.authState.authInitialized
    );

    /*
     * 앱 부팅 시 처리하는 내용입니다.
     *
     * 다음과 같은 절차로 진행됩니다.
     * 1) refreshToken 쿠키 기반으로 AT 재발급
     * 2) 유저 정보 조회
     * 3) 로그인 상태 복구
     */
    useEffect(() => {
        const bootstrapAuth = async () => {
            try {
                /* AT 재발급 부분입니다. */
                // Authorization 헤더 없이, RT 쿠키만으로 accessToken 발급
                const reissueRes =
                    await axiosInstance.post<RefreshResult>("/auth/reissue");
                if (!reissueRes.data) {
                    console.warn("AT 재발급 실패", reissueRes.data);
                    return;
                }

                // 재발급된 AT를 authStore의 저장
                dispatch(setAccessToken(reissueRes.data.accessToken));

                /* 유저 정보 조회 부분입니다. */
                const user = await fetchUser();
                if (!user) {
                    console.warn("유저 정보 조회 실패");
                    return;
                }

                // 반환된 user 객체를 바탕으로 로그인
                dispatch(login(user));
            } catch (err) {
                /* 부팅 중 인증 복구 실패 처리입니다.  */
                // 실패 시 항상 AT 초기화와 logout 실행
                dispatch(setAccessToken(null));
                dispatch(logout());

                /* 서버 요청 실패 처리입니다. */
                if (axios.isAxiosError(err)) {
                    console.warn("인증 부팅 중 서버 에러가 발생했습니다.", err);
                } else {
                    console.warn("알 수 없는 에러가 발생했습니다.", err);
                }
            } finally {
                /* 부팅 시도는 성공/실패 관계 없이 완료 처리합니다. */
                dispatch(setAuthInitialized(true));
            }
        };

        /* 이미 부팅이 끝난 상태면 로직을 타지 않습니다. */
        if (!authInitialized) {
            void bootstrapAuth();
        }
    }, [dispatch, authInitialized]);

    // 현재 경로가 '/admin'으로 시작하는지 확인
    const isAdminRoute = location.pathname.startsWith("/admin");

    // 1. 관리자(Admin) 레이아웃: 좌측 사이드바 + 우측 메인 콘텐츠
    if (isAdminRoute) {
        return (
            <div className="flex min-h-screen bg-[#FCFAF6]">
                {/* 좌측 고정 사이드바 */}
                <AdminSidebar />

                {/* 우측 메인 콘텐츠 영역 */}
                {/* flex-1로 남은 공간을 모두 차지하게 하고, 내용이 길어지면 이 영역만 스크롤되도록 overflow-y-auto를 줍니다. */}
                <main className="flex flex-col flex-1 h-screen p-8 overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        );
    }

    // 2. 일반 사용자(User) 레이아웃: 상단 헤더 + 하단 메인 콘텐츠
    return (
        <div className="min-h-screen bg-[#FCFAF6]">
            <Header />
            <main className="flex flex-col h-[90vh]">
                <Outlet />
            </main>
        </div>
    );
}

export default App;
