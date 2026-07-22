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

    <div className="min-h-screen bg-gradient-to-b from-[#8B5CF6] via-[#5B21B6] to-[#1E1B4B] flex justify-center">

      <div className="w-[393px] px-6 pt-8 pb-32">

        {/* HEADER */}

        <div className="flex justify-between items-center">

          <div>

            <p className="text-violet-200 text-sm">

              Selamat Malam 🌙

            </p>

            <h1 className="text-white text-5xl font-bold mt-1">

              NAPCO Sleep+

            </h1>

          </div>

          <button className="w-14 h-14 rounded-3xl bg-white/10 backdrop-blur-xl flex justify-center items-center text-white">

            <Bell />

          </button>

        </div>

        {/* HERO */}

        <motion.div

          initial={{ opacity: 0, y: 40 }}

          animate={{ opacity: 1, y: 0 }}

          transition={{ duration: .7 }}

          className="relative mt-8 rounded-[40px] overflow-hidden border border-white/10 bg-white/10 backdrop-blur-3xl p-8"

        >

          <div className="absolute -top-20 -right-20 w-56 h-56 rounded-full bg-violet-400/30 blur-3xl" />

          <div className="absolute -bottom-24 -left-20 w-56 h-56 rounded-full bg-indigo-500/20 blur-3xl" />

          <div className="relative z-10">

            <div className="mx-auto w-20 h-20 rounded-full bg-gradient-to-br from-violet-400 to-indigo-600 flex justify-center items-center shadow-[0_0_45px_rgba(139,92,246,.8)]">

              <MoonStar className="text-white" />

            </div>

            <h2 className="text-center text-white text-4xl font-bold mt-6">

              Better Sleep Starts Here

            </h2>

            <p className="text-center text-violet-100 mt-4 leading-7">

              Tidur lebih nyenyak bersama AI NAPPI

            </p>

            <motion.img

              whileHover={{ scale: 1.05 }}

              src={product}

              alt="product"

              className="mx-auto mt-8 w-64 drop-shadow-[0_25px_40px_rgba(0,0,0,.5)]"

            />

          </div>

        </motion.div>
                {/* START BUTTON */}

        <motion.button

          whileTap={{ scale: .98 }}

          whileHover={{ scale: 1.02 }}

          onClick={() => navigate("/sleep-check")}

          className="mt-8 w-full rounded-3xl bg-gradient-to-r from-violet-500 to-indigo-600 p-5 flex items-center gap-5 text-white shadow-2xl"

        >

          <img

            src={product}

            alt=""

            className="w-14"

          />

          <div className="text-left">

            <h3 className="text-xl font-bold">

              Mulai Sleep Check

            </h3>

            <p className="text-violet-100 text-sm">

              Analisis kualitas tidurmu

            </p>

          </div>

        </motion.button>

        {/* FEATURE */}

        <div className="grid grid-cols-2 gap-5 mt-6">

          <button

            onClick={() => navigate("/ai")}

            className="rounded-3xl bg-white/10 backdrop-blur-xl p-6 text-white hover:bg-white/20 transition"

          >

            <Brain size={36} />

            <h3 className="mt-5 font-bold">

              NAPPI AI

            </h3>

            <p className="text-violet-200 text-sm mt-2">

              Konsultasi AI

            </p>

          </button>

          <button

            onClick={() => navigate("/audio")}

            className="rounded-3xl bg-white/10 backdrop-blur-xl p-6 text-white hover:bg-white/20 transition"

          >

            <Headphones size={36} />

            <h3 className="mt-5 font-bold">

              Sleep Audio

            </h3>

            <p className="text-violet-200 text-sm mt-2">

              Audio Relaksasi

            </p>

          </button>

        </div>
                {/* STATS */}

        <div className="grid grid-cols-3 gap-4 mt-6">

          <div className="rounded-3xl bg-white/10 backdrop-blur-xl p-5 text-center">

            <h2 className="text-3xl text-white font-bold">

              {sleepScore}

            </h2>

            <p className="text-violet-200 text-xs mt-2">

              Sleep Score

            </p>

          </div>

          <div className="rounded-3xl bg-white/10 backdrop-blur-xl p-5 text-center">

            <h2 className="text-3xl text-white font-bold">

              10Hz

            </h2>

            <p className="text-violet-200 text-xs mt-2">

              Forest Rain

            </p>

          </div>

          <div className="rounded-3xl bg-white/10 backdrop-blur-xl p-5 text-center">

            <h2 className="text-3xl">

              🍫

            </h2>

            <p className="text-violet-200 text-xs mt-2">

              Dream Choco

            </p>

          </div>

        </div>

        {/* AI INSIGHT */}

        <div className="mt-6 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/10 p-6">

          <div className="flex items-center gap-3">

            <Brain className="text-violet-300" />

            <h3 className="text-white font-bold text-lg">

              Insight NAPPI AI

            </h3>

          </div>

          <p className="text-violet-100 mt-4 leading-7">

            {sleepScore >= 85 &&
              "🌙 Kualitas tidurmu sangat baik. Pertahankan pola tidur yang konsisten."}

            {sleepScore >= 70 &&
              sleepScore < 85 &&
              "😊 Tidurmu cukup baik. Kurangi penggunaan HP sebelum tidur agar hasilnya semakin optimal."}

            {sleepScore >= 55 &&
              sleepScore < 70 &&
              "😴 Tidurmu masih perlu ditingkatkan. Cobalah tidur lebih awal dan kurangi konsumsi kopi."}

            {sleepScore < 55 &&
              "🚨 Sleep Score-mu masih rendah. NAPPI AI menyarankan tidur lebih awal, mengurangi screen time, dan mencoba Sleep Audio."}

          </p>

          <button

            onClick={() => navigate("/recommendation")}

            className="mt-6 w-full rounded-3xl bg-gradient-to-r from-violet-500 to-indigo-600 py-4 text-white font-semibold"

          >

            Lihat Rekomendasi

          </button>

        </div>
                {/* DREAM CHOCO */}

        <div className="mt-6 rounded-[35px] bg-gradient-to-r from-violet-500 to-indigo-700 p-6 shadow-xl">

          <div className="flex justify-between items-center">

            <div>

              <p className="text-violet-100">

                Produk Unggulan

              </p>

              <h2 className="text-white text-3xl font-bold mt-2">

                🍫 Dream Choco

              </h2>

              <p className="text-violet-100 mt-3 leading-7">

                Functional chocolate dengan kakao,
                chamomile, mint, dan stevia yang membantu
                tubuh lebih rileks sebelum tidur.

              </p>

              <button

                onClick={() => navigate("/recommendation")}

                className="mt-5 rounded-2xl bg-white text-violet-700 px-5 py-3 font-bold"

              >

                Pelajari Produk

              </button>

            </div>

            <img

              src={product}

              alt="Dream Choco"

              className="w-24 drop-shadow-xl"

            />

          </div>

        </div>

        {/* AUDIO */}

        <div className="mt-6 rounded-[35px] bg-white/10 backdrop-blur-xl border border-white/10 p-6">

          <div className="flex justify-between items-center">

            <div>

              <h2 className="text-white text-2xl font-bold">

                🎧 Audio Hari Ini

              </h2>

              <p className="text-violet-200 mt-2">

                Forest Rain • 20 Menit

              </p>

            </div>

            <button

              onClick={() => navigate("/audio")}

              className="w-14 h-14 rounded-full bg-gradient-to-r from-violet-500 to-indigo-600 text-white text-xl shadow-xl"

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