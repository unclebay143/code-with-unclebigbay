// module.exports = {
//   baseURL:
//     process.env.NEXT_PUBLIC_CWUBB_ENV === 'production'
//       ? 'https://codewithunclebigbay.vercel.app'
//       : 'http://localhost:3001',
// };

export const baseURL =
  process.env.NEXT_PUBLIC_CWUBB_ENV === 'production'
    ? 'https://codewithunclebigbay.vercel.app'
    : 'http://localhost:3001';
