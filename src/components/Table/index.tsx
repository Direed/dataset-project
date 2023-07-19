import React, { useCallback, useEffect, useRef, useState } from 'react';
import { LinearProgress, Paper, Table, TableContainer, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {
    getCompaniesData,
    getCompaniesPage,
    getInfinityLoading,
    getIsLoading,
    getNeedHeaderSorting,
    getNeedResetResize,
    getIsLoadMore,
} from '../../store/companies/companies.selectors';
import { getFiltersColumn } from '../../store/filter/filter.selector';
import { showOtherColumns } from '../../store/filter/filter.actions';
import InfiniteScroll from 'react-infinite-scroll-component';
import TableHeader from './components/TableHeader';
import { changeSourceColumn, closeStatusResize, getCountryCodes, requestData, requestDataSuccess } from '../../store/companies/companies.actions';
import TableRows from './components/TableRows';
import { useStyles } from './styles';
import { useLazyTableQuery } from '../../hooks/useLazyTableQuery';
import { rowsCount } from '../../constants/table/rows';

const CustomTable: React.FC = () => {
    const [minWidth, setMinWidth] = useState({});
    const classes = useStyles();
    const [columnsWidth, setColumnsWidth] = useState({});
    const needResetResize = useSelector(getNeedResetResize);
    const isLoading = useSelector(getIsLoading);
    const currentPage = useSelector(getCompaniesPage);
    const isLoadMore = useSelector(getIsLoadMore);
    const loading = useSelector(getIsLoading);
    const afinityLoading = useSelector(getInfinityLoading);
    const filteredColumns = useSelector(getFiltersColumn);
    const data = useSelector(getCompaniesData);
    const dispatch = useDispatch();
    const needSortingHead = useSelector(getNeedHeaderSorting);
    const page = useSelector(getCompaniesPage);
    const tableContainerRef = useRef<HTMLDivElement>(null);

    const { getTableData } = useLazyTableQuery();

    useEffect(() => {
        dispatch(getCountryCodes());
    }, []);

    useEffect(() => {
        if (page === 1 && tableContainerRef.current) {
            tableContainerRef.current.scrollTo(0, 0);
        }
    }, [page]);

    useEffect(() => {
        if (needResetResize) {
            setColumnsWidth({});
            dispatch(closeStatusResize());
        }
    }, [needResetResize]);
    useEffect(() => {
        dispatch(
            requestData({
                getTableData,
            })
        );
    }, []);
    useEffect(() => {
        if (Object.keys(filteredColumns).length && needSortingHead) {
            dispatch(showOtherColumns());
            dispatch(changeSourceColumn(false));
        }
    }, [needSortingHead]);
    const loadMore = useCallback(() => {
        if (data.length) {
            dispatch(
                requestData({
                    getTableData: (props) => {
                        getTableData({
                            ...props,
                            onCompleted: (response) => {
                                dispatch(
                                    requestDataSuccess(
                                        response.organisations.map((organisation) => {
                                            const updatedOrganisation = { ...organisation, ...organisation.metrics };
                                            delete updatedOrganisation.metrics;
                                            return updatedOrganisation;
                                        }),
                                        currentPage + 1,
                                        response?.total || response.organisations.length,
                                        !!response.organisations.length
                                    )
                                );
                            },
                        });
                    },
                    page: currentPage + 1,
                })
            );
        }
    }, [currentPage, data, getTableData]);
    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <InfiniteScroll
                loader={null}
                dataLength={data.length}
                next={loadMore}
                hasMore={isLoadMore && data.length >= rowsCount}
                scrollableTarget="scrollableDiv"
                className={classes.infinityWrapper}
                style={{ position: 'relative' }}
            >
                {(loading || afinityLoading) && (
                    <div className={classes.loading}>
                        <LinearProgress color="secondary" />
                    </div>
                )}
                <TableContainer ref={tableContainerRef} id="scrollableDiv" style={{ maxHeight: 'calc(100vh - 170px)', overflow: 'auto' }}>
                    <Table aria-label="sticky table" stickyHeader>
                        <TableHeader minWidth={minWidth} columnsWidth={columnsWidth} setColumnsWidth={setColumnsWidth} setMinWidth={setMinWidth} />
                        <TableRows columnsWidth={columnsWidth} />
                    </Table>
                </TableContainer>
            </InfiniteScroll>
            {!data.length && !isLoading && (
                <Typography align="center" variant="h2">
                    Empty Data
                </Typography>
            )}
        </Paper>
    );
};
export default React.memo(CustomTable);
