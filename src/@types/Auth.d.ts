interface User {
  id?: string;
  username: string;
  email: string;
  entrance?: Date;
  updatedAt?: Date;
  userIP?: string;
  userAgent?: string;
  visitsCount?: number;
}

interface AuthContext {
  user: null | User;
  onSetUser: (user: User) => void;
}