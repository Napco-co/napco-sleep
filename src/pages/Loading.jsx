import { useEffect, useState } from "react";
import { Brain } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Loading() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let value = 0;

    const interval = setInterval(() => {
      value += 2;
      setProgress(value);

      if (value >= 100) {
        clearInterval(interval);

        setTimeout(() => {
          navigate("/result");
        }, 500);
      }
    }, 80);

    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#8B5CF6] via-[#5B21B6] to-[#1E1B4B] flex justify-center items-center">

      <div className="w-[393px] px-8">

        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            repeat: Infinity,
            duration: 4,
            ease: "linear",
          }}
          className="mx-auto flex h-32 w-32 items-center justify-center rounded-full bg-white/10 backdrop-blur-3xl shadow-2xl"
        >
          <Brain size={60} className="text-white" />
        </motion.div>

        <h1 className="mt-10 text-center text-4xl font-bold text-white">
          NAPPI AI
        </h1>

        <p className="mt-4 text-center leading-7 text-violet-200">
          Sedang menganalisis pola tidurmu...
          <br />
          Mohon tunggu sebentar.
        </p>

        <div className="mt-12 h-4 overflow-hidden rounded-full bg-white/10">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-violet-300 to-pink-400"
            animate={{ width: `${progress}%` }}
          />
        </div>

        <p className="mt-4 text-center text-lg font-semibold text-white">
          {progress}%
        </p>

        <div className="mt-10 space-y-3 text-center text-sm text-violet-300">

          <p>🧠 Menganalisis jawaban...</p>

          <p>😴 Menghitung Sleep Score...</p>

          <p>🍫 Menyiapkan rekomendasi NAPCO...</p>

        </div>

      </div>

    </div>
  );
}

export default Loading;