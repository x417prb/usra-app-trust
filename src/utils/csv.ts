export function parseCSV<T>(
  content: string,
  decode: (values: string[]) => T,
  {
    delimiter = "\n",
    separator = /[\t,;]/,
  }: {
    delimiter?: string | RegExp;
    separator?: string | RegExp;
  } = {}
): T[] {
  return content
    .trim()
    .split(delimiter)
    .map((line) => line.trim())
    .filter((x) => x)
    .map((line) => {
      try {
        return decode(line.split(separator).map((value) => value.trim()));
      } catch (e) {
        console.warn(e);
        return null!;
      }
    })
    .filter((x) => x);
}
