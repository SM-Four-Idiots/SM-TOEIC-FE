/*
 * router.tsx는 홈페이지의 라우팅을 총괄하는 라우팅 코드입니다.
 * 여기서 정의된 router는 main.tsx의 RouterProvider의 router로 적용됩니다.
 *
 *  TOEST의 라우트 url은 다음으로 구성되어 있습니다.
 * - '/': 메인 랜딩 페이지
 * - '/login': 로그인 페이지
 * - '/register': 회원가입 페이지
 * - '/mypage': 마이(유저정보) 페이지
 * - '/admin': 어드민 랜딩 페이지
 *
 * 'ProtectedRoute'는 부팅중이거나 로그인 상태가 아닌 유저의 접근을 막는 라우팅 페이지입니다.
 * 이 중 다음 페이지들은 'ProtectedRoute'로 보호됩니다.
 * - '/mypage'
 *
 * 'ProtectedAdminRoute'는 부팅중이거나 admin이 아닌 유저의 접근을 막는 라우팅 페이지입니다.
 * - '/admin'
 */

import { createBrowserRouter, Outlet } from "react-router-dom";
import App from "./App";
import { ProtectedRoute } from "./components/route/ProtectedRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MyPage from "./pages/MyPage";
import { ProtectedAdminRoute } from "./components/route/ProtectedAdminRoute";
import AdminHome from "./pages/AdminHome";

// 라우트 정의
export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />, // 공통 레이아웃
        // errorElement: <ErrorPage />, // 에러 페이지
        children: [
            // 일반 사용자 페이지
            {
                index: true, // path: '/'
                element: <Home />,
            },
            {
                path: "login",
                element: <Login />,
            },
            {
                path: "register",
                element: <Register />,
            },
            {
                path: "mypage",
                element: (
                    <ProtectedRoute>
                        <MyPage />
                    </ProtectedRoute>
                ),
            },

            // 관리자 페이지
            {
                path: "admin",
                element: (
                    <ProtectedAdminRoute>
                        <Outlet />
                    </ProtectedAdminRoute>
                ),
                children: [
                    {
                        index: true, // path: '/admin'
                        element: <AdminHome />,
                    },
                ],
            },
        ],
    },
]);
