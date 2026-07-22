import {
  House,
  ChartColumn,
  Headphones,
  Brain,
  User,
} from "lucide-react";

import { useNavigate, useLocation } from "react-router-dom";

function BottomNav() {

  const navigate = useNavigate();
  const location = useLocation();

  const menus = [
    {
      icon: House,
      label: "Home",
      path: "/",
    },
    {
      icon: ChartColumn,
      label: "Progress",
      path: "/progress",
    },
    {
      icon: Headphones,
      label: "Audio",
      path: "/audio",
    },
    {
      icon: Brain,
      label: "AI",
      path: "/ai",
    },
    {
      icon: User,
      label: "Profil",
      path: "/profile",
    },
  ];

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[360px] rounded-3xl border border-white/10 bg-white/10 backdrop-blur-3xl px-6 py-4 flex justify-between">

      {menus.map((menu) => {

        const Icon = menu.icon;

        const active = location.pathname === menu.path;

        return (

          <button
            key={menu.path}
            onClick={() => navigate(menu.path)}
            className={`flex flex-col items-center transition ${
              active
                ? "text-white"
                : "text-violet-200 hover:text-white"
            }`}
          >

            <Icon size={22} />

            <span className="text-xs mt-1">

              {menu.label}

            </span>

          </button>

        );

      })}

    </div>
  );
}

export default BottomNav;