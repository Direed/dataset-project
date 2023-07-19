import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/Header';
import { CircularProgress, Grid, Paper } from '@mui/material';
import HeaderBlock from '../../components/HeaderBlock';
import { useStyles } from './style';
import GeneralBlock, { ColumnType } from '../../components/GeneralBlock';
import { DetailInfoType } from '../../enums/detailInfoType';

interface IParams {
    id: string;
}
const item = {
    name: 'Alex',
    Email: 'alex@gmail.com',
    Location: 'New York',
    industries: ' "Facebook", "Google", "Twitter" ',
};
const UserPage: React.FC = () => {
    const params: IParams = useParams();
    const classes = useStyles();
    const name = params?.id;
    const columns: ColumnType[] = [
        { name: 'Email', type: DetailInfoType.TEXT, field: 'Email' },
        { name: 'Location', type: DetailInfoType.TEXT, field: 'Location' },
        { name: 'Industry', type: DetailInfoType.ARRAY, field: 'industries' },
    ];
    return (
        <div className={classes.container}>
            <Header />
            <Grid container>
                <Grid item xs={12}>
                    {name ? (
                        <>
                            <Paper elevation={2} className={classes.info}>
                                <HeaderBlock title={name} subtitle={''} />
                            </Paper>
                            <Paper elevation={2} className={classes.info}>
                                <GeneralBlock columns={columns} item={item} />
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

export default React.memo(UserPage);
