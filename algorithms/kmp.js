import occurrence from '../modules/occurrence.js';

function PrecomputePi(pattern) {
  let m = pattern.length;
  let pi = new Array(m);
  pi[0] = 0;
  let j = 0;
  let i = 1;

  while (i < m) {
    if (pattern[i] == pattern[j]) {
      j++;
      pi[i] = j;
      i++;
    } else {
      if (j > 0) {
        j = pi[j - 1];
      } else {
        pi[i] = 0;
        i++;
      }
    }
  }

  return pi;
}

function Engine(text, pattern, state, i, pi) {
  let m = pattern.length;

  if (state == m) {
    state = pi[state - 1];
  }

  if (text[i] == pattern[state]) {
    state++;
  } else {
    while (state > 0 && text[i] != pattern[state]) {
      state = pi[state - 1];
    }
    if (text[i] == pattern[state]) {
      state++;
    }
  }

  return state;
}

export default function Kmp(text, pattern) {
  let occurrences = [];
  let pi = PrecomputePi(pattern);
  let m = pattern.length;
  let state = 0;

  for (let i = 0; i < text.length; i++) {
    state = Engine(text, pattern, state, i, pi);
    if (state == m) {
      occurrences.push(new occurrence(i - m + 1, i));
    }
  }

  return occurrences;
}
