# 영단어 마스터 (English Word Master) - Front-end (React + Vite + TypeScript)

영단어 마스터(English Word Master) Front-end 레포지토리입니다. Vite 기반의 React + TypeScript 프로젝트이며, 폼/검증, 라우팅, 스타일링을 위한 최소 스택으로 구성되어 있습니다.

## 프로젝트 소개

바쁜 학업과 취업 준비로 꾸준한 영단어 학습에 어려움을 겪고, 단순 텍스트 나열식 암기 방식에 지루함을 느끼는 대학생들을 위해, 워들(Wordle), 지뢰찾기 부활 찬스 등 게이미피케이션(Gamification) 요소를 결합한 맞춤형 영어 단어 학습 Web App입니다.

## 라우팅

다음과 같은 페이지를 제공합니다:

* `/` — 메인 페이지
* `/login` — 로그인 페이지
* `/register` — 회원가입 페이지
* `/mypage` — 마이 페이지
* `/admin` — 어드민 페이지

## 기술 스택

* **Main**: React + Vite (TypeScript, SWC)
* **State Management**: Redux Toolkit
* **Routing**: react-router-dom
* **Styling**: Tailwind CSS
* **Forms**: react-hook-form, Zod, @hookform/resolvers
* **Linting & Formatting**: ESLint, Prettier, Husky, lint-staged
* **Network**: Axios (Interceptor를 활용한 Access Token 및 만료 시 재발급 로직 일괄 처리)
* **Deployment**: Vercel
* **AI Tools (Vibe Coding)**: Gemini 3.1 Pro, GPT-5 5.3 Codex, Vercel v0, CodeRabbit AI

## 빠른 시작

### 사전 요구사항

* Node.js 18 이상 권장
* npm 설치 및 실행

### 실행 방법

```bash
# 의존성 설치
npm install

# 개발 서버 실행 (http://localhost:5173)
npm run dev

# TypeScript 타입 체크 + 프로덕션 빌드
npm run build

# ESLint로 코드 검사
npm run lint

# 프로덕션 빌드 미리보기
npm run preview

# Husky 설정 (자동 실행됨)
npm run prepare
```

## 개발 환경 설정

프로젝트의 코드 품질과 일관성을 위해 모든 팀원은 아래 개발 환경을 반드시 설정해야 합니다.

### 1. VS Code 확장 프로그램 설치

VS Code의 Extensions 탭에서 아래 두 개의 확장 프로그램을 검색하여 설치합니다.

* ESLint (게시자: Microsoft)
* Prettier - Code formatter (게시자: Prettier)

### 2. VS Code 설정 적용

이 프로젝트에는 `.vscode/settings.json` 파일이 포함되어 있습니다.

VS Code가 "이 작업 영역의 설정을 신뢰합니까?"라고 물으면 **'예(Yes)'**를 선택하세요.

이 파일을 통해 모든 팀원에게 아래 설정이 자동으로 적용됩니다:

* 파일 저장 시 Prettier로 자동 포맷 (editor.formatOnSave)
* ESLint/Prettier 규칙 자동 인식

### 3. 설정 파일 (참고)

* `.prettierrc`: 우리 팀의 코드 스타일 규칙 (들여쓰기, 따옴표 등)
* `eslint.config.js`: 우리 팀의 코드 품질 규칙 (버그 방지, React 훅 규칙 등)

결론: 팀원은 1번의 확장 프로그램 2개만 설치하면, `.vscode/settings.json`과 프로젝트 설정 파일(`eslint.config.js`, `.prettierrc`)에 의해 모든 규칙이 자동으로 적용됩니다.

## 프로젝트 규약 (Conventions)

### Git 협업 전략

```bash
main: 배포용 브랜치 (안정 버전)
develop: 개발 메인 브랜치 (다음 배포 버전)
feature/[기능이름]: 기능 개발 브랜치 (예: feature/login)
fix/[수정내용]: 버그 수정 브랜치 (예: fix/button-layout)
chore/[작업내용]: 설정 및 환경 구성 브랜치 (예: chore/setup-eslint)
```

### 작업 순서

프로젝트 진행자 모두가 지켜야 할 작업 순서입니다.

1. develop 브랜치에서 feature/[기능이름] 브랜치를 생성합니다.
2. 기능 개발 완료 후, develop 브랜치로 Pull Request (PR)를 생성합니다.
3. CodeRabbit AI의 1차 자동 코드 리뷰를 거친 후, 팀원 최소 1명 이상의 승인(Approve)을 받습니다.
4. 승인(Approve)을 완료한 후, develop 브랜치에 병합(Merge)합니다.

### 병합 시 충돌(Conflict)이 발생한 경우

PR 병합 과정에서 충돌이 발생하면, PR 작성자가 직접 로컬 환경에서 충돌을 해결한 후 다시 PR을 업데이트해야 합니다.

#### 진행 순서

1. 최신 develop 브랜치 동기화

```bash
git checkout develop
git pull origin develop
```

2. 작업 브랜치로 이동 및 병합

```bash
git checkout feature/[기능이름]
git merge develop
```

3. 충돌(Conflict) 해결
   VS Code 에디터를 열고 충돌이 발생한 파일들을 확인합니다.
   Current Change와 Incoming Change 중 알맞은 코드를 선택하거나 직접 수정한 후 저장합니다.

4. 해결된 코드 커밋 및 푸시

```bash
git add .
git commit -m "chore: 병합 충돌 해결"
git push origin feature/[기능이름]
```

5. PR 확인 및 최종 병합
   GitHub의 PR 페이지에서 충돌 해결 여부를 확인한 후 승인(Approve)을 거쳐 develop 브랜치에 병합합니다.

### 커밋 메시지 컨벤션

커밋 메시지는 Conventional Commits 규칙을 따릅니다.

```bash
feat: 새로운 기능 추가
fix: 버그 수정
docs: 문서 수정 (README 등)
style: 코드 스타일 수정 (포맷팅, 세미콜론 등 로직 변경 없음)
refactor: 코드 리팩토링
chore: 빌드 설정, 패키지 매니저 설정 등 (코드 로직 변경 없음)

예시: "feat: 로그인 페이지 UI 구현, fix: 메인페이지 레이아웃 깨짐 수정"
```

### 디렉토리 구조

데이터 관리 전략에 따라 api와 store 폴더를 사용합니다.

```bash
src/
├── api/            # API 요청 함수
├── assets/         # 이미지, 폰트 등 정적 파일
├── components/
│   ├── common/     # 공통 컴포넌트 (Button, Input, Modal...)
│   └── feature/    # 특정 기능 컴포넌트 (ProfileEditor...)
├── constants/      # 공통 상수 (API URL, 키 값 등)
├── hooks/          # 공통 커스텀 훅 (useToggle, useDebounce...)
├── pages/          # 라우팅 페이지 컴포넌트
├── styles/         # 전역 CSS, tailwind.css
└── utils/          # 유틸 함수 (formatDate, validators...)
```

### 네이밍 컨벤션

1. 폴더명: kebab-case (예: components/word-list)
2. 컴포넌트: PascalCase (예: MyButton.tsx)
3. 기타: camelCase (예: useMyHook.ts, formatDate.ts)

### 절대 경로

* `@/`는 `src/` 폴더를 가리킵니다.
* 상대경로 중첩(`../../`)을 방지하기 위해 사용합니다.

```ts
import Button from '@/components/common/Button';
```

## Redux 상태 관리

Redux Toolkit을 사용하여 전역 상태를 관리합니다.

### 폴더 구조

* `src/store/store.ts` - Redux 스토어 설정
* `src/store/hooks.ts` - 타입이 지정된 커스텀 훅
* `src/store/*Slice.ts` - 기능별 슬라이스

## Git Hooks (자동 코드 검사)

Husky와 lint-staged를 사용하여 커밋 전 자동으로 코드를 검사합니다.

### 작동 방식

git commit 실행 시 자동으로:

1. 변경된 파일에 대해 ESLint 자동 수정
2. Prettier로 코드 포맷팅
3. 에러가 있으면 커밋 실패

### 커밋 실패 시

1. 에러 메시지 확인 및 수정
2. `git add .`
3. `git commit` 재시도

### 주의사항

* 처음 clone 후 `npm install` 실행 시 Husky 자동 설치
* 자동 검사는 코드 품질 유지를 위한 필수 과정

## 트러블슈팅 (Troubleshooting)

프로젝트 진행 중 자주 발생하는 에러와 해결책을 기록합니다.

### 커밋 시 Husky (ESLint/Prettier) 에러 발생

* **문제**: `git commit` 실행 중 패키지 누락이나 린트 설정 문제로 인해 Husky가 커밋을 차단하고 터미널에 에러 로그(`Oops! Something went wrong!`)를 출력하는 경우
* **해결 (Vibe Coding 워크플로우)**:
  1. 터미널에 출력된 **에러 로그 전체를 복사**합니다.
  2. 사용 중인 AI 도구(**Gemini 3.1 Pro** 등)에 복사한 로그를 붙여넣고 원인과 해결 방법을 질문합니다.
  3. AI가 안내해 주는 누락된 패키지 설치 명령어(예: `npm install -D eslint-plugin-react`)를 실행하거나 설정 파일을 수정합니다.
  4. 변경 사항을 반영하여 `git add .` 후 다시 `git commit`을 시도합니다.

## 연관 레포지토리

* Back-end 레포지토리: [https://github.com/SM-Four-Idiots/SM-TOEIC-BE](https://github.com/SM-Four-Idiots/SM-TOEIC-BE)
