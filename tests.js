// This was used for debugging and testing edge cases...

import BruteForce from './algorithms/bruteForce.js';
import Sunday from './algorithms/sunday.js';
import RabinKarp from './algorithms/rabinKarp.js';
import Kmp from './algorithms/kmp.js';
import Fsm from './algorithms/fsm.js';
import { CalculateTime } from './modules/helper.js';
import fs from 'fs';

const maxTimes = 1;

const text = fs.readFileSync('test.txt', 'utf8');

let csvFileContent = '"bruteForce","sunday","rabinKarp","fsm","kmp"\n';

let pattern = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';

let timeBruteForce = 0;
let timeSunday = 0;
let timeRabinKarp = 0;
let timeFsm = 0;
let timeKmp = 0;

for (let i = 0; i < maxTimes; i++) {
  timeBruteForce += CalculateTime(text, pattern, BruteForce);
  timeSunday += CalculateTime(text, pattern, Sunday);
  timeRabinKarp += CalculateTime(text, pattern, RabinKarp);
  timeFsm += CalculateTime(text, pattern, Fsm);
  timeKmp += CalculateTime(text, pattern, Kmp);
}

let resultBruteForce = timeBruteForce / maxTimes;
let resultSunday = timeSunday / maxTimes;
let resultRabinKarp = timeRabinKarp / maxTimes;
let resultFsm = timeFsm / maxTimes;
let resultKmp = timeKmp / maxTimes;

csvFileContent += `${resultBruteForce}, ${resultSunday}, ${resultRabinKarp}, ${resultFsm}, ${resultKmp}\n`;

fs.writeFileSync('test_results.csv', csvFileContent, { flag: 'w+' });

console.log('Done!');
