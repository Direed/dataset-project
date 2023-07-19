import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { getCompaniesData } from '../../store/companies/companies.selectors';
import CustomInput from '../Input';
import { useStyles } from './styles';
import { Avatar, ListItemAvatar, ListItemButton, ListItemText, Paper, Typography } from '@mui/material';
import useOnClickOutside from '../../hooks/useOnClickOutside';
import SearchIcon from '@mui/icons-material/Search';

interface ISearchDropdown {}

const SearchDropdown: React.FC<ISearchDropdown> = () => {
    const ref = useRef<HTMLDivElement>(null);
    const [search, setSearch] = useState<string>('');
    const [items, setItems] = useState<{ name: string; company: string }[]>([]);
    const [visibleBlock, setVisibleBlock] = useState<boolean>(false);
    const onHide = useCallback(() => setVisibleBlock(false), []);
    const onShow = useCallback(() => setVisibleBlock(true), []);
    const onChange = useCallback((e) => setSearch(e.target.value), []);
    const data = useSelector(getCompaniesData);
    const classes = useStyles();
    useOnClickOutside(ref, onHide);
    useEffect(() => {
        const people: { name: string; company: string }[] = [
            { name: 'Alex', company: 'Alex' },
            { name: 'John', company: 'John' },
            { name: 'Bohdan', company: 'Bohdan' },
        ];
        setItems(people);
    }, [data]);
    const filteredItems = useMemo(
        () => items.filter((item) => (search === '' ? item : item.name.toLowerCase().includes(search.toLowerCase()))),
        [items, search]
    );
    return (
        <div className={classes.wrapper} ref={ref}>
            <CustomInput
                startIcon={<SearchIcon />}
                value={search}
                onFocus={onShow}
                autoComplete={'off'}
                onChange={onChange}
                variant="standard"
                placeholder="Search people and organisations"
                label=""
            />
            {visibleBlock ? (
                <Paper elevation={3} className={classes.searchBlock}>
                    {filteredItems.length ? (
                        filteredItems.map((item) =>
                            item.name !== '' ? (
                                <ListItemButton component="a" href={`/users/${item.name}`}>
                                    <ListItemAvatar>
                                        <Avatar>{item[0]}</Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary={item.name} secondary={item.company} />
                                </ListItemButton>
                            ) : null
                        )
                    ) : (
                        <Typography
                            sx={{
                                p: 1,
                            }}
                            variant="subtitle2"
                        >
                            Empty List
                        </Typography>
                    )}
                </Paper>
            ) : null}
        </div>
    );
};

export default React.memo(SearchDropdown);
