/**
 * Simulates network delay for API calls
 * @param ms - Delay in milliseconds (default: 500-1500ms random)
 */
export async function mockDelay(ms?: number): Promise<void> {
  const delay = ms ?? Math.floor(Math.random() * 1000) + 500;
  return new Promise((resolve) => setTimeout(resolve, delay));
}
