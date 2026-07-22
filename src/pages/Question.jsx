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

    if (!selected) return;

    const newAnswers = [...answers];

    newAnswers[step] = selected;

    setAnswers(newAnswers);

    if (step === questions.length - 1) {

      const totalScore = newAnswers.reduce(
        (total, item) => total + item.score,
        0
      );

      setSleepScore(totalScore);

      setHistory((prev) => [
  {
    score: totalScore,
    date: new Date().toLocaleDateString("id-ID"),
  },
  ...prev,
].slice(0, 7));

      navigate("/loading");

      return;

    }

    setStep(step + 1);

    setSelected(null);

  };

    return (

    <div className="min-h-screen bg-gradient-to-b from-[#8B5CF6] via-[#5B21B6] to-[#1E1B4B] flex justify-center">

      <div className="w-[393px] px-6 pt-8 pb-32">

        {/* Header */}

        <div className="flex justify-between items-center">

          <button
            onClick={() => navigate(-1)}
            className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-xl flex items-center justify-center text-white"
          >

            <ArrowLeft size={22} />

          </button>

          <span className="text-violet-200">

            {step + 1}/{questions.length}

          </span>

        </div>

        <motion.div

          key={step}

          initial={{ opacity: 0, x: 80 }}

          animate={{ opacity: 1, x: 0 }}

          transition={{ duration: 0.4 }}

          className="mt-8 rounded-[35px] bg-white/10 backdrop-blur-3xl border border-white/10 p-8"

        >

          <div className="text-center text-6xl">

            {questions[step].emoji}

          </div>

          <h1 className="mt-6 text-center text-3xl font-bold text-white leading-snug">

            {questions[step].question}

          </h1>

          <div className="mt-10 space-y-4">
                    {questions[step].options.map((option) => (

            <motion.button
              key={option.text}
              whileTap={{ scale: 0.97 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelected(option)}
              className={`w-full rounded-2xl p-5 text-left transition-all duration-300 ${
                selected?.text === option.text
                  ? "bg-violet-500 text-white shadow-xl"
                  : "bg-white/10 text-violet-100 hover:bg-white/20"
              }`}
            >

              {option.text}

            </motion.button>

          ))}

        </div>

        {/* Progress */}

        <div className="mt-8">

          <div className="h-2 rounded-full bg-white/10 overflow-hidden">

            <motion.div
              className="h-full bg-violet-400"
              initial={{ width: 0 }}
              animate={{
                width: `${((step + 1) / questions.length) * 100}%`,
              }}
              transition={{ duration: 0.5 }}
            />

          </div>

        </div>

        {/* Next Button */}

        <motion.button

          whileTap={{ scale: 0.97 }}
          whileHover={{ scale: 1.02 }}

          onClick={nextQuestion}

          disabled={!selected}

          className="mt-8 w-full rounded-3xl bg-gradient-to-r from-violet-500 to-indigo-600 py-5 text-lg font-semibold text-white disabled:opacity-40"

        >

          {step === questions.length - 1
            ? "Lihat Hasil"
            : "Lanjut"}

        </motion.button>

      </motion.div>

    </div>

  </div>

);

}

export default Question;