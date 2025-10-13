export const getJstDateYYYYMMDD = () => {
  const date = new Date();
  date.setHours(date.getHours() + 9);
  return `${date.getFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, '0')}-${String(date.getUTCDate()).padStart(2, '0')}`;
};
