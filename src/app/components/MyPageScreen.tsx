import { useState } from "react";
import {
  Crown,
  Shield,
  UserSearch,
  ChevronRight,
  Settings,
  Bell,
  FileText,
  LogOut,
  Star,
  TrendingUp,
  Building2,
  X,
  Users,
  BarChart2,
  Database,
  ArrowLeft,
  Lock,
  AlertTriangle,
} from "lucide-react";

type Modal = "privacy" | "liability" | null;
type View = "main" | "govLogin";

interface ElderlyResident {
  id: number;
  name: string;
  age: number;
  address: string;
  status: "양호" | "주의" | "위험";
  lastCheck: string;
}

const residents: ElderlyResident[] = [
  { id: 1, name: "김순자", age: 78, address: "서울시 노원구 상계동", status: "양호", lastCheck: "10분 전" },
  { id: 2, name: "박영복", age: 82, address: "서울시 노원구 중계동", status: "주의", lastCheck: "1시간 전" },
  { id: 3, name: "이복순", age: 75, address: "서울시 노원구 하계동", status: "양호", lastCheck: "30분 전" },
  { id: 4, name: "최덕수", age: 88, address: "서울시 노원구 월계동", status: "위험", lastCheck: "3시간 전" },
  { id: 5, name: "정말순", age: 71, address: "서울시 노원구 공릉동", status: "양호", lastCheck: "5분 전" },
];

const statusColor: Record<string, string> = {
  양호: "bg-emerald-100 text-emerald-700",
  주의: "bg-amber-100 text-amber-700",
  위험: "bg-red-100 text-red-600",
};

function GovLoginView({ onBack }: { onBack: () => void }) {
  const [selected, setSelected] = useState<ElderlyResident | null>(null);
  const [activeTab, setActiveTab] = useState<"list" | "pattern" | "data">("list");

  return (
    <div className="flex flex-col gap-4 p-4 pb-3">
      {/* Header */}
      <div className="flex items-center gap-3 pt-1">
        <button
          onClick={onBack}
          className="w-11 h-11 rounded-full bg-gray-100 flex items-center justify-center"
        >
          <ArrowLeft size={20} className="text-gray-600" />
        </button>
        <div>
          <p className="text-gray-500 font-medium" style={{ fontSize: "12px" }}>지자체 관리자</p>
          <h1 className="text-gray-900 font-bold" style={{ fontSize: "20px" }}>관할 구역 대시보드</h1>
        </div>
      </div>

      {/* Stats summary */}
      <div className="grid grid-cols-3 gap-2">
        {[
          { label: "전체 어르신", value: "47명", color: "bg-indigo-50 text-indigo-700" },
          { label: "주의 필요", value: "8명", color: "bg-amber-50 text-amber-700" },
          { label: "위험", value: "2명", color: "bg-red-50 text-red-600" },
        ].map((s) => (
          <div key={s.label} className={`rounded-2xl p-3 text-center ${s.color.split(" ")[0]}`}>
            <p className={`font-bold ${s.color.split(" ")[1]}`} style={{ fontSize: "20px" }}>{s.value}</p>
            <p className="text-gray-500 font-medium" style={{ fontSize: "11px" }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Tab bar */}
      <div className="flex gap-1 bg-gray-100 rounded-2xl p-1">
        {([
          { key: "list", icon: Users, label: "어르신 목록" },
          { key: "pattern", icon: BarChart2, label: "패턴 보기" },
          { key: "data", icon: Database, label: "상세 데이터" },
        ] as const).map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 flex flex-col items-center gap-0.5 py-2.5 rounded-xl transition-all ${
                activeTab === tab.key ? "bg-white shadow-sm text-indigo-600" : "text-gray-400"
              }`}
            >
              <Icon size={16} />
              <span className="font-semibold" style={{ fontSize: "11px" }}>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab content */}
      {activeTab === "list" && (
        <div className="flex flex-col gap-2">
          {residents.map((r) => (
            <button
              key={r.id}
              onClick={() => setSelected(r === selected ? null : r)}
              className="w-full bg-white border border-gray-100 rounded-2xl p-4 flex items-center gap-3 hover:bg-gray-50 transition-colors text-left"
            >
              <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                <span style={{ fontSize: "22px" }}>👤</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-gray-900 font-bold" style={{ fontSize: "15px" }}>{r.name}</p>
                  <span className={`px-2 py-0.5 rounded-full font-semibold ${statusColor[r.status]}`} style={{ fontSize: "11px" }}>
                    {r.status}
                  </span>
                </div>
                <p className="text-gray-400 font-medium" style={{ fontSize: "12px" }}>{r.age}세 · {r.address}</p>
                <p className="text-gray-300" style={{ fontSize: "11px" }}>마지막 확인: {r.lastCheck}</p>
              </div>
              <ChevronRight size={18} className="text-gray-300 flex-shrink-0" />
            </button>
          ))}
        </div>
      )}

      {activeTab === "pattern" && (
        <div className="flex flex-col gap-3">
          <p className="text-gray-600 font-medium" style={{ fontSize: "13px" }}>최근 7일 활동 패턴 변화</p>
          {residents.slice(0, 4).map((r) => {
            const bars = [60, 75, 50, 80, 45, 70, 65];
            return (
              <div key={r.id} className="bg-white border border-gray-100 rounded-2xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-gray-800 font-bold" style={{ fontSize: "14px" }}>{r.name} ({r.age}세)</p>
                  <span className={`px-2 py-0.5 rounded-full font-semibold ${statusColor[r.status]}`} style={{ fontSize: "11px" }}>
                    {r.status}
                  </span>
                </div>
                <div className="flex items-end gap-1 h-12">
                  {bars.map((h, i) => (
                    <div
                      key={i}
                      className={`flex-1 rounded-sm ${r.status === "위험" ? "bg-red-400" : r.status === "주의" ? "bg-amber-400" : "bg-indigo-400"}`}
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
                <div className="flex justify-between mt-1">
                  {["월", "화", "수", "목", "금", "토", "일"].map((d) => (
                    <span key={d} className="flex-1 text-center text-gray-300 font-medium" style={{ fontSize: "10px" }}>{d}</span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {activeTab === "data" && (
        <div className="flex flex-col gap-3">
          <p className="text-gray-600 font-medium" style={{ fontSize: "13px" }}>상세 활동 데이터</p>
          {residents.slice(0, 3).map((r) => (
            <div key={r.id} className="bg-white border border-gray-100 rounded-2xl p-4">
              <div className="flex items-center justify-between mb-3">
                <p className="text-gray-800 font-bold" style={{ fontSize: "14px" }}>{r.name}</p>
                <span className={`px-2 py-0.5 rounded-full font-semibold ${statusColor[r.status]}`} style={{ fontSize: "11px" }}>
                  {r.status}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: "이동", value: r.status === "위험" ? "매우낮음" : r.status === "주의" ? "낮음" : "보통" },
                  { label: "전기&수도", value: "보통" },
                  { label: "수면", value: r.status === "위험" ? "불규칙" : "7.2H" },
                ].map((d) => (
                  <div key={d.label} className="bg-gray-50 rounded-xl p-2.5 text-center">
                    <p className="text-gray-400" style={{ fontSize: "11px" }}>{d.label}</p>
                    <p className="text-gray-800 font-bold" style={{ fontSize: "13px" }}>{d.value}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function TermsModal({ type, onClose }: { type: "privacy" | "liability"; onClose: () => void }) {
  const isPrivacy = type === "privacy";
  return (
    <div className="fixed inset-0 bg-black/50 flex items-end z-50" onClick={onClose}>
      <div
        className="w-full bg-white rounded-t-3xl p-5 max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            {isPrivacy ? (
              <Lock size={20} className="text-indigo-600" />
            ) : (
              <AlertTriangle size={20} className="text-amber-500" />
            )}
            <h2 className="text-gray-900 font-bold" style={{ fontSize: "18px" }}>
              {isPrivacy ? "개인정보 동의 약관" : "책임 관련 고지"}
            </h2>
          </div>
          <button onClick={onClose} className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center">
            <X size={18} className="text-gray-500" />
          </button>
        </div>

        <div className="flex flex-col gap-4">
          <div className="bg-indigo-50 rounded-2xl p-4">
            <p className="text-indigo-800 font-bold mb-2" style={{ fontSize: "14px" }}>서비스 성격 안내</p>
            <p className="text-indigo-700 leading-relaxed" style={{ fontSize: "13px" }}>
              저희 서비스는 <span className="font-bold">패턴 변화를 감지해 알려주는 정보 제공 서비스</span>입니다.{"\n\n"}
              수집되는 생활 데이터(이동, 전기·수도 사용, 수면 등)를 분석하여 평소와 다른 변화가 감지될 경우 이를 사용자 또는 보호자에게 알려드립니다.
            </p>
          </div>

          {isPrivacy ? (
            <>
              <div className="bg-gray-50 rounded-2xl p-4">
                <p className="text-gray-800 font-bold mb-2" style={{ fontSize: "14px" }}>수집하는 정보</p>
                {["이동 패턴 (센서 기반)", "전기·수도 사용량", "수면 패턴", "앱 사용 기록"].map((item) => (
                  <div key={item} className="flex items-center gap-2 mb-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 flex-shrink-0" />
                    <p className="text-gray-600" style={{ fontSize: "13px" }}>{item}</p>
                  </div>
                ))}
              </div>
              <div className="bg-gray-50 rounded-2xl p-4">
                <p className="text-gray-800 font-bold mb-2" style={{ fontSize: "14px" }}>정보 활용 목적</p>
                <p className="text-gray-600 leading-relaxed" style={{ fontSize: "13px" }}>
                  수집된 정보는 생활 패턴 분석 및 이상 감지 알림에만 활용됩니다. 제3자 제공 또는 마케팅 목적으로 사용하지 않습니다.
                </p>
              </div>
            </>
          ) : (
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
              <p className="text-amber-800 font-bold mb-2" style={{ fontSize: "14px" }}>중요 고지사항</p>
              <p className="text-amber-700 leading-relaxed" style={{ fontSize: "13px" }}>
                저희 서비스는 <span className="font-bold">패턴 변화를 감지해 알려주는 정보 제공 서비스</span>입니다.{"\n\n"}
                본 서비스는 의료 기기가 아니며, 어떠한 질병의 <span className="font-bold">진단이나 안전을 보장하지 않습니다.</span>{"\n\n"}
                감지된 패턴 변화는 참고 정보로만 활용하시고, 건강 이상이 의심될 경우 반드시 의료 전문가와 상담하시기 바랍니다.
              </p>
            </div>
          )}

          <button
            onClick={onClose}
            className="w-full bg-indigo-600 text-white font-bold py-4 rounded-2xl"
            style={{ fontSize: "16px" }}
          >
            확인했습니다
          </button>
        </div>
      </div>
    </div>
  );
}

export function MyPageScreen() {
  const [modal, setModal] = useState<Modal>(null);
  const [view, setView] = useState<View>("main");

  if (view === "govLogin") {
    return <GovLoginView onBack={() => setView("main")} />;
  }

  const menuItems = [
    {
      icon: Bell,
      label: "알림 설정",
      desc: "알림 및 리마인더 관리",
      danger: false,
      onClick: () => {},
    },
    {
      icon: FileText,
      label: "건강 리포트",
      desc: "월간 AI 분석 리포트",
      danger: false,
      onClick: () => {},
    },
    {
      icon: Lock,
      label: "개인정보 동의 약관",
      desc: "수집 정보 및 활용 동의 내용",
      danger: false,
      onClick: () => setModal("privacy"),
    },
    {
      icon: AlertTriangle,
      label: "책임 관련 고지",
      desc: "서비스 성격 및 책임 한계 안내",
      danger: false,
      onClick: () => setModal("liability"),
    },
    {
      icon: LogOut,
      label: "로그아웃",
      desc: "계정에서 로그아웃",
      danger: true,
      onClick: () => {},
    },
  ];

  return (
    <>
      <div className="flex flex-col gap-4 p-4 pb-3">
        {/* Header */}
        <div className="flex items-center justify-between pt-1">
          <h1 className="text-gray-900 font-bold" style={{ fontSize: "22px" }}>
            마이페이지
          </h1>
          <button className="w-11 h-11 rounded-full bg-gray-100 flex items-center justify-center">
            <Settings size={20} className="text-gray-500" />
          </button>
        </div>

        {/* Profile card */}
        <div className="bg-gradient-to-br from-indigo-600 to-violet-600 rounded-2xl p-4 text-white">
          <div className="flex items-center gap-3">
            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-2 border-white/40">
              <span style={{ fontSize: "30px" }}>👤</span>
            </div>
            <div>
              <p className="font-bold" style={{ fontSize: "20px" }}>김덕철</p>
              <p className="text-white/70" style={{ fontSize: "13px" }}>minsu.kim@email.com</p>
              <div className="flex items-center gap-1 mt-1">
                <div className="bg-amber-400/30 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <Star size={11} className="text-amber-300 fill-amber-300" />
                  <span className="text-amber-200 font-semibold" style={{ fontSize: "11px" }}>기본 플랜</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-3 mt-4">
            {[
              { label: "활동 일수", value: "128" },
              { label: "AI 대화", value: "43" },
              { label: "참여 행사", value: "7" },
            ].map((s) => (
              <div key={s.label} className="flex-1 text-center">
                <p className="font-bold" style={{ fontSize: "22px" }}>{s.value}</p>
                <p className="text-white/60" style={{ fontSize: "11px" }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Premium Banner */}
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-amber-400 to-orange-500 p-4">
          <div className="absolute right-0 top-0 bottom-0 w-24 flex items-center justify-center opacity-20">
            <Crown size={80} className="text-white" />
          </div>
          <div className="relative">
            <div className="flex items-center gap-1.5 mb-1.5">
              <Crown size={16} className="text-white" />
              <p className="text-white/90 font-bold uppercase tracking-widest" style={{ fontSize: "11px" }}>
                프리미엄
              </p>
            </div>
            <p className="text-white font-bold leading-snug" style={{ fontSize: "16px" }}>
              더 깊은 감정 분석으로
              <br />
              업그레이드하세요
            </p>
            <p className="text-white/80 mt-1" style={{ fontSize: "12px" }}>
              맞춤형 AI 인사이트 및 주간 심리 건강 리포트 제공
            </p>
            <button
              className="mt-3 bg-white text-amber-600 font-bold px-5 py-2.5 rounded-xl shadow-sm hover:bg-amber-50 transition-colors"
              style={{ fontSize: "13px" }}
            >
              지금 구독하기 →
            </button>
          </div>
        </div>

        {/* Insurance status card */}
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl p-4">
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center flex-shrink-0">
              <Shield size={22} className="text-emerald-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-emerald-800 font-bold" style={{ fontSize: "13px" }}>보험 상태 (B2B)</p>
              <div className="flex items-baseline gap-1.5 mt-0.5">
                <p className="text-emerald-900 font-bold" style={{ fontSize: "24px" }}>A등급</p>
                <p className="text-emerald-600 font-medium" style={{ fontSize: "13px" }}>안전 등급</p>
              </div>
              <div className="flex items-center gap-1.5 mt-1.5">
                <div className="flex items-center gap-1 bg-emerald-100 px-2.5 py-1 rounded-full">
                  <TrendingUp size={12} className="text-emerald-600" />
                  <p className="text-emerald-700 font-bold" style={{ fontSize: "11px" }}>보험료 10% 할인 유지 중</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-3">
            <div className="flex justify-between mb-1.5">
              {["D", "C", "B", "A", "S"].map((g) => (
                <span key={g} className={`font-bold ${g === "A" ? "text-emerald-600" : "text-gray-300"}`} style={{ fontSize: "12px" }}>
                  {g}
                </span>
              ))}
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full" style={{ width: "80%" }} />
            </div>
          </div>
        </div>

        {/* Counselor matching button */}
        <button className="w-full bg-indigo-600 text-white rounded-2xl p-4 flex items-center gap-3 hover:bg-indigo-700 active:scale-98 transition-all">
          <div className="w-12 h-12 rounded-xl bg-indigo-500 flex items-center justify-center flex-shrink-0">
            <UserSearch size={22} className="text-white" />
          </div>
          <div className="flex-1 text-left">
            <p className="font-bold" style={{ fontSize: "15px" }}>전문 상담사 찾기</p>
            <p className="text-indigo-200" style={{ fontSize: "12px" }}>전문 심리 상담사와 연결됩니다</p>
          </div>
          <ChevronRight size={20} className="text-indigo-300 flex-shrink-0" />
        </button>

        {/* 지자체 로그인 button */}
        <button
          onClick={() => setView("govLogin")}
          className="w-full bg-gradient-to-r from-slate-700 to-slate-800 text-white rounded-2xl p-4 flex items-center gap-3 hover:from-slate-800 hover:to-slate-900 active:scale-98 transition-all"
        >
          <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
            <Building2 size={22} className="text-white" />
          </div>
          <div className="flex-1 text-left">
            <p className="font-bold" style={{ fontSize: "15px" }}>지자체 로그인</p>
            <p className="text-white/60" style={{ fontSize: "12px" }}>관할 구역 어르신 현황 및 데이터 확인</p>
          </div>
          <ChevronRight size={20} className="text-white/40 flex-shrink-0" />
        </button>

        {/* Menu list */}
        <div className="bg-gray-50 rounded-2xl overflow-hidden border border-gray-100">
          {menuItems.map((item, i) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                onClick={item.onClick}
                className={`w-full flex items-center gap-3 px-4 py-4 hover:bg-gray-100 transition-colors ${
                  i < menuItems.length - 1 ? "border-b border-gray-100" : ""
                }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${item.danger ? "bg-red-100" : "bg-gray-200"}`}>
                  <Icon size={18} className={item.danger ? "text-red-500" : "text-gray-600"} />
                </div>
                <div className="flex-1 text-left">
                  <p className={`font-bold ${item.danger ? "text-red-500" : "text-gray-800"}`} style={{ fontSize: "15px" }}>
                    {item.label}
                  </p>
                  <p className="text-gray-400" style={{ fontSize: "12px" }}>{item.desc}</p>
                </div>
                <ChevronRight size={18} className="text-gray-300" />
              </button>
            );
          })}
        </div>
      </div>

      {/* Modals */}
      {modal && <TermsModal type={modal} onClose={() => setModal(null)} />}
    </>
  );
}
