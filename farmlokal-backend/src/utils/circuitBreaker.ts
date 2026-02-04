let failureCount = 0;
let circuitOpenUntil = 0;

const FAILURE_THRESHOLD = 3;
const RESET_TIMEOUT = 10000;

export function isCircuitOpen(): boolean {
  return Date.now() < circuitOpenUntil;
}

export function recordSuccess() {
  failureCount = 0;
}

export function recordFailure() {
  failureCount++;
  if (failureCount >= FAILURE_THRESHOLD) {
    circuitOpenUntil = Date.now() + RESET_TIMEOUT;
  }
}
