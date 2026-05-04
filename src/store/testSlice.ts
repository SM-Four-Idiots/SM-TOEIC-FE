import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Question } from "@/api/test"; // 이전 답변에서 만든 test.ts의 타입 임포트

// 유저가 제출한 답안의 기록을 남기기 위한 타입
interface UserAnswer {
    wordId: number;
    submittedAnswer: string;
    isCorrect: boolean;
}

interface TestState {
    questions: Question[]; // 전체 문제 목록
    currentIndex: number; // 현재 풀고 있는 문제의 인덱스
    userAnswers: UserAnswer[]; // 유저가 제출한 답안 기록
    isFinished: boolean; // 테스트 종료 여부
}

const initialState: TestState = {
    questions: [],
    currentIndex: 0,
    userAnswers: [],
    isFinished: false,
};

export const testSlice = createSlice({
    name: "test",
    initialState,
    reducers: {
        // 1. API로 받아온 문제 목록 초기화
        setQuestions: (state, action: PayloadAction<Question[]>) => {
            state.questions = action.payload;
            state.currentIndex = 0;
            state.userAnswers = [];
            state.isFinished = false;
        },

        // 2. 단일 문제 답안 제출 처리 및 다음 문제로 이동
        submitAnswer: (state, action: PayloadAction<UserAnswer>) => {
            state.userAnswers.push(action.payload);

            // 다음 문제가 있으면 인덱스 증가, 없으면 테스트 종료
            if (state.currentIndex < state.questions.length - 1) {
                state.currentIndex += 1;
            } else {
                state.isFinished = true;
            }
        },

        // 3. 테스트 강제 종료 (혹은 타이머 종료 시)
        finishTest: (state) => {
            state.isFinished = true;
        },

        // 4. 테스트 초기화 (다시 풀기, 화면 이탈 시 등)
        resetTest: (state) => {
            state.questions = [];
            state.currentIndex = 0;
            state.userAnswers = [];
            state.isFinished = false;
        },
    },
});

export const { setQuestions, submitAnswer, finishTest, resetTest } =
    testSlice.actions;

export default testSlice.reducer;
