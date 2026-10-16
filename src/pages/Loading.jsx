
import { useEffect, useState } from "react";
import { Brain } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Loading() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((previous) => {
        const next = Math.min(previous + 2, 100);

        if (next === 100) {
          clearInterval(interval);
          setTimeout(() => navigate("/result"), 500);
        }

        return next;
      });
    }, 80);

    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8F0E5]">
      <div className="w-full max-w-[393px] px-8 py-10">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            repeat: Infinity,
            duration: 4,
            ease: "linear",
          }}
          className="mx-auto flex h-32 w-32 items-center justify-center rounded-full border-2 border-[#7A2634] bg-[#E8D5C7] shadow-xl"
        >
          <Brain size={60} className="text-[#7A2634]" />
        </motion.div>

        <h1 className="mt-10 text-center text-4xl font-bold text-[#7A2634]">
          NAPPI AI
        </h1>

        <p className="mt-4 text-center leading-7 text-[#76534C]">
          Sedang menganalisis pola tidurmu...
          <br />
          Mohon tunggu sebentar.
        </p>

        <div className="mt-12 h-4 overflow-hidden rounded-full border border-[#7A2634] bg-[#E8D5C7]">
          <motion.div
            className="h-full rounded-full bg-[#7A2634]"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.15 }}
          />
        </div>

        <p className="mt-4 text-center text-lg font-bold text-[#7A2634]">
          {progress}%
        </p>

        <div className="mt-10 space-y-3 text-center text-sm font-medium text-[#76534C]">
          <p>🧠 Menganalisis jawaban...</p>
          <p>😴 Menghitung Sleep Score...</p>
          <p>🍫 Menyiapkan rekomendasi NAPCO...</p>
        </div>
      </div>
    </div>
  );
}

export default Loading;
