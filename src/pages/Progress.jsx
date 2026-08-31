import {
  MoonStar,
  Trophy,
  Target,
  Flame,
  Sparkles,
} from "lucide-react";

import { motion } from "framer-motion";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  Tooltip,
} from "recharts";

import { useSleep } from "../context/SleepContext";

import BottomNav from "../components/BottomNav";

const defaultData = [
  { day: "1", score: 0 },
  { day: "2", score: 0 },
  { day: "3", score: 0 },
  { day: "4", score: 0 },
  { day: "5", score: 0 },
  { day: "6", score: 0 },
  { day: "7", score: 0 },
];

function Progress() {
  const {
    sleepScore,
    sleepGoal,
    streak,
    history = [],
  } = useSleep();

  // Buat data grafik selalu aman untuk 7 hari
  const weeklyData = defaultData.map((item, index) => ({
    ...item,
    score:
      history.length > 0
        ? history[history.length - 1 - index]?.score ?? 0
        : 0,
  }));

  // Sleep Check terbaru ditampilkan di hari ke-7
  if (history.length > 0) {
    weeklyData[6].score = history[0]?.score ?? sleepScore;
  } else {
    weeklyData[6].score = sleepScore;
  }

  const average = Math.round(
    weeklyData.reduce((sum, item) => sum + item.score, 0) /
      weeklyData.length
  );

  const best = Math.max(
    ...weeklyData.map((item) => item.score)
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#8B5CF6] via-[#5B21B6] to-[#1E1B4B] flex justify-center">

      <div className="w-[393px] px-6 pt-8 pb-32">

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >

          {/* HEADER */}

          <div>
            <p className="text-violet-200">
              Progress Tidur 🌙
            </p>

            <h1 className="text-white text-4xl font-bold mt-2">
              Weekly Report
            </h1>
          </div>

          {/* SCORE */}

          <div className="mt-8 rounded-[35px] bg-white/10 backdrop-blur-3xl border border-white/10 p-8">

            <div className="flex justify-between items-center">

              <div>

                <p className="text-violet-200">
                  Sleep Score Hari Ini
                </p>

                <h2 className="text-6xl font-bold text-white mt-3">
                  {sleepScore}
                </h2>

              </div>

              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-xl">

                <MoonStar
                  size={38}
                  className="text-white"
                />

              </div>

            </div>

            {/* GRAPH */}

            <div className="mt-8 h-[230px]">

              <ResponsiveContainer
                width="100%"
                height="100%"
              >

                <LineChart data={weeklyData}>

                  <XAxis
                    dataKey="day"
                    stroke="#DDD6FE"
                  />

                  <Tooltip />

                  <Line
                    type="monotone"
                    dataKey="score"
                    stroke="#A78BFA"
                    strokeWidth={4}
                    dot={{ r: 5 }}
                  />

                </LineChart>

              </ResponsiveContainer>

            </div>

          </div>

          {/* STATS */}

          <div className="grid grid-cols-2 gap-4 mt-6">

            {/* TARGET */}

            <div className="rounded-3xl bg-white/10 p-5">

              <div className="flex items-center gap-3">

                <Target className="text-violet-300" />

                <p className="text-violet-200">
                  Target
                </p>

              </div>

              <h2 className="text-white text-3xl font-bold mt-4">
                {sleepGoal} Jam
              </h2>

            </div>

            {/* STREAK */}

            <div className="rounded-3xl bg-white/10 p-5">

              <div className="flex items-center gap-3">

                <Flame className="text-orange-300" />

                <p className="text-violet-200">
                  Streak
                </p>

              </div>

              <h2 className="text-white text-3xl font-bold mt-4">
                {streak} Hari
              </h2>

            </div>

            {/* AVERAGE */}

            <div className="rounded-3xl bg-white/10 p-5">

              <div className="flex items-center gap-3">

                <Sparkles className="text-cyan-300" />

                <p className="text-violet-200">
                  Average
                </p>

              </div>

              <h2 className="text-white text-3xl font-bold mt-4">
                {average}
              </h2>

            </div>

            {/* BEST */}

            <div className="rounded-3xl bg-white/10 p-5">

              <div className="flex items-center gap-3">

                <Trophy className="text-yellow-300" />

                <p className="text-violet-200">
                  Best
                </p>

              </div>

              <h2 className="text-white text-3xl font-bold mt-4">
                {best}
              </h2>

            </div>

          </div>

          {/* ACHIEVEMENT */}

          <div className="mt-6 rounded-[35px] bg-white/10 backdrop-blur-xl p-6">

            <h2 className="text-white text-2xl font-bold">
              🏆 Achievement
            </h2>

            <div className="mt-6 space-y-4">

              {/* ACHIEVEMENT 1 */}

              <div className="rounded-2xl bg-white/10 p-4 flex items-center gap-4">

                <div className="text-4xl">
                  {sleepScore >= 80 ? "🏆" : "🔒"}
                </div>

                <div>

                  <h3 className="text-white font-semibold">
                    Sleep Master
                  </h3>

                  <p className="text-violet-200 text-sm">
                    {sleepScore >= 80
                      ? "Berhasil mendapatkan Sleep Score di atas 80."
                      : "Capai Sleep Score 80 untuk membuka badge."}
                  </p>

                </div>

              </div>

              {/* ACHIEVEMENT 2 */}

              <div className="rounded-2xl bg-white/10 p-4 flex items-center gap-4">

                <div className="text-4xl">
                  {streak >= 7 ? "🔥" : "🔒"}
                </div>

                <div>

                  <h3 className="text-white font-semibold">
                    Konsisten 7 Hari
                  </h3>

                  <p className="text-violet-200 text-sm">
                    {streak >= 7
                      ? "Selamat! Kamu berhasil menjaga kebiasaan tidur."
                      : "Capai streak 7 hari untuk membuka badge."}
                  </p>

                </div>

              </div>

              {/* ACHIEVEMENT 3 */}

              <div className="rounded-2xl bg-white/10 p-4 flex items-center gap-4">

                <div className="text-4xl">
                  {sleepGoal >= 8 ? "🌙" : "🔒"}
                </div>

                <div>

                  <h3 className="text-white font-semibold">
                    Sleep Goal
                  </h3>

                  <p className="text-violet-200 text-sm">
                    {sleepGoal >= 8
                      ? "Target tidurmu sudah ideal."
                      : "Atur target tidur minimal 8 jam."}
                  </p>

                </div>

              </div>

            </div>

          </div>

          {/* AI INSIGHT */}

          <div className="mt-6 rounded-[35px] bg-white/10 backdrop-blur-xl p-6">

            <div className="flex items-center gap-3">

              <Sparkles className="text-violet-300" />

              <h2 className="text-white text-xl font-bold">
                Insight Minggu Ini
              </h2>

            </div>

            <p className="mt-5 text-violet-100 leading-8">

              {sleepScore >= 85 && (
                <>
                  🌙 Minggu ini kualitas tidurmu sangat baik.
                  Pertahankan jam tidur yang konsisten dan
                  kebiasaan sehatmu.
                </>
              )}

              {sleepScore >= 70 && sleepScore < 85 && (
                <>
                  😊 Kualitas tidurmu cukup baik.
                  Kurangi penggunaan HP sebelum tidur agar
                  skor meningkat.
                </>
              )}

              {sleepScore >= 55 && sleepScore < 70 && (
                <>
                  😴 Tidurmu cukup, tetapi masih belum optimal.
                  Cobalah tidur lebih awal dan kurangi kopi.
                </>
              )}

              {sleepScore >= 40 && sleepScore < 55 && (
                <>
                  😪 Pola tidurmu mulai menurun.
                  Perbanyak relaksasi dan olahraga ringan.
                </>
              )}

              {sleepScore < 40 && (
                <>
                  🚨 Kualitas tidurmu sangat rendah.
                  NAPPI AI menyarankan memperbaiki rutinitas
                  tidur dan mengurangi screen time.
                </>
              )}

            </p>

          </div>

          {/* HISTORY */}

          <div className="mt-6 rounded-[35px] bg-white/10 backdrop-blur-xl p-6">

            <h2 className="text-white text-2xl font-bold">
              📅 Riwayat Sleep Check
            </h2>

            <div className="mt-5 space-y-3">

              {history.length === 0 ? (

                <p className="text-violet-200">
                  Belum ada riwayat.
                </p>

              ) : (

                history.map((item, index) => (

                  <div
                    key={index}
                    className="flex justify-between bg-white/10 rounded-2xl p-4"
                  >

                    <span className="text-violet-200">
                      {item.date}
                    </span>

                    <span className="text-white font-bold">
                      {item.score}
                    </span>

                  </div>

                ))

              )}

            </div>

          </div>

        </motion.div>

      </div>

      <BottomNav />

    </div>
  );
}

export default Progress;