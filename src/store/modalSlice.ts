import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Word } from "@/types/word"; // 🌟 Word 타입 임포트

// modal state Type
interface ModalState {
    isOpen: boolean;
    modalType: ModalType | null;
    isChangeCompleted: boolean;
    selectedWord: Word | null; // 🌟 수정할 단어 데이터를 담을 상태 추가
}

type ModalType = "changeWordModal" | "createWordModal";

// 모달을 열 때 전달받을 데이터의 타입
type OpenModalPayload = {
    modalType: ModalType;
    reservationId?: number;
    reservationDate?: string;
    word?: Word; // 🌟 단어 데이터 옵셔널 추가
};

const initialState: ModalState = {
    isOpen: false,
    modalType: null,
    isChangeCompleted: false,
    selectedWord: null, // 🌟 초기값 설정
};

export const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        openModal: (state, action: PayloadAction<OpenModalPayload>) => {
            state.isOpen = true;
            state.modalType = action.payload.modalType;
            // 🌟 payload로 넘어온 word가 있으면 상태에 저장
            if (action.payload.word) {
                state.selectedWord = action.payload.word;
            }
        },
        closeModal: (state) => {
            state.isOpen = false;
            state.modalType = null;
            state.selectedWord = null; // 🌟 모달 닫을 때 데이터 초기화
        },
        notifyChangeSuccess: (state) => {
            state.isChangeCompleted = true;
        },
        resetChangeSuccess: (state) => {
            state.isChangeCompleted = false;
        },
    },
});

export const {
    openModal,
    closeModal,
    notifyChangeSuccess,
    resetChangeSuccess,
} = modalSlice.actions;

export default modalSlice.reducer;
