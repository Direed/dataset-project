import { ICell } from '../../store/companies/companies.types';
import { defaultColumns } from '../filterBar';
import { cellNameTypes } from '../CellNameTypes';

export const tableColumns = {};
export const tableHeaderColumns: ICell[] = [];
Object.keys(cellNameTypes).forEach((item, index) => {
    tableColumns[item] = { isVisible: defaultColumns.includes(item), order: index };
    tableHeaderColumns.push({ id: item, label: item });
});
