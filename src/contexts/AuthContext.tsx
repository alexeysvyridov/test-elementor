import React, { createContext, useState } from 'react'
const defaultValues = {
  user: null,
  onSetUser: () => {}
}

export const UserAuth = createContext<AuthContext | null>(defaultValues);

interface Props {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<Props> = ( {children}) => {
  const [user, setUser] = useState<null | User>(null);

  const handleSetUser = (userValues: User) => {
    setUser(userValues)
  }

  return (
    <UserAuth.Provider value={{ user, onSetUser: handleSetUser }}>
      {children}
    </UserAuth.Provider>
  )
}
