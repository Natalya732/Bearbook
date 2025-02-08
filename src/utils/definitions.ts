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

export interface ProfileData {
  id: string;
  name: string;
  role: string;
  location: string;
  email: string;
  github: string;
  linkedIn: string;
  bio: string;
  profileImage: string;
  following: number;
  followers: number;
  isFollowing: boolean;
}

export interface Post {
  id: string;
  content: string;
  imageUrl?: string;
  created_at: string;
  authorName: string;
  authorImage?: string;
}

export interface EditComponentProps {
  isEdit: boolean;
  value: string;
  field: string;
  styles: string;
  inputStyle: string;
  onUpdate: (newValue: string, field: string) => void;
}
