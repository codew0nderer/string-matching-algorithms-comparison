import occurrence from '../modules/occurrence.js';

function PrecomputeASCIITable(pattern) {
  let preComputedASCIITable = [];
  for (let i = 0; i < 256; i++) {
    preComputedASCIITable.push(-1);
  }

  for (let i = 0; i < pattern.length; i++) {
    preComputedASCIITable[pattern[i].charCodeAt()] = i;
  }

  return preComputedASCIITable;
}

export default function Sunday(string, pattern) {
  let precomputedASCIITable = PrecomputeASCIITable(pattern);
  let occurrences = [];
  let i = 0;

  while (i + pattern.length <= string.length) {
    let found = true;

    for (let j = 0; j < pattern.length; j++) {
      const patternChar = pattern[j];
      const stringChar = string[i + j];

      if (stringChar != patternChar) {
        found = false;
        const nextCharIndex = i + pattern.length;

        if (nextCharIndex < string.length) {
          const charCodeASCII = string.charCodeAt(nextCharIndex);

          if (precomputedASCIITable[charCodeASCII] == -1) {
            i += pattern.length;
          } else {
            i += pattern.length - precomputedASCIITable[charCodeASCII] - 1;
          }
        }

        break;
      }
    }

    if (found) {
      occurrences.push(new occurrence(i, i + pattern.length - 1));
    }
    i++;
  }

  return occurrences;
}
