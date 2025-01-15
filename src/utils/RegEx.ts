export const extractFileName = (url: string): string => {
  const regex = /[^/]+$/;
  const match = url.match(regex);
  return match ? match[0] : '';
};

export function containsExactPath(input: string, segment: string): boolean {
  const inputArr = input.split('/');
  const segmentArr = segment.split('/');
  return inputArr.length === 2
    ? inputArr[2] === segmentArr[2]
    : inputArr[3] === segmentArr[3];
}
