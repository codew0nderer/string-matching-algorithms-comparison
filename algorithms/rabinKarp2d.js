import coordinate from '../modules/coordinate.js';

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

function Check(matrix, pattern, rowIndex, columnIndex, occurrences) {
  let found = true;

  for (let i = 0; i < pattern.length; i++) {
    const mRow = matrix[rowIndex + i];
    const pRow = pattern[i];

    for (let j = 0; j < pRow.length; j++) {
      const mElement = mRow[columnIndex + j];
      const pElement = pRow[j];

      if (mElement != pElement) {
        found = false;
        break;
      }
    }
  }

  if (found == true) {
    occurrences.push(new coordinate(rowIndex, columnIndex));
  }
}

function MatrixHash(matrix, rowIndex, columnIndex, width, height, columnsHash = []) {
  let matrixHash = 0;

  for (let j = columnIndex; j < width; j++) {
    let columnHash = 0;

    for (let i = rowIndex; i < height; i++) {
      columnHash = (((columnHash * maxChars) % l) + matrix[i][j].toString().charCodeAt(0)) % l;
    }

    matrixHash = (((matrixHash * maxChars) % l) + columnHash) % l;
    columnsHash[j] = columnHash;
  }

  return matrixHash;
}

export default function RabinKarp(matrix, pattern) {
  let coordinates = [];
  let pHeigth = pattern.length;
  let pWidth = pattern[0].length;
  let mHeigth = matrix.length;
  let mWidth = matrix[0].length;
  let columnsHash = new Array(mWidth);

  let pHash = MatrixHash(pattern, 0, 0, pWidth, pHeigth);
  let mHash = MatrixHash(matrix, 0, 0, pWidth, pHeigth, columnsHash);

  if (pHash == mHash) {
    Check(matrix, pattern, 0, 0, coordinates);
  }

  let sPowMinusColumn = BinaryExponentiation(maxChars, pHeigth - 1, l);
  let sPowMinusMatrix = BinaryExponentiation(maxChars, pWidth - 1, l);
  for (let i = 0; i <= mHeigth - pHeigth; i++) {
    // No need to start from 0 for the first level as the hash was already calculated for the initial comparison window
    let columnStart = i == 0 ? 1 : 0;

    for (let j = columnStart; j <= mWidth - pWidth; j++) {
      if (i == 0) {
        // We perform recalculation for each new column in comparison windows of the first level.
        let newColumnHash = 0;

        // For each new column we go through it's element from z = i = 0 till z < pHeight can also
        // Be pHeight + i but since i = 0 all the time in this case it can be omitted
        for (let z = i; z < pHeigth; z++) {
          // j + pWidth - 1 as j is the current column index of the comparison window
          newColumnHash = (((newColumnHash * maxChars) % l) + matrix[z][j + pWidth - 1].toString().charCodeAt(0)) % l;
        }

        columnsHash[j + pWidth - 1] = newColumnHash; // We add the new columnHash to the array of columns hashes
        mHash = (((((mHash - ((columnsHash[j - 1] * sPowMinusMatrix) % l) + l) % l) * maxChars) % l) + newColumnHash) % l;
      } else if (j == 0) {
        // This if statement happens when we are on a level > 1st -> when we just jump to the next line j = 0
        // We calculate the hash of the column by substracting the first element from previous column hash
        // and adding the new element

        // We recalculate the hash of all the columns of the first comparison window in the new level from the previous level columnsHash.
        // Along with the overall hash sub-matrixHash
        mHash = 0;
        for (let x = j; x < pWidth; x++) {
          let newColumnHash = columnsHash[x];
          let valToSubstract = matrix[i - 1][x].toString().charCodeAt(0);
          let valToAdd = matrix[i + pHeigth - 1][x].toString().charCodeAt(0);

          newColumnHash = (((((newColumnHash - ((valToSubstract * sPowMinusColumn) % l) + l) % l) * maxChars) % l) + valToAdd) % l;

          // We add each newColumnHash to the overall sub-matrixHash
          mHash = (((mHash * maxChars) % l) + newColumnHash) % l;
          columnsHash[x] = newColumnHash;
        }
      } else {
        // We perform hash recalculation of new columns in the levels > 1 based on the hash of columns in the previous level.
        let newColumnHash = columnsHash[j + pWidth - 1];
        let valToSubstract = matrix[i - 1][j + pWidth - 1].toString().charCodeAt(0);
        let valToAdd = matrix[i + pHeigth - 1][j + pWidth - 1].toString().charCodeAt(0);

        newColumnHash = (((((newColumnHash - ((valToSubstract * sPowMinusColumn) % l) + l) % l) * maxChars) % l) + valToAdd) % l;

        // We update the hash of the sub-matrix
        mHash = (((((mHash - ((columnsHash[j - 1] * sPowMinusMatrix) % l) + l) % l) * maxChars) % l) + newColumnHash) % l;
        columnsHash[j + pWidth - 1] = newColumnHash; // We update the columnsHash array with the new columnHash
      }

      if (pHash == mHash) {
        Check(matrix, pattern, i, j, coordinates);
      }
    }
  }

  return coordinates;
}
