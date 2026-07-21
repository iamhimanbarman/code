// ============================================
// CodeVerse Shared Types — Auth DTOs
// ============================================

export interface RegisterDto {
  email: string;
  username: string;
  password: string;
  displayName: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: {
    id: string;
    email: string;
    username: string;
    displayName: string;
    avatar?: string;
    role: string;
  };
  accessToken: string;
  refreshToken: string;
}

export interface RefreshTokenDto {
  refreshToken: string;
}

export interface ForgotPasswordDto {
  email: string;
}

export interface ResetPasswordDto {
  token: string;
  password: string;
}

export interface ChangePasswordDto {
  currentPassword: string;
  newPassword: string;
}

export interface UpdateProfileDto {
  displayName?: string;
  bio?: string;
  location?: string;
  website?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  avatar?: string;
}
