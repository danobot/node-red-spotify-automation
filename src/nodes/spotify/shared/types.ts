export interface Credeintials {
  // node options
  clientId: string;
  clientSecret: string;
  accessToken: string;
  refreshToken: string;
  expireTime: number;
}
export interface SpotifyOptions {
  // node options
  credentials: Credeintials;
  auth: any;
  api: any;
}
