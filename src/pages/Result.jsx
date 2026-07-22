import {
  MoonStar,
  Brain,
  Headphones,
  RotateCcw,
  Sparkles,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import { useSleep } from "../context/SleepContext";

import BottomNav from "../components/BottomNav";

function Result() {
  const navigate = useNavigate();

  const { sleepScore } = useSleep();

  let status = "";
  let description = "";
  let aiInsight = [];

  if (sleepScore >= 85) {
    status = "🌙 Sangat Baik";

    description =
      "Kualitas tidurmu sangat baik. Pertahankan kebiasaan sehatmu setiap hari.";

    aiInsight = [
      "Kamu memiliki pola tidur yang sangat baik.",
      "Tubuhmu mendapatkan waktu istirahat yang cukup.",
      "Pertahankan rutinitas tidurmu agar tetap konsisten.",
    ];
  }

  else if (sleepScore >= 70) {

    status = "😊 Baik";

    description =
      "Tidurmu sudah baik, tetapi masih ada beberapa hal yang bisa ditingkatkan.";

    aiInsight = [
      "Cobalah tidur sedikit lebih awal.",
      "Kurangi penggunaan HP sebelum tidur.",
      "Pertahankan durasi tidurmu.",
    ];
  }

  else if (sleepScore >= 55) {

    status = "😴 Cukup";

    description =
      "Kualitas tidurmu cukup, namun tubuhmu belum memperoleh istirahat optimal.";

    aiInsight = [
      "Kurangi konsumsi kopi pada malam hari.",
      "Batasi screen time sebelum tidur.",
      "Mulailah tidur lebih awal.",
    ];
  }

  else if (sleepScore >= 40) {

    status = "😪 Kurang";

    description =
      "Pola tidurmu kurang baik sehingga dapat memengaruhi kesehatan dan produktivitas.";

    aiInsight = [
      "Kamu terlalu sering begadang.",
      "Stres dapat memengaruhi kualitas tidurmu.",
      "Olahraga ringan dapat membantu tidur lebih nyenyak.",
    ];
  }

  else {

    status = "🚨 Sangat Buruk";

    description =
      "Kualitas tidurmu sangat rendah. Disarankan segera memperbaiki pola tidur.";

    aiInsight = [
      "Tidurmu berada pada tingkat yang kurang sehat.",
      "Kurangi penggunaan HP pada malam hari.",
      "Mulailah membangun rutinitas tidur yang konsisten.",
    ];

  }

  return (

    <div className="min-h-screen bg-gradient-to-b from-[#8B5CF6] via-[#5B21B6] to-[#1E1B4B] flex justify-center">

      <div className="w-[393px] px-6 py-8">

        <motion.div

          initial={{ opacity: 0, y: 40 }}

          animate={{ opacity: 1, y: 0 }}

          transition={{ duration: .6 }}

          className="rounded-[35px] bg-white/10 backdrop-blur-3xl border border-white/10 p-8"

        >

          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 shadow-2xl">

            <MoonStar
              size={45}
              className="text-white"
            />

          </div>

          <h1 className="mt-6 text-center text-white text-6xl font-bold">

            {sleepScore}

          </h1>

          <p className="text-center text-violet-200 mt-2">

            Sleep Score

          </p>

          <div className="mt-8 rounded-3xl bg-violet-500/20 border border-violet-400/20 p-5 text-center">

            <h2 className="text-white text-2xl font-bold">

              {status}

            </h2>

            <p className="mt-3 text-violet-100 leading-7">

              {description}

            </p>

          </div>

          <div className="mt-8 rounded-3xl bg-white/10 p-6">

            <div className="flex items-center gap-3">

              <Sparkles className="text-violet-300" />

              <h2 className="text-white text-xl font-bold">

                Insight dari NAPPI AI

              </h2>

            </div>

            <div className="mt-5 space-y-4">

                          {aiInsight.map((item, index) => (

                <div
                  key={index}
                  className="rounded-2xl bg-white/10 p-4 text-violet-100"
                >
                  ✅ {item}
                </div>

              ))}

            </div>

          </div>

          {/* BUTTON */}

          <button
            onClick={() => navigate("/recommendation")}
            className="mt-8 w-full rounded-3xl bg-gradient-to-r from-violet-500 to-indigo-600 py-5 text-white font-semibold hover:scale-[1.02] transition"
          >
            🍫 Lihat Rekomendasi
          </button>

          <button
            onClick={() => navigate("/audio")}
            className="mt-4 w-full rounded-3xl bg-white/10 py-5 text-white flex justify-center items-center gap-3 hover:bg-white/20 transition"
          >

            <Headphones size={22} />

            Sleep Audio

          </button>

          <button
            onClick={() => navigate("/sleep-check")}
            className="mt-4 w-full rounded-3xl bg-white/10 py-5 text-white flex justify-center items-center gap-3 hover:bg-white/20 transition"
          >

            <RotateCcw size={22} />

            Cek Ulang

          </button>

        </motion.div>

      </div>

      <BottomNav />

    </div>

  );

}

export default Result;