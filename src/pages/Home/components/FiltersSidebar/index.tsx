import React, { useRef } from 'react';
import { IconButton } from '@mui/material';
import { IClasses, useStyles } from './style';
import CloseIcon from '@mui/icons-material/Close';
import FilterBar from '../../../../components/FilterBar';
import useOutsideClick from '../../../../hooks/useOnClickOutside';

interface IProps {
    isOpen: boolean;
    onClose: () => void;
}

const FiltersSidebar: React.FC<IProps> = ({ isOpen, onClose }) => {
    const classes: IClasses = useStyles();
    const filtersSidebarEl = useRef(null);
    useOutsideClick(filtersSidebarEl, onClose);

    return (
        <div ref={filtersSidebarEl} className={`${classes.filterMenu} ${isOpen ? classes.open : ''}`}>
            <IconButton onClick={onClose} className={classes.closeIcon}>
                <CloseIcon />
            </IconButton>
            <FilterBar />
        </div>
    );
};

export default React.memo(FiltersSidebar);
