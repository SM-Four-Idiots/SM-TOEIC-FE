/**
 * 프로젝트 전반에서 사용되는 공통 FormInput 컴포넌트입니다.
 * React Hook Form과의 원활한 연동을 위해 forwardRef를 사용하여 구현했습니다.
 *
 * 주요 기능은 다음과 같습니다.
 * - 기본 input 태그의 모든 속성(type, placeholder, disabled, onChange 등)을 그대로 상속받아 사용할 수 있습니다.
 * - label: 부모 컴포넌트에서 직접 라벨 텍스트를 주입받아 사용합니다.
 * - error: 검증 로직(Zod 등)에서 발생한 에러 메시지를 전달받아, 붉은 테두리와 함께 에러 문구를 하단에 렌더링합니다.
 * - isPlaceholder: true일 경우 label 텍스트를 placeholder로 활용하며 상단의 라벨은 숨김 처리합니다.
 */

import { forwardRef, type ForwardedRef, type InputHTMLAttributes } from "react";

// InputHTMLAttributes를 상속받아 기본 input 속성들(type, placeholder 등)을 모두 지원함
interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
    error?: string;
    label?: string;
    isPlaceholder?: boolean;
}

const _Input = (
    { isPlaceholder, label, name, error, className, ...rest }: FormInputProps,
    ref: ForwardedRef<HTMLInputElement>
) => {
    return (
        <div className="flex flex-col">
            {label && !isPlaceholder && (
                <label
                    htmlFor={name}
                    className="text-sm font-bold text-[#1A1A1A] mb-1.5"
                >
                    {label}
                </label>
            )}
            <input
                ref={ref}
                id={name}
                name={name}
                placeholder={isPlaceholder ? label : rest.placeholder}
                {...rest}
                className={`w-full h-11 px-4 rounded-[10px] bg-white border outline-none transition-all duration-200 text-sm text-[#1A1A1A] placeholder:text-[#8C8C8C] disabled:bg-[#F5F5F5] disabled:text-[#8C8C8C] disabled:cursor-not-allowed
                ${
                    error
                        ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500" // 에러 발생 시 빨간색 강조
                        : "border-[#EAEAEA] hover:border-[#D67629]/50 focus:border-[#D67629] focus:ring-1 focus:ring-[#D67629]" // 평상시 연한 테두리, 포커스 시 메인 오렌지 색상
                } ${className || ""}`}
            />
            {error && (
                <span className="text-sm font-medium text-red-500 mt-1.5">
                    {error}
                </span>
            )}
        </div>
    );
};

export default forwardRef(_Input);
