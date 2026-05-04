/**
 * 전역 상태(Redux)를 기반으로 앱 전체의 모달 렌더링을 담당하는 레이아웃 컴포넌트입니다.
 *
 * 해당 컴포넌트는 앱 최상단(App.tsx)에 한 번만 선언해두면 되며,
 * 어디서든 Redux의 dispatch(openModal)로 모달을 띄울 수 있습니다.
 */

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import ChangeWordModal from "./ChangeWordModal";
import CreateWordModal from "./CreateWordModal";
import { closeModal } from "@/store/modalSlice";

export default function ModalLayout() {
    const dispatch = useAppDispatch();
    const { isOpen, modalType } = useAppSelector((state) => state.modal);
    const handleClose = () => dispatch(closeModal());

    // 렌더링할 모달을 결정하는 함수
    // switch 사용으로 가독성 증대
    const renderModalContent = () => {
        switch (modalType) {
            case "changeWordModal":
                return <ChangeWordModal />;
            case "createWordModal":
                return <CreateWordModal />;
            default:
                return null;
        }
    };

    if (!isOpen) return null;

    return (
        <div
            onClick={handleClose}
            className="z-10 absolute w-full h-full top-0 flex items-center justify-center bg-black/20 animate-fade-in-out"
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="z-20 w-70 flex flex-col p-5 bg-white gap-3.75 rounded-[10px]"
            >
                {renderModalContent()}
            </div>
        </div>
    );
}
