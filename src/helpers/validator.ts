import validator from 'validator';

export const validateEmail = (email: string): boolean => {
    const isValid: boolean = validator.isEmail(email);
    return !isValid;
};

export const validateArray = (array: any): boolean => {
    const isValid: boolean = Array.isArray(array) && array.length > 0;
    return !isValid;
};

export const validateInteger = (number: string): boolean => {
    const isValid: boolean = validator.isInt(number);
    return !isValid;
};

export const validateNumeric = (number: string): boolean => {
    const isValid: boolean = validator.isNumeric(number);
    return !isValid;
};

export const validateNotEmptySpaces = (word: string): boolean => {
    const isValid: boolean = word.indexOf(' ') >= 0;
    return isValid;
};

export const validateEmpty = (word: string): boolean => {
    const isValid: boolean = validator.isEmpty(word, { ignore_whitespace: true });
    return isValid;
};