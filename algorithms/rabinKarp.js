import occurrence from '../modules/occurrence.js';
// const maxChars = 257;
// const l = 7757;

// to be able to do bitwise modulo operations as maxChars is power of 2 = 2^8
const maxChars = 256;

// to be able to do bitwise modulo operations as l is power of 2 = 2^13
const l = 8192;

function BinaryExponentiation(number, power, modulo) {
  if (power == 0) {
    return 1;
  }

  let subPower = BinaryExponentiation(number, Math.floor(power / 2), modulo);
  let result = (subPower * subPower) % modulo;
  if (power % 2 != 0) {
    result = (result * number) % modulo;
  }

  return result;
}

function Hash(string, start, end) {
  let result = 0;

  for (let i = start; i < end; i++) {
    result = (result * maxChars + string.charCodeAt(i)) % l;
  }

  return result;
}

function Check(text, pattern, currIndex, occurrences) {
  let found = true;
  for (let i = 0; i < pattern.length; i++) {
    if (text[currIndex + i] != pattern[i]) {
      found = false;
      break;
    }
  }
  if (found == true) {
    occurrences.push(new occurrence(currIndex, currIndex + pattern.length - 1));
  }
}

export default function RabinKarp(text, pattern) {
  let occurrences = [];
  let pLength = pattern.length;

  let patternHash = Hash(pattern, 0, pLength);
  let textHash = Hash(text, 0, pLength);

  if (patternHash == textHash) {
    Check(text, pattern, 0, occurrences);
  }
  let sPowMinus1 = BinaryExponentiation(maxChars, pLength - 1, l);
  for (let i = 1; i < text.length - pLength; i++) {
    textHash = (((textHash - ((text.charCodeAt(i - 1) * sPowMinus1) % l) + l) % l) * maxChars + text.charCodeAt(i + pLength - 1)) % l;

    if (patternHash == textHash) {
      Check(text, pattern, i, occurrences);
    }
  }

  return occurrences;
}
