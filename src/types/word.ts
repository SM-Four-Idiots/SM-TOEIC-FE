// [Front-end & Back-end Contract]
// 이 파일은 프론트엔드와 백엔드 간 API 통신 시 사용되는 '단어(Word)' 객체의 규격(Type/DTO)을 정의합니다.
// 프론트엔드: 컴파일 타임에 타입 안정성을 보장하고, 런타임(UI 렌더링) 시 undefined 에러를 방지합니다.
// 백엔드/DB: 데이터베이스의 'Word' 테이블(Entity) 조회 결과가 JSON으로 직렬화(Serialization)되어 넘어올 때의 최종 구조를 나타냅니다.

export interface Word {
    // [DB 흐름] 데이터베이스 'Word' 테이블의 고유 식별자(Primary Key, PK)입니다. (Auto Increment)
    // [Front-end 역할] React에서 .map()을 통해 리스트를 렌더링할 때, Virtual DOM 최적화를 위한 고유 'key' prop으로 반드시 사용되어야 합니다 (예: key={item.id}).
    id: number;

    // [DB 흐름] 학습할 영단어 원문 데이터가 저장된 컬럼입니다. (VARCHAR)
    // [Front-end 역할] 단어장 카드 UI에서 가장 크게 강조되어 렌더링되는 핵심 텍스트입니다.
    voca: string;

    // [DB 흐름] 해당 영단어의 뜻(해석) 데이터입니다. (VARCHAR)
    // [Front-end 역할] 영단어(english) 하단에 배치되어 유저에게 단어의 의미를 전달하는 설명 텍스트로 렌더링됩니다.
    meaning: string;

    // [DB 흐름] 단어의 속성(예: 동사, 명사, 비즈니스, 일상 등)을 분류하는 데이터입니다.
    // [Front-end 역할] (선택적 렌더링) 값이 존재할 경우, 단어 옆에 작은 회색 태그(Tag) UI로 표시되어 부가적인 메타 정보를 제공합니다.
    category: string;

    // [DB 흐름] 단어의 난이도를 수치화한 데이터입니다. (INT / TINYINT)
    // [Front-end 역할] 렌더링 시 이 숫자를 파라미터로 받아, getBadgeStyle 함수를 거쳐 시각적인 등급 뱃지의 색상과 텍스트를 결정짓는 핵심 조건값입니다.
    tier: string;

    // [DB 흐름] 해당 단어 데이터가 DB에 최초로 인서트(Insert)된 시각을 나타내는 타임스탬프입니다. (DATETIME / TIMESTAMP 형식의 ISO 8601 문자열)
    // [Front-end 역할] 현재 UI 화면에 직접적으로 그려지지는 않지만, 프론트엔드에서 데이터를 '최신순'으로 클라이언트 사이드 정렬(Sort)할 때 기준 값으로 활용될 수 있습니다.
    createdAt: string;
}
