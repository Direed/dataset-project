import { localStorageType } from '../../enums/localStorage';
import { cellNameTypes } from '../CellNameTypes';

let localStorageDefaultColumns: string[] = [];

try {
    localStorageDefaultColumns = JSON.parse(String(localStorage.getItem(localStorageType.COLUMNS))) || [];
} catch (e: any) {
    console.warn(e);
}

export const defaultColumns = localStorageDefaultColumns.length
    ? localStorageDefaultColumns
    : Object.entries(cellNameTypes)
          .filter((item) => item[1].defaultColumn)
          .map((title) => title[0]);
