import { cellNameTypes } from '../../../../constants/CellNameTypes';

export const headerFilters = new Map();
Object.keys(cellNameTypes).forEach((item) => {
    if (cellNameTypes[item].defaultTableFilter)
        headerFilters.set(item, [
            ...cellNameTypes[item].defaultTableFilter.map((item) => ({
                type: item.type,
            })),
        ]);
});
