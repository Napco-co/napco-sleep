
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
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

import { useSleep } from "../context/SleepContext";
import BottomNav from "../components/BottomNav";

function Progress() {
  const {
    sleepScore,
    sleepGoal,
    streak,
    history,
  } = useSleep();

  // Riwayat diubah menjadi urutan lama ke terbaru
  const chronologicalHistory = [...history]
    .slice(0, 7)
    .reverse();

  const weeklyData = chronologicalHistory.map(
    (item, index) => ({
      day: index + 1,
      score: Number(item.score),
    })
  );

  // Statistik
  const scores = history
    .map((item) => Number(item.score))
    .filter((score) => !isNaN(score));

  const average =
    scores.length > 0
      ? Math.round(
          scores.reduce((sum, score) => sum + score, 0) /
            scores.length
        )
      : 0;

  const best =
    scores.length > 0 ? Math.max(...scores) : 0;

  const cardStyle =
    "rounded-3xl border border-[#E3CBB9] bg-white p-5 shadow-sm";

  const mutedText = "text-[#A66D68]";

  let insight =
    "🌙 Mulailah membangun jadwal tidur yang konsisten. Kurangi penggunaan HP sebelum tidur dan ciptakan suasana kamar yang nyaman.";

  if (sleepScore >= 85) {
    insight =
      "🌙 Kualitas tidurmu sangat baik. Pertahankan jam tidur yang konsisten dan kebiasaan sehatmu.";
  } else if (sleepScore >= 70) {
    insight =
      "😊 Kualitas tidurmu cukup baik. Pertahankan rutinitas dan kurangi penggunaan HP sebelum tidur.";
  } else if (sleepScore >= 55) {
    insight =
      "😴 Kualitas tidurmu masih bisa ditingkatkan. Cobalah tidur lebih awal dan batasi kafein menjelang malam.";
  } else if (sleepScore >= 40) {
    insight =
      "🤎 Coba perbaiki rutinitas tidur secara bertahap, lakukan relaksasi, dan pertahankan jam tidur yang teratur.";
  }

  return (
    <div className="min-h-screen flex justify-center bg-[#F8F0E5]">
      <div className="w-full max-w-[393px] px-6 pt-8 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          {/* HEADER */}
          <div>
            <p className="text-[#A66D68]">
              Progress Tidur 🌙
            </p>

            <h1 className="mt-2 text-3xl font-bold text-[#7A2634]">
              Weekly Report
            </h1>

            <p className="mt-2 text-sm text-[#76534C]">
              Pantau perkembangan kualitas tidurmu.
            </p>
          </div>

          {/* SLEEP SCORE + GRAPH */}
          <div className="mt-8 rounded-[30px] border border-[#E3CBB9] bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className={mutedText}>
                  Sleep Score Hari Ini
                </p>

                <h2 className="mt-3 text-5xl font-bold text-[#7A2634]">
                  {sleepScore}
                </h2>

                <p className="mt-1 text-sm text-[#76534C]">
                  Dari skala 100
                </p>
              </div>

              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#F1E1D5]">
                <MoonStar
                  size={34}
                  className="text-[#7A2634]"
                />
              </div>
            </div>

            {/* GRAPH */}
            <div className="mt-8 h-[230px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={weeklyData}
                  margin={{
                    top: 10,
                    right: 8,
                    left: -12,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid
                    stroke="#EADFD5"
                    strokeDasharray="4 4"
                    vertical={false}
                  />

                  <XAxis
                    dataKey="day"
                    type="number"
                    domain={[1, 7]}
                    ticks={[1, 2, 3, 4, 5, 6, 7]}
                    allowDecimals={false}
                    tickFormatter={(value) => `Hari ${value}`}
                    tick={{
                      fill: "#76534C",
                      fontSize: 10,
                    }}
                    tickLine={false}
                    axisLine={{ stroke: "#D9B9AB" }}
                  />

                  <YAxis
                    domain={[0, 100]}
                    ticks={[0, 25, 50, 75, 100]}
                    tick={{
                      fill: "#76534C",
                      fontSize: 12,
                    }}
                    tickLine={false}
                    axisLine={false}
                    width={35}
                  />

                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#FFF9F0",
                      border: "1px solid #D9B9AB",
                      borderRadius: "12px",
                      color: "#7A2634",
                    }}
                    labelStyle={{
                      color: "#7A2634",
                      fontWeight: "bold",
                    }}
                    formatter={(value) => [
                      value,
                      "Sleep Score",
                    ]}
                    labelFormatter={(label) =>
                      `Hari ${label}`
                    }
                  />

                  <Line
                    type="monotone"
                    dataKey="score"
                    name="Sleep Score"
                    stroke="#7A2634"
                    strokeWidth={3}
                    connectNulls={false}
                    dot={{
                      r: 5,
                      fill: "#C58A83",
                      stroke: "#7A2634",
                      strokeWidth: 2,
                    }}
                    activeDot={{
                      r: 7,
                      fill: "#7A2634",
                    }}
                    isAnimationActive={true}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {weeklyData.length === 0 && (
              <p className="mt-2 text-center text-sm text-[#A66D68]">
                Grafik akan muncul setelah kamu melakukan Sleep Check.
              </p>
            )}
          </div>

          {/* STATISTICS */}
          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className={cardStyle}>
              <Target className="text-[#7A2634]" size={24} />

              <p className={`mt-3 text-sm ${mutedText}`}>
                Target Tidur
              </p>

              <h2 className="mt-1 text-2xl font-bold text-[#7A2634]">
                {sleepGoal} Jam
              </h2>
            </div>

            <div className={cardStyle}>
              <Flame className="text-[#B78343]" size={24} />

              <p className={`mt-3 text-sm ${mutedText}`}>
                Streak
              </p>

              <h2 className="mt-1 text-2xl font-bold text-[#7A2634]">
                {streak} Hari
              </h2>
            </div>

            <div className={cardStyle}>
              <Sparkles className="text-[#A66D68]" size={24} />

              <p className={`mt-3 text-sm ${mutedText}`}>
                Rata-rata
              </p>

              <h2 className="mt-1 text-2xl font-bold text-[#7A2634]">
                {average}
              </h2>
            </div>

            <div className={cardStyle}>
              <Trophy className="text-[#B78343]" size={24} />

              <p className={`mt-3 text-sm ${mutedText}`}>
                Skor Terbaik
              </p>

              <h2 className="mt-1 text-2xl font-bold text-[#7A2634]">
                {best}
              </h2>
            </div>
          </div>

          {/* ACHIEVEMENT */}
          <div className="mt-6 rounded-[30px] border border-[#E3CBB9] bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold text-[#7A2634]">
              🏆 Achievement
            </h2>

            <div className="mt-5 space-y-3">
              <div className="flex items-center gap-4 rounded-2xl bg-[#F8F0E5] p-4">
                <div className="text-3xl">
                  {sleepScore >= 80 ? "🏆" : "🔒"}
                </div>

                <div>
                  <h3 className="font-semibold text-[#7A2634]">
                    Sleep Master
                  </h3>

                  <p className="text-sm text-[#76534C]">
                    {sleepScore >= 80
                      ? "Kamu mencapai Sleep Score minimal 80."
                      : "Capai Sleep Score 80 untuk membuka badge."}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-2xl bg-[#F8F0E5] p-4">
                <div className="text-3xl">
                  {streak >= 7 ? "🔥" : "🔒"}
                </div>

                <div>
                  <h3 className="font-semibold text-[#7A2634]">
                    Konsisten 7 Hari
                  </h3>

                  <p className="text-sm text-[#76534C]">
                    {streak >= 7
                      ? "Kamu mencapai streak 7 hari."
                      : "Capai streak 7 hari untuk membuka badge."}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-2xl bg-[#F8F0E5] p-4">
                <div className="text-3xl">
                  {sleepGoal >= 8 ? "🌙" : "🔒"}
                </div>

                <div>
                  <h3 className="font-semibold text-[#7A2634]">
                    Sleep Goal
                  </h3>

                  <p className="text-sm text-[#76534C]">
                    {sleepGoal >= 8
                      ? "Target tidurmu minimal 8 jam."
                      : "Atur target tidur sesuai kebutuhanmu."}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* INSIGHT */}
          <div className="mt-6 rounded-[30px] border border-[#E3CBB9] bg-[#F1E1D5] p-5">
            <div className="flex items-center gap-3">
              <Sparkles
                className="text-[#7A2634]"
                size={24}
              />

              <h2 className="text-lg font-bold text-[#7A2634]">
                Insight Minggu Ini
              </h2>
            </div>

            <p className="mt-4 leading-7 text-[#76534C]">
              {insight}
            </p>
          </div>

          {/* HISTORY */}
          <div className="mt-6 rounded-[30px] border border-[#E3CBB9] bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold text-[#7A2634]">
              📅 Riwayat Sleep Check
            </h2>

            <div className="mt-5 space-y-3">
              {history.length === 0 ? (
                <p className="text-sm text-[#A66D68]">
                  Belum ada riwayat Sleep Check.
                </p>
              ) : (
                history.map((item, index) => (
                  <div
                    key={`${item.date || "check"}-${index}`}
                    className="flex items-center justify-between gap-3 rounded-2xl bg-[#F8F0E5] p-4"
                  >
                    <span className="text-sm text-[#76534C]">
                      {item.date || `Sleep Check ${index + 1}`}
                    </span>

                    <span className="font-bold text-[#7A2634]">
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
