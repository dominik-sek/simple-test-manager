export type USER_ROLE = {
  TESTER: "tester",
  ADMIN: "admin",
  MANAGER: "manager",
}
export interface JwtPayload{
  sub: number,
  username: string,
  role: USER_ROLE | string
}