import React, { useEffect, useRef } from 'react';
import { TableBody, TableRow } from '@mui/material';
import CustomTableCell from '../TableCell';
import { useSelector } from 'react-redux';
import { getFiltersColumn } from '../../../../store/filter/filter.selector';
import { getCompaniesData, getCompaniesTableHeader, getCompaniesTotal } from '../../../../store/companies/companies.selectors';

interface IProps {
    columnsWidth: { [key: string]: any };
}

const TableRows: React.FC<IProps> = ({ columnsWidth }) => {
    const tableBodyRef = useRef<HTMLTableSectionElement>(null);
    const totalItems = useSelector(getCompaniesTotal);
    const tableHeader = useSelector(getCompaniesTableHeader);
    const filteredColumns = useSelector(getFiltersColumn);
    const data = useSelector(getCompaniesData);

    useEffect(() => {
        tableBodyRef.current?.scrollIntoView();
    }, [totalItems]);
    return (
        <TableBody ref={tableBodyRef}>
            {data.map((row) => {
                const hash = `${row.name}-${row.uuid}`;
                return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={`key-row-${hash}`}>
                        {tableHeader.map((column) => {
                            const isVisible = filteredColumns?.[column.label]?.isVisible;
                            return (
                                isVisible && <CustomTableCell row={row} key={`row-${hash}-${column.id}`} width={columnsWidth[column.id]} title={column.id} />
                            );
                        })}
                    </TableRow>
                );
            })}
        </TableBody>
    );
};

export default React.memo(TableRows);
