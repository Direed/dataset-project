import React from 'react';
import { Box, Tooltip } from '@mui/material';

import { IClasses, useStyles } from './style';
import logoAbout from '../../Icons/OverviewCardIcons/logoAbout.svg';
import greenEllipse from '../../Icons/OverviewCardIcons/greenEllipse.svg';
import { IOverviewCardContent } from '../../pages/Company/helpers';
import CardDescription from '../CardDescription';

interface IProps {
    content: IOverviewCardContent;
}

const OverviewCard: React.FC<IProps> = ({ content }) => {
    const classes: IClasses = useStyles();
    return (
        <div className={classes.container}>
            <div className={classes.mainInfo}>
                <Box>
                    <div className={classes.title}>{content.title}</div>
                    {content.title === 'About' && (
                        <div className={classes.logos}>
                            <Tooltip title={'04.08.2021, Laurin Class'}>
                                <img src={greenEllipse} alt="Circle" />
                            </Tooltip>
                            <img src={logoAbout} alt="Logo" />
                        </div>
                    )}
                    <div className={classes.text}>{content.subtitle}</div>
                </Box>
                <CardDescription descriptionList={content.items} />
            </div>
        </div>
    );
};

export default React.memo(OverviewCard);
