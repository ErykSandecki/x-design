import uniqid from 'uniqid';

export const generateID = (): string => uniqid('', `${new Date().getTime()}`);
