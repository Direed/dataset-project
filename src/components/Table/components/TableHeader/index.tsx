import React from 'react';
import { TableCell, TableHead, TableRow } from '@mui/material';
import HeaderMenuCell from '../HeaderMenuCell';
import { useDispatch, useSelector } from 'react-redux';
import { getCompaniesTableHeader } from '../../../../store/companies/companies.selectors';
import { getFiltersColumn } from '../../../../store/filter/filter.selector';
import { useStyles } from '../../styles';
import { changeTableHeaderOrder } from '../../../../store/companies/companies.actions';

import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import ResizeComponent from '../ResizableComponent';
import CheckboxCell from '../TableCell/CheckboxCell';

const SortableItem: any = SortableElement(TableCell);

interface IProps {
    columnsWidth: { [key: string]: number };
    setColumnsWidth: React.Dispatch<React.SetStateAction<{}>>;
    setMinWidth: React.Dispatch<React.SetStateAction<{}>>;
    minWidth: { [key: string]: number };
}

const TableHeader: React.FC<IProps> = ({ minWidth, columnsWidth, setColumnsWidth, setMinWidth }) => {
    const tableHeader = useSelector(getCompaniesTableHeader);
    const filteredColumns = useSelector(getFiltersColumn);
    const classes = useStyles();
    const dispatch = useDispatch();
    const shouldCancelStart = (e): boolean => {
        if (['svg', 'button', 'span'].indexOf(e.target.tagName.toLowerCase()) !== -1) {
            return true;
        }
        return false;
    };
    const SortableList: any = SortableContainer(({ children }) => {
        return <TableRow>{children}</TableRow>;
    });
    const onSortEnd = ({ oldIndex, newIndex }: { oldIndex: number; newIndex: number }): void => {
        dispatch(changeTableHeaderOrder({ source: { index: oldIndex }, destination: { index: newIndex } }));
    };
    let itemCount = -1;
    return (
        <TableHead className={classes.head}>
            <SortableList shouldCancelStart={shouldCancelStart} distance={1} axis="x" onSortEnd={onSortEnd}>
                {tableHeader.map((column, index) => {
                    const isVisible = filteredColumns?.[column.label]?.isVisible;
                    if (isVisible) {
                        itemCount += 1;
                    }
                    return (
                        isVisible &&
                        (column.id !== 'name' && column.id !== 'checkbox' && column.id !== 'id' && column.id !== 'website' ? (
                            <SortableItem index={index} key={column.id} className={`${classes.headerCell}`}>
                                <ResizeComponent
                                    index={itemCount}
                                    minWidth={minWidth[column.id]}
                                    width={columnsWidth[column.id]}
                                    setWidth={(width) => setColumnsWidth({ ...columnsWidth, [column.id]: width })}
                                >
                                    <HeaderMenuCell minWidth={minWidth[column.id]} title={column.label} setMinWidth={setMinWidth} />
                                </ResizeComponent>
                            </SortableItem>
                        ) : column.id === 'name' ? (
                            <TableCell key={column.id} className={`${classes.headerCell} ${classes.sticky} ${classes.stickyHeader} ${classes.stickyName}`}>
                                <HeaderMenuCell title={column.label} />
                            </TableCell>
                        ) : column.id === 'checkbox' ? (
                            <TableCell key={column.id} className={`${classes.headerCell} ${classes.sticky} ${classes.stickyHeader} ${classes.checkbox}`}>
                                <CheckboxCell isSelectedAll />
                            </TableCell>
                        ) : null)
                    );
                })}
            </SortableList>
        </TableHead>
    );
};
export default React.memo(TableHeader);
