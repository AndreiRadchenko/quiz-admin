export const extractFileName = (url: string): string  => {
  const regex = /[^/]+$/;
  const match = url.match(regex);
  return match ? match[0] : '';
};
