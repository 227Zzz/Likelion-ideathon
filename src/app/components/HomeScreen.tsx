import { useState } from "react";
import { Bell, Clock, X, Check, Activity, Zap, Moon } from "lucide-react";
import { RadialBarChart, RadialBar, ResponsiveContainer } from "recharts";

const activityData = [
  { value: 100, fill: "#e0e7ff" },
  { value: 85, fill: "url(#activityGradient)" },
];

export function HomeScreen() {
  const [alertVisible, setAlertVisible] = useState(true);

  return (
    <div className="flex flex-col gap-4 p-4 pb-3">
      {/* Header */}
      <div className="flex items-center justify-between pt-1">
        <div>
          <p className="text-gray-500 font-medium" style={{ fontSize: "13px" }}>
            2026년 5월 13일 화요일          </p>
          <h1 className="text-gray-900 font-bold" style={{ fontSize: "22px" }}>
            안녕하세요, 김덕철님
          </h1>
        </div>
        <div className="relative">
          <button className="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center">
            <Bell size={22} className="text-indigo-600" />
          </button>
          <span className="absolute top-1 right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white" />
        </div>
      </div>

      {/* Banner Ad */}
      <div className="relative rounded-2xl overflow-hidden" style={{ height: "110px" }}>
        <img
          src="https://images.unsplash.com/photo-1763182198113-a9a8d0fe3144?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWxsbmVzcyUyMGhlYWx0aCUyMGhlYWxpbmclMjBuYXR1cmUlMjBjYWxtfGVufDF8fHx8MTc3ODU5NDI0OXww&ixlib=rb-4.1.0&q=80&w=1080"
          alt="웰니스 배너"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/80 via-indigo-800/60 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-center px-5">
          <p className="text-white/80 font-semibold uppercase tracking-widest mb-1" style={{ fontSize: "10px" }}>
            건강 파트너
          </p>
          <p className="text-white font-bold leading-tight" style={{ fontSize: "16px" }}>
            몸과 마음을 함께 돌봐드려요
          </p>
          <p className="text-white/80 mt-1" style={{ fontSize: "12px" }}>
            매일 건강한 내일을 위해
          </p>
        </div>
        <div className="absolute right-4 bottom-4">
          <button className="bg-white/20 backdrop-blur-sm text-white font-semibold px-3 py-1.5 rounded-full border border-white/30" style={{ fontSize: "11px" }}>
            자세히 보기
          </button>
        </div>
      </div>

      {/* Activity Score Card */}
      <div className="bg-gradient-to-br from-indigo-600 to-violet-600 rounded-2xl p-4 text-white">
        <div className="flex items-center justify-between mb-1">
          <div>
            <p className="text-white/70 font-medium" style={{ fontSize: "13px" }}>
              활동 점수
            </p>
            <p className="font-bold" style={{ fontSize: "32px" }}>
              80{" "}
              <span className="text-white/60 font-normal" style={{ fontSize: "16px" }}>
                / 100
              </span>
            </p>
            <p className="text-white/85 font-medium leading-tight mt-0.5" style={{ fontSize: "12px" }}>
              생활 활동 지표
            </p>
            <p className="text-white/60 leading-tight" style={{ fontSize: "10px" }}>
              (이동·전기·수도·수면 통합 분석)
            </p>
          </div>

          {/* Circular chart */}
          <div style={{ width: 115, height: 115, position: "relative" }}>
            <svg style={{ position: "absolute", width: 0, height: 0 }}>
              <defs>
                <linearGradient id="activityGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#a5f3fc" />
                  <stop offset="100%" stopColor="#ffffff" />
                </linearGradient>
              </defs>
            </svg>
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart
                innerRadius="65%"
                outerRadius="100%"
                data={activityData}
                startAngle={90}
                endAngle={-270}
              >
                <RadialBar dataKey="value" cornerRadius={10} background={false} />
              </RadialBarChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white font-bold" style={{ fontSize: "22px" }}>
                80%
              </span>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="flex gap-2 mt-3">
          {[
            { icon: Activity, label: "이동", value: "낮음" },
            { icon: Zap, label: "전기·수도", value: "보통" },
            { icon: Moon, label: "수면", value: "7.2H" },
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="flex-1 bg-white/15 rounded-xl p-2.5 flex flex-col items-center gap-1"
              >
                <Icon size={16} className="text-white/80" />
                <p className="text-white/70" style={{ fontSize: "11px" }}>{stat.label}</p>
                <p className="text-white font-bold" style={{ fontSize: "12px" }}>{stat.value}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Alert Card */}
      {alertVisible && (
        <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-4">
          <div className="flex items-start gap-3">
            <div className="w-11 h-11 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
              <Clock size={22} className="text-amber-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-amber-800 font-bold mb-1" style={{ fontSize: "14px" }}>
                🔔 예정된 생활 케어 알림
              </p>
              <p className="text-amber-800 leading-relaxed" style={{ fontSize: "13px" }}>
                오늘 활동량이 평소보다 낮아요.{"\n"}
                <span className="font-bold">10분 후</span> 거실 커튼을 열게요.
              </p>
            </div>
          </div>
          <div className="flex gap-3 mt-4">
            <button
              onClick={() => setAlertVisible(false)}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl border-2 border-amber-300 text-amber-800 font-bold hover:bg-amber-100 transition-colors"
              style={{ fontSize: "15px" }}
            >
              <X size={16} />
              취소
            </button>
            <button
              onClick={() => setAlertVisible(false)}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl bg-amber-500 text-white font-bold hover:bg-amber-600 transition-colors"
              style={{ fontSize: "15px" }}
            >
              <Check size={16} />
              확인
            </button>
          </div>
        </div>
      )}

      {/* Quick summary */}
      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100 rounded-2xl p-4">
        <p className="text-emerald-800 font-bold mb-3" style={{ fontSize: "15px" }}>
          오늘의 요약
        </p>
        <div className="flex flex-col gap-3">
          {[
            { label: "걸음 수", value: "1,530보", pct: 22 },
            { label: "식사", value: "1회", pct: 30 },
            { label: "수면", value: "7.2H", pct: 90 },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-3">
              <p className="text-emerald-700 font-medium flex-shrink-0" style={{ fontSize: "13px", width: "62px" }}>
                {item.label}
              </p>
              <div className="flex-1 h-2 bg-emerald-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 rounded-full"
                  style={{ width: `${item.pct}%` }}
                />
              </div>
              <p className="text-emerald-800 font-bold flex-shrink-0" style={{ fontSize: "13px", width: "52px", textAlign: "right" }}>
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
