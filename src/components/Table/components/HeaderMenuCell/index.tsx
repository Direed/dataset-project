import React, { useCallback, useEffect, useRef } from 'react';
import { Typography } from '@mui/material';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { useStyles } from './style';
import { headerFilters } from './headerFilters';
import { useDispatch, useSelector } from 'react-redux';
import { requestData, sortTable } from '../../../../store/companies/companies.actions';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { getSortedTable } from '../../../../store/companies/companies.selectors';
import { SortOrder } from '../../../../enums';
import { useLazyTableQuery } from '../../../../hooks/useLazyTableQuery';
import { cellNameTypes } from '../../../../constants/CellNameTypes';
import { Tooltip } from '@material-ui/core';

interface IProps {
    title: string;
    setMinWidth?: React.Dispatch<React.SetStateAction<{}>>;
    minWidth?: number;
}

const HeaderMenuCell: React.FC<IProps> = ({ minWidth, setMinWidth, title }) => {
    const itemRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (itemRef && itemRef.current && setMinWidth && !minWidth) {
            setMinWidth((prev) => ({
                ...prev,
                [title]: itemRef.current?.clientWidth ? itemRef.current?.clientWidth + 25 : 150,
            }));
        }
    }, [itemRef, itemRef.current]);
    const classes = useStyles();
    const filter = headerFilters.get(title);
    const dispatch = useDispatch();
    const tableSortArrows = useSelector(getSortedTable);
    const { getTableData } = useLazyTableQuery();
    const onSortedOrder = useCallback((): void => {
        dispatch(sortTable(title));
        dispatch(
            requestData({
                getTableData,
            })
        );
    }, [title]);

    return (
        <>
            <div
                onClick={onSortedOrder}
                className={`${classes.noselect} ${classes.contentWrapper} ${title === 'name' || title === 'checkbox' ? classes.sticky : ''} ${
                    title === 'checkbox' ? classes.checkbox : null
                } ${title === 'name' ? classes.name : null}`}
            >
                {filter && (
                    <div className={classes.iconWrapper}>
                        <FormatListBulletedIcon className={classes.leftIcon} />
                    </div>
                )}
                <Typography className={classes.title}>{cellNameTypes[title].title}</Typography>
                {cellNameTypes[title].tooltip && (
                    <Tooltip title={cellNameTypes[title].tooltip}>
                        <InfoOutlinedIcon fontSize="small" className={classes.infoIcon} />
                    </Tooltip>
                )}
                {tableSortArrows.title === title && tableSortArrows.sort === SortOrder.ASC && <ArrowDownwardIcon fontSize="small" />}
                {tableSortArrows.title === title && tableSortArrows.sort === SortOrder.DESC && <ArrowUpwardIcon fontSize="small" />}
                {tableSortArrows.title !== title && <ArrowUpwardIcon fontSize="small" className={classes.unactiveArrow} />}
            </div>
        </>
    );
};

export default React.memo(HeaderMenuCell);
