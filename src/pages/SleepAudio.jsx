import {
  Play,
  Pause,
  Heart,
  Volume2,
  Headphones,
} from "lucide-react";

import {
  useState,
  useRef,
  useEffect,
} from "react";

import { motion } from "framer-motion";

import BottomNav from "../components/BottomNav";

import forestRain from "../assets/audio/forest-rain.mp3";
import deepSleep from "../assets/audio/deep-sleep.mp3";
import pianoRelax from "../assets/audio/piano-relax.mp3";
import oceanWaves from "../assets/audio/ocean-waves.mp3";
import whiteNoise from "../assets/audio/white-noise.mp3";

const audioList = [
  {
    title: "Forest Rain",
    subtitle: "Hujan & Alam",
    emoji: "🌧️",
    src: forestRain,
  },
  {
    title: "Deep Sleep",
    subtitle: "Meditasi Tidur",
    emoji: "🌙",
    src: deepSleep,
  },
  {
    title: "Piano Relax",
    subtitle: "Musik Piano",
    emoji: "🎹",
    src: pianoRelax,
  },
  {
    title: "Ocean Waves",
    subtitle: "Suara Ombak",
    emoji: "🌊",
    src: oceanWaves,
  },
  {
    title: "White Noise",
    subtitle: "Fokus Tidur",
    emoji: "🤍",
    src: whiteNoise,
  },
];

function SleepAudio() {

  const [playing, setPlaying] = useState(0);

  const [isPlaying, setIsPlaying] = useState(false);

  const [currentTime, setCurrentTime] = useState(0);

  const [duration, setDuration] = useState(0);

  const [volume, setVolume] = useState(1);
  const [favorite, setFavorite] = useState(() => {

  const saved = localStorage.getItem("favoriteAudio");

  return saved ? JSON.parse(saved) : [];

});

  const audioRef = useRef(null);

  const formatTime = (time) => {

    if (!time) return "00:00";

    const minute = Math.floor(time / 60);

    const second = Math.floor(time % 60);

    return `${minute}:${second
      .toString()
      .padStart(2, "0")}`;

  };

  const toggleAudio = () => {

    if (!audioRef.current) return;

    if (isPlaying) {

      audioRef.current.pause();

      setIsPlaying(false);

    } else {

      audioRef.current.play();

      setIsPlaying(true);

    }

  };

  const changeSong = (index) => {

  const wasPlaying = isPlaying;

  if (audioRef.current) {
    audioRef.current.pause();
  }

  setPlaying(index);

  setCurrentTime(0);

  if (wasPlaying) {

    setTimeout(() => {

      if (audioRef.current) {

        audioRef.current.play();

        setIsPlaying(true);

      }

    }, 200);

  }

};

  const changeProgress = (e) => {

    const value = Number(e.target.value);

    audioRef.current.currentTime = value;

    setCurrentTime(value);

  };

  const changeVolume = (e) => {

    const value = Number(e.target.value);

    setVolume(value);

  };
  const toggleFavorite = () => {

  if (favorite.includes(playing)) {

    setFavorite(
      favorite.filter((item) => item !== playing)
    );

  } else {

    setFavorite([
      ...favorite,
      playing,
    ]);

  }

};
    useEffect(() => {

    if (!audioRef.current) return;

    audioRef.current.volume = volume;

  }, [volume]);
  useEffect(() => {

  localStorage.setItem(
    "favoriteAudio",
    JSON.stringify(favorite)
  );

}, [favorite]);
  useEffect(() => {

  if (!audioRef.current) return;

  if (isPlaying) {

    audioRef.current.play();

  }

}, [playing]);

  useEffect(() => {

    const audio = audioRef.current;

    if (!audio) return;

    const updateTime = () => {

      setCurrentTime(audio.currentTime);

    };

    const loaded = () => {

      setDuration(audio.duration);

    };

    const ended = () => {

  const next =
    (playing + 1) % audioList.length;

  setPlaying(next);

  setCurrentTime(0);

  setTimeout(() => {

    if (audioRef.current) {

      audioRef.current.play();

      setIsPlaying(true);

    }

  }, 150);

};

    audio.addEventListener(
      "timeupdate",
      updateTime
    );

    audio.addEventListener(
      "loadedmetadata",
      loaded
    );

    audio.addEventListener(
      "ended",
      ended
    );

    return () => {

      audio.removeEventListener(
        "timeupdate",
        updateTime
      );

      audio.removeEventListener(
        "loadedmetadata",
        loaded
      );

      audio.removeEventListener(
        "ended",
        ended
      );

    };

  }, [playing]);

  return (

<div className="min-h-screen bg-gradient-to-b from-[#8B5CF6] via-[#5B21B6] to-[#1E1B4B] flex justify-center">

<div className="w-[393px] px-6 pt-8 pb-32">

<audio

ref={audioRef}

src={audioList[playing].src}

preload="metadata"

/>

<motion.div

initial={{ opacity:0 }}

animate={{ opacity:1 }}

>

<h1 className="text-white text-4xl font-bold">

Sleep Audio

</h1>

<p className="text-violet-200 mt-2">

Relaksasi sebelum tidur

</p>
{/* PLAYER */}

<div className="mt-8 rounded-[35px] bg-white/10 backdrop-blur-3xl border border-white/10 p-8">

  <div className="text-center text-7xl">

    {audioList[playing].emoji}

  </div>

  <h2 className="text-center text-white text-3xl font-bold mt-5">

    {audioList[playing].title}

  </h2>

  <p className="text-center text-violet-200 mt-2">

    {audioList[playing].subtitle}

  </p>

  <div className="mt-8">

    <input

      type="range"

      min="0"

      max={duration || 0}

      value={currentTime}

      onChange={changeProgress}

      className="w-full accent-violet-500 cursor-pointer"

    />

    <div className="flex justify-between mt-3 text-violet-200 text-sm">

      <span>

        {formatTime(currentTime)}

      </span>

      <span>

        {formatTime(duration)}

      </span>

    </div>

  </div>

  <div className="flex justify-center items-center gap-5 mt-8">

  <button
    onClick={() => {
      const prev =
        playing === 0
          ? audioList.length - 1
          : playing - 1;

      changeSong(prev);
    }}
    className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center text-white"
  >
    ⏮
  </button>

  <button

  onClick={toggleFavorite}

  className={`w-14 h-14 rounded-full flex justify-center items-center transition ${
    favorite.includes(playing)
      ? "bg-pink-500 text-white"
      : "bg-white/10 text-white"
  }`}

>

  <Heart
    fill={favorite.includes(playing) ? "white" : "none"}
  />

</button>

  <button
    onClick={toggleAudio}
    className="w-20 h-20 rounded-full bg-gradient-to-r from-violet-500 to-indigo-600 flex justify-center items-center text-white shadow-xl"
  >
    {isPlaying ? <Pause size={34} /> : <Play size={34} />}
  </button>

  <button
    onClick={() => {
      const next =
        (playing + 1) % audioList.length;

      changeSong(next);
    }}
    className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center text-white"
  >
    ⏭
  </button>

</div>

  <div className="mt-6">

    <input

      type="range"

      min="0"

      max="1"

      step="0.01"

      value={volume}

      onChange={changeVolume}

      className="w-full accent-violet-500 cursor-pointer"

    />

  </div>

</div>
{/* PLAYLIST */}

<div className="mt-8">

  <h2 className="text-white text-2xl font-bold mb-4">

    🎧 Playlist

  </h2>

  <div className="space-y-4">

    {audioList.map((audio, index) => (

      <motion.button

        key={index}

        whileHover={{ scale: 1.02 }}

        whileTap={{ scale: 0.98 }}

        onClick={() => changeSong(index)}

        className={`w-full rounded-3xl p-5 transition-all duration-300 flex justify-between items-center ${
          playing === index
            ? "bg-violet-500 shadow-xl text-white"
            : "bg-white/10 text-white hover:bg-white/20"
        }`}

      >

        <div className="flex items-center gap-4">

          <div className="text-4xl">

            {audio.emoji}

          </div>

          <div className="text-left">

            <h3 className="font-bold text-lg">

              {audio.title}

            </h3>

            <p className="text-sm opacity-80">

              {audio.subtitle}

            </p>

          </div>

        </div>

        <div>

          {playing === index ? (

            isPlaying ? (

              <Pause size={22} />

            ) : (

              <Play size={22} />

            )

          ) : (

            <Headphones size={22} />

          )}

        </div>

      </motion.button>

    ))}

  </div>

</div>

{/* NOW PLAYING */}

<div className="mt-8 rounded-[30px] bg-gradient-to-r from-violet-600 to-indigo-700 p-6 shadow-xl">

  <p className="text-violet-200">

    Sedang Diputar

  </p>

  <div className="flex justify-between items-center mt-4">

    <div>

      <h2 className="text-white text-2xl font-bold">

        {audioList[playing].title}

      </h2>

      <p className="text-violet-100 mt-2">

        {audioList[playing].subtitle}

      </p>

    </div>

    <div className="text-6xl">

      {audioList[playing].emoji}

    </div>

  </div>

</div>
{/* FAVORITE */}

<div className="mt-8 rounded-[30px] bg-white/10 backdrop-blur-xl border border-white/10 p-6">

  <div className="flex justify-between items-center">

    <div>

      <h2 className="text-white text-2xl font-bold">

        ❤️ Favorit

      </h2>

      <p className="text-violet-200 mt-2">

        Simpan audio favoritmu agar mudah diputar kembali.

      </p>

    </div>

    <button

onClick={toggleFavorite}

className={`w-14 h-14 rounded-full flex justify-center items-center transition ${
  favorite.includes(playing)
    ? "bg-pink-500 text-white"
    : "bg-white/10 text-white"
}`}

>

<Heart

size={24}

fill={favorite.includes(playing) ? "white" : "none"}

/>

</button>

  </div>

</div>

{/* TIPS */}

<div className="mt-8 rounded-[30px] bg-white/10 backdrop-blur-xl border border-white/10 p-6">

  <h2 className="text-white text-2xl font-bold">

    💡 Tips Mendengarkan

  </h2>

  <ul className="mt-5 space-y-4 text-violet-100 leading-7">

    <li>

      🎧 Gunakan earphone agar suara lebih nyaman.

    </li>

    <li>

      🌙 Dengarkan 20–30 menit sebelum tidur.

    </li>

    <li>

      📱 Aktifkan mode Do Not Disturb.

    </li>

    <li>

      🍫 Kombinasikan dengan Dream Choco untuk relaksasi maksimal.

    </li>

  </ul>

</div>

{/* NAPPI AI */}

<div className="mt-8 rounded-[30px] bg-gradient-to-r from-violet-600 to-indigo-700 p-6">

  <h2 className="text-white text-2xl font-bold">

    🤖 Rekomendasi NAPPI AI

  </h2>

  <p className="text-violet-100 mt-4 leading-7">

    Dengarkan audio ini sekitar 30 menit sebelum tidur. Kurangi penggunaan HP dan ciptakan suasana kamar yang tenang agar kualitas tidur semakin baik.

  </p>

</div>
{/* MINI PLAYER */}

<div className="mt-8 rounded-[30px] bg-white/10 backdrop-blur-xl border border-white/10 p-5">

  <div className="flex items-center justify-between">

    <div>

      <p className="text-violet-200 text-sm">

        Sedang Diputar

      </p>

      <h3 className="text-white font-bold text-lg mt-1">

        {audioList[playing].title}

      </h3>

    </div>

    <button

      onClick={toggleAudio}

      className="w-14 h-14 rounded-full bg-gradient-to-r from-violet-500 to-indigo-600 flex justify-center items-center text-white"

    >

      {isPlaying ? <Pause size={24}/> : <Play size={24}/>}

    </button>

  </div>

</div>

</motion.div>

</div>

<BottomNav />

</div>

);

}

export default SleepAudio;