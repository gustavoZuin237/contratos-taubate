export function titleCase(value: string) {
  const lowerWords = new Set(["de", "da", "do", "dos", "das", "e"]);

  return value
    .toLowerCase()
    .split(" ")
    .map((word, index) => {
      if (index !== 0 && lowerWords.has(word)) {
        return word;
      }

      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}
