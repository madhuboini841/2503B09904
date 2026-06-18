import { useState, useEffect } from 'react';

const STORAGE_KEY = 'viewed_notifications';

export const useViewedStatus = () => {
  const [viewedIds, setViewedIds] = useState(new Set());

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setViewedIds(new Set(JSON.parse(stored)));
      }
    } catch (error) {
      console.error('Failed to parse viewed notifications from localStorage:', error);
    }
  }, []);

  const markAsViewed = (id) => {
    setViewedIds((prev) => {
      if (prev.has(id)) return prev;
      const newSet = new Set(prev);
      newSet.add(id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(newSet)));
      return newSet;
    });
  };

  const isViewed = (id) => viewedIds.has(id);

  return { isViewed, markAsViewed };
};
