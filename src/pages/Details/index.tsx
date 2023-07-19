import { FC, memo, useEffect } from 'react';
import { useStyles } from './style';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentItem } from '../../store/companies/companies.actions';
import { CircularProgress, Grid, Paper } from '@mui/material';
import { getCompaniesData, getCurrentItem } from '../../store/companies/companies.selectors';
import SchemasBlock from './components/SchemasBlock';
import Header from '../../components/Header';

import HeaderBlock from '../../components/HeaderBlock';
import { DetailInfoType } from '../../enums/detailInfoType';
import GeneralBlock, { ColumnType } from '../../components/GeneralBlock';

// Detail company page
const Details: FC = () => {
    const classes = useStyles();
    const params = useParams<{ companyName: string }>();
    const data = useSelector(getCompaniesData);
    const dispatch = useDispatch();
    useEffect(() => {
        if (params?.companyName && data) {
            dispatch(setCurrentItem(params?.companyName));
        }
    }, [params, data]);
    const columns: ColumnType[] = [
        { name: 'People', type: DetailInfoType.ARRAY, field: 'all_investors' },
        { name: 'Communication Channel', type: DetailInfoType.LINKS, fields: ['linkedin', 'twitter'] },
        { name: 'source', type: DetailInfoType.TEXT, field: 'source' },
        { name: 'Description', type: DetailInfoType.TEXT, field: 'description' },
        { name: 'Email', type: DetailInfoType.TEXT, field: 'Email' },
        { name: 'Location', type: DetailInfoType.CHIP, field: 'Location' },
        { name: 'Industry', type: DetailInfoType.ARRAY, field: 'industries' },
        { name: 'Year Founded', type: DetailInfoType.TEXT, field: 'founding_year' },
        { name: 'Number of Employees', type: DetailInfoType.TEXT, field: 'number_of_employees_cb' },
    ];
    const currentItem = useSelector(getCurrentItem);
    return (
        <div className={classes.container}>
            <Header />
            <Grid container>
                <Grid item xs={12}>
                    {currentItem?.name ? (
                        <>
                            <Paper elevation={2} className={classes.info}>
                                <HeaderBlock title={currentItem?.name} subtitle={currentItem?.website} />
                            </Paper>
                            <Paper elevation={2} className={classes.info}>
                                <GeneralBlock columns={columns} item={currentItem} />
                            </Paper>
                            <Paper elevation={2} className={classes.schemas}>
                                <SchemasBlock />
                            </Paper>
                        </>
                    ) : (
                        <div className={classes.loader}>
                            <CircularProgress color="secondary" />
                        </div>
                    )}
                </Grid>
            </Grid>
        </div>
    );
};

export default memo(Details);
