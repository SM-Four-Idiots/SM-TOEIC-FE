import React, { useEffect, useState, useCallback, memo } from "react";
import FormButton from "@/components/common/button/FormButton";
import FormInput from "@/components/common/input/FormInput";
import { deleteAdminWord } from "@/api/admin";

// [임시 타입 선언]
interface TempWord {
    id: number;
    word: string;
    meaning: string;
    tier: string;
    example: string;
}

const MOCK_WORDS: TempWord[] = [
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

//티어별 뱃지 스타일 헬퍼
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
            return {
                text: `Tier ${tierLevel}`,
                style: "bg-gray-100 text-gray-600",
            };
    }
};

interface WordTableRowProps {
    item: TempWord;
    onDelete: (id: number) => Promise<void>;
}

// [Front-end 역할] 테이블의 각 행(Row)을 담당하는 컴포넌트입니다. React.memo를 통해 부모 상태 변경 시 불필요한 리렌더링을 방지합니다.
const WordTableRow = memo(({ item, onDelete }: WordTableRowProps) => {
    // 해당 행(Row)만의 독립적인 로딩 상태 (버튼 연타 방어용)
    const [isDeleting, setIsDeleting] = useState(false);

    /*
     * [Front-end 역할] 유저가 개별 행의 '삭제' 버튼을 클릭했을 때 실행되는 핸들러입니다.
     * 자체 상태(isDeleting)를 활성화하여 UI 적으로 중복 클릭을 방지하고, 부모로부터 전달받은 API 호출 함수를 실행합니다.
     */
    const handleDeleteClick = async () => {
        if (window.confirm("정말로 이 단어를 삭제하시겠습니까?")) {
            setIsDeleting(true); // 버튼 비활성화 및 로딩 UI 트리거
            try {
                await onDelete(item.id);
                // 성공 시 부모에 의해 언마운트되므로 setIsDeleting(false) 불필요
            } catch (error) {
                // 실패 시 유저가 다시 시도할 수 있도록 버튼 활성화
                setIsDeleting(false);
            }
        }
    };

    return (
        <tr className="border-b border-[#EAEAEA] hover:bg-[#FCFAF6] transition-colors">
            <td className="py-4 px-6 font-semibold">{item.word}</td>
            <td className="py-4 px-6 text-[#555]">{item.meaning}</td>
            <td className="py-4 px-6">
                <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${getTierStyle(item.tier)}`}
                >
                    {item.tier}
                </span>
            </td>
            <td className="py-4 px-6 text-[#8C8C8C]">{item.example}</td>
            <td className="py-4 px-6">
                <div className="flex items-center justify-center gap-3">
                    <button
                        type="button"
                        className="text-[#8C8C8C] hover:text-[#1A1A1A] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                        disabled={isDeleting}
                        aria-label="수정"
                    >
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
                            className="lucide lucide-edit w-4 h-4"
                        >
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4Z"></path>
                        </svg>
                    </button>
                    <button
                        type="button"
                        className={`transition-colors ${isDeleting ? "text-gray-400 cursor-not-allowed" : "text-[#FF4D4F] hover:text-[#D43F3F]"}`}
                        onClick={() => void handleDeleteClick()}
                        disabled={isDeleting}
                        aria-label="삭제"
                    >
                        {isDeleting ? (
                            <span className="text-xs font-medium animate-pulse">
                                삭제중
                            </span>
                        ) : (
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
                                className="lucide lucide-trash-2 w-4 h-4"
                            >
                                <path d="M3 6h18"></path>
                                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                                <line x1="10" x2="10" y1="11" y2="17"></line>
                                <line x1="14" x2="14" y1="11" y2="17"></line>
                            </svg>
                        )}
                    </button>
                </div>
            </td>
        </tr>
    );
});
WordTableRow.displayName = "WordTableRow";

// =====================================================================
// 메인 컴포넌트
// =====================================================================
export default function AdminWordManagement() {
    const [words, setWords] = useState<TempWord[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    /**
     * [Front-end 역할] 컴포넌트 마운트 시 최초 1회 전체 단어 목록을 불러와 UI 상태에 업데이트하는 함수입니다.
     * [Back-end & DB 흐름]
     * 1. API 연동 시 백엔드의 'GET /admin/words' 엔드포인트를 호출합니다.
     * 2. DB의 `Word` 테이블에서 조건(페이지네이션, 필터링 등)에 맞는 데이터를 SELECT 쿼리로 조회합니다.
     * 3. 조회된 엔티티(Entity) 리스트를 JSON 배열 형태로 반환하여 프론트엔드에 응답합니다.
     */
    // useCallback을 사용하여 의존성 배열에 의한 불필요한 함수 재생성 방지
    const fetchWords = useCallback(async () => {
        setIsLoading(true);
        setError(null); // 재시도 시 기존 에러 초기화
        try {
            await new Promise((resolve) => setTimeout(resolve, 300));
            setWords(MOCK_WORDS);
        } catch (error: unknown) {
            const errorMessage =
                error instanceof Error
                    ? error.message
                    : "단어 목록을 불러오는 데 실패했습니다.";
            setError(errorMessage); // alert 대신 상태로 관리
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        void fetchWords();
    }, [fetchWords]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
    };

    /*
     * [Front-end 역할] 단어 삭제 API를 호출하고 성공 시 로컬 상태(State)에서 해당 단어를 제거(Optimistic Update 방식 일부 차용)하여 즉시 뷰를 갱신합니다.
     * @param wordId 삭제할 단어의 ID
     * * [Back-end & DB 흐름]
     * 1. 실제 deleteAdminWord 함수를 통해 HTTP DELETE 요청이 발생합니다.
     * 2. 백엔드 DB에서 해당 레코드가 영구적으로 지워집니다(또는 삭제 상태 플래그 변경).
     * 3. DB 작업이 성공적으로 커밋되면 프론트엔드의 화면 단에서도 해당 항목을 필터링해 없앱니다.
     */
    // 하위 컴포넌트(WordTableRow)에 전달될 함수이므로 useCallback으로 감싸 리렌더링 방지
    const handleDeleteWord = useCallback(async (wordId: number) => {
        try {
            await deleteAdminWord(wordId);
            alert("단어가 성공적으로 삭제되었습니다.");
            setWords((prevWords) =>
                prevWords.filter((word) => word.id !== wordId)
            );
        } catch (error: unknown) {
            const errorMessage =
                error instanceof Error
                    ? error.message
                    : "단어 삭제에 실패했습니다.";
            alert(errorMessage);
            throw error; // 에러를 던져서 자식 컴포넌트(WordTableRow)가 isDeleting을 false로 바꿀 수 있게 함
        }
    }, []);

    // 1. 로딩 UI
    if (isLoading) {
        return (
            <div className="w-full min-h-[50vh] flex items-center justify-center text-[#8C8C8C]">
                데이터를 불러오는 중입니다...
            </div>
        );
    }

    // 2. 에러 UI (빈 화면 방어)
    if (error) {
        return (
            <div className="w-full min-h-[50vh] flex flex-col items-center justify-center gap-4 text-[#1A1A1A]">
                <p className="text-red-500 font-medium">{error}</p>
                <button
                    onClick={() => void fetchWords()}
                    className="px-4 py-2 bg-[#EAEAEA] rounded-lg hover:bg-[#D4D4D4] transition-colors"
                >
                    다시 시도
                </button>
            </div>
        );
    }

    // 3. 정상 렌더링 UI
    return (
        <div className="w-full max-w-6xl mx-auto p-8 flex flex-col gap-6 text-[#1A1A1A]">
            <section className="flex justify-between items-end">
                <div className="flex flex-col gap-1">
                    <h1 className="text-2xl font-bold">단어 관리</h1>
                    <p className="text-[#8C8C8C] text-sm">
                        토익 단어를 추가, 수정, 삭제하세요
                    </p>
                </div>
                <div className="w-32">
                    <FormButton text="+ 단어 추가" />
                </div>
            </section>

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
                        className="lucide lucide-search absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C8C8C]"
                        aria-hidden="true"
                    >
                        <path d="m21 21-4.34-4.34"></path>
                        <circle cx="11" cy="11" r="8"></circle>
                    </svg>
                    <FormInput
                        placeholder="단어 또는 뜻 검색..."
                        className="pl-12 h-12 border-none ring-0 focus:ring-0"
                    />
                </div>
                <div className="w-px h-6 bg-[#EAEAEA]"></div>
                <select className="px-4 py-2 bg-transparent outline-none text-sm cursor-pointer">
                    <option value="all">전체</option>
                    <option value="bronze">Bronze</option>
                    <option value="silver">Silver</option>
                    <option value="gold">Gold</option>
                    <option value="diamond">Diamond</option>
                </select>
            </form>

            <div className="flex flex-col gap-3">
                <p className="text-sm font-medium">
                    총 <span className="font-bold">{words.length}</span>개 단어
                </p>

                <div className="bg-white rounded-2xl border border-[#EAEAEA] shadow-sm overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-[#EAEAEA] text-sm font-bold bg-[#FAFAFA]">
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
                            {words.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={5}
                                        className="py-8 text-center text-[#8C8C8C]"
                                    >
                                        등록된 단어가 없습니다.
                                    </td>
                                </tr>
                            ) : (
                                words.map((item) => (
                                    // 분리된 컴포넌트 렌더링 (메모이제이션 적용됨)
                                    <WordTableRow
                                        key={item.id}
                                        item={item}
                                        onDelete={handleDeleteWord}
                                    />
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            );
        }
        if (error) {
            return (
                <div className="py-20 flex flex-col justify-center items-center gap-4">
                    <p className="text-red-500 font-medium">{error}</p>
                    <button
                        onClick={() => void fetchWords()}
                        className="px-4 py-2 bg-[#1A1A1A] text-white rounded-lg text-sm font-medium hover:bg-[#333333] transition-colors"
                    >
                        다시 시도
                    </button>
                </div>
            );
        }
        if (safeWords.length === 0) {
            return (
                <div className="py-20 text-center text-[#8C8C8C]">
                    등록된 단어가 없습니다.
                </div>
            );
        }
        return safeWords.map((item) => {
            const badge = getBadgeStyle(item.tierLevel);
            return (
                <article
                    key={item.id}
                    className="flex items-start justify-between p-6 bg-white rounded-2xl border border-[#EAEAEA] shadow-[0_2px_8px_rgba(0,0,0,0.02)] transition-transform hover:-translate-y-0.5"
                >
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-3">
                            <span className="text-xl font-bold text-[#1A1A1A]">
                                {item.english}
                            </span>
                            <span
                                className={`px-2.5 py-0.5 rounded-full text-[12px] font-bold ${badge.style}`}
                            >
                                {badge.text}
                            </span>
                            {item.category && (
                                <span className="px-2 py-0.5 rounded-md bg-gray-50 border border-gray-200 text-[11px] text-gray-500">
                                    {item.category}
                                </span>
                            )}
                        </div>
                        <div className="flex flex-col gap-1 mt-1">
                            <p className="text-[15px] font-medium text-[#444444]">
                                {item.meaning}
                            </p>
                        </div>
                    </div>
                </article>
            );
        });
    };

    // [프론트엔드] 전체 레이아웃 및 섹션 렌더링
    return (
        <div className="flex min-h-screen">
            <main className="flex-1 w-full max-w-200 mx-auto px-6 py-10 flex flex-col gap-8">
                <section className="flex flex-col gap-6">
                    <div className="flex flex-col gap-1.5">
                        <h1 className="text-2xl font-bold text-[#1A1A1A]">
                            단어 관리
                        </h1>
                        <p className="text-sm text-[#8C8C8C]">
                            등록된 단어를 관리하세요
                        </p>
                    </div>
                    {!isLoading && !error && (
                        <div className="flex gap-4 text-[14px] text-[#555555]">
                            <span>
                                총{" "}
                                <strong className="font-bold text-[#1A1A1A]">
                                    {safeWords.length}
                                </strong>
                                개 단어
                            </span>
                        </div>
                    )}
                </section>
                <section className="flex flex-col gap-4">
                    {renderContent()}
                </section>
            </main>
        </div>
    );
}
