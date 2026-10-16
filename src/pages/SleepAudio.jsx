
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
    try {
      const saved = localStorage.getItem("favoriteAudio");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const audioRef = useRef(null);
  const currentAudio = audioList[playing];

  const formatTime = (time) => {
    if (!Number.isFinite(time) || time <= 0) {
      return "00:00";
    }

    const minute = Math.floor(time / 60);
    const second = Math.floor(time % 60);

    return `${minute.toString().padStart(2, "0")}:${second
      .toString()
      .padStart(2, "0")}`;
  };

  const toggleAudio = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
      }
    }
  };

  const changeSong = async (index) => {
    if (index === playing) {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        setCurrentTime(0);
      }
      return;
    }

    setPlaying(index);
    setCurrentTime(0);
    setDuration(0);

    // Lagu baru otomatis diputar jika sebelumnya sedang diputar.
    if (isPlaying) {
      setIsPlaying(true);
    }
  };

  const changeProgress = (event) => {
    const value = Number(event.target.value);
    const audio = audioRef.current;

    if (!audio || !Number.isFinite(audio.duration)) return;

    audio.currentTime = value;
    setCurrentTime(value);
  };

  const changeVolume = (event) => {
    setVolume(Number(event.target.value));
  };

  const toggleFavorite = () => {
    setFavorite((previous) =>
      previous.includes(playing)
        ? previous.filter((item) => item !== playing)
        : [...previous, playing]
    );
  };

  const playNext = () => {
    setPlaying((previous) => (previous + 1) % audioList.length);
    setCurrentTime(0);
    setDuration(0);
  };

  const playPrevious = () => {
    setPlaying(
      (previous) =>
        (previous - 1 + audioList.length) % audioList.length
    );
    setCurrentTime(0);
    setDuration(0);
  };

  useEffect(() => {
    try {
      localStorage.setItem("favoriteAudio", JSON.stringify(favorite));
    } catch {
      // Favorit tetap berfungsi selama halaman terbuka jika penyimpanan tidak tersedia.
    }
  }, [favorite]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = volume;
  }, [volume]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);

    const updateDuration = () => {
      setDuration(Number.isFinite(audio.duration) ? audio.duration : 0);
    };

    const handleEnded = () => {
      setPlaying((previous) => (previous + 1) % audioList.length);
      setCurrentTime(0);
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("durationchange", updateDuration);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("durationchange", updateDuration);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = volume;

    if (isPlaying) {
      audio.play().catch(() => setIsPlaying(false));
    }
  }, [playing]);

  return (
    <div className="min-h-screen flex justify-center bg-[#F8F0E5]">
      <div className="w-full max-w-[393px] px-6 pt-8 pb-32">
        <audio
          ref={audioRef}
          src={currentAudio.src}
          preload="metadata"
        />

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          {/* HEADER */}
          <div className="inline-flex items-center gap-2 rounded-full bg-[#F1E1D5] px-4 py-2 text-xs font-semibold tracking-wider text-[#7A2634]">
            <Headphones size={15} />
            NAPCO SLEEP+
          </div>

          <h1 className="mt-4 text-4xl font-bold text-[#7A2634]">
            Sleep Audio
          </h1>

          <p className="mt-2 leading-6 text-[#A66D68]">
            Temukan suasana yang menenangkan sebelum tidur.
          </p>

          {/* MAIN PLAYER */}
          <div className="mt-7 rounded-[30px] border border-[#E3CBB9] bg-white p-6 shadow-sm">
            <div className="flex h-28 w-28 mx-auto items-center justify-center rounded-full bg-[#F1E1D5] text-6xl">
              {currentAudio.emoji}
            </div>

            <h2 className="mt-5 text-center text-2xl font-bold text-[#7A2634]">
              {currentAudio.title}
            </h2>

            <p className="mt-1 text-center text-sm text-[#A66D68]">
              {currentAudio.subtitle}
            </p>

            {/* PROGRESS */}
            <div className="mt-7">
              <input
                type="range"
                min="0"
                max={duration || 0}
                step="0.1"
                value={Math.min(currentTime, duration || 0)}
                onChange={changeProgress}
                aria-label="Posisi audio"
                className="w-full cursor-pointer accent-[#7A2634]"
              />

              <div className="mt-1 flex justify-between text-xs tabular-nums text-[#A66D68]">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* PLAYER CONTROLS */}
            <div className="mt-6 flex items-center justify-center gap-3">
              <button
                onClick={playPrevious}
                aria-label="Audio sebelumnya"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-[#F1E1D5] text-[#7A2634] transition hover:bg-[#E3CBB9]"
              >
                <span className="text-lg">⏮</span>
              </button>

              <button
                onClick={toggleFavorite}
                aria-label="Tambah atau hapus favorit"
                className={`flex h-11 w-11 items-center justify-center rounded-full transition ${
                  favorite.includes(playing)
                    ? "bg-[#7A2634] text-white"
                    : "bg-[#F1E1D5] text-[#7A2634] hover:bg-[#E3CBB9]"
                }`}
              >
                <Heart
                  size={20}
                  fill={favorite.includes(playing) ? "currentColor" : "none"}
                />
              </button>

              <button
                onClick={toggleAudio}
                aria-label={isPlaying ? "Jeda audio" : "Putar audio"}
                className="flex h-[68px] w-[68px] items-center justify-center rounded-full bg-[#7A2634] text-white shadow-md transition hover:bg-[#62202B]"
              >
                {isPlaying ? (
                  <Pause size={30} fill="currentColor" />
                ) : (
                  <Play size={30} fill="currentColor" />
                )}
              </button>

              <button
                onClick={playNext}
                aria-label="Audio berikutnya"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-[#F1E1D5] text-[#7A2634] transition hover:bg-[#E3CBB9]"
              >
                <span className="text-lg">⏭</span>
              </button>
            </div>

            {/* VOLUME */}
            <div className="mt-6 flex items-center gap-3">
              <Volume2 size={19} className="shrink-0 text-[#7A2634]" />

              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={changeVolume}
                aria-label="Volume audio"
                className="w-full cursor-pointer accent-[#7A2634]"
              />

              <span className="w-9 text-right text-xs text-[#A66D68]">
                {Math.round(volume * 100)}%
              </span>
            </div>
          </div>

          {/* PLAYLIST */}
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-[#7A2634]">
              Playlist
            </h2>

            <p className="mt-1 text-sm text-[#A66D68]">
              Pilih audio sesuai suasana yang kamu inginkan.
            </p>

            <div className="mt-4 space-y-3">
              {audioList.map((audio, index) => {
                const isActive = playing === index;

                return (
                  <motion.button
                    key={audio.title}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => changeSong(index)}
                    className={`flex w-full items-center justify-between gap-3 rounded-2xl border p-4 text-left transition ${
                      isActive
                        ? "border-[#7A2634] bg-[#7A2634] text-white shadow-sm"
                        : "border-[#E3CBB9] bg-white text-[#7A2634] hover:bg-[#F1E1D5]"
                    }`}
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <div
                        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-2xl ${
                          isActive ? "bg-white/10" : "bg-[#F1E1D5]"
                        }`}
                      >
                        {audio.emoji}
                      </div>

                      <div className="min-w-0">
                        <h3 className="font-bold">{audio.title}</h3>
                        <p
                          className={`mt-1 text-xs ${
                            isActive ? "text-[#F1E1D5]" : "text-[#A66D68]"
                          }`}
                        >
                          {audio.subtitle}
                        </p>
                      </div>
                    </div>

                    <div className="shrink-0">
                      {isActive && isPlaying ? (
                        <Pause size={21} />
                      ) : isActive ? (
                        <Play size={21} />
                      ) : (
                        <Headphones size={21} />
                      )}
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* NOW PLAYING */}
          <div className="mt-7 rounded-[26px] bg-[#7A2634] p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#E3CBB9]">
              Sedang Dipilih
            </p>

            <div className="mt-3 flex items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-bold text-white">
                  {currentAudio.title}
                </h2>
                <p className="mt-1 text-sm text-[#F1E1D5]">
                  {currentAudio.subtitle}
                </p>
              </div>

              <div className="text-5xl">{currentAudio.emoji}</div>
            </div>
          </div>

          {/* FAVORITES */}
          <div className="mt-5 rounded-[26px] border border-[#E3CBB9] bg-white p-5">
            <div className="flex items-start gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#F1E1D5]">
                <Heart
                  size={22}
                  className="text-[#7A2634]"
                  fill={favorite.length > 0 ? "currentColor" : "none"}
                />
              </div>

              <div>
                <h2 className="text-lg font-bold text-[#7A2634]">
                  Audio Favorit
                </h2>
                <p className="mt-1 text-sm leading-6 text-[#A66D68]">
                  {favorite.length > 0
                    ? `${favorite.length} audio tersimpan di daftar favoritmu.`
                    : "Tekan ikon hati untuk menyimpan audio favoritmu."}
                </p>
              </div>
            </div>

            {favorite.length > 0 && (
              <div className="mt-4 space-y-2">
                {favorite.map((index) => (
                  <button
                    key={audioList[index].title}
                    onClick={() => changeSong(index)}
                    className="flex w-full items-center gap-3 rounded-xl bg-[#F8F0E5] p-3 text-left text-sm font-medium text-[#7A2634] hover:bg-[#F1E1D5]"
                  >
                    <span className="text-xl">
                      {audioList[index].emoji}
                    </span>
                    <span>{audioList[index].title}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* LISTENING TIPS */}
          <div className="mt-5 rounded-[26px] border border-[#E3CBB9] bg-white p-5">
            <h2 className="text-xl font-bold text-[#7A2634]">
              Tips Mendengarkan
            </h2>

            <ul className="mt-4 space-y-3 text-sm leading-6 text-[#76534C]">
              <li>🎧 Gunakan volume yang nyaman dan tidak terlalu keras.</li>
              <li>🌙 Dengarkan audio sebagai bagian dari rutinitas relaksasi.</li>
              <li>📱 Aktifkan mode Do Not Disturb jika diperlukan.</li>
              <li>🍫 Padukan dengan rutinitas malam yang nyaman dan konsisten.</li>
            </ul>
          </div>

          {/* NAPPI AI */}
          <div className="mt-5 rounded-[26px] bg-[#F1E1D5] p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white">
                <Headphones size={23} className="text-[#7A2634]" />
              </div>

              <h2 className="text-xl font-bold text-[#7A2634]">
                Rekomendasi NAPPI AI
              </h2>
            </div>

            <p className="mt-3 text-sm leading-7 text-[#76534C]">
              Coba dengarkan audio dengan nyaman sebelum tidur. Redupkan
              pencahayaan, kurangi aktivitas di layar, dan ciptakan suasana
              kamar yang tenang untuk mendukung rutinitas istirahatmu.
            </p>
          </div>

          {/* MINI PLAYER */}
          <div className="mt-5 flex items-center justify-between gap-3 rounded-2xl border border-[#E3CBB9] bg-white p-4">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#F1E1D5] text-2xl">
                {currentAudio.emoji}
              </div>

              <div className="min-w-0">
                <p className="text-xs text-[#A66D68]">Pemutar Audio</p>
                <h3 className="truncate font-bold text-[#7A2634]">
                  {currentAudio.title}
                </h3>
              </div>
            </div>

            <button
              onClick={toggleAudio}
              aria-label={isPlaying ? "Jeda audio" : "Putar audio"}
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#7A2634] text-white transition hover:bg-[#62202B]"
            >
              {isPlaying ? <Pause size={22} /> : <Play size={22} />}
            </button>
          </div>
        </motion.div>
      </div>

      <BottomNav />
    </div>
  );
}

export default SleepAudio;
