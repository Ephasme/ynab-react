export const buildUrl = () =>
  `https://app.youneedabudget.com/oauth/authorize?` +
  `client_id=${import.meta.env.VITE_OAUTH_PUBLIC}&` +
  `redirect_uri=${import.meta.env.VITE_REDIRECT_URI}&` +
  `response_type=token`;
