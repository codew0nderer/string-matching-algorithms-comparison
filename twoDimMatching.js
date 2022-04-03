import rabinKarp from './algorithms/rabinKarp2d.js';

const matrixWidth = 10;
const matrixHeight = 10;
let matrix = [];

for (let i = 0; i < matrixHeight; i++) {
    let number = i + 1;
    matrix[i] = [];
    const row = matrix[i];

    for (let j = 0; j < matrixWidth; j++) {
        row.push(number++);
    }
}

let pattern = [];
// Setting pattern to be the top right corner 3x3 sub matrix
for (let i = 0; i < 3; i++) {
    pattern.push(matrix[i].slice(7, 10));
}
// let pattern = [
//     [10, 11, 12, 13],
//     [11, 12, 13, 14],
//     [12, 13, 14, 15],
// ];

// let pattern = [
//     [14, 15, 16, 17],
//     [15, 16, 17, 18],
//     [16, 17, 18, 19],
// ];

// let pattern = [
//     [1, 2, 3, 4],
//     [2, 3, 4, 5],
//     [3, 4, 5, 6],
// ];

console.table(matrix);
console.table(pattern);
let occurrences = rabinKarp(matrix, pattern);

console.log(occurrences);
console.log('Done!');
