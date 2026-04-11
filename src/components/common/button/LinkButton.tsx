/*
 * Link의 url 이동을 담당하는 공용 버튼 컴포넌트 입니다.
 *
 * FormButton과 동일한 디자인 방식(variant)를 공유합니다.
 *
 * 버튼의 추가 스타일 레이아웃인 variant는 'main', 'outline', 'soft'로 정의됩니다.
 * - 'main'은 TOEST의 브랜드 오렌지 색상(#D67629)과 흰색 텍스트를 사용하는 시그니처 버튼이며,
 * - 'outline'은 흰 배경에 포인트 그린(#34C759) 글씨와 border를 쓰는 secondary 버튼입니다.
 * - 'soft'는 연한 베이지 배경(#F0E5D5)에 어두운 글씨를 쓰는 부드러운 느낌의 서브 버튼입니다.
 *
 * 버튼의 variant 기본값은 'main'이며,
 * 처음에 정의된 commonStyle + variant + 추가 className으로 버튼의 스타일이 결정됩니다.
 */

import { Link } from "react-router-dom";

// 버튼 종류를 직관적인 네이밍으로 정의
type ButtonVariant = "main" | "outline" | "soft";

// 버튼 Props 타입 정의
interface LinkButtonProps {
    text: React.ReactNode;
    url: string;
    variant?: ButtonVariant;
    className?: string;
}

// variant 별로 적용될 Tailwind 클래스 맵핑
const variantStyles: Record<ButtonVariant, string> = {
    main: "bg-[#D67629] text-white", // 퀘스트 시작 등 핵심 액션
    outline: "bg-white text-[#34C759] border border-[#34C759]", // 승급 시험 등 강조되는 서브 액션
    soft: "bg-[#F0E5D5] text-[#1A1A1A]", // 일일 퀘스트 하러 가기 등 부가적인 액션
};

export default function LinkButton({
    text,
    url,
    variant = "main", // 기본값을 main으로 변경
    className,
}: LinkButtonProps) {
    // 공통 스타일 정의
    const commonStyle =
        "flex justify-center items-center w-full py-2 rounded-[10px] transition-all duration-150 ease-out hover:brightness-75 active:scale-[0.98]";

    return (
        <Link
            to={url}
            className={`${commonStyle} ${variantStyles[variant]} ${className ?? ""}`}
        >
            <span className="flex items-center gap-1.5 font-medium">
                {text}
            </span>
        </Link>
    );
}
