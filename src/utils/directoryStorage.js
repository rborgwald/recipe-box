import { Platform } from 'react-native';
const RNFS = require('react-native-fs');

export const getPathOnly = (recipeId: string) => {
  const prefix = Platform.OS === 'ios' ? '' : 'file://';
  return `${prefix}${RNFS.DocumentDirectoryPath}/recipebox/${recipeId}`;
};


export const getPathWithFilename = (recipeId: string, filename: string) => {
  const prefix = Platform.OS === 'ios' ? '' : 'file://';
  return `${prefix}${RNFS.DocumentDirectoryPath}/recipebox/${recipeId}/${filename}`;
};
