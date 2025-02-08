export interface MouvementProps {
  id: number;
  user_id: number;
  latitude: number;
  longitude: number;
  movement_at: string;
}

export interface UserProps {
  id: number;
  name: string;
  password?: string;
  role: "user" | "admin";
}
