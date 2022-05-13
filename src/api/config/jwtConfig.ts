interface IJwt {
  secret_key: string;
}

export const jwtSecret = { secret_key: process.env.SECRET_KEY } as IJwt;
