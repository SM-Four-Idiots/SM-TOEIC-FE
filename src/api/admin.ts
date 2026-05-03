import { isAxiosError } from "axios";
import axiosInstance from "./axiosInstance";

// 백엔드 에러 응답 구조를 인터페이스로 정의합니다.
// [Front-end 역할] axios 통신 실패 시 백엔드에서 내려주는 에러 객체의 타입을 정의하여 타입 안정성을 확보합니다.
// [Back-end & DB 흐름] 백엔드(Global Exception Handler 등)에서 예외 발생 시 프론트엔드로 반환하는 JSON 형태의 규격입니다.
interface ErrorResponse {
    message?: string;
}

/*
 * 어드민 단어 삭제 API 호출 함수
 * @param wordId 삭제할 단어의 고유 ID
 * @returns Promise<void>
 * * [Front-end 역할] UI 컴포넌트에서 특정 단어의 삭제 이벤트를 트리거할 때 호출하는 비동기 통신 함수입니다.
 * [Back-end & DB 흐름]
 * 1. 클라이언트가 DELETE `/admin/words/{wordId}` 엔드포인트로 요청을 보냅니다.
 * 2. 백엔드 컨트롤러가 이를 받아 DB의 `Word` 테이블에서 해당 PK(wordId)를 가진 레코드를 조회합니다.
 * 3. 레코드가 존재하면 삭제(Hard/Soft Delete) 트랜잭션을 커밋하고 200 OK를 반환합니다.
 * 4. 실패 시 (DB에 없는 ID, 권한 없음 등) 적절한 HTTP 상태 코드와 함께 ErrorResponse 형태의 JSON을 반환합니다.
 */
export const deleteAdminWord = async (wordId: number): Promise<void> => {
    try {
        await axiosInstance.delete(`/admin/words/${wordId}`);
    } catch (error) {
        // isAxiosError에 제네릭으로 ErrorResponse 타입을 지정해 줍니다.
        if (isAxiosError<ErrorResponse>(error)) {
            const errorMessage =
                error.response?.data?.message ||
                "서버와 통신 중 문제가 발생했습니다.";
            throw new Error(errorMessage);
        }
        throw new Error(
            "네트워크 오류가 발생했습니다. 연결 상태를 확인해주세요."
        );
    }
};
