export interface UserDTO {
  id: string;
  name: string | null;
  email: string | null;
  role: "USER" | "ADMIN";
  image?: string | null;
  createdAt: string;
  updatedAt: string;
}
