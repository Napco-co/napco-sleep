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

function Profile() {

  const {
  userName,
  setUserName,
  sleepScore,
  sleepGoal,
  setSleepGoal,
  streak,
} = useSleep();

const [editing, setEditing] = useState(false);

const [name, setName] = useState(userName);

const [goal, setGoal] = useState(sleepGoal);

const saveProfile = () => {

  setUserName(name);

  setSleepGoal(Number(goal));

  setEditing(false);

};

  return (

<div className="min-h-screen bg-gradient-to-b from-[#8B5CF6] via-[#5B21B6] to-[#1E1B4B] flex justify-center">

<div className="w-[393px] px-6 pt-8 pb-32">

<motion.div

initial={{opacity:0}}

animate={{opacity:1}}

>

{/* PROFILE */}

<div className="flex flex-col items-center">

<div className="w-32 h-32 rounded-full bg-gradient-to-br from-violet-400 to-indigo-700 flex justify-center items-center shadow-[0_0_50px_rgba(139,92,246,.8)]">

<User

size={60}

className="text-white"

/>

</div>

<h1 className="text-white text-4xl font-bold mt-6">

{userName}

</h1>

<p className="text-violet-200 mt-2">

🌙 Sleep Explorer

</p>

<button
  onClick={() => setEditing(!editing)}
  className="mt-5 rounded-full bg-white/10 px-5 py-3 flex items-center gap-2 text-white"
>
  <Pencil size={18} />
  Edit Profil
</button>

{editing && (
  <div className="mt-6 w-full rounded-3xl bg-white/10 p-5">

    <input
      value={name}
      onChange={(e) => setName(e.target.value)}
      placeholder="Nama"
      className="w-full rounded-2xl bg-white/10 p-4 text-white outline-none mb-4 placeholder:text-violet-300"
    />

    <input
      type="number"
      value={goal}
      onChange={(e) => setGoal(e.target.value)}
      placeholder="Target Tidur"
      className="w-full rounded-2xl bg-white/10 p-4 text-white outline-none placeholder:text-violet-300"
    />

    <button
      onClick={saveProfile}
      className="mt-5 w-full rounded-2xl bg-gradient-to-r from-violet-500 to-indigo-600 py-4 text-white font-semibold"
    >
      Simpan
    </button>

  </div>
)}
</div>

{/* SCORE */}

<div className="grid grid-cols-3 gap-4 mt-10">

<div className="rounded-3xl bg-white/10 p-5 text-center">

<MoonStar

className="mx-auto text-violet-300"

/>

<h2 className="text-white text-3xl font-bold mt-4">

{sleepScore}

</h2>

<p className="text-violet-200 text-sm">

Score

</p>

</div>

<div className="rounded-3xl bg-white/10 p-5 text-center">

<Target

className="mx-auto text-cyan-300"

/>

<h2 className="text-white text-3xl font-bold mt-4">

{sleepGoal}h

</h2>

<p className="text-violet-200 text-sm">

Goal

</p>

</div>

<div className="rounded-3xl bg-white/10 p-5 text-center">

<Trophy

className="mx-auto text-yellow-300"

/>

<h2 className="text-white text-3xl font-bold mt-4">

{streak}

</h2>

<p className="text-violet-200 text-sm">

Streak

</p>

</div>

</div>

{/* ACHIEVEMENT */}

<div className="mt-8 rounded-[35px] bg-white/10 backdrop-blur-3xl border border-white/10 p-6">

<h2 className="text-white text-2xl font-bold">

🏆 Achievement

</h2>

<div className="mt-6 space-y-4">
          <div className="rounded-2xl bg-white/10 p-4 flex items-center gap-4">

            <div className="text-4xl">🌙</div>

            <div>

              <h3 className="text-white font-semibold">
                Early Sleeper
              </h3>

              <p className="text-violet-200 text-sm">
                Tidur sebelum pukul 22.00
              </p>

            </div>

          </div>

          <div className="rounded-2xl bg-white/10 p-4 flex items-center gap-4">

            <div className="text-4xl">🔥</div>

            <div>

              <h3 className="text-white font-semibold">
                {streak} Days Streak
              </h3>

              <p className="text-violet-200 text-sm">
                Konsisten menjaga pola tidur
              </p>

            </div>

          </div>

          <div className="rounded-2xl bg-white/10 p-4 flex items-center gap-4">

            <div className="text-4xl">🍫</div>

            <div>

              <h3 className="text-white font-semibold">
                Dream Choco Lover
              </h3>

              <p className="text-violet-200 text-sm">
                Rutin menggunakan Dream Choco
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* MENU */}

      <div className="mt-8 rounded-[35px] bg-white/10 backdrop-blur-xl border border-white/10 overflow-hidden">

        <button className="w-full flex items-center justify-between px-6 py-5 text-white hover:bg-white/10 transition">

          <div className="flex items-center gap-4">

            <Settings />

            <span>Pengaturan</span>

          </div>

          <ChevronRight />

        </button>

        <button className="w-full flex items-center justify-between px-6 py-5 text-white hover:bg-white/10 transition">

          <div className="flex items-center gap-4">

            <Bell />

            <span>Notifikasi</span>

          </div>

          <ChevronRight />

        </button>

        <button className="w-full flex items-center justify-between px-6 py-5 text-white hover:bg-white/10 transition">

          <div className="flex items-center gap-4">

            <User />

            <span>Akun</span>

          </div>

          <ChevronRight />

        </button>

      </div>

      {/* LOGOUT */}

      <button
        className="mt-8 w-full rounded-3xl bg-red-500 py-5 text-white font-semibold hover:bg-red-600 transition"
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