function getPrimes(n) {
    const primes = [];
    const isPrime = new Array(n + 1).fill(true);
    isPrime[0] = false;
    isPrime[1] = false;

    for (let i = 2; i <= n; i++) {
        if (isPrime[i]) {
            primes.push(i);
            for (let j = i * i; j <= n; j += i) {
                isPrime[j] = false;
            }
        }
    }

    return primes;
}

let totalTime = 0;
const numRuns = 10;

for (let i = 0; i < numRuns; i++) {
    const t0 = performance.now();
    const primes = getPrimes(100000000);
    const t1 = performance.now();
    totalTime += t1 - t0;
}

const avgTime = totalTime / numRuns;
console.log(`Average runtime: ${avgTime} milliseconds`);