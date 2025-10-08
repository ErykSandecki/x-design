// types
import { AnchorResize } from 'store/pageBuilder/enums';

// utils
import { getCorrectAnchor } from '../getCorrectAnchor';

const baseCoordinates = { x1: 0, x2: 100, y1: 0, y2: 100 };
const mouseCoordinates = { x: 200, y: 100 };

describe('getCorrectAnchor{east}', () => {
  it(`should return default anchor`, () => {
    // before
    const result = getCorrectAnchor(AnchorResize.east, baseCoordinates, mouseCoordinates);

    // result
    expect(result).toBe(AnchorResize.east);
  });

  it(`should return south anchor`, () => {
    // before
    const result = getCorrectAnchor(AnchorResize.east, baseCoordinates, { x: -150, y: 150 });

    // result
    expect(result).toBe(AnchorResize.west);
  });
});

describe('getCorrectAnchor{north}', () => {
  it(`should return default anchor`, () => {
    // before
    const result = getCorrectAnchor(AnchorResize.north, baseCoordinates, mouseCoordinates);

    // result
    expect(result).toBe(AnchorResize.north);
  });

  it(`should return south anchor`, () => {
    // before
    const result = getCorrectAnchor(AnchorResize.north, baseCoordinates, { x: 150, y: 150 });

    // result
    expect(result).toBe(AnchorResize.south);
  });
});

describe('getCorrectAnchor{south}', () => {
  it(`should return default anchor`, () => {
    // before
    const result = getCorrectAnchor(AnchorResize.south, baseCoordinates, { ...mouseCoordinates, y: 150 });

    // result
    expect(result).toBe(AnchorResize.south);
  });

  it(`should return north anchor`, () => {
    // before
    const result = getCorrectAnchor(AnchorResize.south, baseCoordinates, { x: 150, y: -150 });

    // result
    expect(result).toBe(AnchorResize.north);
  });
});

describe('getCorrectAnchor{northEast}', () => {
  it(`should return default anchor`, () => {
    // before
    const result = getCorrectAnchor(AnchorResize.northEast, baseCoordinates, mouseCoordinates);

    // result
    expect(result).toBe(AnchorResize.northEast);
  });

  it(`should return south west anchor`, () => {
    // before
    const result = getCorrectAnchor(AnchorResize.northEast, baseCoordinates, { x: -150, y: 150 });

    // result
    expect(result).toBe(AnchorResize.southWest);
  });

  it(`should return north west anchor`, () => {
    // before
    const result = getCorrectAnchor(AnchorResize.northEast, baseCoordinates, { x: -150, y: 100 });

    // result
    expect(result).toBe(AnchorResize.northWest);
  });

  it(`should return south east anchor`, () => {
    // before
    const result = getCorrectAnchor(AnchorResize.northEast, baseCoordinates, { x: 200, y: 150 });

    // result
    expect(result).toBe(AnchorResize.southEast);
  });
});

describe('getCorrectAnchor{west}', () => {
  it(`should return default anchor`, () => {
    // before
    const result = getCorrectAnchor(AnchorResize.west, baseCoordinates, { x: -150, y: 150 });

    // result
    expect(result).toBe(AnchorResize.west);
  });

  it(`should return south anchor`, () => {
    // before
    const result = getCorrectAnchor(AnchorResize.west, baseCoordinates, mouseCoordinates);

    // result
    expect(result).toBe(AnchorResize.east);
  });
});

describe('getCorrectAnchor{northWest}', () => {
  it(`should return default anchor`, () => {
    // before
    const result = getCorrectAnchor(AnchorResize.northWest, baseCoordinates, { x: -150, y: 100 });

    // result
    expect(result).toBe(AnchorResize.northWest);
  });

  it(`should return default south east`, () => {
    // before
    const result = getCorrectAnchor(AnchorResize.northWest, baseCoordinates, { x: 200, y: 150 });

    // result
    expect(result).toBe(AnchorResize.southEast);
  });

  it(`should return default north east`, () => {
    // before
    const result = getCorrectAnchor(AnchorResize.northWest, baseCoordinates, { x: 150, y: 100 });

    // result
    expect(result).toBe(AnchorResize.northEast);
  });

  it(`should return default south east`, () => {
    // before
    const result = getCorrectAnchor(AnchorResize.northWest, baseCoordinates, { x: -150, y: 150 });

    // result
    expect(result).toBe(AnchorResize.southEast);
  });
});

describe('getCorrectAnchor{southWest}', () => {
  it(`should return default anchor`, () => {
    // before
    const result = getCorrectAnchor(AnchorResize.southEast, baseCoordinates, mouseCoordinates);

    // result
    expect(result).toBe(AnchorResize.southEast);
  });

  it(`should return default north west`, () => {
    // before
    const result = getCorrectAnchor(AnchorResize.southEast, baseCoordinates, { x: -150, y: -150 });

    // result
    expect(result).toBe(AnchorResize.northWest);
  });

  it(`should return default south west`, () => {
    // before
    const result = getCorrectAnchor(AnchorResize.southEast, baseCoordinates, { x: -150, y: 100 });

    // result
    expect(result).toBe(AnchorResize.southWest);
  });

  it(`should return default north east`, () => {
    // before
    const result = getCorrectAnchor(AnchorResize.southEast, baseCoordinates, { x: 200, y: -150 });

    // result
    expect(result).toBe(AnchorResize.northEast);
  });
});

describe('getCorrectAnchor{southWest}', () => {
  it(`should return default anchor`, () => {
    // before
    const result = getCorrectAnchor(AnchorResize.southWest, baseCoordinates, { x: -150, y: 100 });

    // result
    expect(result).toBe(AnchorResize.southWest);
  });

  it(`should return default north east`, () => {
    // before
    const result = getCorrectAnchor(AnchorResize.southWest, baseCoordinates, { x: 200, y: -150 });

    // result
    expect(result).toBe(AnchorResize.northEast);
  });

  it(`should return default south east`, () => {
    // before
    const result = getCorrectAnchor(AnchorResize.southWest, baseCoordinates, { x: 200, y: 100 });

    // result
    expect(result).toBe(AnchorResize.southEast);
  });

  it(`should return default north west`, () => {
    // before
    const result = getCorrectAnchor(AnchorResize.southWest, baseCoordinates, { x: 100, y: -150 });

    // result
    expect(result).toBe(AnchorResize.northWest);
  });
});
