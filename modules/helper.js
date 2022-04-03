import { performance } from 'perf_hooks';

function CalculateTime(string, pattern, strMatchingAlgorithmFn) {
  let start = performance.now();
  strMatchingAlgorithmFn(string, pattern);
  let end = performance.now();

  return end - start;
}

function RandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

export { CalculateTime, RandomInt as randomInt };
