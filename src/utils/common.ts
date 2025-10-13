export const randStr = (digits: number = 10): string => {
  const chars =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let str = '';
  for (let i = 0; i < digits; i++) {
    str += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return str;
};
