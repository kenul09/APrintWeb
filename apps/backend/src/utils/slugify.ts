const DIACRITICS_REGEX = /[̀-ͯ]/g;

export function slugify(input: string): string {
  return input
    .toString()
    .normalize("NFKD")
    .replace(DIACRITICS_REGEX, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
