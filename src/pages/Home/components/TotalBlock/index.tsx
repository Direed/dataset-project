import React from 'react';
import { IClasses, useStyles } from './style';
import { useSelector } from 'react-redux';
import { getCompaniesData, getCompaniesTotal } from '../../../../store/companies/companies.selectors';
// import { rowsCount, startPage } from '../../../../constants/table/rows';

const TotalBlock: React.FC = () => {
    const classes: IClasses = useStyles();
    const total = useSelector(getCompaniesTotal);
    // const page = useSelector(getCompaniesPage);

    // const itemsCount = (page - startPage + 1) * rowsCount;
    const data = useSelector(getCompaniesData);

    return (
        <div className={classes.filters}>
            {!!total && (
                <div>
                    Showing <span className={classes.highlighted}>{data.length}</span> out of {data.length} records
                </div>
            )}
        </div>
    );
};

export default React.memo(TotalBlock);
