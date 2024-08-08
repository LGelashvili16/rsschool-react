import { useEffect, useState } from "react";

const useLocalStorage = (
  key: string,
): [string | null, React.Dispatch<React.SetStateAction<string>>] => {
  const [localStorageTerm, setLocalStorageTerm] = useState(() => {
    if (typeof window === "undefined") {
      return;
    }
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : "";
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(localStorageTerm));
  }, [key, localStorageTerm]);

  return [localStorageTerm, setLocalStorageTerm] as const;
};

export default useLocalStorage;
