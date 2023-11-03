export const storage = <T>(key: string, initialValue?: T): T | null => {
  const storage = localStorage.getItem(key);

  if (typeof initialValue === "undefined") {
    return storage && JSON.parse(storage);
  }

  if (initialValue === null) {
    localStorage.removeItem(key);
    return null;
  }

  localStorage.setItem(key, JSON.stringify(initialValue));
  return initialValue;
};
