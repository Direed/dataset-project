import React, { ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Typography } from '@mui/material';
import { IClasses, useStyles } from './style';
import StyledMenu from '../../../../components/StyledMenuBar';
import { MenuType } from '../../../../enums/menuType';
import { useDispatch } from 'react-redux';
import { onSetIsOpenKeywordSidebar } from '../../../../store/companies/companies.actions';

interface IProps {
    title: string;
    icon: ReactNode;
    Menu?: any;
    menuType?: MenuType;
    action?: () => void;
    isOpenKeywordSidebar?: boolean;
}

const HeaderMenuItem: React.FC<IProps> = ({ action, title, icon, menuType, Menu, isOpenKeywordSidebar }) => {
    const dispatch = useDispatch();
    const classes: IClasses = useStyles();
    const anchorEl = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = useCallback((): void => {
        if (menuType) {
            setIsOpen(!isOpen);
        }
        if (action) {
            action();
        }
    }, []);

    const handleClose = useCallback((): void => {
        setIsOpen(false);
    }, []);

    useEffect(() => {
        if (isOpenKeywordSidebar) {
            setIsOpen(true);
            dispatch(onSetIsOpenKeywordSidebar(false));
        }
    }, [isOpenKeywordSidebar]);

    const menu = useMemo(() => {
        return menuType ? (
            menuType === MenuType.DROPDOWN ? (
                <StyledMenu anchorEl={anchorEl?.current} open={isOpen} onClose={handleClose}>
                    <Menu handleClose={handleClose} />
                </StyledMenu>
            ) : (
                <Menu isOpen={isOpen} onClose={handleClose} />
            )
        ) : null;
    }, [menuType, anchorEl?.current, isOpen]);

    return (
        <div>
            {menuType ? menu : null}
            <div ref={anchorEl} onClick={handleClick} className={classes.filter}>
                {icon}
                <Typography className={classes.title} variant="subtitle2">
                    {title}
                </Typography>
            </div>
        </div>
    );
};

export default React.memo(HeaderMenuItem);
