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

    setUserName(name);

    navigate("/", { replace: true });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#8B5CF6] via-[#5B21B6] to-[#1E1B4B] flex justify-center items-center">

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-[393px] px-8"
      >

        <div className="text-center">

          <div className="mx-auto w-28 h-28 rounded-full bg-gradient-to-br from-violet-500 to-indigo-700 flex items-center justify-center shadow-[0_0_40px_rgba(139,92,246,.8)]">

            <MoonStar size={52} className="text-white" />

          </div>

          <h1 className="text-white text-4xl font-bold mt-8">
            Selamat Datang
          </h1>

          <p className="text-violet-200 mt-4 leading-7">
            Sebelum memulai,
            <br />
            masukkan nama Anda.
          </p>

        </div>

        <div className="mt-10">

          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nama Anda"
            className="w-full rounded-3xl bg-white/10 border border-white/10 p-5 text-white placeholder:text-violet-300 outline-none"
          />

          <button
            onClick={startApp}
            className="mt-6 w-full rounded-3xl bg-gradient-to-r from-violet-500 to-indigo-600 py-5 text-white text-lg font-semibold"
          >
            Mulai
          </button>

        </div>

      </motion.div>

    </div>
  );
}

export default Welcome;