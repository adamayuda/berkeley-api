import { config, generateConfig } from '.';

let error = '';
let parsed: { PORT?: string; PORTS?: string } = {
  PORTS: '3000',
};

jest.mock('dotenv', () => {
  return {
    config: jest.fn(() => {
      return {
        error,
        parsed,
      };
    }),
  };
});

describe('generateConfig', () => {
  describe('generateConfig', () => {
    beforeEach(() => {
      error = '';
      parsed = {
        PORT: '3000',
      };
    });

    it('should throw an error', () => {
      error = 'error';

      expect(() => generateConfig()).toThrow("⚠️  Couldn't find .env file  ⚠️");
    });

    it('should throw an error', () => {
      parsed = {
        PORTS: '3000',
      };
      expect(() => generateConfig()).toThrow(
        '⚠️ "PORT" is required in .env file  ⚠️',
      );
    });
  });

  describe('config', () => {
    beforeEach(() => {
      error = '';
      parsed = {
        PORT: '3000',
      };
    });

    it('should be defined and correct', () => {
      generateConfig();
      expect(config).toEqual({
        PORT: '3000',
      });
    });

    it('should be defined', () => {
      generateConfig();
      expect(config).toBeDefined();
    });
  });
});
