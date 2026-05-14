import { useNavigate, useLocation } from "react-router";
import { Home, MessageCircle, Users, User } from "lucide-react";

const navItems = [
  { icon: Home, label: "홈", path: "/" },
  { icon: MessageCircle, label: "AI 대화", path: "/chat" },
  { icon: Users, label: "지역 연결", path: "/community" },
  { icon: User, label: "마이페이지", path: "/mypage" },
];

export function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="flex-shrink-0 bg-white border-t border-gray-100 flex items-center pb-6 pt-3 px-1">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive =
          item.path === "/"
            ? location.pathname === "/"
            : location.pathname.startsWith(item.path);
        return (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className="flex-1 flex flex-col items-center gap-1 py-1 min-h-[52px] justify-center"
          >
            <div
              className={`p-2.5 rounded-2xl transition-all duration-200 ${
                isActive ? "bg-indigo-50" : ""
              }`}
            >
              <Icon
                size={26}
                className={`transition-colors duration-200 ${
                  isActive ? "text-indigo-600" : "text-gray-400"
                }`}
              />
            </div>
            <span
              className={`font-semibold transition-colors duration-200 ${
                isActive ? "text-indigo-600" : "text-gray-400"
              }`}
              style={{ fontSize: "11px" }}
            >
              {item.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
