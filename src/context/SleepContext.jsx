import { createContext, useContext, useState, useEffect } from "react";

const SleepContext = createContext();

export function SleepProvider({ children }) {
  const [userName, setUserName] = useState(() => {
    return localStorage.getItem("userName") || "";
  });

  const [sleepScore, setSleepScore] = useState(0);

  const [sleepGoal, setSleepGoal] = useState(8);

  const [streak, setStreak] = useState(12);

  const [history, setHistory] = useState([]);

  useEffect(() => {
    localStorage.setItem("userName", userName);
  }, [userName]);

  return (
    <SleepContext.Provider
      value={{
        userName,
        setUserName,
        sleepScore,
        setSleepScore,
        sleepGoal,
        setSleepGoal,
        streak,
        setStreak,
        history,
        setHistory,
      }}
    >
      {children}
    </SleepContext.Provider>
  );
}

export function useSleep() {
  return useContext(SleepContext);
}