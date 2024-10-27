export interface MediaProps {
  url: string;
  type: "image" | "video" | "audio"; // You can add more types as needed
  size: number; // Size in bytes
}

export interface SettingsProps {
  hideLikeAndView?: boolean;
  hideComments?: boolean;
}

export interface UserProps {
  name: string;
  username: string;
  id: string;
  profileImage?: string;
  about?: string;
  totalFollowers?: number;
  totalFollowing?: number;
  totalPosts?: number;
  isPrivate?: boolean;
}

export interface PostProps {
  id: string;
  description: string;
  createdAt: string; // Consider using Date type if handling dates
  updatedAt: string; // Consider using Date type if handling dates
  deletedAt: string | null; // Use null if the post is not deleted
  settings?: SettingsProps;
  tags: string[]; // Array of tag strings
  media: MediaProps[];
  totalLikes: number;
  totalComments: number;
  totalViews: number;
  totalShare: number;
  location: string;
  userId: string; // ID of the user who created the post
  user: UserProps;
}
