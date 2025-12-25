// Simple admin authentication utility using localStorage
const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'admin123' // In a real app, this would be handled securely
};

export const loginAdmin = (username: string, password: string): boolean => {
  if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
    localStorage.setItem('isAdminAuthenticated', 'true');
    return true;
  }
  return false;
};

export const logoutAdmin = (): void => {
  localStorage.removeItem('isAdminAuthenticated');
};

export const isAdminAuthenticated = (): boolean => {
  return localStorage.getItem('isAdminAuthenticated') === 'true';
};

export const validateCredentials = (username: string, password: string): { isValid: boolean; error?: string } => {
  if (!username.trim()) {
    return { isValid: false, error: 'Username is required' };
  }
  
  if (!password.trim()) {
    return { isValid: false, error: 'Password is required' };
  }
  
  if (username !== ADMIN_CREDENTIALS.username) {
    return { isValid: false, error: 'Invalid username' };
  }
  
  if (password !== ADMIN_CREDENTIALS.password) {
    return { isValid: false, error: 'Invalid password' };
  }
  
  return { isValid: true };
};