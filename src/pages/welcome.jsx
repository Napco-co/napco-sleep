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

    navigate("/");

  };

  return (

    <div className="min-h-screen bg-gradient-to-b from-[#8B5CF6] via-[#5B21B6] to-[#1E1B4B] flex justify-center items-center">

      <div className="w-[393px] px-8">

        <motion.div

          initial={{ opacity:0, y:30 }}

          animate={{ opacity:1, y:0 }}

          transition={{ duration:0.6 }}

          className="rounded-[35px] bg-white/10 backdrop-blur-3xl border border-white/10 p-8 text-center"

        >

          <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-r from-violet-500 to-indigo-600 flex justify-center items-center">

            <MoonStar size={42} className="text-white"/>

          </div>

          <h1 className="text-white text-4xl font-bold mt-8">

            Selamat Datang

          </h1>

          <p className="text-violet-200 mt-4 leading-7">

            Sebelum memulai,

            siapa nama kamu?

          </p>

          <input

            value={name}

            onChange={(e)=>setName(e.target.value)}

            placeholder="Masukkan nama"

            className="mt-8 w-full rounded-3xl bg-white/10 p-5 outline-none text-white placeholder:text-violet-300"

          />

          <button

            onClick={startApp}

            className="mt-6 w-full rounded-3xl bg-gradient-to-r from-violet-500 to-indigo-600 py-5 text-white font-semibold"

          >

            Mulai

          </button>

        </motion.div>

      </div>

    </div>

  );

}

export default Welcome;