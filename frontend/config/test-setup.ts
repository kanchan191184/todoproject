import '@testing-library/jest-dom';
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

// wipe the DOM after each test
afterEach(() => {
  cleanup();
});