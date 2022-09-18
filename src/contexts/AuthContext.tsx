import React, { createContext, useEffect, useState } from 'react'
import { getStorage } from '../helpers';
const defaultValues = {
  user: null,
  onSetUser: () => {}
}

export const UserAuth = createContext<AuthContext>(defaultValues);

interface Props {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<Props> = ( {children}) => {
  const [user, setUser] = useState<null | User>({username: '', email: ''});

  const handleSetUser = (userValues: User | null) => {
    setUser(userValues)
  }

  useEffect(() => {
    let result = getStorage('user');
    if (result !== null) {
      handleSetUser(result)
    }
  }, [])
  return (
    <UserAuth.Provider value={{ user, onSetUser: handleSetUser }}>
      {children}
    </UserAuth.Provider>
  )
}
