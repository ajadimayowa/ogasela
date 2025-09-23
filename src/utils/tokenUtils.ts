// src/utils/auth.ts
export const isTokenValid = () => {
  const token = localStorage.getItem('token');
  if (!token) return false;
  // Dummy token check (in real apps use expiry)
  return token.length > 10;
};

export const logout = () => {
  localStorage.removeItem('token');
  window.location.href = '/login';
};