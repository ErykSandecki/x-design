import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';

// mocks
import './test/mocks';

Object.assign(global, { TextDecoder, TextEncoder });
