import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function SleepCheck() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#8B5CF6] via-[#5B21B6] to-[#1E1B4B] flex justify-center">

      <div className="w-[393px] px-6 pt-8">

        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-xl flex items-center justify-center text-white"
        >
          <ArrowLeft size={22} />
        </button>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-8 rounded-[35px] bg-white/10 backdrop-blur-3xl border border-white/10 p-8"
        >
          <div className="text-center text-6xl">
            😴
          </div>

          <h1 className="mt-6 text-center text-3xl font-bold text-white">
            Sleep Check
          </h1>

          <p className="mt-4 text-center leading-7 text-violet-200">
            Jawab 5 pertanyaan singkat.
            <br />
            AI NAPPI akan menganalisis
            <br />
            kualitas tidurmu.
          </p>

          {/* Progress */}
          <div className="mt-10">

            <div className="flex justify-between text-sm text-violet-200">

              <span>0%</span>

              <span>5 Pertanyaan</span>

            </div>

            <div className="mt-3 h-3 rounded-full bg-white/10">

              <div className="h-3 w-0 rounded-full bg-violet-400"></div>

            </div>

          </div>

          {/* Button */}
          <button
            onClick={() => navigate("/question")}
            className="mt-10 w-full rounded-3xl bg-gradient-to-r from-violet-500 to-indigo-600 py-5 text-lg font-semibold text-white shadow-xl transition hover:scale-[1.02]"
          >
            Mulai Sekarang
          </button>

        </motion.div>

      </div>

    </div>
  );
}

export default SleepCheck;