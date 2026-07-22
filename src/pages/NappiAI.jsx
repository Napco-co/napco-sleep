import { useState } from "react";
import { Brain, Send, Sparkles, MoonStar } from "lucide-react";
import { motion } from "framer-motion";
import { useSleep } from "../context/SleepContext";
import BottomNav from "../components/BottomNav";

function NappiAI() {

  const { sleepScore, userName } = useSleep();

  let firstMessage = "";

  if (sleepScore >= 85) {
    firstMessage =
      "Halo " +
      userName +
      " 👋\n\nKualitas tidurmu sangat baik. Pertahankan kebiasaan ini agar tubuh tetap segar setiap hari 🌙";
  }

  else if (sleepScore >= 70) {
    firstMessage =
      "Halo " +
      userName +
      " 😊\n\nTidurmu sudah cukup baik, tetapi masih bisa ditingkatkan. Aku melihat masih ada beberapa kebiasaan yang bisa diperbaiki.";
  }

  else if (sleepScore >= 55) {
    firstMessage =
      "Halo " +
      userName +
      " 😴\n\nSleep Score-mu cukup. Aku menyarankan tidur lebih awal dan mengurangi penggunaan HP sebelum tidur.";
  }

  else {

    firstMessage =
      "Halo " +
      userName +
      " 🚨\n\nSleep Score-mu cukup rendah. Jangan khawatir, aku akan membantumu meningkatkan kualitas tidur sedikit demi sedikit.";

  }

  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: firstMessage,
    },
  ]);

  const [input, setInput] = useState("");

  const sendMessage = () => {

  if (!input.trim()) return;

  const userMessage = {
    sender: "user",
    text: input,
  };

  let reply = "";

  const text = input.toLowerCase();

  if (text.includes("kopi")) {

    reply =
      "☕ Sebaiknya hindari kopi sekitar 6 jam sebelum tidur agar produksi hormon melatonin tidak terganggu.";

  }

  else if (
    text.includes("hp") ||
    text.includes("gadget")
  ) {

    reply =
      "📱 Cahaya biru dari layar HP dapat menghambat produksi melatonin. Cobalah berhenti menggunakan HP 30–60 menit sebelum tidur.";

  }

  else if (
    text.includes("stress") ||
    text.includes("stres")
  ) {

    reply =
      "😌 Saat stres meningkat, tubuh akan lebih sulit rileks. Cobalah latihan pernapasan, meditasi, atau dengarkan Sleep Audio dari NAPCO.";

  }

  else if (
    text.includes("coklat") ||
    text.includes("dream choco")
  ) {

    reply =
      "🍫 Dream Choco mengandung kakao, chamomile, mint, dan stevia yang membantu tubuh lebih rileks sebelum tidur.";

  }

  else if (
    text.includes("audio")
  ) {

    reply =
      "🎧 Aku merekomendasikan Forest Rain atau Ocean Waves selama 20 menit sebelum tidur.";

  }

  else if (
    text.includes("sleep score")
  ) {

    reply =
      "🌙 Sleep Score kamu saat ini adalah " +
      sleepScore +
      ". Terus pertahankan pola tidur sehat agar nilainya semakin meningkat.";

  }

  else if (
    text.includes("tidur")
  ) {

    reply =
      "🌙 Agar lebih cepat tidur, usahakan tidur di jam yang sama setiap hari, kurangi penggunaan HP sebelum tidur, hindari kafein pada malam hari, dan buat kamar senyaman mungkin.";

  }

  else {

    reply =
      "🤖 Terima kasih atas pertanyaannya. Aku siap membantumu meningkatkan kualitas tidur melalui Sleep Check, Sleep Audio, dan Dream Choco.";

  }

  setMessages([
    ...messages,
    userMessage,
    {
      sender: "ai",
      text: reply,
    },
  ]);

  setInput("");

};

  return (

<div className="min-h-screen bg-gradient-to-b from-[#8B5CF6] via-[#5B21B6] to-[#1E1B4B] flex justify-center">

<div className="w-[393px] px-6 pt-8 pb-32">

<div className="flex items-center gap-4">

<div className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex justify-center items-center">

<Brain className="text-white"/>

</div>

<div>

<p className="text-violet-200">

AI Sleep Assistant

</p>

<h1 className="text-white text-3xl font-bold">

NAPPI AI

</h1>

</div>

</div>

<div className="mt-8 space-y-5 max-h-[500px] overflow-y-auto">
        {messages.map((message, index) => (

          <motion.div
            key={index}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`flex ${
              message.sender === "user"
                ? "justify-end"
                : "justify-start"
            }`}
          >

            <div
              className={`max-w-[80%] rounded-3xl px-5 py-4 leading-7 whitespace-pre-line ${
                message.sender === "user"
                  ? "bg-violet-500 text-white"
                  : "bg-white/10 backdrop-blur-xl border border-white/10 text-violet-100"
              }`}
            >

              {message.sender === "ai" && (
                <div className="flex items-center gap-2 mb-3">

                  <Sparkles
                    size={18}
                    className="text-violet-300"
                  />

                  <span className="font-semibold text-white">

                    NAPPI AI

                  </span>

                </div>
              )}

              {message.text}

            </div>

          </motion.div>

        ))}

      </div>

      {/* QUICK ACTION */}

      <div className="mt-6 flex gap-3 overflow-x-auto pb-2">

        <button
          onClick={() => setInput("Bagaimana cara tidur lebih cepat?")}
          className="px-4 py-3 rounded-2xl bg-white/10 text-white whitespace-nowrap"
        >
          🌙 Tidur Cepat
        </button>

        <button
          onClick={() => setInput("Apakah kopi mempengaruhi tidur?")}
          className="px-4 py-3 rounded-2xl bg-white/10 text-white whitespace-nowrap"
        >
          ☕ Kopi
        </button>

        <button
          onClick={() => setInput("Rekomendasi sleep audio")}
          className="px-4 py-3 rounded-2xl bg-white/10 text-white whitespace-nowrap"
        >
          🎧 Audio
        </button>

        <button
          onClick={() => setInput("Apa itu Dream Choco?")}
          className="px-4 py-3 rounded-2xl bg-white/10 text-white whitespace-nowrap"
        >
          🍫 Dream Choco
        </button>

      </div>

      {/* INPUT */}

      <div className="mt-6 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/10 p-3 flex items-center gap-3">

        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e)=>{
          if(e.key==="Enter"){
          sendMessage();
          }
          }}
          placeholder="Tanyakan apa saja..."
          className="flex-1 bg-transparent outline-none text-white placeholder:text-violet-300"
        />

        <button
          onClick={sendMessage}
          className="w-12 h-12 rounded-2xl bg-gradient-to-r from-violet-500 to-indigo-600 flex justify-center items-center"
        >

          <Send
            size={20}
            className="text-white"
          />

        </button>

      </div>

      {/* SCORE CARD */}

      <div className="mt-6 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/10 p-5">

        <div className="flex items-center gap-3">

          <MoonStar className="text-violet-300" />

          <h2 className="text-white font-semibold">

            Sleep Score Saat Ini

          </h2>

        </div>

        <h1 className="text-5xl text-white font-bold mt-5">

          {sleepScore}

        </h1>

        <p className="text-violet-200 mt-2">

          Semakin tinggi skor, semakin baik kualitas tidurmu.

        </p>

      </div>

    </div>

    <BottomNav />

</div>

  );

}

export default NappiAI;