
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MoonStar } from "lucide-react";
import { motion } from "framer-motion";
import { useSleep } from "../context/SleepContext";

function Welcome() {
  const navigate = useNavigate();
  const { setUserName } = useSleep();
  const [name, setName] = useState("");

  const startApp = () => {
    if (!name.trim()) return;

    setUserName(name.trim());
    navigate("/", { replace: true });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8F0E5] px-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-[393px] px-2"
      >
        <div className="text-center">
          <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full border border-[#E3CBB9] bg-[#F1E1D5] shadow-lg shadow-[#7A2634]/10">
            <MoonStar size={52} className="text-[#7A2634]" />
          </div>

          <h1 className="mt-8 text-4xl font-bold text-[#7A2634]">
            Selamat Datang
          </h1>

          <p className="mt-4 leading-7 text-[#76534C]">
            Sebelum memulai,
            <br />
            masukkan nama Anda.
          </p>
        </div>

        <div className="mt-10">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") startApp();
            }}
            placeholder="Nama Anda"
            aria-label="Nama Anda"
            className="w-full rounded-3xl border border-[#D9B9AB] bg-white p-5 text-[#7A2634] placeholder:text-[#A66D68] outline-none transition focus:border-[#7A2634] focus:ring-2 focus:ring-[#7A2634]/10"
          />

          <button
            onClick={startApp}
            disabled={!name.trim()}
            className="mt-6 w-full rounded-3xl bg-[#7A2634] py-5 text-lg font-semibold text-white shadow-md shadow-[#7A2634]/15 transition hover:bg-[#62202B] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
          >
            Mulai
          </button>

          <p className="mt-5 text-center text-xs text-[#A66D68]">
            Temukan rutinitas tidur yang lebih baik bersama NAPPI AI.
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default Welcome;
