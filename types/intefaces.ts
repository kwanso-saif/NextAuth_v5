export interface User {
  id?: string;
  emailVerified?: any;
  name?: string | null | undefined;
  role?: string;
  userName?: string;
  data?: {
    login: {
      accessToken: string;
    }
  }
}

