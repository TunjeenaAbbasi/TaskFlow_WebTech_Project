import { useState, type ReactNode } from 'react';
import { AuthContext } from './AuthContext';

type AuthProviderProps = {
  children: ReactNode;
};

export default function AuthProvider({
  children,
}: AuthProviderProps) {
  const [user, setUser] = useState<string | null>(
    localStorage.getItem('user'),
  );

  const login = (username: string) => {
    localStorage.setItem('user', username);
    setUser(username);
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}