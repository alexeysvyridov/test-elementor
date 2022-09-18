interface User {
  id?: string;
  username?: string;
  email?: string;
  entrance?: string;
  lastUpdate?: number;
  userIP?: string;
  userAgent?: string;
  visitsCount?: number;
  isOnline?: boolean;
}

interface AuthContext {
  user: null | User;
  onSetUser: (user: User | null) => void;
}