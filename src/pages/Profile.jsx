
import {
  User,
  MoonStar,
  Trophy,
  Target,
  Settings,
  Bell,
  Pencil,
  ChevronRight,
} from "lucide-react";

import { motion } from "framer-motion";
import { useState } from "react";
import { useSleep } from "../context/SleepContext";
import BottomNav from "../components/BottomNav";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();

  const {
    userName,
    setUserName,
    sleepScore,
    sleepGoal,
    setSleepGoal,
    streak,
  } = useSleep();

  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");
  const [goal, setGoal] = useState(sleepGoal);

  const saveProfile = () => {
    setUserName(name.trim() || userName);
    setSleepGoal(Number(goal));
    setEditing(false);
  };

  const logout = () => {
    localStorage.removeItem("userName");
    setUserName("");
    navigate("/welcome", { replace: true });
  };

  const statCard =
    "rounded-3xl border border-[#E3CBB9] bg-white p-4 text-center shadow-sm";

  const menuButton =
    "flex w-full items-center justify-between px-5 py-5 text-[#7A2634] transition hover:bg-[#F8F0E5]";

  return (
    <div className="min-h-screen flex justify-center bg-[#F8F0E5]">
      <div className="w-full max-w-[393px] px-6 pt-8 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          {/* PROFILE */}
          <div className="flex flex-col items-center">
            <div className="flex h-32 w-32 items-center justify-center rounded-full border-4 border-white bg-[#E8D5C7] shadow-lg">
              <User size={60} className="text-[#7A2634]" />
            </div>

            <h1 className="mt-6 text-center text-3xl font-bold text-[#7A2634]">
              {userName || "Pengguna"}
            </h1>

            <p className="mt-2 text-[#A66D68]">
              🌙 Sleep Explorer
            </p>

            <button
              onClick={() => {
                setName(userName || "");
                setGoal(sleepGoal);
                setEditing(!editing);
              }}
              className="mt-5 flex items-center gap-2 rounded-full border border-[#D9B9AB] bg-white px-5 py-3 font-medium text-[#7A2634] transition hover:bg-[#F1E1D5]"
            >
              <Pencil size={18} />
              Edit Profil
            </button>

            {editing && (
              <div className="mt-6 w-full rounded-3xl border border-[#E3CBB9] bg-white p-5 shadow-sm">
                <h2 className="mb-4 text-lg font-bold text-[#7A2634]">
                  Edit Profil
                </h2>

                <label className="mb-2 block text-sm text-[#76534C]">
                  Nama pengguna
                </label>

                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Masukkan nama"
                  className="mb-4 w-full rounded-2xl border border-[#D9B9AB] bg-[#F8F0E5] p-4 text-[#65433F] outline-none focus:border-[#7A2634]"
                />

                <label className="mb-2 block text-sm text-[#76534C]">
                  Target tidur (jam)
                </label>

                <input
                  type="number"
                  min="1"
                  max="24"
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  className="w-full rounded-2xl border border-[#D9B9AB] bg-[#F8F0E5] p-4 text-[#65433F] outline-none focus:border-[#7A2634]"
                />

                <button
                  onClick={saveProfile}
                  className="mt-5 w-full rounded-2xl bg-[#7A2634] py-4 font-semibold text-white transition hover:bg-[#62202B]"
                >
                  Simpan Perubahan
                </button>
              </div>
            )}
          </div>

          {/* STATISTICS */}
          <div className="mt-10 grid grid-cols-3 gap-3">
            <div className={statCard}>
              <MoonStar className="mx-auto text-[#7A2634]" size={24} />

              <h2 className="mt-4 text-2xl font-bold text-[#7A2634]">
                {sleepScore}
              </h2>

              <p className="mt-1 text-xs text-[#A66D68]">
                Sleep Score
              </p>
            </div>

            <div className={statCard}>
              <Target className="mx-auto text-[#A66D68]" size={24} />

              <h2 className="mt-4 text-2xl font-bold text-[#7A2634]">
                {sleepGoal}h
              </h2>

              <p className="mt-1 text-xs text-[#A66D68]">
                Target
              </p>
            </div>

            <div className={statCard}>
              <Trophy className="mx-auto text-[#B78343]" size={24} />

              <h2 className="mt-4 text-2xl font-bold text-[#7A2634]">
                {streak}
              </h2>

              <p className="mt-1 text-xs text-[#A66D68]">
                Streak
              </p>
            </div>
          </div>

          {/* ACHIEVEMENTS */}
          <div className="mt-8 rounded-[30px] border border-[#E3CBB9] bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold text-[#7A2634]">
              🏆 Achievement
            </h2>

            <div className="mt-5 space-y-3">
              <div className="flex items-center gap-4 rounded-2xl bg-[#F8F0E5] p-4">
                <div className="text-3xl">🌙</div>

                <div>
                  <h3 className="font-semibold text-[#7A2634]">
                    Early Sleeper
                  </h3>
                  <p className="text-sm text-[#76534C]">
                    Tidur sebelum pukul 22.00
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-2xl bg-[#F8F0E5] p-4">
                <div className="text-3xl">🔥</div>

                <div>
                  <h3 className="font-semibold text-[#7A2634]">
                    {streak} Days Streak
                  </h3>
                  <p className="text-sm text-[#76534C]">
                    Konsisten menjaga pola tidur
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-2xl bg-[#F8F0E5] p-4">
                <div className="text-3xl">🍫</div>

                <div>
                  <h3 className="font-semibold text-[#7A2634]">
                    Dream Choco Lover
                  </h3>
                  <p className="text-sm text-[#76534C]">
                    Kenali rutinitas relaksasi NAPCO
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* MENU */}
          <div className="mt-8 overflow-hidden rounded-[30px] border border-[#E3CBB9] bg-white shadow-sm">
            <button
              onClick={() => navigate("/settings")}
              className={menuButton}
            >
              <div className="flex items-center gap-4">
                <Settings size={21} />
                <span>Pengaturan</span>
              </div>
              <ChevronRight size={20} />
            </button>

            <div className="mx-5 border-t border-[#F1E1D5]" />

            <button
              onClick={() => navigate("/settings")}
              className={menuButton}
            >
              <div className="flex items-center gap-4">
                <Bell size={21} />
                <span>Notifikasi</span>
              </div>
              <ChevronRight size={20} />
            </button>

            <div className="mx-5 border-t border-[#F1E1D5]" />

            <button
              onClick={() => {
                setName(userName || "");
                setGoal(sleepGoal);
                setEditing(true);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className={menuButton}
            >
              <div className="flex items-center gap-4">
                <User size={21} />
                <span>Akun</span>
              </div>
              <ChevronRight size={20} />
            </button>
          </div>

          {/* LOGOUT */}
          <button
            onClick={logout}
            className="mt-8 w-full rounded-3xl border border-[#7A2634] bg-[#7A2634] py-4 font-semibold text-white transition hover:bg-[#62202B]"
          >
            Keluar
          </button>
        </motion.div>
      </div>

      <BottomNav />
    </div>
  );
}

export default Profile;
