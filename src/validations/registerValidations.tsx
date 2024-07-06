export const validateName = (name: string): string | null => {
  if (!name) return "Name is required";
  if (name.length < 3) return "Name must be at least 3 characters long";
  return null;
};

export const validateUsername = (username: string): string | null => {
  if (!username) return "Username is required";
  if (!/^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{5,}$/.test(username)) return "Username must be at least 6 characters with letters and numbers";
  return null;
};

export const validatePassword = (password: string): string | null => {
  if (!password) return "Password is required";
  if (!/^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{6,}$/.test(password)) return "Password must be at least 6 characters with letters and numbers";
  return null;
};

export const validateConfirmPassword = (
  password: string,
  confirmPassword: string
): string | null => {
  if (!confirmPassword) return "Please confirm your password";
  if (password !== confirmPassword) return "Passwords do not match";
  return null;
};
