export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string | null;
  username?: string | null;
  bio?: string | null;
  location?: string | null;
  website?: string | null;
  role?: string | null;
  timezone?: string | null;
}

export interface UpdateProfileData {
  name?: string;
  avatar?: File | string;
  username?: string;
  bio?: string;
  location?: string;
  website?: string;
  role?: string;
  timezone?: string;
}