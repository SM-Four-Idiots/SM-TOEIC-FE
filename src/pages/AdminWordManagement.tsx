import React, { useEffect, useState, useCallback, memo } from "react";
import FormButton from "@/components/common/button/FormButton";
import FormInput from "@/components/common/input/FormInput";
import { deleteAdminWord } from "@/api/admin";

// 🌟 추가된 API 및 타입 임포트 (경로는 실제 구조에 맞게 조정해 주세요)
import { getWords } from "@/api/wordApi";
import type { Word } from "@/types/word";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { openModal, resetChangeSuccess } from "@/store/modalSlice";

// 티어별 뱃지 스타일 헬퍼 (기존과 동일)
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

interface WordTableRowProps {
    item: Word;
    onDelete: (id: number) => Promise<void>;
    onEdit: (word: Word) => void; // 🌟 수정 핸들러 타입 추가
}

// [Front-end 역할] 테이블 행 컴포넌트 (기존과 동일)
const WordTableRow = memo(({ item, onDelete, onEdit }: WordTableRowProps) => {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDeleteClick = async () => {
        if (window.confirm("정말로 이 단어를 삭제하시겠습니까?")) {
            setIsDeleting(true);
            try {
                await onDelete(item.id);
            } catch {
                setIsDeleting(false);
            }
        }
    };

    return (
        <tr className="border-b border-[#EAEAEA] hover:bg-[#FCFAF6] transition-colors">
            {/* 🌟 주의: item.word, item.meaning 등이 실제 Word 타입의 속성명과 일치해야 합니다. */}
            <td className="py-4 px-6 font-semibold">{item.voca}</td>
            <td className="py-4 px-6 text-[#555]">{item.meaning}</td>
            <td className="py-4 px-6">
                <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${getTierStyle(item.tier)}`}
                >
                    {item.tier}
                </span>
            </td>
            <td className="py-4 px-6 text-[#8C8C8C]">{"예문 테스트"}</td>
            <td className="py-4 px-6">
                <div className="flex items-center justify-center gap-3">
                    <button
                        type="button"
                        className="text-[#8C8C8C] hover:text-[#1A1A1A] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                        disabled={isDeleting}
                        aria-label="수정"
                        onClick={() => onEdit(item)}
                    >
                        {/* 기존 svg 아이콘 */}
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

export default function AdminWordManagement() {
    const dispatch = useAppDispatch();
    const [words, setWords] = useState<Word[]>([]); // 🌟 타입 변경
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // 🌟 모달에서 성공 처리가 되었는지 감지하기 위한 state
    const { isChangeCompleted } = useAppSelector((state) => state.modal);

    // (필요하다면 상단에 axios를 임포트하세요. 이미 getWords 내부에서만 쓴다면 문자열/이름으로 체크해도 무방합니다.)
    // import axios from 'axios';

    // 🌟 추가 모달 오픈 핸들러
    const handleCreateWord = useCallback(() => {
        dispatch(openModal({ modalType: "createWordModal" }));
    }, [dispatch]);

    const handleEditWord = useCallback(
        (word: Word) => {
            dispatch(openModal({ modalType: "changeWordModal", word }));
        },
        [dispatch]
    );

    const fetchWords = useCallback(async (signal?: AbortSignal) => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await getWords(signal);
            setWords(data);
        } catch (error: unknown) {
            // 🌟 수정된 부분: AbortError뿐만 아니라 Axios의 CanceledError도 함께 무시합니다.
            if (
                error instanceof Error &&
                (error.name === "AbortError" ||
                    error.name === "CanceledError" ||
                    error.message === "canceled")
            ) {
                return; // 컴포넌트 언마운트로 인한 정상적인 취소이므로 에러 처리 안 함
            }

            // (선택) axios가 임포트되어 있다면 아래 방식이 가장 확실합니다.
            // if (axios.isCancel(error)) return;

            const errorMessage =
                error instanceof Error
                    ? error.message
                    : "단어 목록을 불러오는 데 실패했습니다.";
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        const abortController = new AbortController();
        void fetchWords(abortController.signal);

        return () => {
            abortController.abort();
        };
    }, [fetchWords]);

    // 🌟 추가/수정 성공 시 자동으로 목록 새로고침 로직
    useEffect(() => {
        if (isChangeCompleted) {
            const abortController = new AbortController();
            void fetchWords(abortController.signal);
            // 패치가 끝나면 다시 false로 초기화해주어야 다음 생성/수정 때도 감지됩니다.
            dispatch(resetChangeSuccess());
        }
    }, [isChangeCompleted, fetchWords, dispatch]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: 프론트엔드 필터링 또는 백엔드 검색 API 연동
    };

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
            throw error;
        }
    }, []);

    // 렌더링 UI 로직은 기존과 100% 동일하므로 생략 없이 그대로 사용
    if (isLoading) {
        return (
            <div className="w-full min-h-[50vh] flex items-center justify-center text-[#8C8C8C]">
                데이터를 불러오는 중입니다...
            </div>
        );
    }
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

    return (
        <div className="w-full max-w-6xl mx-auto p-8 flex flex-col gap-6 text-[#1A1A1A]">
            {/* 상단 헤더 영역 */}
            <section className="flex justify-between items-end">
                <div className="flex flex-col gap-1">
                    <h1 className="text-2xl font-bold">단어 관리</h1>
                    <p className="text-[#8C8C8C] text-sm">
                        토익 단어를 추가, 수정, 삭제하세요
                    </p>
                </div>
                <div className="w-32">
                    <FormButton
                        text="+ 단어 추가"
                        type="button"
                        onClick={handleCreateWord}
                    />
                </div>
            </section>

            {/* 검색 폼 (생략 없이 원본 유지) */}
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

            {/* 테이블 영역 */}
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
                                    <WordTableRow
                                        key={item.id}
                                        item={item}
                                        onDelete={handleDeleteWord}
                                        onEdit={handleEditWord} // 🌟 props로 onEdit 전달
                                    />
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
