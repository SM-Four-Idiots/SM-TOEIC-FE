import FormButton from "@/components/common/button/FormButton";
import FormInput from "@/components/common/input/FormInput";

export default function PromotionTest() {
    return (
        // 전체를 감싸는 컨테이너 (너비 제한 및 중앙 정렬)
        <div className="w-full max-w-[520px] mx-auto px-4 flex flex-col gap-5 mt-20">
            {/* 상단: 진행도 섹션 */}
            <section className="flex flex-col gap-2">
                <div className="flex justify-between items-center text-sm font-bold text-[#1A1A1A] px-1">
                    <span>진행도</span>
                    <span>1 / 5</span>
                </div>
                {/* 프로그레스 바 배경 (연한 베이지) */}
                <div className="w-full h-2.5 bg-[#F0E5D5] rounded-full overflow-hidden">
                    {/* 프로그레스 바 채워진 부분 (메인 오렌지) */}
                    <div className="w-1/5 h-full bg-[#D67629] rounded-full transition-all duration-300" />
                </div>
            </section>

            {/* 하단: 문제 카드 섹션 */}
            <section className="bg-white rounded-[20px] shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-[#EAEAEA] px-6 py-12 flex flex-col items-center w-full mt-2">
                {/* 문제 번호 뱃지 */}
                <div className="px-4 py-1 bg-white border border-[#EAEAEA] rounded-full text-xs font-bold text-[#1A1A1A] mb-8 shadow-sm">
                    문제 1
                </div>

                {/* 문제 한글 뜻 */}
                <h1 className="text-[28px] font-bold text-[#1A1A1A] mb-4 text-center">
                    성취하다, 달성하다
                </h1>

                {/* 영어 힌트 (자간을 넓혀서 언더스코어가 자연스럽게 보이도록 처리) */}
                <p className="text-lg text-[#8C8C8C] tracking-[0.3em] mb-10 text-center">
                    a_ _ _ _ _ _h
                </p>

                {/* 입력 및 제출 폼 */}
                <form className="w-full flex flex-col gap-3 px-2">
                    <FormInput
                        name="answer"
                        placeholder="영어 단어를 입력하세요"
                        // 인풋 텍스트와 placeholder를 모두 가운데 정렬
                        className="text-center placeholder:text-center"
                    />
                    <FormButton
                        text="제출"
                        variant="main"
                        /*
                         * 이미지의 버튼 색상이 브랜드 기본 컬러(#D67629)보다 살짝 부드러운 톤입니다.
                         * !bg-[색상]을 활용해 덮어씌웠으며, 원치 않으시면 className 부분을 지우시면
                         * FormButton 본연의 main 색상으로 렌더링됩니다.
                         */
                        className="h-11 !bg-[#E6B89C] hover:!bg-[#D67629] !text-white"
                    />
                </form>
            </section>
        </div>
    );
}
