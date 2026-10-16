
import { ArrowLeft, MoonStar, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function SleepCheck() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex justify-center bg-[#F8F0E5]">
      <div className="w-full max-w-[393px] px-6 pt-8 pb-10">

        {/* HEADER */}
        <button
          onClick={() => navigate("/")}
          aria-label="Kembali ke beranda"
          className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#E3CBB9] bg-white text-[#7A2634] transition hover:bg-[#F1E1D5]"
        >
          <ArrowLeft size={22} />
        </button>

        {/* SLEEP CHECK CARD */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-8 rounded-[30px] border border-[#E3CBB9] bg-white p-6 shadow-sm"
        >
          {/* ICON */}
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-[#F1E1D5]">
            <MoonStar size={48} className="text-[#7A2634]" />
          </div>

          {/* TITLE */}
          <h1 className="mt-6 text-center text-3xl font-bold text-[#7A2634]">
            Sleep Check
          </h1>

          <p className="mt-3 text-center leading-7 text-[#76534C]">
            Kenali kebiasaan tidurmu bersama NAPPI AI.
            Jawab 5 pertanyaan singkat untuk mendapatkan
            gambaran mengenai pola tidurmu.
          </p>

          {/* INFORMATION */}
          <div className="mt-7 flex items-center gap-3 rounded-2xl bg-[#F8F0E5] p-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#F1E1D5]">
              <Sparkles size={23} className="text-[#7A2634]" />
            </div>

            <div>
              <h2 className="font-semibold text-[#7A2634]">
                Analisis NAPPI AI
              </h2>
              <p className="mt-1 text-sm leading-5 text-[#A66D68]">
                Hasil dan saran berdasarkan jawabanmu.
              </p>
            </div>
          </div>

          {/* PROGRESS */}
          <div className="mt-8">
            <div className="flex justify-between text-sm font-medium text-[#76534C]">
              <span>Persiapan Sleep Check</span>
              <span>0 / 5</span>
            </div>

            <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-[#F1E1D5]">
              <div className="h-full w-0 rounded-full bg-[#7A2634]" />
            </div>
          </div>

          {/* START BUTTON */}
          <button
            onClick={() => navigate("/question")}
            className="mt-8 w-full rounded-2xl bg-[#7A2634] py-4 text-lg font-semibold text-white shadow-sm transition hover:bg-[#62202B] active:scale-[0.98]"
          >
            Mulai Sekarang
          </button>

          <p className="mt-4 text-center text-xs leading-5 text-[#A66D68]">
            Luangkan waktu sebentar dan jawab sesuai kebiasaanmu.
          </p>
        </motion.div>

      </div>
    </div>
  );
}

export default SleepCheck;
