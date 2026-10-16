
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
  } else if (sleepScore >= 70) {
    firstMessage =
      "Halo " +
      userName +
      " 😊\n\nTidurmu sudah cukup baik, tetapi masih bisa ditingkatkan. Ada beberapa kebiasaan yang bisa diperbaiki.";
  } else if (sleepScore >= 55) {
    firstMessage =
      "Halo " +
      userName +
      " 😴\n\nSleep Score-mu cukup. Cobalah tidur lebih awal dan mengurangi penggunaan HP sebelum tidur.";
  } else {
    firstMessage =
      "Halo " +
      userName +
      " 🌙\n\nSleep Score-mu masih bisa ditingkatkan. Aku akan membantumu membangun kebiasaan tidur yang lebih baik.";
  }

  const [messages, setMessages] = useState([
    { sender: "ai", text: firstMessage },
  ]);

  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMessage = {
      sender: "user",
      text: input.trim(),
    };

    const text = input.toLowerCase();
    let reply = "";

    if (text.includes("kopi")) {
      reply =
        "☕ Sebaiknya hindari kafein setidaknya 6 jam sebelum tidur. Sebagian orang bahkan perlu menghindarinya lebih awal.";
    } else if (text.includes("hp") || text.includes("gadget")) {
      reply =
        "📱 Cobalah berhenti menggunakan HP 30–60 menit sebelum tidur. Kurangi cahaya layar dan lakukan aktivitas yang menenangkan.";
    } else if (text.includes("stress") || text.includes("stres")) {
      reply =
        "😌 Saat stres, cobalah latihan pernapasan perlahan, menulis pikiranmu, atau mendengarkan Sleep Audio dari NAPCO.";
    } else if (
      text.includes("coklat") ||
      text.includes("dream choco")
    ) {
      reply =
        "🍫 Dream Choco adalah konsep cokelat batang NAPCO dengan kakao, chamomile, mint, dan stevia. Produk ini dirancang sebagai bagian dari rutinitas relaksasi sebelum tidur, bukan pengganti pengobatan gangguan tidur.";
    } else if (text.includes("audio")) {
      reply =
        "🎧 Kamu bisa mencoba audio suasana alam seperti Forest Rain atau Ocean Waves sebagai bagian dari rutinitas menenangkan diri sebelum tidur.";
    } else if (text.includes("sleep score")) {
      reply =
        "🌙 Sleep Score kamu saat ini adalah " +
        sleepScore +
        ". Gunakan skor ini sebagai panduan untuk mengevaluasi kebiasaan tidurmu.";
    } else if (text.includes("tidur")) {
      reply =
        "🌙 Cobalah tidur dan bangun pada jam yang konsisten, kurangi kafein menjelang malam, batasi penggunaan HP sebelum tidur, dan buat kamar nyaman.";
    } else {
      reply =
        "🤎 Terima kasih atas pertanyaannya! Kamu bisa bertanya tentang tidur, kopi, penggunaan HP, stres, Sleep Audio, atau Dream Choco.";
    }

    setMessages((previous) => [
      ...previous,
      userMessage,
      { sender: "ai", text: reply },
    ]);

    setInput("");
  };

  const quickQuestions = [
    { label: "🌙 Tidur Cepat", question: "Bagaimana cara tidur lebih cepat?" },
    { label: "☕ Kopi", question: "Apakah kopi mempengaruhi tidur?" },
    { label: "🎧 Audio", question: "Rekomendasi sleep audio" },
    { label: "🍫 Dream Choco", question: "Apa itu Dream Choco?" },
  ];

  return (
    <div className="min-h-screen flex justify-center bg-[#F8F0E5]">
      <div className="w-full max-w-[393px] px-6 pt-8 pb-32">

        {/* HEADER */}
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[#7A2634]/20 bg-[#E8D5C7]">
            <Brain size={32} className="text-[#7A2634]" />
          </div>

          <div>
            <p className="text-sm font-medium text-[#A66D68]">
              AI Sleep Assistant
            </p>
            <h1 className="text-3xl font-bold text-[#7A2634]">
              NAPPI AI
            </h1>
          </div>
        </div>

        {/* CHAT */}
        <div className="mt-8 max-h-[500px] space-y-5 overflow-y-auto">
          {messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex ${
                message.sender === "user"
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <div
                className={`max-w-[85%] whitespace-pre-line rounded-3xl border px-5 py-4 leading-7 ${
                  message.sender === "user"
                    ? "border-[#7A2634] bg-[#7A2634] text-[#FFF9F0]"
                    : "border-[#E8D5C7] bg-white text-[#65433F] shadow-sm"
                }`}
              >
                {message.sender === "ai" && (
                  <div className="mb-3 flex items-center gap-2">
                    <Sparkles size={18} className="text-[#A66D68]" />
                    <span className="font-semibold text-[#7A2634]">
                      NAPPI AI
                    </span>
                  </div>
                )}

                {message.text}
              </div>
            </motion.div>
          ))}
        </div>

        {/* QUICK QUESTIONS */}
        <div className="mt-6 flex gap-3 overflow-x-auto pb-2">
          {quickQuestions.map((item) => (
            <button
              key={item.label}
              onClick={() => setInput(item.question)}
              className="shrink-0 rounded-2xl border border-[#D9B9AB] bg-[#F1E1D5] px-4 py-3 text-sm font-medium text-[#7A2634] transition hover:bg-[#E8D5C7]"
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* INPUT */}
        <div className="mt-5 flex items-center gap-3 rounded-3xl border border-[#D9B9AB] bg-white p-3 shadow-sm">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
            placeholder="Tanyakan apa saja..."
            className="min-w-0 flex-1 bg-transparent text-[#65433F] outline-none placeholder:text-[#B18B82]"
          />

          <button
            onClick={sendMessage}
            aria-label="Kirim pesan"
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#7A2634] transition hover:bg-[#62202B]"
          >
            <Send size={20} className="text-white" />
          </button>
        </div>

        {/* SLEEP SCORE */}
        <div className="mt-6 rounded-3xl border border-[#E3CBB9] bg-[#F1E1D5] p-5">
          <div className="flex items-center gap-3">
            <MoonStar className="text-[#7A2634]" size={24} />
            <h2 className="font-semibold text-[#7A2634]">
              Sleep Score Saat Ini
            </h2>
          </div>

          <h2 className="mt-5 text-5xl font-bold text-[#7A2634]">
            {sleepScore}
          </h2>

          <p className="mt-2 text-sm leading-6 text-[#76534C]">
            Semakin konsisten kebiasaan tidur sehatmu, semakin baik peluangmu mendapatkan tidur yang berkualitas.
          </p>
        </div>

      </div>

      <BottomNav />
    </div>
  );
}

export default NappiAI;
