// Tolerant Tamil String Similarity for Children's Speech Recognition

export function cleanTamilText(text: string): string {
  return text
    .normalize('NFC')
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?"'!’]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

export function computeTamilSimilarity(actual: string, expected: string): number {
  const s1 = cleanTamilText(actual);
  const s2 = cleanTamilText(expected);

  if (!s1 || !s2) return 0.0;
  if (s1 === s2) return 1.0;

  // Levenshtein distance on grapheme clusters / characters
  const a = Array.from(s1);
  const b = Array.from(s2);

  const matrix: number[][] = [];
  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b[i - 1] === a[j - 1]) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          Math.min(
            matrix[i][j - 1] + 1,     // insertion
            matrix[i - 1][j] + 1      // deletion
          )
        );
      }
    }
  }

  const distance = matrix[b.length][a.length];
  const maxLen = Math.max(a.length, b.length);
  const similarity = 1.0 - (distance / maxLen);

  return Math.max(0.0, Math.min(1.0, parseFloat(similarity.toFixed(2))));
}
