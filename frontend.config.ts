export const baseURL =
  process.env.NEXT_PUBLIC_CWUBB_ENV === 'production'
    ? 'https://codewithunclebigbay.com'
    : 'http://localhost:3001';
