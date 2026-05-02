import axiosInstance from "./axiosInstance";
import type { Word } from "@/types/word";

// [Front-end & Back-end Flow] 단어 목록 데이터 조회 API 호출 함수
// 프론트엔드 역할: UI 컴포넌트(Words.tsx)에서 단어 데이터를 화면에 그리기 위해 이 비동기 함수를 호출합니다.
// 파라미터(signal): 컴포넌트가 화면에서 사라질 때(Unmount) 불필요해진 네트워크 통신을 즉시 강제 취소(Abort)하기 위한 신호 객체입니다.
// 반환값(Promise<Word[]>): TypeScript 컴파일러에게 이 함수가 반드시 'Word' 인터페이스 규격을 따르는 객체들의 배열을 반환할 것임을 약속(Promise)합니다.
export const getWords = async (signal?: AbortSignal): Promise<Word[]> => {
    // [Back-end & DB 상호작용 흐름]
    // 1. axiosInstance에 사전 세팅된 baseURL(예: /api)과 결합되어 실제 백엔드의 'GET /api/words' 엔드포인트로 HTTP 요청을 보냅니다. (이때 헤더에 토큰이 자동 포함됩니다.)
    // 2. 백엔드 Controller가 이를 수신하고, Service를 거쳐 DB(MySQL 등)의 'Word' 테이블에서 SELECT 쿼리를 실행합니다.
    // 3. 백엔드는 조회된 DB 데이터를 JSON 배열 포맷으로 직렬화하여 프론트엔드로 응답(Response)합니다.
    const response = await axiosInstance.get<Word[]>("/words", { signal });

    // [Front-end 방어적 프로그래밍] 백엔드의 응답을 100% 신뢰하지 마세요.
    // 백엔드 내부의 예기치 못한 에러나 잘못된 예외 처리로 인해, HTTP 상태 코드는 200 OK 이면서도 실제 데이터는 배열([])이 아닌 엉뚱한 값(객체, null 등)이 넘어올 수 있습니다.
    // 만약 여기서 검증하지 않고 그대로 반환하면, UI 컴포넌트 측에서 `.map()` 함수를 실행하는 순간 'map is not a function' 에러가 터지며 유저의 화면이 완전히 백지화(White Screen)됩니다.
    if (!Array.isArray(response.data)) {
        console.error(
            "Critical: API 응답 데이터가 배열 포맷이 아닙니다. 백엔드 서버의 로직을 확인해주세요.",
            response.data
        );
        // 에러 상황에서도 화면이 죽는 대신, 빈 배열을 반환하여 UI에서 "등록된 단어가 없습니다."라는 자연스러운 Fallback 화면을 띄우도록 유도합니다.
        return [];
    }

    // [Front-end] 데이터 타입 검증(배열)이 끝난, 화면에 렌더링하기 안전한 최종 데이터를 컴포넌트로 전달합니다.
    return response.data;
};
