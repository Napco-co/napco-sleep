import {
  Bell,
  Brain,
  Headphones,
  MoonStar,
} from "lucide-react";

import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import product from "../assets/product.png";
import BottomNav from "../components/BottomNav";
import { useSleep } from "../context/SleepContext";

function Home() {
  const navigate = useNavigate();
  const { sleepScore } = useSleep();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#7A2634] via-[#C58A83] to-[#F8F0E5] flex justify-center">
      <div className="w-full max-w-[393px] px-6 pt-8 pb-32">

        {/* HEADER */}
        <div className="flex justify-between items-center">
          <div>
            <p className="text-[#F8F0E5] text-sm">
              Selamat Malam 🌙
            </p>
            <h1 className="text-white text-4xl font-bold mt-1">
              NAPCO Sleep+
            </h1>
          </div>

          <button className="w-14 h-14 rounded-3xl bg-[#F8F0E5]/20 backdrop-blur-xl flex justify-center items-center text-white">
            <Bell />
          </button>
        </div>

        {/* HERO */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative mt-8 rounded-[40px] overflow-hidden border border-[#F8F0E5]/30 bg-[#F8F0E5]/20 backdrop-blur-3xl p-8"
        >
          <div className="absolute -top-20 -right-20 w-56 h-56 rounded-full bg-[#C58A83]/40 blur-3xl" />
          <div className="absolute -bottom-24 -left-20 w-56 h-56 rounded-full bg-[#7A2634]/25 blur-3xl" />

          <div className="relative z-10">
            <div className="mx-auto w-20 h-20 rounded-full bg-gradient-to-br from-[#C58A83] to-[#7A2634] flex justify-center items-center shadow-[0_0_35px_rgba(122,38,52,0.35)]">
              <MoonStar className="text-white" />
            </div>

            <h2 className="text-center text-white text-3xl font-bold mt-6">
              Better Sleep Starts Here
            </h2>

            <p className="text-center text-[#FFF7EF] mt-4 leading-7">
              Tidur lebih nyenyak bersama AI NAPPI
            </p>

            <motion.img
              whileHover={{ scale: 1.05 }}
              src={product}
              alt="NAPCO Dream Choco Bites"
              className="mx-auto mt-8 w-64 drop-shadow-[0_20px_30px_rgba(70,25,25,0.25)]"
            />
          </div>
        </motion.div>

        {/* START BUTTON */}
        <motion.button
          whileTap={{ scale: 0.98 }}
          whileHover={{ scale: 1.02 }}
          onClick={() => navigate("/sleep-check")}
          className="mt-8 w-full rounded-3xl bg-gradient-to-r from-[#C58A83] to-[#7A2634] p-5 flex items-center gap-5 text-white shadow-xl"
        >
          <img src={product} alt="" className="w-14 rounded-lg" />
          <div className="text-left">
            <h3 className="text-xl font-bold">
              Mulai Sleep Check
            </h3>
            <p className="text-[#FFF0E8] text-sm">
              Analisis kualitas tidurmu
            </p>
          </div>
        </motion.button>

        {/* FEATURE */}
        <div className="grid grid-cols-2 gap-5 mt-6">
          <button
            onClick={() => navigate("/ai")}
            className="rounded-3xl bg-[#7A2634]/10 border border-[#7A2634]/15 backdrop-blur-xl p-6 text-[#7A2634] hover:bg-[#7A2634]/15 transition"
          >
            <Brain size={36} />
            <h3 className="mt-5 font-bold">NAPPI AI</h3>
            <p className="text-[#7A2634]/80 text-sm mt-2">
              Konsultasi AI
            </p>
          </button>

          <button
            onClick={() => navigate("/audio")}
            className="rounded-3xl bg-[#7A2634]/10 border border-[#7A2634]/15 backdrop-blur-xl p-6 text-[#7A2634] hover:bg-[#7A2634]/15 transition"
          >
            <Headphones size={36} />
            <h3 className="mt-5 font-bold">Sleep Audio</h3>
            <p className="text-[#7A2634]/80 text-sm mt-2">
              Audio Relaksasi
            </p>
          </button>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-3 gap-3 mt-6">
          <div className="rounded-3xl bg-[#FFF9F0]/75 border border-[#7A2634]/10 p-4 text-center">
            <h2 className="text-3xl text-[#7A2634] font-bold">
              {sleepScore}
            </h2>
            <p className="text-[#7A2634]/80 text-xs mt-2">
              Sleep Score
            </p>
          </div>

          <div className="rounded-3xl bg-[#FFF9F0]/75 border border-[#7A2634]/10 p-4 text-center">
            <h2 className="text-3xl text-[#7A2634] font-bold">
              10Hz
            </h2>
            <p className="text-[#7A2634]/80 text-xs mt-2">
              Forest Rain
            </p>
          </div>

          <div className="rounded-3xl bg-[#FFF9F0]/75 border border-[#7A2634]/10 p-4 text-center">
            <h2 className="text-3xl">🍫</h2>
            <p className="text-[#7A2634]/80 text-xs mt-2">
              Dream Choco
            </p>
          </div>
        </div>

        {/* AI INSIGHT */}
        <div className="mt-6 rounded-3xl bg-[#FFF9F0]/80 border border-[#7A2634]/10 p-6">
          <div className="flex items-center gap-3">
            <Brain className="text-[#7A2634]" />
            <h3 className="text-[#7A2634] font-bold text-lg">
              Insight NAPPI AI
            </h3>
          </div>

          <p className="text-[#63313A] mt-4 leading-7">
            {sleepScore >= 85 &&
              "🌙 Kualitas tidurmu sangat baik. Pertahankan pola tidur yang konsisten."}

            {sleepScore >= 70 &&
              sleepScore < 85 &&
              "😊 Tidurmu cukup baik. Kurangi penggunaan HP sebelum tidur agar hasilnya semakin optimal."}

            {sleepScore >= 55 &&
              sleepScore < 70 &&
              "😴 Tidurmu masih perlu ditingkatkan. Cobalah tidur lebih awal dan kurangi konsumsi kopi."}

            {sleepScore < 55 &&
              "🚨 Sleep Score-mu masih rendah. Cobalah tidur lebih awal, mengurangi screen time, dan mencoba Sleep Audio."}
          </p>

          <button
            onClick={() => navigate("/recommendation")}
            className="mt-6 w-full rounded-3xl bg-gradient-to-r from-[#C58A83] to-[#7A2634] py-4 text-white font-semibold"
          >
            Lihat Rekomendasi
          </button>
        </div>

        {/* DREAM CHOCO */}
        <div className="mt-6 rounded-[35px] bg-gradient-to-r from-[#C58A83] to-[#7A2634] p-6 shadow-xl">
          <div className="flex justify-between items-center gap-3">
            <div>
              <p className="text-[#FFF0E8]">
                Produk Unggulan
              </p>

              <h2 className="text-white text-2xl font-bold mt-2">
                🍫 Dream Choco
              </h2>

              <p className="text-[#FFF0E8] mt-3 leading-7">
                Functional chocolate dengan kakao, chamomile,
                mint, dan stevia yang membantu tubuh lebih
                rileks sebelum tidur.
              </p>

              <button
                onClick={() => navigate("/recommendation")}
                className="mt-5 rounded-2xl bg-[#FFF9F0] text-[#7A2634] px-5 py-3 font-bold"
              >
                Pelajari Produk
              </button>
            </div>

            <img
              src={product}
              alt="Dream Choco"
              className="w-20 drop-shadow-xl"
            />
          </div>
        </div>

        {/* AUDIO */}
        <div className="mt-6 rounded-[35px] bg-[#FFF9F0]/80 border border-[#7A2634]/10 p-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-[#7A2634] text-2xl font-bold">
                🎧 Audio Hari Ini
              </h2>
              <p className="text-[#7A2634]/80 mt-2">
                Forest Rain • 20 Menit
              </p>
            </div>

            <button
              onClick={() => navigate("/audio")}
              className="w-14 h-14 rounded-full bg-gradient-to-r from-[#C58A83] to-[#7A2634] text-white text-xl shadow-xl"
            >
              ▶
            </button>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}

export default Home;