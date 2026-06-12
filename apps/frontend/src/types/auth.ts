export type AuthUser = {
  id: string;
  name: string;
  email: string;
  is_active: boolean;
  is_email_verified: boolean;
};

export type AuthResponse = {
  access_token: string | null;
  token_type: 'bearer';
  user: AuthUser;
  email_confirmation_required: boolean;
};

export type TokenResponse = {
  access_token: string;
  token_type: 'bearer';
};
