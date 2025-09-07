import React, { createContext, useContext, useState, ReactNode } from 'react';

export type UserRole = 'student' | 'staff' | 'admin' | null;

interface RoleContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  isLoggedIn: boolean;
  login: (role: UserRole) => void;
  logout: () => void;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export function RoleProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<UserRole>(null);

  const login = (userRole: UserRole) => {
    setRole(userRole);
  };

  const logout = () => {
    setRole(null);
  };

  const isLoggedIn = role !== null;

  return (
    <RoleContext.Provider value={{ role, setRole, isLoggedIn, login, logout }}>
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  const context = useContext(RoleContext);
  if (context === undefined) {
    throw new Error('useRole must be used within a RoleProvider');
  }
  return context;
}