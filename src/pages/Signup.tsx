import { signupApi } from "@/api/authApi";
import FormButton from "@/components/common/button/FormButton";
import FormInput from "@/components/common/input/FormInput";
import { registerSchema, type RegisterType } from "@/schema/authSchema";
import { handleApiError } from "@/utils/errorHandler";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        clearErrors,
    } = useForm<RegisterType>({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = handleSubmit(async (data) => {
        setIsLoading(true);
        try {
            await signupApi({
                nickname: data.nickname,
                email: data.email,
                password: data.password,
            });
            void navigate("/login");
        } catch (err) {
            handleApiError(err, setError, "회원가입 실패: 다시 시도해주세요.");
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
                        회원가입
                    </h2>
                    <p className="text-sm text-[#8C8C8C]">
                        새로운 계정을 만들어 학습을 시작하세요
                    </p>
                </div>
                {/* 로그인 폼 */}
                <form
                    onSubmit={(e) => void onSubmit(e)}
                    className="flex flex-col gap-5"
                >
                    <FormInput
                        label="닉네임"
                        type="text"
                        placeholder="홍길동"
                        required
                        {...register("nickname")}
                        error={errors.nickname?.message}
                        isPlaceholder={false}
                        onFocus={() => clearErrors("root")}
                    />
                    <FormInput
                        label="이메일"
                        type="text"
                        placeholder="example@email.com"
                        required
                        {...register("email")}
                        error={errors.email?.message}
                        isPlaceholder={false}
                        onFocus={() => clearErrors("root")}
                    />
                    <FormInput
                        label="비밀번호"
                        type="password"
                        placeholder="8자 이상 입려갛세요"
                        {...register("password")}
                        required
                        error={errors.password?.message}
                        onFocus={() => clearErrors("root")}
                    />
                    <FormInput
                        label="비밀번호 확인"
                        type="password"
                        placeholder="비밀번호를 다시 입력하세요"
                        {...register("passwordConfirmation")}
                        required
                        error={errors.passwordConfirmation?.message}
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
                    <span className="text-[#8C8C8C]">
                        이미 계정이 있으신가요?
                    </span>
                    <Link
                        to="/login"
                        className="font-bold text-[#D67629] hover:underline"
                    >
                        로그인
                    </Link>
                </div>
            </section>
        </div>
    );
}
