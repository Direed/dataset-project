import { TableCell } from '@mui/material';
import React, { useCallback, useMemo } from 'react';

import { useStyles } from './style';

import { CellNameType } from '../../../../enums/cellNameType';
import { getCountryCodesData, getGlobalSearch } from '../../../../store/companies/companies.selectors';
import { useSelector } from 'react-redux';
import { ICompany } from '../../../../store/companies/companies.types';
import { tableCellPadding, titlePadding } from '../../../../constants/table/tableSpacing';
import { cellNameTypes } from '../../../../constants/CellNameTypes';
interface IProps {
    width: number;
    title: string;
    row: ICompany;
}
const CustomTableCell: React.FC<IProps> = ({ width, title, row }) => {
    const classes = useStyles();
    const columnId = row?.[title];
    const search = useSelector(getGlobalSearch);
    const countryCodes = useSelector(getCountryCodesData);
    const links = ['website', 'linkedin', 'twitter', 'affinity_url', 'app_store'];
    const isLink = (value: string): boolean => links.includes(value);
    const successColor = useCallback((value: number) => {
        let color = 'red';
        if (value > 0.363 && value < 0.716) {
            color = '#cdcd0b';
        } else if (value >= 0.716) {
            color = 'green';
        }
        return color;
    }, []);
    const textArray = useMemo(() => {
        return columnId
            ? columnId.split(' ').map((item) => {
                  if (item.startsWith('http')) {
                      return (
                          <a key={item} href={item} target="_blank" rel="noreferrer">
                              {item}{' '}
                          </a>
                      );
                  }
                  if (/[[\]{}'"]/.test(item)) {
                      return item.replaceAll(/[[\]{}''""]+/g, '') + ' ';
                  }
                  if (item.includes(',')) {
                      return item.replaceAll(',', ', ') + ' ';
                  }
                  return item + ' ';
              })
            : '';
    }, [columnId]);
    const renderCell = useMemo(() => {
        const maxWidth = width ? `${width - tableCellPadding + titlePadding}px` : '200px';
        const defaultMarkup = (
            <div style={{ maxWidth }} className={classes.cell}>
                {textArray}
            </div>
        );
        return (
            cellNameTypes[title].render?.({ id: row?.uuid, row, name: columnId, maxWidth, className: classes.cell, textArray, successColor, countryCodes }) ||
            defaultMarkup
        );
    }, [width]);
    return (
        <TableCell
            className={`${classes.tableCell} ${title === CellNameType.NAME || title === CellNameType.CHECKBOX ? classes.sticky : ''} ${
                search.length >= 3 && columnId.toLowerCase().includes(search.toLowerCase()) ? classes.highlighted : ''
            } ${title === CellNameType.NAME ? classes.stickyName : ''} ${title === CellNameType.CHECKBOX ? classes.checkbox : ''} ${
                isLink(title) ? classes.columnLink : ''
            }`}
        >
            {renderCell}
        </TableCell>
    );
};
export default React.memo(CustomTableCell);
