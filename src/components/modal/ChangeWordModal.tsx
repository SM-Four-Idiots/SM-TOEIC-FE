import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { closeModal, notifyChangeSuccess } from "@/store/modalSlice";
import FormButton from "@/components/common/button/FormButton";
import FormInput from "@/components/common/input/FormInput";
import { updateAdminWord } from "@/api/admin";

export default function ChangeWordModal() {
    const dispatch = useAppDispatch();
    const { selectedWord } = useAppSelector((state) => state.modal);

    const [voca, setVoca] = useState<string>("");
    const [meaning, setMeaning] = useState<string>("");
    const [tier, setTier] = useState<string>("Bronze");

    useEffect(() => {
        if (selectedWord) {
            setVoca(selectedWord.voca);
            setMeaning(selectedWord.meaning);
            setTier(selectedWord.tier);
        }
    }, [selectedWord]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // 🌟 selectedWord가 없거나, id가 없으면 조기 종료
        if (!selectedWord || !selectedWord.id) return;

        try {
            // 🌟 API 호출 로직 연결 (만들어둔 함수 사용)
            await updateAdminWord(selectedWord.id, {
                voca,
                meaning,
                tier,
            });

            alert("성공적으로 수정되었습니다.");
            dispatch(notifyChangeSuccess());
            dispatch(closeModal());
        } catch (error: unknown) {
            // admin.ts에서 던진 에러 메시지를 그대로 받아서 얼럿으로 띄워줍니다.
            const errorMessage =
                error instanceof Error ? error.message : "수정에 실패했습니다.";
            alert(errorMessage);
        }
    };

    return (
        <div className="w-full">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-[#1A1A1A]">단어 수정</h2>
                <button
                    type="button" // 🌟 버튼 타입 명시 (접근성 및 예기치 않은 submit 방지)
                    onClick={() => {
                        dispatch(closeModal());
                    }}
                    className="text-[#8C8C8C] hover:text-[#1A1A1A]"
                    aria-label="닫기"
                >
                    ✕
                </button>
            </div>

            {/* 🌟 onSubmit에 void 처리 추가하여 Promise 반환 에러 해결 */}
            <form onSubmit={void handleSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                    {/* 🌟 htmlFor 추가 */}
                    <label
                        htmlFor="word-voca"
                        className="text-sm font-semibold text-[#555]"
                    >
                        단어
                    </label>
                    <FormInput
                        id="word-voca" // 🌟 id 추가 (label의 htmlFor와 일치시킴)
                        value={voca}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setVoca(e.target.value)
                        }
                        placeholder="영단어를 입력하세요"
                        required
                    />
                </div>

                <div className="flex flex-col gap-1">
                    {/* 🌟 htmlFor 추가 */}
                    <label
                        htmlFor="word-meaning"
                        className="text-sm font-semibold text-[#555]"
                    >
                        뜻
                    </label>
                    <FormInput
                        id="word-meaning" // 🌟 id 추가
                        value={meaning}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setMeaning(e.target.value)
                        }
                        placeholder="단어의 뜻을 입력하세요"
                        required
                    />
                </div>

                <div className="flex flex-col gap-1">
                    {/* 🌟 htmlFor 추가 */}
                    <label
                        htmlFor="word-tier"
                        className="text-sm font-semibold text-[#555]"
                    >
                        티어 (난이도)
                    </label>
                    <select
                        id="word-tier" // 🌟 id 추가
                        value={tier}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                            setTier(e.target.value)
                        }
                        className="h-12 px-4 rounded-xl border border-[#EAEAEA] bg-[#FAFAFA] text-[#1A1A1A] outline-none focus:border-[#A67C52] transition-colors"
                    >
                        <option value="Bronze">Bronze</option>
                        <option value="Silver">Silver</option>
                        <option value="Gold">Gold</option>
                        <option value="Diamond">Diamond</option>
                    </select>
                </div>

                <div className="mt-4">
                    <FormButton text="수정 완료" type="submit" />
                </div>
            </form>
        </div>
    );
}
