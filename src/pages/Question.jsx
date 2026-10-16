
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useSleep } from "../context/SleepContext";

const questions = [
  {
    id: 1,
    emoji: "🌙",
    question: "Pukul berapa biasanya kamu tidur?",
    options: [
      { text: "< 21.00", score: 30 },
      { text: "21.00 - 22.00", score: 25 },
      { text: "22.00 - 23.00", score: 18 },
      { text: "> 23.00", score: 8 },
    ],
  },
  {
    id: 2,
    emoji: "📱",
    question: "Berapa lama penggunaan HP sebelum tidur?",
    options: [
      { text: "< 30 menit", score: 20 },
      { text: "30 - 60 menit", score: 15 },
      { text: "1 - 2 jam", score: 8 },
      { text: "> 2 jam", score: 0 },
    ],
  },
  {
    id: 3,
    emoji: "☕",
    question: "Berapa gelas kopi yang kamu minum hari ini?",
    options: [
      { text: "Tidak minum", score: 20 },
      { text: "1 gelas", score: 15 },
      { text: "2 gelas", score: 8 },
      { text: "> 2 gelas", score: 0 },
    ],
  },
  {
    id: 4,
    emoji: "😵",
    question: "Bagaimana tingkat stres kamu hari ini?",
    options: [
      { text: "Sangat Santai", score: 20 },
      { text: "Santai", score: 16 },
      { text: "Biasa", score: 12 },
      { text: "Stres", score: 6 },
      { text: "Sangat Stres", score: 0 },
    ],
  },
  {
    id: 5,
    emoji: "🏃",
    question: "Apakah kamu olahraga hari ini?",
    options: [
      { text: "YA", score: 10 },
      { text: "TIDAK", score: 0 },
    ],
  },
];

function Question() {
  const navigate = useNavigate();
  const { setSleepScore, setHistory } = useSleep();

  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answers, setAnswers] = useState([]);

  const nextQuestion = () => {
    if (selected === null) return;

    const newAnswers = [...answers];
    newAnswers[step] = selected;
    setAnswers(newAnswers);

    if (step === questions.length - 1) {
      const totalScore = newAnswers.reduce(
        (total, item) => total + item.score,
        0
      );

      setSleepScore(totalScore);

      setHistory((previous) => [
        {
          score: totalScore,
          date: new Date().toLocaleDateString("id-ID"),
        },
        ...previous,
      ].slice(0, 7));

      navigate("/loading");
      return;
    }

    setStep((previous) => previous + 1);
    setSelected(null);
  };

  const currentQuestion = questions[step];
  const progress = ((step + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen flex justify-center bg-[#F8F0E5]">
      <div className="w-full max-w-[393px] px-6 pt-8 pb-10">

        {/* HEADER */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            aria-label="Kembali"
            className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#E3CBB9] bg-white text-[#7A2634] transition hover:bg-[#F1E1D5]"
          >
            <ArrowLeft size={22} />
          </button>

          <span className="rounded-full bg-[#F1E1D5] px-4 py-2 text-sm font-semibold text-[#7A2634]">
            {step + 1} / {questions.length}
          </span>
        </div>

        {/* QUESTION CARD */}
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-8 rounded-[30px] border border-[#E3CBB9] bg-white p-6 shadow-sm"
        >
          <div className="flex justify-center">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#F1E1D5] text-5xl">
              {currentQuestion.emoji}
            </div>
          </div>

          <h1 className="mt-6 text-center text-2xl font-bold leading-snug text-[#7A2634]">
            {currentQuestion.question}
          </h1>

          <p className="mt-3 text-center text-sm text-[#A66D68]">
            Pilih jawaban yang paling sesuai dengan kebiasaanmu.
          </p>

          {/* ANSWER OPTIONS */}
          <div className="mt-8 space-y-3">
            {currentQuestion.options.map((option) => {
              const isSelected = selected?.text === option.text;

              return (
                <motion.button
                  key={option.text}
                  type="button"
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelected(option)}
                  className={`w-full rounded-2xl border p-4 text-left font-medium transition ${
                    isSelected
                      ? "border-[#7A2634] bg-[#7A2634] text-white shadow-sm"
                      : "border-[#E3CBB9] bg-[#F8F0E5] text-[#65433F] hover:border-[#C58A83] hover:bg-[#F1E1D5]"
                  }`}
                >
                  <span className="flex items-center justify-between gap-3">
                    <span>{option.text}</span>

                    <span
                      className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                        isSelected
                          ? "border-white bg-white"
                          : "border-[#C58A83]"
                      }`}
                    >
                      {isSelected && (
                        <span className="h-2.5 w-2.5 rounded-full bg-[#7A2634]" />
                      )}
                    </span>
                  </span>
                </motion.button>
              );
            })}
          </div>

          {/* PROGRESS BAR */}
          <div className="mt-8">
            <div className="mb-2 flex justify-between text-xs text-[#A66D68]">
              <span>Progress Sleep Check</span>
              <span>{Math.round(progress)}%</span>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-[#F1E1D5]">
              <motion.div
                className="h-full rounded-full bg-[#7A2634]"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* NEXT BUTTON */}
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={nextQuestion}
            disabled={selected === null}
            className="mt-8 w-full rounded-2xl bg-[#7A2634] py-4 text-base font-semibold text-white transition hover:bg-[#62202B] disabled:cursor-not-allowed disabled:opacity-40"
          >
            {step === questions.length - 1
              ? "Lihat Hasil"
              : "Lanjut"}
          </motion.button>
        </motion.div>

        <p className="mt-5 text-center text-xs leading-5 text-[#A66D68]">
          Jawab sesuai kebiasaanmu agar hasil Sleep Check lebih relevan.
        </p>
      </div>
    </div>
  );
}

export default Question;
