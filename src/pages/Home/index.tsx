import React from 'react';
import CustomTable from '../../components/Table';
import { useStyles } from './style';
import Header from '../../components/Header';
import HeaderMenu from './components/HeaderMenu';
//Main page, showing table and filters
const HomePage: React.FC = () => {
    const classes = useStyles();
    return (
        <div className={classes.container}>
            <Header />
            {/*<TotalBlock />*/}
            <HeaderMenu />
            <CustomTable />
        </div>
    );
};

export default React.memo(HomePage);
