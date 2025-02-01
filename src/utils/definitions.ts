export interface User {
  name: string;
  email: string;
  bio: string;
  createdAt: string;
  id: number;
}

export interface SignUpProps {
  email: string;
  id: string;
  name: string;
}
