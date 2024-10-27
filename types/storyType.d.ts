export interface MediaProps {
  url: string;
  type: "image" | "video";
  size: number;
  createdAt: string;
  musicUrl: string;
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

export interface StoryProps {
  id: string;
  createdAt: string; // Consider using Date type if handling dates
  updatedAt: string; // Consider using Date type if handling dates
  deletedAt: string | null; // Use null if the post is not deleted
  media: MediaProps[];
  userId: string; // ID of the user who created the post
  user: UserProps;
}
