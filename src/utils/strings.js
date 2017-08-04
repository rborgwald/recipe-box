// @flow

export const capitalize = (word: string): string =>
  word.charAt(0).toUpperCase() + word.slice(1);

export const capitalizeWords = (words: string): string =>
  words.toLowerCase().split(' ').map(capitalize).join(' ');
