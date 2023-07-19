import React, { useCallback } from 'react';
import { Box, Tooltip } from '@mui/material';

import { IClasses, useStyles } from './style';
import { ICardDescription } from '../../pages/Company/helpers';

interface IProps {
    descriptionList: ICardDescription[];
}

const CardDescription: React.FC<IProps> = ({ descriptionList }) => {
    const classes: IClasses = useStyles();

    const aimStyles = useCallback((item: number): string => {
        if (item < 60) {
            return 'redColor';
        } else if (item < 80 && item >= 60) {
            return 'yellowColor';
        }

        return 'greenColor';
    }, []);

    return descriptionList?.length !== 0 ? (
        <Box className={classes.container}>
            {descriptionList?.map((item) => (
                <Box key={item.id} className={classes.itemBlock}>
                    <img className={classes.icon} alt="image" src={item.icon} />
                    {item.isAim ? (
                        <Tooltip title={'Company score'}>
                            <div className={classes[aimStyles(+item.text)]}>{item.text}%</div>
                        </Tooltip>
                    ) : (
                        <div className={classes.text}>{item.text}</div>
                    )}
                </Box>
            ))}
        </Box>
    ) : null;
};

export default React.memo(CardDescription);
