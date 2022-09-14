interface User {
  name: string;
  email: string;
}

interface AuthContext {
  user: null | User;
  onSetUser: (user: User) => void;
}