import { z } from "zod";

export const OAuthResult = z.object({
  access_token: z.string(),
  token_type: z.string(),
  expires_in: z.string().transform((s) => parseInt(s, 10)),
});
export type OAuthResult = z.infer<typeof OAuthResult>;
