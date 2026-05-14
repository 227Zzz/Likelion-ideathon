import { useState, useRef, useEffect } from "react";
import { Send, Mic, MicOff, Heart, Volume2, Keyboard, PhoneCall } from "lucide-react";

type Message = {
  id: number;
  sender: "user" | "ai";
  text: string;
  time: string;
  isVoice?: boolean;
};

type VoiceState = "idle" | "listening" | "processing" | "speaking";

const initialMessages: Message[] = [
  {
    id: 1,
    sender: "ai",
    text: "좋은 아침이에요! 오늘 기분은 어떠세요? 평소보다 조금 늦게 일어나신 것 같던데요.",
    time: "오전 9:28",
  },
  {
    id: 2,
    sender: "user",
    text: "조금 피곤하고 의욕이 없어요...",
    time: "오전 9:30",
    isVoice: true,
  },
  {
    id: 3,
    sender: "ai",
    text: "그럴 수 있어요. 아침에 천천히 시작해도 괜찮아요. 5분짜리 간단한 호흡 운동을 같이 해볼까요? 기운이 조금 날 수도 있어요. 💙",
    time: "오전 9:30",
  },
  {
    id: 4,
    sender: "user",
    text: "나중에요. 오늘은 아무것도 하고 싶지 않아요.",
    time: "오전 9:32",
    isVoice: true,
  },
  {
    id: 5,
    sender: "ai",
    text: "네, 충분히 이해해요. 제가 여기 있을게요. 잔잔한 음악을 틀어드릴까요, 아니면 조명을 좀 더 따뜻하게 바꿔드릴까요?",
    time: "오전 9:33",
  },
];

const aiVoiceResponses = [
  "말씀해 주셔서 고마워요. 그런 마음이 드는 날도 있죠. 제가 항상 곁에 있을게요. 💙",
  "네, 잘 들었어요. 오늘도 천천히, 편안하게 지내세요. 함께할게요. 😊",
  "정말 소중한 이야기를 나눠주셨어요. 언제든지 이야기해 주세요. 💜",
];

export function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputMode, setInputMode] = useState<"voice" | "text">("voice");
  const [voiceState, setVoiceState] = useState<VoiceState>("idle");
  const [textInput, setTextInput] = useState("");
  const [responseIndex, setResponseIndex] = useState(0);
  const bottomRef = useRef<HTMLDivElement>(null);
  const listeningTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    return () => {
      if (listeningTimerRef.current) clearTimeout(listeningTimerRef.current);
    };
  }, []);

  const handleVoicePress = () => {
    if (voiceState !== "idle") return;
    setVoiceState("listening");

    listeningTimerRef.current = setTimeout(() => {
      setVoiceState("processing");

      setTimeout(() => {
        const now = new Date();
        const timeStr = `오전 ${now.getHours()}:${String(now.getMinutes()).padStart(2, "0")}`;
        const userVoiceTexts = [
          "오늘 날씨가 어때요?",
          "외로움을 느끼고 있어요.",
          "산책을 나가고 싶은데 혼자는 무서워요.",
        ];
        const userMsg: Message = {
          id: Date.now(),
          sender: "user",
          text: userVoiceTexts[responseIndex % userVoiceTexts.length],
          time: timeStr,
          isVoice: true,
        };
        setMessages((prev) => [...prev, userMsg]);
        setVoiceState("speaking");

        setTimeout(() => {
          const aiMsg: Message = {
            id: Date.now() + 1,
            sender: "ai",
            text: aiVoiceResponses[responseIndex % aiVoiceResponses.length],
            time: timeStr,
          };
          setMessages((prev) => [...prev, aiMsg]);
          setResponseIndex((i) => i + 1);
          setVoiceState("idle");
        }, 2000);
      }, 1800);
    }, 3000);
  };

  const handleVoiceStop = () => {
    if (voiceState !== "listening") return;
    if (listeningTimerRef.current) clearTimeout(listeningTimerRef.current);
    setVoiceState("processing");

    setTimeout(() => {
      const now = new Date();
      const timeStr = `오전 ${now.getHours()}:${String(now.getMinutes()).padStart(2, "0")}`;
      const userMsg: Message = {
        id: Date.now(),
        sender: "user",
        text: "오늘 컨디션이 별로예요.",
        time: timeStr,
        isVoice: true,
      };
      setMessages((prev) => [...prev, userMsg]);
      setVoiceState("speaking");

      setTimeout(() => {
        const aiMsg: Message = {
          id: Date.now() + 1,
          sender: "ai",
          text: "그렇군요, 몸이 좀 안 좋으신가요? 오늘은 따뜻하게 쉬시고, 필요한 게 있으면 언제든 말씀해 주세요. 💙",
          time: timeStr,
        };
        setMessages((prev) => [...prev, aiMsg]);
        setVoiceState("idle");
      }, 2000);
    }, 1500);
  };

  const sendTextMessage = () => {
    if (!textInput.trim()) return;
    const now = new Date();
    const timeStr = `오전 ${now.getHours()}:${String(now.getMinutes()).padStart(2, "0")}`;
    const newMsg: Message = {
      id: Date.now(),
      sender: "user",
      text: textInput.trim(),
      time: timeStr,
    };
    setMessages((prev) => [...prev, newMsg]);
    setTextInput("");

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: "ai",
          text: "말씀해 주셔서 감사해요. 항상 곁에서 듣고 있을게요. 💙",
          time: timeStr,
        },
      ]);
    }, 1000);
  };

  const voiceLabel: Record<VoiceState, string> = {
    idle: "버튼을 누르면 말씀하실 수 있어요",
    listening: "듣고 있어요... 말씀 끝나면 다시 눌러주세요",
    processing: "AI가 생각하는 중이에요...",
    speaking: "AI가 답하고 있어요 🔊",
  };

  const voiceButtonColor: Record<VoiceState, string> = {
    idle: "bg-indigo-600 hover:bg-indigo-700",
    listening: "bg-red-500",
    processing: "bg-amber-400",
    speaking: "bg-emerald-500",
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="px-4 pt-3 pb-3 bg-white border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center">
              <Heart size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-gray-900 font-bold" style={{ fontSize: "18px" }}>
                AI 돌봄 대화
              </h1>
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 bg-emerald-500 rounded-full" />
                <span className="text-emerald-600 font-medium" style={{ fontSize: "11px" }}>
                  항상 곁에 있어요
                </span>
              </div>
            </div>
          </div>
          <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center">
            <PhoneCall size={18} className="text-indigo-600" />
          </div>
        </div>
      </div>

      {/* Emotion status card */}
      <div className="mx-4 mt-3 bg-indigo-50 border border-indigo-100 rounded-2xl p-3.5">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
            <span style={{ fontSize: "16px" }}>😔</span>
          </div>
          <p className="text-indigo-800 font-bold" style={{ fontSize: "14px" }}>
            오늘의 감정 상태
          </p>
        </div>
        <p className="text-indigo-700 leading-snug" style={{ fontSize: "13px" }}>
          <span className="font-bold text-indigo-900">약간 우울함</span>{" "}
          <span className="text-indigo-500">(오전 9:30 대화 기준)</span>
        </p>
        <div className="mt-2 flex items-start gap-2 bg-amber-50 rounded-xl p-2">
          <span style={{ fontSize: "13px" }}>🔔</span>
          <p className="text-amber-700 leading-relaxed" style={{ fontSize: "12px" }}>
            이 상태는 등록된 보호자에게 공유되었어요.
          </p>
        </div>
      </div>

      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"} gap-2`}
          >
            {msg.sender === "ai" && (
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center flex-shrink-0 mt-auto">
                <Heart size={14} className="text-white" />
              </div>
            )}
            <div className={`max-w-[78%] flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}>
              <div
                className={`px-4 py-3 rounded-2xl leading-relaxed ${
                  msg.sender === "user"
                    ? "bg-indigo-600 text-white rounded-br-sm"
                    : "bg-white text-gray-800 rounded-bl-sm shadow-sm border border-gray-100"
                }`}
                style={{ fontSize: "14px" }}
              >
                {msg.isVoice && msg.sender === "user" && (
                  <div className="flex items-center gap-1 mb-1 opacity-70">
                    <Mic size={11} className="text-white/80" />
                    <span style={{ fontSize: "10px" }} className="text-white/80">음성 메시지</span>
                  </div>
                )}
                {msg.text}
              </div>
              <span className="text-gray-400 mt-1 px-1" style={{ fontSize: "10px" }}>
                {msg.time}
              </span>
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input area */}
      <div className="bg-white border-t border-gray-100 px-4 pt-3 pb-3">
        {/* Mode toggle */}
        <div className="flex items-center justify-center gap-2 mb-3">
          <button
            onClick={() => setInputMode("voice")}
            className={`flex items-center gap-2 px-5 py-2 rounded-full font-bold transition-all duration-200 ${
              inputMode === "voice"
                ? "bg-indigo-600 text-white shadow-md"
                : "bg-gray-100 text-gray-500"
            }`}
            style={{ fontSize: "13px" }}
          >
            <Mic size={15} />
            음성으로 말하기
          </button>
          <button
            onClick={() => setInputMode("text")}
            className={`flex items-center gap-2 px-5 py-2 rounded-full font-bold transition-all duration-200 ${
              inputMode === "text"
                ? "bg-indigo-600 text-white shadow-md"
                : "bg-gray-100 text-gray-500"
            }`}
            style={{ fontSize: "13px" }}
          >
            <Keyboard size={15} />
            글로 입력
          </button>
        </div>

        {inputMode === "voice" ? (
          /* ──── VOICE MODE ──── */
          <div className="flex flex-col items-center gap-3 py-2">
            {/* Status text */}
            <p
              className={`font-semibold text-center leading-snug ${
                voiceState === "idle"
                  ? "text-gray-500"
                  : voiceState === "listening"
                  ? "text-red-500"
                  : voiceState === "processing"
                  ? "text-amber-600"
                  : "text-emerald-600"
              }`}
              style={{ fontSize: "13px" }}
            >
              {voiceLabel[voiceState]}
            </p>

            {/* Mic button with ripple rings */}
            <div className="relative flex items-center justify-center">
              {/* Outer ripple rings */}
              {voiceState === "listening" && (
                <>
                  <div className="absolute w-28 h-28 rounded-full bg-red-400/20 animate-ping" />
                  <div className="absolute w-24 h-24 rounded-full bg-red-400/30 animate-pulse" />
                </>
              )}
              {voiceState === "speaking" && (
                <>
                  <div className="absolute w-28 h-28 rounded-full bg-emerald-400/20 animate-ping" />
                  <div className="absolute w-24 h-24 rounded-full bg-emerald-400/30 animate-pulse" />
                </>
              )}

              <button
                onClick={voiceState === "listening" ? handleVoiceStop : voiceState === "idle" ? handleVoicePress : undefined}
                disabled={voiceState === "processing" || voiceState === "speaking"}
                className={`relative w-20 h-20 rounded-full flex flex-col items-center justify-center gap-1 shadow-lg transition-all duration-200 active:scale-95 ${voiceButtonColor[voiceState]} ${voiceState === "processing" || voiceState === "speaking" ? "opacity-80 cursor-default" : ""}`}
              >
                {voiceState === "idle" && <Mic size={28} className="text-white" />}
                {voiceState === "listening" && <MicOff size={28} className="text-white" />}
                {voiceState === "processing" && (
                  <div className="w-7 h-7 border-3 border-white border-t-transparent rounded-full animate-spin" style={{ borderWidth: "3px" }} />
                )}
                {voiceState === "speaking" && <Volume2 size={28} className="text-white" />}
              </button>
            </div>

            {/* Waveform decoration when listening */}
            {voiceState === "listening" && (
              <div className="flex items-end gap-1 h-8">
                {[4, 8, 14, 10, 18, 12, 20, 14, 10, 16, 8, 12, 6].map((h, i) => (
                  <div
                    key={i}
                    className="w-1.5 bg-red-400 rounded-full animate-pulse"
                    style={{
                      height: `${h}px`,
                      animationDelay: `${i * 80}ms`,
                      animationDuration: "600ms",
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          /* ──── TEXT MODE ──── */
          <div className="flex items-center gap-2">
            <div className="flex-1 flex items-center bg-gray-100 rounded-2xl px-4 py-3 gap-2">
              <input
                type="text"
                placeholder="메시지를 입력하세요..."
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendTextMessage()}
                className="flex-1 bg-transparent text-gray-800 outline-none placeholder:text-gray-400"
                style={{ fontSize: "15px" }}
              />
            </div>
            <button
              onClick={sendTextMessage}
              className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center shadow-md active:scale-95 transition-transform"
            >
              <Send size={18} className="text-white" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
