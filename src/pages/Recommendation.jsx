import {
  MoonStar,
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

  }

  else if (sleepScore >= 70) {

    title = "Tidurmu Sudah Cukup Baik 😊";

    description =
      "Masih ada beberapa kebiasaan yang bisa diperbaiki agar kualitas tidur semakin optimal.";

    audio = "Ocean Waves";

    tips = [
      "Kurangi screen time",
      "Tidur maksimal pukul 22.30",
      "Minum air putih yang cukup",
    ];

  }

  else {

    title = "Saatnya Memperbaiki Tidur 😴";

    description =
      "NAPPI AI mendeteksi kualitas tidurmu masih rendah. Berikut rekomendasi yang bisa membantu.";

    audio = "Deep Sleep Meditation";

    tips = [
      "Hindari kopi setelah sore",
      "Kurangi penggunaan HP",
      "Coba Dream Choco sebelum tidur",
      "Dengarkan Sleep Audio",
    ];

  }

  return (

<div className="min-h-screen bg-gradient-to-b from-[#8B5CF6] via-[#5B21B6] to-[#1E1B4B] flex justify-center">

<div className="w-[393px] px-6 pt-8 pb-32">

<motion.div

initial={{opacity:0,y:30}}

animate={{opacity:1,y:0}}

>

<h1 className="text-white text-4xl font-bold">

Rekomendasi

</h1>

<p className="text-violet-200 mt-2">

Rekomendasi khusus berdasarkan Sleep Check

</p>

{/* CARD */}

<div className="mt-8 rounded-[35px] bg-white/10 backdrop-blur-3xl border border-white/10 p-8">

<div className="text-6xl text-center">

🍫

</div>

<h2 className="text-center text-white text-3xl font-bold mt-5">

Dream Choco

</h2>

<p className="text-center text-violet-200 mt-3">

Mengandung Kakao, Chamomile,
Mint dan Stevia.

</p>

<div className="mt-6 rounded-2xl bg-violet-500/20 p-5">

<h3 className="text-white text-xl font-semibold">

{title}

</h3>

<p className="text-violet-100 mt-3 leading-7">

{description}

</p>

</div>

<div className="mt-8">
          <h3 className="text-white text-xl font-semibold">
            Checklist Hari Ini
          </h3>

          <div className="mt-5 space-y-4">

            {tips.map((tip, index) => (

              <div
                key={index}
                className="flex items-start gap-3 rounded-2xl bg-white/10 p-4"
              >

                <CheckCircle2
                  className="text-green-400 mt-1"
                  size={20}
                />

                <p className="text-violet-100">

                  {tip}

                </p>

              </div>

            ))}

          </div>

        </div>

      </div>

      {/* AUDIO */}

      <div className="mt-6 rounded-[30px] bg-white/10 backdrop-blur-xl border border-white/10 p-6">

        <div className="flex items-center gap-4">

          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex justify-center items-center">

            <Headphones className="text-white" />

          </div>

          <div>

            <p className="text-violet-200">

              Rekomendasi Audio

            </p>

            <h2 className="text-white text-2xl font-bold">

              {audio}

            </h2>

          </div>

        </div>

        <button
          onClick={() => navigate("/audio")}
          className="mt-6 w-full rounded-3xl bg-gradient-to-r from-violet-500 to-indigo-600 py-4 text-white font-semibold flex items-center justify-center gap-3"
        >

          <Headphones size={20} />

          Dengarkan Sekarang

        </button>

      </div>

      {/* AI */}

      <div className="mt-6 rounded-[30px] bg-white/10 backdrop-blur-xl border border-white/10 p-6">

        <div className="flex items-center gap-3">

          <Brain className="text-violet-300" />

          <h2 className="text-white text-xl font-bold">

            Saran dari NAPPI AI

          </h2>

        </div>

        <p className="mt-4 text-violet-100 leading-7">

          Berdasarkan Sleep Score-mu sebesar{" "}
          <span className="font-bold text-white">

            {sleepScore}

          </span>
          , aku menyarankan untuk menjaga rutinitas tidur,
          mengurangi screen time, dan menggunakan Dream Choco
          sebagai pendamping relaksasi sebelum tidur.

        </p>

        <button
          onClick={() => navigate("/ai")}
          className="mt-6 w-full rounded-3xl bg-white/10 py-4 text-white flex justify-center items-center gap-3 hover:bg-white/20 transition"
        >

          <Brain size={20} />

          Chat dengan NAPPI AI

          <ArrowRight size={18} />

        </button>

      </div>

      {/* DREAM CHOCO */}

      <div className="mt-6 rounded-[30px] bg-gradient-to-r from-violet-500 to-indigo-600 p-6">

        <div className="flex items-center gap-4">

          <div className="text-5xl">

            🍫

          </div>

          <div>

            <h2 className="text-white text-2xl font-bold">

              Dream Choco

            </h2>

            <p className="text-violet-100">

              Functional Chocolate for Better Sleep

            </p>

          </div>

        </div>

        <button
          className="mt-6 w-full rounded-3xl bg-white py-4 text-violet-700 font-bold"
        >

          Pelajari Produk

        </button>

      </div>

    </motion.div>

  </div>

  <BottomNav />

</div>

  );

}

export default Recommendation;