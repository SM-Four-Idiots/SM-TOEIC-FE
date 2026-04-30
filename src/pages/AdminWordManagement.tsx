import FormButton from "@/components/common/button/FormButton";
import FormInput from "@/components/common/input/FormInput";

// 테스트용 목업 데이터
const MOCK_WORDS = [
    {
        id: 1,
        word: "accomplish",
        meaning: "성취하다, 달성하다",
        tier: "Bronze",
        example: "She accomplished her goal.",
    },
    {
        id: 2,
        word: "acknowledge",
        meaning: "인정하다, 승인하다",
        tier: "Bronze",
        example: "He acknowledged his mistake.",
    },
    {
        id: 3,
        word: "acquire",
        meaning: "얻다, 습득하다",
        tier: "Bronze",
        example: "She acquired new skills.",
    },
    {
        id: 4,
        word: "adequate",
        meaning: "충분한, 적절한",
        tier: "Silver",
        example: "The salary is adequate.",
    },
    {
        id: 5,
        word: "adjust",
        meaning: "조정하다, 적응하다",
        tier: "Silver",
        example: "Please adjust the volume.",
    },
    {
        id: 6,
        word: "administer",
        meaning: "관리하다, 운영하다",
        tier: "Gold",
        example: "He administers the program.",
    },
    {
        id: 7,
        word: "advocate",
        meaning: "옹호하다, 지지하다",
        tier: "Gold",
        example: "She advocates for change.",
    },
    {
        id: 8,
        word: "affluent",
        meaning: "부유한",
        tier: "Diamond",
        example: "An affluent neighborhood.",
    },
];

// 티어별 뱃지 스타일 헬퍼
const getTierStyle = (tier: string) => {
    switch (tier) {
        case "Bronze":
            return "bg-[#F3E5D8] text-[#A67C52]";
        case "Silver":
            return "bg-[#E8ECEF] text-[#6C7A89]";
        case "Gold":
            return "bg-[#FFF4CE] text-[#D4A017]";
        case "Diamond":
            return "bg-[#E0F7FA] text-[#00ACC1]";
        default:
            return "bg-gray-100 text-gray-600";
    }
};

export default function AdminWordManagement() {
    // 폼 제출 기본 동작 방지
    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        // 검색 로직 추가...
    };

    return (
        // 전체 레이아웃 폭 조정 및 중앙 정렬 (필요시 max-w-5xl 등 조절)
        <div className="w-full max-w-6xl mx-auto p-8 flex flex-col gap-6 text-[#1A1A1A]">
            {/* 1. 헤더 섹션 */}
            <section className="flex justify-between items-end">
                <div className="flex flex-col gap-1">
                    <h1 className="text-2xl font-bold">단어 관리</h1>
                    <p className="text-[#8C8C8C] text-sm">
                        토익 단어를 추가, 수정, 삭제하세요
                    </p>
                </div>
                <div className="w-32">
                    {/* 만들어두신 FormButton 사용 (기본값 main = 오렌지색) */}
                    <FormButton text="+ 단어 추가" />
                </div>
            </section>

            {/* 2. 검색 섹션 */}
            <form
                onSubmit={handleSearch}
                className="flex items-center gap-3 bg-white p-4 rounded-2xl border border-[#EAEAEA] shadow-sm"
            >
                <div className="relative flex-1">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-search absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"
                        aria-hidden="true"
                    >
                        <path d="m21 21-4.34-4.34"></path>
                        <circle cx="11" cy="11" r="8"></circle>
                    </svg>
                    <FormInput
                        placeholder="단어 또는 뜻 검색..."
                        className="pl-12 h-12! border-none ring-0 focus:ring-0" // 내부 테두리 제거
                    />
                </div>
                <div className="w-px h-6 bg-[#EAEAEA]"></div> {/* 구분선 */}
                <select className="px-4 py-2 bg-transparent outline-none text-sm cursor-pointer">
                    <option value="all">전체</option>
                    <option value="bronze">Bronze</option>
                    <option value="silver">Silver</option>
                    <option value="gold">Gold</option>
                    <option value="diamond">Diamond</option>
                </select>
            </form>

            {/* 3. 테이블 리스트 섹션 */}
            <div className="flex flex-col gap-3">
                <p className="text-sm font-medium">
                    총 <span className="font-bold">{MOCK_WORDS.length}</span>개
                    단어
                </p>

                <div className="bg-white rounded-2xl border border-[#EAEAEA] shadow-sm overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-[#EAEAEA] text-sm font-bold">
                                <th className="py-4 px-6 font-medium w-[15%]">
                                    단어
                                </th>
                                <th className="py-4 px-6 font-medium w-[20%]">
                                    뜻
                                </th>
                                <th className="py-4 px-6 font-medium w-[10%]">
                                    티어
                                </th>
                                <th className="py-4 px-6 font-medium w-[45%]">
                                    예문
                                </th>
                                <th className="py-4 px-6 font-medium text-center w-[10%]">
                                    관리
                                </th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            {MOCK_WORDS.map((item) => (
                                <tr
                                    key={item.id}
                                    className="border-b border-[#EAEAEA] hover:bg-[#FCFAF6] transition-colors"
                                >
                                    <td className="py-4 px-6 font-semibold">
                                        {item.word}
                                    </td>
                                    <td className="py-4 px-6 text-[#555]">
                                        {item.meaning}
                                    </td>
                                    <td className="py-4 px-6">
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-bold ${getTierStyle(item.tier)}`}
                                        >
                                            {item.tier}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6 text-[#8C8C8C]">
                                        {item.example}
                                    </td>
                                    <td className="py-4 px-6">
                                        <div className="flex items-center justify-center gap-3">
                                            <button className="text-[#8C8C8C] hover:text-[#1A1A1A] transition-colors">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="24"
                                                    height="24"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    className="lucide lucide-pencil w-4 h-4"
                                                    aria-hidden="true"
                                                >
                                                    <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"></path>
                                                    <path d="m15 5 4 4"></path>
                                                </svg>
                                            </button>
                                            <button className="text-[#8C8C8C] hover:text-red-500 transition-colors">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="24"
                                                    height="24"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    className="lucide lucide-trash2 lucide-trash-2 w-4 h-4"
                                                    aria-hidden="true"
                                                >
                                                    <path d="M10 11v6"></path>
                                                    <path d="M14 11v6"></path>
                                                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"></path>
                                                    <path d="M3 6h18"></path>
                                                    <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                                </svg>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
