export interface User {
  name: string,
  username: string,
  password: string,
  confirmPassword?: string
}

export interface JWTPayload {
  iat: number,
  id: number,
  username: string,
  exp: number
}