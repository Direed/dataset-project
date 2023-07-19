import React, { useCallback, useMemo } from 'react';
import { List, ListItemButton, ListItemText } from '@mui/material';
import { useSelector } from 'react-redux';
import { getCompaniesData, getCompaniesTableHeader, getDataForExport } from '../../../../store/companies/companies.selectors';
import ReactExport from 'react-data-export';
import { CSVLink } from 'react-csv';
import { useStyles } from './style';
import { getFiltersColumn } from '../../../../store/filter/filter.selector';
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;
import { CellNameType } from '../../../../enums/cellNameType';
import moment from 'moment';
import { mappingFundingRounds } from '../../../../constants/table/fundingRounds';
import { cellNameTypes } from '../../../../constants/CellNameTypes';
import { toUSD } from '../../../../utils/numberFormatted';

const ExportMenuDropdown: React.FC = () => {
    const exportData = useSelector(getDataForExport);
    const tableHeader = useSelector(getCompaniesTableHeader);
    const filteredColumns = useSelector(getFiltersColumn);
    const data = useSelector(getCompaniesData);
    const classes = useStyles();

    const updatedHeaders = useMemo(
        () => tableHeader.filter((item) => filteredColumns[item.id].isVisible && item.id !== CellNameType.CHECKBOX),
        [tableHeader, filteredColumns]
    );
    const headersCSV = useMemo(() => updatedHeaders.map((item) => ({ label: cellNameTypes[item.id].title, key: item.id })), [updatedHeaders]);
    const textArray = useCallback((value) => {
        return value
            ? value.split(' ').map((item) => {
                  if (/[[\]{}'"]/.test(item)) {
                      return item.replaceAll(/[[\]{}''""]+/g, '') + ' ';
                  }
                  if (item.includes(',')) {
                      return item.replaceAll(',', ', ') + ' ';
                  }
                  return item + ' ';
              })
            : '';
    }, []);

    const updateValue = useCallback((title, columnValue) => {
        const value = textArray(columnValue);
        switch (title) {
            case CellNameType.FOUNDED_AT:
                return value[0] ? moment(value[0].trim()).format('YYYY-MM-DD') : value;
            case CellNameType.UPDATED_AT:
            case CellNameType.LAST_FUNDING_DATE:
                return value[0] ? moment(value[0].trim()).format('YYYY-MM-DD HH:mm') : value;
            case CellNameType.TOTAL_FUNDING:
                return value[0] ? toUSD(value[0]) : value;
            case CellNameType.PROBABILITY_OF_SUCCESS:
                return value[0]
                    ? Number(value[0]).toLocaleString('en', {
                          style: 'percent',
                      })
                    : value;
            case CellNameType.FRACTION_FEMALE_FOUNDERS:
            case CellNameType.FRACTION_MALE_FOUNDERS:
            case CellNameType.FRACTION_FEMALE_EXECUTIVES:
            case CellNameType.FRACTION_MALE_EXECUTIVES:
            case CellNameType.FRACTION_BUSINESS_ROLES:
            case CellNameType.TEAM_FOUNDERS_IN_EXECUTIVES:
                return value[0]
                    ? Number(value[0]).toLocaleString('en', {
                          style: 'percent',
                      })
                    : value;
            case CellNameType.LAST_FUNDING_STAGE:
                return value[0] ? mappingFundingRounds[value[0].trim()] : value;
            case CellNameType.DEGREE_TYPE_NUMERIC_MEAN_EXECUTIVES:
            case CellNameType.DEGREE_TYPE_NUMERIC_MEAN_FOUNDERS:
                return value[0] ? Number(value[0]).toFixed(1) : value;
            default:
                return value[0] || value;
        }
    }, []);

    const fileName = useMemo(() => {
        return 'eagleeye-' + moment().format('YYYY-MM-DD-HH-mm');
    }, []);

    const exportTableData = useMemo(() => {
        const updatedData = data.filter((item) => exportData.find((column) => column.id === item.uuid));

        return updatedData.map((item) => {
            const updatedItem = {};
            Object.entries(item).forEach(([key, value]) => {
                updatedItem[key] = updateValue(key, value);
            });
            return updatedItem;
        });
    }, [exportData, data]);

    return (
        <List>
            <ListItemButton disabled={!exportData.length}>
                <ExcelFile filename={fileName} element={<ListItemText className={classes.button} primary="Export .xls" />}>
                    <ExcelSheet data={exportTableData} name="Data">
                        {updatedHeaders.map((item) => (
                            <ExcelColumn key={item.id} label={cellNameTypes[item.id].title} value={(col) => col[item.id]} />
                        ))}
                    </ExcelSheet>
                </ExcelFile>
            </ListItemButton>
            <ListItemButton disabled={!exportData.length}>
                <CSVLink className={classes.exportButton} filename={fileName} data={exportTableData} headers={headersCSV}>
                    <ListItemText className={classes.button} primary="Export .csv" />
                </CSVLink>
            </ListItemButton>
        </List>
    );
};

export default React.memo(ExportMenuDropdown);
