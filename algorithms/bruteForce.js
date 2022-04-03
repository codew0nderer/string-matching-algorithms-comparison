import occurrence from '../modules/occurrence.js';

export default function BruteForce(string, pattern) {
  let occurrences = [];
  for (let i = 0; i < string.length; i++) {
    for (let j = 0; j < pattern.length; j++) {
      const stringChar = string[i + j];
      const patternChar = pattern[j];

      if (stringChar != patternChar) {
        break;
      } else if (j == pattern.length - 1) {
        occurrences.push(new occurrence(i, i + j));
      }
    }
  }

  return occurrences;
}
