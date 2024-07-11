import { useEffect, useState } from "react";

const useLocalStorage = (
  key: string,
): [string | null, React.Dispatch<React.SetStateAction<string>>] => {
  const [localStorageTerm, setLocalStorageTerm] = useState(() => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : "";
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(localStorageTerm));
  }, [key, localStorageTerm]);

  return [localStorageTerm, setLocalStorageTerm] as const;
};

export default useLocalStorage;
