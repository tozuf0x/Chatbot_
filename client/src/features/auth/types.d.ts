interface IAuthData {
  email: string;
  password: string;
}

interface IAuthResponse {
  accessToken: string;
  user: {
    email: string;
  };
}
