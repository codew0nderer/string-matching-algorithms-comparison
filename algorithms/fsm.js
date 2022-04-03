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

function Engine(state, tChar, pattern, pi) {
  let m = pattern.length;

  if (state < m && pattern[state] == tChar) {
    state++;
  } else if (state == 0 && pattern[state] != tChar) {
    state = 0;
  } else {
    state = Engine(pi[state - 1], tChar, pattern, pi);
  }

  return state;
}

function PrecomputeStateTable(pattern) {
  const maxChars = 256;
  let pi = PrecomputePi(pattern);
  let states = pattern.length;
  let stateTable = new Array(maxChars);

  for (let i = 0; i < maxChars; i++) {
    stateTable[i] = new Array(states);
    let tChar = String.fromCharCode(i);

    for (let state = 0; state < states; state++) {
      stateTable[i][state] = Engine(state, tChar, pattern, pi);
    }
  }

  return stateTable;
}

export default function Fsm(text, pattern) {
  let occurrences = [];
  let m = pattern.length;
  let stateTable = PrecomputeStateTable(pattern);
  let state = 0;

  for (let i = 0; i < text.length; i++) {
    let charAscii = text.charCodeAt(i);
    state = stateTable[charAscii][state];
    if (state == m) {
      occurrences.push(new occurrence(i - m + 1, i));
      state = 0;
    }
  }

  return occurrences;
}
