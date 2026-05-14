import { useState } from "react";
import { MapPin, Users, Calendar, Clock, ChevronRight } from "lucide-react";

const events = [
  {
    id: 1,
    title: "어르신 요가 교실",
    category: "건강",
    location: "복지관 B홀",
    date: "화·목요일",
    time: "오전 10:00",
    participants: 12,
    maxParticipants: 20,
    color: "from-violet-500 to-purple-600",
    bgColor: "bg-violet-50",
    borderColor: "border-violet-100",
    tagColor: "bg-violet-100 text-violet-700",
    image:
      "https://images.unsplash.com/photo-1775338782892-315ab263fab9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZW5pb3IlMjB5b2dhJTIwY2xhc3MlMjBncm91cCUyMGV4ZXJjaXNlfGVufDF8fHx8MTc3ODU5NDI0OXww&ixlib=rb-4.1.0&q=80&w=400",
  },
  {
    id: 2,
    title: "동네 걷기 모임",
    category: "운동",
    location: "한강 공원",
    date: "월·수·금요일",
    time: "오전 7:30",
    participants: 8,
    maxParticipants: 15,
    color: "from-emerald-500 to-teal-600",
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-100",
    tagColor: "bg-emerald-100 text-emerald-700",
    image:
      "https://images.unsplash.com/photo-1764005957427-35e7c11232db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZWlnaGJvcmhvb2QlMjB3YWxraW5nJTIwZ3JvdXAlMjBvdXRkb29yfGVufDF8fHx8MTc3ODU5NDI0OHww&ixlib=rb-4.1.0&q=80&w=400",
  },
  {
    id: 3,
    title: "텃밭 가꾸기 모임",
    category: "취미",
    location: "동네 텃밭",
    date: "토요일",
    time: "오후 2:00",
    participants: 6,
    maxParticipants: 12,
    color: "from-amber-500 to-orange-500",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-100",
    tagColor: "bg-amber-100 text-amber-700",
    image:
      "https://images.unsplash.com/photo-1695462131713-7bbfb8317ac4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjBnYXJkZW5pbmclMjBjbHViJTIwc2VuaW9yc3xlbnwxfHx8fDE3Nzg1OTQyNDl8MA&ixlib=rb-4.1.0&q=80&w=400",
  },
];

export function CommunityScreen() {
  const [joinedEvents, setJoinedEvents] = useState<number[]>([]);

  const toggleJoin = (id: number) => {
    setJoinedEvents((prev) =>
      prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]
    );
  };

  return (
    <div className="flex flex-col gap-4 p-4 pb-3">
      {/* Header */}
      <div className="flex items-center justify-between pt-1">
        <div>
          <h1 className="text-gray-900 font-bold" style={{ fontSize: "22px" }}>
            지역 연결
          </h1>
          <p className="text-gray-500 font-medium" style={{ fontSize: "13px" }}>
            이웃과 함께해요
          </p>
        </div>
        <button className="w-11 h-11 rounded-full bg-gray-100 flex items-center justify-center">
          <MapPin size={20} className="text-gray-500" />
        </button>
      </div>

      {/* Connection status banner */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl p-4 text-white">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2.5 h-2.5 bg-white rounded-full animate-pulse" />
          <p className="text-white/90 font-bold uppercase tracking-widest" style={{ fontSize: "11px" }}>
            연결 상태
          </p>
        </div>
        <p className="font-bold leading-tight" style={{ fontSize: "15px" }}>
          지역 복지관과 연결 중이에요 ✅
        </p>
        <div className="flex items-center gap-2 mt-2.5">
          <div className="flex -space-x-1.5">
            {["bg-blue-300", "bg-pink-300", "bg-yellow-300"].map((c, i) => (
              <div
                key={i}
                className={`w-6 h-6 rounded-full ${c} border-2 border-white`}
              />
            ))}
          </div>
          <p className="text-white/90" style={{ fontSize: "12px" }}>
            복지사 3명이 어르신을 살펴보고 있어요
          </p>
        </div>
      </div>

      {/* Recommended gatherings */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <p className="text-gray-800 font-bold" style={{ fontSize: "16px" }}>
            이번 주 추천 모임
          </p>
          <button className="flex items-center gap-0.5 text-indigo-600 font-semibold" style={{ fontSize: "13px" }}>
            전체보기 <ChevronRight size={15} />
          </button>
        </div>

        <div className="flex flex-col gap-4">
          {events.map((event) => {
            const joined = joinedEvents.includes(event.id);
            return (
              <div
                key={event.id}
                className={`rounded-2xl border-2 overflow-hidden ${event.borderColor}`}
              >
                {/* Image */}
                <div className="relative h-32 overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <span
                    className={`absolute top-2.5 left-2.5 font-bold px-2.5 py-1 rounded-full bg-white/95 ${event.tagColor.split(" ")[1]}`}
                    style={{ fontSize: "11px" }}
                  >
                    {event.category}
                  </span>
                </div>

                {/* Content */}
                <div className={`${event.bgColor} p-3.5`}>
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-900 font-bold leading-tight" style={{ fontSize: "15px" }}>
                        {event.title}
                      </p>
                      <div className="flex flex-col gap-1.5 mt-2">
                        <div className="flex items-center gap-1.5">
                          <MapPin size={13} className="text-gray-400 flex-shrink-0" />
                          <p className="text-gray-600 truncate" style={{ fontSize: "12px" }}>
                            {event.location}
                          </p>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1.5">
                            <Calendar size={13} className="text-gray-400" />
                            <p className="text-gray-600" style={{ fontSize: "12px" }}>
                              {event.date}
                            </p>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Clock size={13} className="text-gray-400" />
                            <p className="text-gray-600" style={{ fontSize: "12px" }}>
                              {event.time}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleJoin(event.id)}
                      className={`flex-shrink-0 px-4 py-2.5 rounded-xl font-bold transition-all duration-200 ${
                        joined
                          ? "bg-gray-200 text-gray-600"
                          : `bg-gradient-to-r ${event.color} text-white shadow-sm`
                      }`}
                      style={{ fontSize: "13px" }}
                    >
                      {joined ? "참여 중 ✓" : "참여하기"}
                    </button>
                  </div>

                  {/* Participants bar */}
                  <div className="mt-3 flex items-center gap-2">
                    <Users size={13} className="text-gray-400 flex-shrink-0" />
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${event.color} rounded-full`}
                        style={{
                          width: `${(event.participants / event.maxParticipants) * 100}%`,
                        }}
                      />
                    </div>
                    <p className="text-gray-500 font-medium" style={{ fontSize: "12px" }}>
                      {event.participants}/{event.maxParticipants}명
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
