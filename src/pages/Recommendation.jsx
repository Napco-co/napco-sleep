
import {
  Headphones,
  Brain,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useSleep } from "../context/SleepContext";
import BottomNav from "../components/BottomNav";

function Recommendation() {
  const navigate = useNavigate();
  const { sleepScore } = useSleep();

  let title = "";
  let description = "";
  let tips = [];
  let audio = "";

  if (sleepScore >= 85) {
    title = "Pertahankan Pola Tidurmu 🌙";
    description =
      "Kualitas tidurmu sudah sangat baik. Fokuslah mempertahankan kebiasaan sehat setiap hari.";
    audio = "Forest Rain";
    tips = [
      "Tidur di jam yang sama setiap hari",
      "Pertahankan olahraga rutin",
      "Tetap batasi penggunaan HP sebelum tidur",
    ];
  } else if (sleepScore >= 70) {
    title = "Tidurmu Sudah Cukup Baik 😊";
    description =
      "Masih ada beberapa kebiasaan yang bisa diperbaiki agar kualitas tidur semakin optimal.";
    audio = "Ocean Waves";
    tips = [
      "Kurangi screen time",
      "Usahakan tidur pada waktu yang konsisten",
      "Minum air putih yang cukup",
    ];
  } else {
    title = "Saatnya Memperbaiki Tidur 😴";
    description =
      "Hasil Sleep Check menunjukkan beberapa kebiasaan tidur yang bisa diperbaiki. Berikut rekomendasi untukmu.";
    audio = "Deep Sleep Meditation";
    tips = [
      "Hindari kopi menjelang waktu tidur",
      "Kurangi penggunaan HP sebelum tidur",
      "Bangun rutinitas relaksasi sebelum tidur",
      "Dengarkan Sleep Audio",
    ];
  }

  return (
    <div className="min-h-screen flex justify-center bg-[#F8F0E5]">
      <div className="w-full max-w-[393px] px-6 pt-8 pb-32">

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* HEADER */}
          <div className="mb-2">
            <span className="inline-block rounded-full bg-[#F1E1D5] px-4 py-2 text-xs font-semibold text-[#7A2634]">
              NAPCO SLEEP+
            </span>

            <h1 className="mt-4 text-4xl font-bold text-[#7A2634]">
              Rekomendasi
            </h1>

            <p className="mt-2 leading-6 text-[#A66D68]">
              Rekomendasi untuk membantu membangun kebiasaan tidur yang lebih baik.
            </p>
          </div>

          {/* DREAM CHOCO & SLEEP RESULT */}
          <div className="mt-7 rounded-[30px] border border-[#E3CBB9] bg-white p-6 shadow-sm">
            <div className="flex h-20 w-20 mx-auto items-center justify-center rounded-full bg-[#F1E1D5] text-5xl">
              🍫
            </div>

            <h2 className="mt-4 text-center text-3xl font-bold text-[#7A2634]">
              Dream Choco
            </h2>

            <p className="mt-2 text-center text-sm leading-6 text-[#A66D68]">
              Cokelat fungsional sebagai pendamping rutinitas relaksasi sebelum tidur.
            </p>

            <div className="mt-6 rounded-2xl bg-[#F8F0E5] p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#A66D68]">
                Hasil Sleep Check
              </p>

              <div className="mt-2 flex items-center justify-between gap-3">
                <h3 className="text-xl font-bold text-[#7A2634]">
                  {title}
                </h3>

                <div className="shrink-0 rounded-xl bg-white px-3 py-2 text-center">
                  <span className="block text-2xl font-bold text-[#7A2634]">
                    {sleepScore}
                  </span>
                  <span className="text-xs text-[#A66D68]">
                    Skor
                  </span>
                </div>
              </div>

              <p className="mt-3 text-sm leading-6 text-[#76534C]">
                {description}
              </p>
            </div>

            {/* CHECKLIST */}
            <div className="mt-7">
              <h3 className="text-lg font-bold text-[#7A2634]">
                Checklist Hari Ini
              </h3>

              <p className="mt-1 text-sm text-[#A66D68]">
                Mulai dari kebiasaan kecil yang bisa kamu lakukan.
              </p>

              <div className="mt-4 space-y-3">
                {tips.map((tip, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 rounded-2xl border border-[#E3CBB9] bg-[#F8F0E5] p-4"
                  >
                    <CheckCircle2
                      className="mt-0.5 shrink-0 text-[#7A2634]"
                      size={21}
                    />

                    <p className="text-sm leading-6 text-[#65433F]">
                      {tip}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* SLEEP AUDIO */}
          <div className="mt-5 rounded-[28px] border border-[#E3CBB9] bg-white p-5 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#7A2634]">
                <Headphones className="text-white" size={26} />
              </div>

              <div className="min-w-0">
                <p className="text-sm text-[#A66D68]">
                  Rekomendasi Audio
                </p>

                <h2 className="mt-1 text-xl font-bold text-[#7A2634]">
                  {audio}
                </h2>
              </div>
            </div>

            <button
              onClick={() => navigate("/audio")}
              className="mt-5 flex w-full items-center justify-center gap-3 rounded-2xl bg-[#7A2634] py-4 font-semibold text-white transition hover:bg-[#62202B]"
            >
              <Headphones size={20} />
              Dengarkan Sekarang
              <ArrowRight size={18} />
            </button>
          </div>

          {/* NAPPI AI */}
          <div className="mt-5 rounded-[28px] border border-[#E3CBB9] bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#F1E1D5]">
                <Brain className="text-[#7A2634]" size={24} />
              </div>

              <div>
                <h2 className="text-xl font-bold text-[#7A2634]">
                  Saran dari NAPPI AI
                </h2>
                <p className="text-xs text-[#A66D68]">
                  Asisten tidur NAPCO
                </p>
              </div>
            </div>

            <p className="mt-4 text-sm leading-7 text-[#76534C]">
              Berdasarkan Sleep Score-mu sebesar{" "}
              <span className="font-bold text-[#7A2634]">
                {sleepScore}
              </span>
              , cobalah menjaga rutinitas tidur, mengurangi penggunaan HP
              sebelum tidur, dan menyediakan waktu untuk relaksasi.
              Dream Choco dapat menjadi bagian dari rutinitas tersebut.
            </p>

            <button
              onClick={() => navigate("/ai")}
              className="mt-5 flex w-full items-center justify-center gap-3 rounded-2xl border border-[#E3CBB9] bg-[#F8F0E5] py-4 font-semibold text-[#7A2634] transition hover:bg-[#F1E1D5]"
            >
              <Brain size={20} />
              Chat dengan NAPPI AI
              <ArrowRight size={18} />
            </button>
          </div>

          {/* DREAM CHOCO PRODUCT */}
          <div className="mt-5 overflow-hidden rounded-[28px] bg-[#7A2634] p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-4xl">
                🍫
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white">
                  Dream Choco
                </h2>

                <p className="mt-1 text-sm leading-5 text-[#F1E1D5]">
                  Functional Chocolate for Better Sleep
                </p>
              </div>
            </div>

            <p className="mt-4 text-sm leading-6 text-[#F8F0E5]">
              Lengkapi rutinitas malammu dengan kebiasaan yang menenangkan
              dan waktu istirahat yang konsisten.
            </p>

            <button
              onClick={() => navigate("/")}
              className="mt-5 w-full rounded-2xl bg-[#F8F0E5] py-4 font-bold text-[#7A2634] transition hover:bg-[#F1E1D5]"
            >
              Kembali ke Beranda
            </button>
          </div>
        </motion.div>
      </div>

      <BottomNav />
    </div>
  );
}

export default Recommendation;
