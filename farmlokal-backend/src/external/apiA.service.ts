import axios from 'axios';
import {
  isCircuitOpen,
  recordFailure,
  recordSuccess,
} from '../utils/circuitBreaker';

export async function fetchExternalData() {
  if (isCircuitOpen()) {
    throw new Error('Circuit breaker is open');
  }

  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const response = await axios.get(
        'https://jsonplaceholder.typicode.com/posts',
        { timeout: 2000 }
      );

      recordSuccess();
      return response.data;
    } catch (error) {
      recordFailure();
      await new Promise((resolve) =>
        setTimeout(resolve, 2 ** attempt * 100)
      );
    }
  }

  throw new Error('External API failed after retries');
}
