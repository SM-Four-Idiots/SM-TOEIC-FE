// src/components/.../CreateWordModal.tsx

import React, { useState } from "react";
import { useAppDispatch } from "@/store/hooks";
import { closeModal, notifyChangeSuccess } from "@/store/modalSlice";
import FormButton from "@/components/common/button/FormButton";
import FormInput from "@/components/common/input/FormInput";
import { createAdminWord } from "@/api/admin";

export default function CreateWordModal() {
    const dispatch = useAppDispatch();

    const [voca, setVoca] = useState<string>("");
    const [meaning, setMeaning] = useState<string>("");
    const [category, setCategory] = useState<string>(""); // 🌟 카테고리 추가
    const [tier, setTier] = useState<string>("Bronze");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            await createAdminWord({
                voca,
                meaning,
                category,
                tier,
            });

            alert("새로운 단어가 성공적으로 추가되었습니다.");
            dispatch(notifyChangeSuccess()); // 🌟 AdminWordManagement에서 목록을 다시 불러오게 트리거
            dispatch(closeModal());
        } catch (error: unknown) {
            const errorMessage =
                error instanceof Error
                    ? error.message
                    : "단어 추가에 실패했습니다.";
            alert(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-[#1A1A1A]">단어 추가</h2>
                <button
                    type="button"
                    onClick={() => dispatch(closeModal())}
                    className="text-[#8C8C8C] hover:text-[#1A1A1A] transition-colors"
                    aria-label="닫기"
                >
                    ✕
                </button>
            </div>

            <form onSubmit={void handleSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                    <label
                        htmlFor="create-voca"
                        className="text-sm font-semibold text-[#555]"
                    >
                        단어
                    </label>
                    <FormInput
                        id="create-voca"
                        value={voca}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setVoca(e.target.value)
                        }
                        placeholder="영단어를 입력하세요"
                        required
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label
                        htmlFor="create-meaning"
                        className="text-sm font-semibold text-[#555]"
                    >
                        뜻
                    </label>
                    <FormInput
                        id="create-meaning"
                        value={meaning}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setMeaning(e.target.value)
                        }
                        placeholder="단어의 뜻을 입력하세요"
                        required
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label
                        htmlFor="create-category"
                        className="text-sm font-semibold text-[#555]"
                    >
                        카테고리
                    </label>
                    <FormInput
                        id="create-category"
                        value={category}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setCategory(e.target.value)
                        }
                        placeholder="예: 명사, 비즈니스, 일상 등"
                        required
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label
                        htmlFor="create-tier"
                        className="text-sm font-semibold text-[#555]"
                    >
                        티어 (난이도)
                    </label>
                    <select
                        id="create-tier"
                        value={tier}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                            setTier(e.target.value)
                        }
                        className="h-12 px-4 rounded-xl border border-[#EAEAEA] bg-[#FAFAFA] text-[#1A1A1A] outline-none focus:border-[#D67629] transition-colors"
                    >
                        <option value="Bronze">Bronze</option>
                        <option value="Silver">Silver</option>
                        <option value="Gold">Gold</option>
                        <option value="Diamond">Diamond</option>
                    </select>
                </div>

                <div className="mt-4">
                    <FormButton
                        text="단어 추가"
                        type="submit"
                        isLoading={isLoading}
                    />
                </div>
            </form>
        </div>
    );
}
