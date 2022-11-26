
export interface SpotifyApiCredentials {
    // node options
    clientId: string;
    clientSecret: string;
    accessToken: string;
    refreshToken: string;
    tokenType: string;
    expireTime: number;
    csrfToken: string;
    name: string;
    callback: string;
  }