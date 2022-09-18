interface User {
  id?: string;
  username?: string;
  email?: string;
  entrance?: string;
  updatedAt?: string;
  userIP?: string;
  userAgent?: string;
  visitsCount?: number;
  isOnline?: boolean;
}

interface AuthContext {
  user: null | User;
  onSetUser: (user: User) => void;
}