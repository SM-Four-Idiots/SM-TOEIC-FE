import LinkButton from "@/components/common/button/LinkButton";

export default function RankUpTestMain() {
    return (
        // 전체 컨테이너: 너비 제한 및 가운데 정렬
        <div className="w-full max-w-[480px] mx-auto px-6 flex flex-col items-center gap-6 mt-12">
            {/* 1. 상단 타이틀 영역 */}
            <section className="flex flex-col items-center gap-1">
                <h1 className="text-2xl font-bold text-gray-900">
                    승급 테스트
                </h1>
                <p className="text-gray-500 font-medium">Silver 티어 도전</p>
            </section>

            {/* 2. 메인 카드 영역 (흰색 배경, 그림자, 둥근 모서리) */}
            <section className="w-full bg-white rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.05)] border border-gray-100 p-6 md:p-8 flex flex-col">
                {/* 상단 아이콘 및 안내 문구 */}
                <div className="flex flex-col items-center text-center mb-8">
                    {/* 트로피 아이콘 컨테이너 (연한 오렌지 배경 원형) */}
                    <div className="w-16 h-16 bg-[#FDF1E8] rounded-full flex justify-center items-center mb-4">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="28"
                            height="28"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#D67629" // TOEST 브랜드 컬러에 맞춤
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-trophy"
                            aria-hidden="true"
                        >
                            <path d="M10 14.66v1.626a2 2 0 0 1-.976 1.696A5 5 0 0 0 7 21.978"></path>
                            <path d="M14 14.66v1.626a2 2 0 0 0 .976 1.696A5 5 0 0 1 17 21.978"></path>
                            <path d="M18 9h1.5a1 1 0 0 0 0-5H18"></path>
                            <path d="M4 22h16"></path>
                            <path d="M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1z"></path>
                            <path d="M6 9H4.5a1 1 0 0 1 0-5H6"></path>
                        </svg>
                    </div>
                    <h2 className="text-[17px] font-bold text-gray-900 mb-1.5">
                        테스트 안내
                    </h2>
                    <p className="text-sm text-gray-500">
                        한글 뜻을 보고 영문 철자를 입력하세요
                    </p>
                </div>

                {/* 리스트 영역 (문제 수, 통과 기준, 남은 횟수) */}
                <div className="flex flex-col mb-6">
                    <div className="flex justify-between items-center py-4 border-b border-gray-100">
                        <span className="text-gray-500 text-sm font-medium">
                            문제 수
                        </span>
                        <span className="font-semibold text-gray-900 text-sm">
                            5문제
                        </span>
                    </div>
                    <div className="flex justify-between items-center py-4 border-b border-gray-100">
                        <span className="text-gray-500 text-sm font-medium">
                            통과 기준
                        </span>
                        <span className="font-semibold text-gray-900 text-sm">
                            70% 이상 (4문제)
                        </span>
                    </div>
                    <div className="flex justify-between items-center py-4">
                        <span className="text-gray-500 text-sm font-medium">
                            남은 도전 횟수
                        </span>
                        <span className="font-bold text-[#D67629] text-sm">
                            3회
                        </span>
                    </div>
                </div>

                {/* 버튼 (LinkButton의 variant 기본값이 'main' 이므로 바로 사용) */}
                <LinkButton
                    text="테스트 시작"
                    url="/"
                    className="py-3.5 text-[15px]" // 버튼을 조금 더 도톰하게 만들어주기 위해 패딩 추가
                />
            </section>

            {/* 3. 하단 안내 문구 */}
            <p className="text-sm text-gray-400 font-medium mt-2">
                하루에 총 3번까지 응시할 수 있습니다
            </p>
        </div>
    );
}
