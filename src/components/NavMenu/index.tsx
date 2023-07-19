import React from 'react';
import { useStyles, IClasses } from './style';
import { ICompanyInfo } from '../../pages/Company/helpers';

interface IProps {
    activeTabIndex: number;
    setActiveTabIndex: (index: number) => void;
    companyInfo: ICompanyInfo[];
}
const NavMenu: React.FC<IProps> = ({ activeTabIndex, setActiveTabIndex, companyInfo }) => {
    const classes: IClasses = useStyles();

    return (
        <div className={classes.container}>
            {companyInfo.map((item, index) => (
                <div className={activeTabIndex === index ? classes.activeElem : classes.menuElem} key={item.title} onClick={() => setActiveTabIndex(index)}>
                    {item.title}
                </div>
            ))}
        </div>
    );
};

export default React.memo(NavMenu);
