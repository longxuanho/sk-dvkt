export class User {
  $key: string;
  displayName: string;
  email: string;
  description: string;
  photoUrl?: string;
  requireNewPassword?: boolean;
  online?: boolean;
}