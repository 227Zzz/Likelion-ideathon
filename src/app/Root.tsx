import { Outlet } from "react-router";
import { BottomNav } from "./components/BottomNav";

export function Root() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-50 flex items-center justify-center p-4">
      <div
        className="relative bg-white rounded-[40px] overflow-hidden flex flex-col"
        style={{
          width: "390px",
          height: "844px",
          boxShadow:
            "0 0 0 10px #1a1a2e, 0 0 0 12px #2d2d4e, 0 40px 80px rgba(0,0,0,0.4)",
        }}
      >
        {/* Status bar */}
        <div className="flex-shrink-0 flex items-center justify-between px-6 pt-3 pb-1 bg-white z-10">
          <span className="font-bold text-gray-800" style={{ fontSize: "13px" }}>오전 9:41</span>
          <div className="flex items-center gap-1">
            <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
              <rect x="0" y="3" width="3" height="9" rx="1" fill="#1a1a2e" />
              <rect x="4.5" y="2" width="3" height="10" rx="1" fill="#1a1a2e" />
              <rect x="9" y="0.5" width="3" height="11.5" rx="1" fill="#1a1a2e" />
              <rect x="13.5" y="0" width="2.5" height="12" rx="1" fill="#1a1a2e" opacity="0.3" />
            </svg>
            <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
              <path d="M8 2.5C10.5 2.5 12.7 3.6 14.2 5.3L15.5 3.8C13.6 1.8 11 0.5 8 0.5C5 0.5 2.4 1.8 0.5 3.8L1.8 5.3C3.3 3.6 5.5 2.5 8 2.5Z" fill="#1a1a2e" opacity="0.3" />
              <path d="M8 5.5C9.8 5.5 11.4 6.3 12.5 7.5L13.8 6C12.3 4.4 10.3 3.5 8 3.5C5.7 3.5 3.7 4.4 2.2 6L3.5 7.5C4.6 6.3 6.2 5.5 8 5.5Z" fill="#1a1a2e" opacity="0.6" />
              <path d="M8 8.5C9.1 8.5 10.1 8.9 10.8 9.7L8 12.5L5.2 9.7C5.9 8.9 6.9 8.5 8 8.5Z" fill="#1a1a2e" />
            </svg>
            <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
              <rect x="0.5" y="0.5" width="21" height="11" rx="3.5" stroke="#1a1a2e" strokeOpacity="0.35" />
              <rect x="2" y="2" width="16" height="8" rx="2" fill="#1a1a2e" />
              <path d="M23 4.5V7.5C23.8 7.2 24.5 6.5 24.5 6C24.5 5.5 23.8 4.8 23 4.5Z" fill="#1a1a2e" fillOpacity="0.4" />
            </svg>
          </div>
        </div>

        {/* Screen content */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden">
          <Outlet />
        </div>

        {/* Bottom navigation */}
        <BottomNav />
      </div>
    </div>
  );
}