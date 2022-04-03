import BruteForce from './algorithms/bruteForce.js';
import Sunday from './algorithms/sunday.js';
import RabinKarp from './algorithms/rabinKarp.js';
import Fsm from './algorithms/fsm.js';
import Kmp from './algorithms/kmp.js';
import { CalculateTime } from './modules/helper.js';
import fs from 'fs';

const repetition = 100;
const text = fs.readFileSync('book.txt', 'utf8');
const initialTextLength = 1000;
const maxTextLength = text.length;

let csvFileContentSmall = '"text size","bruteForce","sunday","rabinKarp","fsm","kmp"\n';
let csvFileContentLarge = '"text size","bruteForce","sunday","rabinKarp","fsm","kmp"\n';

let smallPattern = 'Frodo';
let largePattern =
  "That was Gandalf 's mark, of course, and the old man was Gandalf the Wizard, whose fame in the Shire was due mainly to his skill with fires, smokes, and lights. His real business was far more difficult and dangerous, but the Shire-folk knew nothing about it. To them he was just one of the 'attractions' at the Party.";

var textLength = initialTextLength;
while (textLength < maxTextLength) {
  const currentText = text.slice(0, textLength);
  let timeBruteForceSmall = 0;
  let timeSundaySmall = 0;
  let timeRabinKarpSmall = 0;
  let timeFsmSmall = 0;
  let timeKmpSmall = 0;
  let timeBruteForceLarge = 0;
  let timeSundayLarge = 0;
  let timeRabinKarpLarge = 0;
  let timeFsmLarge = 0;
  let timeKmpLarge = 0;

  for (let i = 0; i < repetition; i++) {
    timeBruteForceSmall += CalculateTime(currentText, smallPattern, BruteForce);
    timeSundaySmall += CalculateTime(currentText, smallPattern, Sunday);
    timeRabinKarpSmall += CalculateTime(currentText, smallPattern, RabinKarp);
    timeFsmSmall += CalculateTime(currentText, smallPattern, Fsm);
    timeKmpSmall += CalculateTime(currentText, smallPattern, Kmp);

    timeBruteForceLarge += CalculateTime(currentText, largePattern, BruteForce);
    timeSundayLarge += CalculateTime(currentText, largePattern, Sunday);
    timeRabinKarpLarge += CalculateTime(currentText, largePattern, RabinKarp);
    timeFsmLarge += CalculateTime(currentText, largePattern, Fsm);
    timeKmpLarge += CalculateTime(currentText, largePattern, Kmp);
  }

  let resultBruteForceSmall = timeBruteForceSmall / repetition;
  let resultSundaySmall = timeSundaySmall / repetition;
  let resultRabinKarpSmall = timeRabinKarpSmall / repetition;
  let resultFsmSmall = timeFsmSmall / repetition;
  let resultKmpSmall = timeKmpSmall / repetition;

  let resultBruteForceLarge = timeBruteForceLarge / repetition;
  let resultSundayLarge = timeSundayLarge / repetition;
  let resultRabinKarpLarge = timeRabinKarpLarge / repetition;
  let resultFsmLarge = timeFsmLarge / repetition;
  let resultKmpLarge = timeKmpLarge / repetition;

  csvFileContentSmall += `${textLength}, ${resultBruteForceSmall}, ${resultSundaySmall}, ${resultRabinKarpSmall}, ${resultFsmSmall}, ${resultKmpSmall}\n`;
  csvFileContentLarge += `${textLength}, ${resultBruteForceLarge}, ${resultSundayLarge}, ${resultRabinKarpLarge}, ${resultFsmLarge}, ${resultKmpLarge}\n`;

  if (textLength >= 10000) {
    textLength += 2000;
  } else if (textLength >= 2000) {
    textLength += 500;
  } else {
    textLength += 100;
  }
}

fs.writeFileSync('task1_resultsSmall.csv', csvFileContentSmall, { flag: 'w+' });
fs.writeFileSync('task1_resultsLarge.csv', csvFileContentLarge, { flag: 'w+' });

console.log('Done!');
