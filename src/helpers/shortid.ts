import { generate } from 'shortid';

export const generatedShortid = (): string => {
    const getId: string = generate();
    return getId;
};