export class AuthDTO {
  email: string;
  password: string;
}

export class JwtDTO {
  sub: string;
  exp: number;
  iat: number;
}
