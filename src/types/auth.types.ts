export interface LoginPayloadTypes {
  username?: string;
  password?: string;
}

export interface SignupPayloadTypes {
  name: string;
  username: string;
  email: string;
  mobile: string;
  country_code: string;
  password: string;
  role: string;
  club_id?: number | string | null | undefined;
  created: any;
  updated: any;
}
