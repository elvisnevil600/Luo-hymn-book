import { useState, useEffect } from "react";

const STORAGE_KEY = "luo-hymn-favorites";

export function useFavorites() {
  const [favorites, setFavorites] = useState<number[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setFavorites(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse favorites", e);
      }
    }
  }, []);

  const toggleFavorite = (number: number) => {
    setFavorites((prev) => {
      const next = prev.includes(number)
        ? prev.filter((id) => id !== number)
        : [...prev, number];
      
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  };

  const isFavorite = (number: number) => favorites.includes(number);

  return { favorites, toggleFavorite, isFavorite };
}
