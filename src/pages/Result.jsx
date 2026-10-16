
import {
  MoonStar,
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
  } else if (sleepScore >= 70) {
    status = "😊 Baik";
    description =
      "Tidurmu sudah baik, tetapi masih ada beberapa hal yang bisa ditingkatkan.";

    aiInsight = [
      "Cobalah tidur sedikit lebih awal.",
      "Kurangi penggunaan HP sebelum tidur.",
      "Pertahankan durasi tidur yang cukup.",
    ];
  } else if (sleepScore >= 55) {
    status = "😴 Cukup";
    description =
      "Kualitas tidurmu cukup, namun kebiasaan tidurmu masih bisa ditingkatkan.";

    aiInsight = [
      "Kurangi konsumsi kopi menjelang waktu tidur.",
      "Batasi screen time sebelum tidur.",
      "Mulailah tidur lebih awal secara bertahap.",
    ];
  } else if (sleepScore >= 40) {
    status = "😪 Kurang";
    description =
      "Pola tidurmu mungkin perlu diperbaiki agar mendukung kesehatan dan produktivitas.";

    aiInsight = [
      "Cobalah mengurangi kebiasaan begadang.",
      "Kelola stres dengan aktivitas relaksasi.",
      "Pertimbangkan olahraga ringan secara rutin.",
    ];
  } else {
    status = "🚨 Sangat Buruk";
    description =
      "Skor Sleep Check-mu rendah. Mulailah memperbaiki rutinitas tidur secara bertahap.";

    aiInsight = [
      "Bangun jadwal tidur dan bangun yang konsisten.",
      "Kurangi penggunaan HP menjelang waktu tidur.",
      "Jika kesulitan tidur terus berlanjut, pertimbangkan berkonsultasi dengan tenaga kesehatan.",
    ];
  }

  return (
    <div className="min-h-screen flex justify-center bg-[#F8F0E5]">
      <div className="w-full max-w-[393px] px-6 py-8 pb-32">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-[30px] border border-[#E3CBB9] bg-white p-6 shadow-sm"
        >
          {/* SCORE ICON */}
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-[#7A2634] shadow-md">
            <MoonStar size={44} className="text-[#F8F0E5]" />
          </div>

          {/* SLEEP SCORE */}
          <h1 className="mt-6 text-center text-6xl font-bold text-[#7A2634]">
            {sleepScore}
          </h1>

          <p className="mt-2 text-center font-medium text-[#A66D68]">
            Sleep Score
          </p>

          <div className="mx-auto mt-4 h-2 w-24 overflow-hidden rounded-full bg-[#F1E1D5]">
            <motion.div
              initial={{ width: 0 }}
              animate={{
                width: `${Math.max(0, Math.min(100, sleepScore))}%`,
              }}
              transition={{ duration: 0.8 }}
              className="h-full rounded-full bg-[#C58A83]"
            />
          </div>

          {/* STATUS */}
          <div className="mt-8 rounded-3xl border border-[#E3CBB9] bg-[#F8F0E5] p-5 text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#A66D68]">
              Hasil Analisis
            </p>

            <h2 className="mt-3 text-2xl font-bold text-[#7A2634]">
              {status}
            </h2>

            <p className="mt-3 text-sm leading-7 text-[#76534C]">
              {description}
            </p>
          </div>

          {/* NAPPI AI INSIGHT */}
          <div className="mt-6 rounded-3xl border border-[#E3CBB9] bg-white p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F1E1D5]">
                <Sparkles className="text-[#7A2634]" size={22} />
              </div>

              <div>
                <h2 className="text-lg font-bold text-[#7A2634]">
                  Insight dari NAPPI AI
                </h2>
                <p className="text-xs text-[#A66D68]">
                  Saran untuk rutinitas tidurmu
                </p>
              </div>
            </div>

            <div className="mt-5 space-y-3">
              {aiInsight.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 rounded-2xl bg-[#F8F0E5] p-4"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#7A2634] text-xs font-bold text-white">
                    {index + 1}
                  </span>

                  <p className="text-sm leading-6 text-[#65433F]">
                    {item}
                  </p>
                </div>
              ))}
            </div>

            <p className="mt-4 text-xs leading-5 text-[#A66D68]">
              Hasil ini merupakan panduan kebiasaan tidur, bukan diagnosis medis.
            </p>
          </div>

          {/* RECOMMENDATION BUTTON */}
          <button
            onClick={() => navigate("/recommendation")}
            className="mt-7 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#7A2634] py-4 font-semibold text-white transition hover:bg-[#62202B]"
          >
            🍫 Lihat Rekomendasi
          </button>

          {/* AUDIO BUTTON */}
          <button
            onClick={() => navigate("/audio")}
            className="mt-3 flex w-full items-center justify-center gap-3 rounded-2xl border border-[#E3CBB9] bg-[#F8F0E5] py-4 font-semibold text-[#7A2634] transition hover:bg-[#F1E1D5]"
          >
            <Headphones size={21} />
            Sleep Audio
          </button>

          {/* RETAKE BUTTON */}
          <button
            onClick={() => navigate("/sleep-check")}
            className="mt-3 flex w-full items-center justify-center gap-3 rounded-2xl border border-[#E3CBB9] bg-white py-4 font-semibold text-[#76534C] transition hover:bg-[#F8F0E5]"
          >
            <RotateCcw size={20} />
            Cek Ulang
          </button>
        </motion.div>
      </div>

      <BottomNav />
    </div>
  );
}

export default Result;
