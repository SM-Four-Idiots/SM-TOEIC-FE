import { loginApi } from "@/api/authApi";
import { getMyInfoApi } from "@/api/memberApi";
import FormButton from "@/components/common/button/FormButton";
import FormInput from "@/components/common/input/FormInput";
import { type LoginType, loginSchema } from "@/schema/authSchema";
import { login, setAccessToken } from "@/store/authSlice";
import { useAppDispatch } from "@/store/hooks";
import { handleApiError } from "@/utils/errorHandler";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Login() {
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        clearErrors,
    } = useForm<LoginType>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = handleSubmit(async (form: LoginType) => {
        setIsLoading(true);
        try {
            /* 로그인 요청 */
            // fetch-POST('/api/auth/login', data) [데이터를 로그인 검증 API로 전송]
            const loginRes = await loginApi(form);

            // 로그인 요청 실패시 처리
            if (!loginRes) {
                setError("root", {
                    message: "아이디 혹은 비밀번호가 틀렸습니다.",
                });
                return;
            }

            // 로그인 응답에서 accessToken을 받아 Redux에 저장
            const accessToken = loginRes.accessToken;
            dispatch(setAccessToken(accessToken));

            /* 유저 정보 조회 */
            // 성공시에만 login 확정
            const userRes = await getMyInfoApi();

            // 유저 정보 불러오기 실패시 처리
            if (!userRes) {
                console.warn("유저 정보 조회에 실패했습니다.");
                setError("root", {
                    message: "유저 정보 조회에 실패했습니다.",
                });
                return;
            }

            // 성공시 redux store에 유저 데이터 저장
            dispatch(
                login({
                    nickname: userRes.nickname,
                })
            );
            // 원래 가려던 페이지로 복귀(없으면 "/"로)
            const from =
                (location.state as { from?: Location })?.from?.pathname || "/";
            void navigate(from, { replace: true });
        } catch (err) {
            handleApiError(err, setError, "로그인 실패: 다시 시도해주세요.");
        } finally {
            setIsLoading(false);
        }
    });

    return (
        <div className="flex flex-col items-center justify-center w-full my-auto">
            {/* 1. 상단 로고 영역 */}
            <section className="flex flex-col items-center mb-8">
                {/* 로고 아이콘 박스 */}
                <div className="flex items-center justify-center w-16 h-16 bg-[#FDF3E8] rounded-2xl mb-4 shadow-sm">
                    <span className="text-4xl" aria-hidden="true">
                        🍞
                    </span>
                </div>
                <h1 className="text-2xl font-bold text-[#1A1A1A] tracking-tight">
                    TOEST
                </h1>
            </section>
            {/* 2. 로그인 카드 영역 */}
            <section className="w-full max-w-125 bg-white border border-[#EAEAEA] rounded-[20px] p-8 shadow-sm">
                {/* 카드 헤더 (타이틀, 서브타이틀) */}
                <div className="text-center mb-8">
                    <h2 className="text-xl font-bold text-[#1A1A1A] mb-2">
                        로그인
                    </h2>
                    <p className="text-sm text-[#8C8C8C]">
                        계정에 로그인하여 학습을 시작하세요
                    </p>
                </div>
                {/* 로그인 폼 */}
                <form
                    onSubmit={(e) => void onSubmit(e)}
                    className="flex flex-col gap-5"
                >
                    <FormInput
                        label="이메일"
                        type="id"
                        placeholder="이메일을 입력하세요"
                        required
                        {...register("email")}
                        error={errors.email?.message}
                        isPlaceholder={false}
                        onFocus={() => clearErrors("root")}
                    />
                    <FormInput
                        label="비밀번호"
                        type="password"
                        placeholder="비밀번호를 입력하세요"
                        {...register("password")}
                        required
                        error={errors.password?.message}
                        onFocus={() => clearErrors("root")}
                    />
                    {/* root 에러 메시지*/}
                    {errors.root?.message && (
                        <span className="text-sm font-medium text-red-500 text-center mt-1">
                            {errors.root.message}
                        </span>
                    )}
                    {/* 로그인 버튼 */}
                    <div className="mt-2">
                        <FormButton
                            text="로그인"
                            type="submit"
                            isLoading={isLoading}
                        />
                    </div>
                </form>
                {/* 카드 하단 회원가입 링크 */}
                <div className="flex justify-center items-center gap-1 mt-6 text-sm">
                    <span className="text-[#8C8C8C]">계정이 없으신가요?</span>
                    <Link
                        to="/signup"
                        className="font-bold text-[#D67629] hover:underline"
                    >
                        회원가입
                    </Link>
                </div>
            </section>
        </div>
    );
}
