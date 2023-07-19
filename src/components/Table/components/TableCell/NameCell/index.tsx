import React, { useCallback } from 'react';
import { Avatar } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { useStyles } from './style';
import { ICompany } from '../../../../../store/companies/companies.types';
import crunchBaseLogo from '../../../../../Icons/TableIcons/crunchbase_logo.svg';

interface IProps {
    name: string;
    row: ICompany;
}

const NameCell: React.FC<IProps> = ({ name, row }) => {
    const history = useHistory();
    const onClickName = useCallback((name: string): void => history.push(`/${name}`), []);
    const onLinkClick = useCallback((e) => {
        e.stopPropagation();
    }, []);

    const classes = useStyles();
    return (
        <div className={classes.cellWrapper} onClick={() => onClickName(name)}>
            <div className={classes.infoWrapper}>
                <div className={classes.nameWrapper}>
                    <Avatar>{name[0]}</Avatar>
                    <div className={classes.textsInfo}>
                        <p className={classes.name}> {name} </p>
                        {row.website !== 'undefined' && row.website !== '0' && row.website !== 'null' ? (
                            <a href={row.website} rel="noreferrer" target="_blank" className={classes.website}>
                                {row.website}
                            </a>
                        ) : null}
                    </div>
                </div>
                <a onClick={onLinkClick} className={classes.crunchBaseLogo} href={row.cb_url} target="_blank" rel="noreferrer">
                    <img className={classes.logo} src={crunchBaseLogo} alt="Logo" />
                </a>
            </div>
        </div>
    );
};
export default React.memo(NameCell);
