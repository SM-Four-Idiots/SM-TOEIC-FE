import LinkButton from "@/components/common/button/LinkButton";
import { useAppSelector } from "@/store/hooks";

export default function Home() {
    const user = useAppSelector((state) => state.authState.user);

    // api 연동시 주석 삭제 요망
    /*
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            void navigate("/login", { replace: true });
        }
    });

    // 깜빡임 방지
    if (!user) {
        return null;
    }
    */

    return (
        <div className="w-full max-w-300 mx-auto px-8 flex flex-col gap-6 mt-8">
            {/* 1. 메인 상단 (인사말 & 연속 출석) */}
            <section className="flex items-end justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-[#1A1A1A]">
                        안녕하세요, {user?.nickname}님!
                    </h1>
                    <h2 className="text-[#8C8C8C] mt-1">
                        오늘도 토스트를 키워볼까요?
                    </h2>
                </div>
                <div className="flex items-center gap-1.5 font-bold text-[#D67629]">
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
                        className="w-5 h-5"
                        aria-hidden="true"
                    >
                        <path d="M12 3q1 4 4 6.5t3 5.5a1 1 0 0 1-14 0 5 5 0 0 1 1-3 1 1 0 0 0 5 0c0-2-1.5-3-1.5-5q0-2 2.5-4"></path>
                    </svg>
                    <span>5일 연속</span>
                </div>
            </section>
            {/* 2. 내 토스트 카드 */}
            <section className="bg-white border border-[#EAEAEA] rounded-2xl p-6 shadow-sm">
                <div className="w-full h-1.5 bg-[#9CA3AF] rounded-full mb-6"></div>

                <div className="flex items-center justify-between mb-6">
                    <div>
                        <p className="text-lg font-bold text-[#1A1A1A]">
                            내 토스트
                        </p>
                    </div>
                    <div className="text-6xl">🥪</div>
                </div>
                <div className="flex items-end justify-between mb-2">
                    <div className="flex items-center gap-2">
                        <span className="px-3 py-1 bg-[#F0E5D5] text-[#1A1A1A] text-sm font-bold rounded-lg">
                            Silver
                        </span>
                        <span className="px-3 py-1 bg-[#34C759] text-white text-xs font-bold rounded-lg">
                            승급 가능!
                        </span>
                    </div>
                    <div className="flex items-center gap-1 font-bold text-[#D67629] text-sm">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            stroke="none"
                            className="w-4 h-4"
                        >
                            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>
                        </svg>
                        <span>850 / 1000 XP</span>
                    </div>
                </div>

                <div className="w-full h-3 bg-[#EBE5D9] rounded-full overflow-hidden mb-1">
                    <div
                        className="h-full bg-[#D67629] rounded-full transition-all duration-500"
                        style={{ width: "85%" }}
                    ></div>
                </div>
                <p className="text-xs text-[#8C8C8C] text-right mb-6">
                    다음 티어까지 150 XP 남음
                </p>

                <div className="grid grid-cols-2 gap-3">
                    <LinkButton
                        text={
                            <>
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
                                    className="lucide lucide-swords w-4 h-4"
                                    aria-hidden="true"
                                >
                                    <polyline points="14.5 17.5 3 6 3 3 6 3 17.5 14.5"></polyline>
                                    <line
                                        x1="13"
                                        x2="19"
                                        y1="19"
                                        y2="13"
                                    ></line>
                                    <line
                                        x1="16"
                                        x2="20"
                                        y1="16"
                                        y2="20"
                                    ></line>
                                    <line
                                        x1="19"
                                        x2="21"
                                        y1="21"
                                        y2="19"
                                    ></line>
                                    <polyline points="14.5 6.5 18 3 21 3 21 6 17.5 9.5"></polyline>
                                    <line x1="5" x2="9" y1="14" y2="18"></line>
                                    <line x1="7" x2="4" y1="17" y2="20"></line>
                                    <line x1="3" x2="5" y1="19" y2="21"></line>
                                </svg>
                                퀘스트 시작
                            </>
                        }
                        variant="main"
                        url="/quests"
                    />
                    <LinkButton
                        text={
                            <>
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
                                    className="lucide lucide-trophy w-4 h-4"
                                    aria-hidden="true"
                                >
                                    <path d="M10 14.66v1.626a2 2 0 0 1-.976 1.696A5 5 0 0 0 7 21.978"></path>
                                    <path d="M14 14.66v1.626a2 2 0 0 0 .976 1.696A5 5 0 0 1 17 21.978"></path>
                                    <path d="M18 9h1.5a1 1 0 0 0 0-5H18"></path>
                                    <path d="M4 22h16"></path>
                                    <path d="M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1z"></path>
                                    <path d="M6 9H4.5a1 1 0 0 1 0-5H6"></path>
                                </svg>
                                승급 시험
                            </>
                        }
                        variant="outline"
                        url="/promotion"
                    />
                </div>
            </section>
            {/* 3. 일일 & 주간 퀘스트 */}
            <section className="grid grid-cols-2 gap-4">
                {/* 3-1. 일일 퀘스트 */}
                <article className="flex flex-col justify-between bg-white border border-[#EAEAEA] rounded-2xl p-6 shadow-sm min-h-55">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#E8F8ED] text-[#34C759]">
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
                                className="w-5 h-5"
                                aria-hidden="true"
                            >
                                <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path>
                            </svg>
                        </div>
                        <div>
                            <p className="font-bold text-[#1A1A1A]">
                                일일 퀘스트
                            </p>
                            <p className="text-xs text-[#8C8C8C]">
                                매일 초기화
                            </p>
                        </div>
                    </div>
                    <div>
                        <div className="flex items-end justify-between mb-2 text-sm">
                            <span className="text-[#8C8C8C]">진행도</span>
                            <span className="font-bold text-[#1A1A1A]">
                                <span className="text-lg">2</span> / 3
                            </span>
                        </div>
                        <div className="w-full h-2 bg-[#EBE5D9] rounded-full overflow-hidden mb-6">
                            <div
                                className="h-full bg-[#D67629] rounded-full transition-all duration-500"
                                style={{ width: "66%" }}
                            ></div>
                        </div>
                        <LinkButton
                            text="일일 퀘스트 하러 가기"
                            variant="soft"
                            url="/quests/daily"
                        />
                    </div>
                </article>
                {/* 3-2. 주간 퀘스트 */}
                <article className="flex flex-col justify-between bg-white border border-[#EAEAEA] rounded-2xl p-6 shadow-sm min-h-55">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#FDF3E8] text-[#D67629]">
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
                                className="w-5 h-5"
                                aria-hidden="true"
                            >
                                <path d="M10 14.66v1.626a2 2 0 0 1-.976 1.696A5 5 0 0 0 7 21.978"></path>
                                <path d="M14 14.66v1.626a2 2 0 0 0 .976 1.696A5 5 0 0 1 17 21.978"></path>
                                <path d="M18 9h1.5a1 1 0 0 0 0-5H18"></path>
                                <path d="M4 22h16"></path>
                                <path d="M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1z"></path>
                                <path d="M6 9H4.5a1 1 0 0 1 0-5H6"></path>
                            </svg>
                        </div>
                        <div>
                            <p className="font-bold text-[#1A1A1A]">
                                주간 퀘스트
                            </p>
                            <p className="text-xs text-[#8C8C8C]">
                                매주 월요일 초기화
                            </p>
                        </div>
                    </div>
                    <div>
                        <div className="flex items-end justify-between mb-2 text-sm">
                            <span className="text-[#8C8C8C]">
                                누적 일일 퀘스트
                            </span>
                            <span className="font-bold text-[#1A1A1A]">
                                <span className="text-lg">5</span> / 7
                            </span>
                        </div>
                        <div className="w-full h-2 bg-[#EBE5D9] rounded-full overflow-hidden mb-2">
                            <div
                                className="h-full bg-[#D67629] rounded-full transition-all duration-500"
                                style={{ width: "71%" }}
                            ></div>
                        </div>
                        <p className="text-xs text-[#8C8C8C]">
                            7일 연속 클리어 시{" "}
                            <span className="text-[#D67629] font-bold">
                                +100 XP 보너스!
                            </span>
                        </p>
                    </div>
                </article>
            </section>
        </div>
    );
}
