import { createContext, useContext, useEffect, useState } from "react";

const SleepContext = createContext();

export function SleepProvider({ children }) {

  const [sleepScore, setSleepScore] = useState(() => {
    return Number(localStorage.getItem("sleepScore")) || 0;
  });

  const [sleepGoal, setSleepGoal] = useState(() => {
    return Number(localStorage.getItem("sleepGoal")) || 8;
  });

  const [streak, setStreak] = useState(() => {
    return Number(localStorage.getItem("streak")) || 12;
  });

  const [userName, setUserName] = useState(() => {
    return localStorage.getItem("userName") || "Ulfah";
  });
  const [history, setHistory] = useState(() => {

  const data = localStorage.getItem("sleepHistory");

  return data ? JSON.parse(data) : [];

});

  useEffect(() => {
    localStorage.setItem("sleepScore", sleepScore);
  }, [sleepScore]);

  useEffect(() => {
    localStorage.setItem("sleepGoal", sleepGoal);
  }, [sleepGoal]);

  useEffect(() => {
    localStorage.setItem("streak", streak);
  }, [streak]);

  useEffect(() => {
    localStorage.setItem("userName", userName);
  }, [userName]);

  useEffect(() => {
  localStorage.setItem(
    "sleepHistory",
    JSON.stringify(history)
  );

}, [history]);

  return (
    <SleepContext.Provider
      value={{
        sleepScore,
        setSleepScore,

        sleepGoal,
        setSleepGoal,

        streak,
        setStreak,

        userName,
        setUserName,

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