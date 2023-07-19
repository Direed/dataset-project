export const toUSD = (title: number): string =>
    Number(title).toLocaleString('en', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
    });
const returnedUSDNumber = (number: number, preffix: string): string =>
    '$' + (Number.isInteger(+number.toFixed(1)) ? Math.trunc(number) : number.toFixed(1)) + preffix;

export const toMillionFormatter = (num: number): string => (num >= 1000000 ? returnedUSDNumber(num / 1000000, 'M') : '$' + num);

export const shortenLongNumber = (num: number): string => {
    if (num >= 1000000000) {
        return returnedUSDNumber(num / 1000000000, 'B');
    }
    if (num >= 1000000) {
        return returnedUSDNumber(num / 1000000, 'M');
    }
    if (num >= 1000) {
        return returnedUSDNumber(num / 1000, 'K');
    }
    return '$' + num;
};
