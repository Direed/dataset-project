import React, { useCallback, useState } from 'react';
import { Button, Checkbox, FormControlLabel, FormGroup, Stack } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getFiltersColumn } from '../../../../store/filter/filter.selector';
import { setResetAllColumns, setSelectAllColumns, setSelectedColumn } from '../../../../store/filter/filter.actions';
import { IClasses, useStyles } from '../../styles';
import CustomInput from '../../../Input';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { changeTableHeaderOrder } from '../../../../store/companies/companies.actions';
import ListIcon from '@mui/icons-material/List';
import HeaderMenuCheckBox from '../../../../pages/Home/components/HeaderMenu/components/HeaderMenuCheckBox';
import { cellNameTypes } from '../../../../constants/CellNameTypes';

const ColumnsBar: React.FC = () => {
    const [search, setSearch] = useState('');
    const onChangeSearch = useCallback((e) => {
        setSearch(e.target.value);
    }, []);
    const options = useSelector(getFiltersColumn);
    const classes: IClasses = useStyles();
    const dispatch = useDispatch();
    const onSelect = useCallback(
        (e, item: string) => {
            dispatch(setSelectedColumn(item, e.target.checked));
        },
        [options]
    );
    const onDragEnd = (result): void => {
        if (!result.destination) {
            return;
        }
        dispatch(changeTableHeaderOrder(result));
    };
    const filteredOptions = Object.entries(options)
        .filter(([title]) => title.toLowerCase().includes(search.toLowerCase()))
        .sort((a, b): number => a[1].order - b[1].order);
    return (
        <FormGroup className={classes.wrapper}>
            <div className={classes.accordionDetail}>
                <HeaderMenuCheckBox />
                <CustomInput className={classes.customInput} value={search} onChange={onChangeSearch} label="Column Name" />
                <Stack direction="row" spacing={2} className={`${classes.buttonWrapper} ${classes.buttonWrapperSecondary}`}>
                    <Button className={classes.customButton} onClick={() => dispatch(setSelectAllColumns())} color="secondary" variant="contained">
                        Select All
                    </Button>
                    <Button className={classes.customButton} color="secondary" onClick={() => dispatch(setResetAllColumns())} variant="contained">
                        Reset All
                    </Button>
                </Stack>
            </div>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="droppable" direction="vertical">
                    {(provided) => (
                        <div ref={provided.innerRef} {...provided.droppableProps}>
                            {filteredOptions.map(([title, { isVisible }], index) =>
                                title === 'name' ? (
                                    <div className={classes.switchBox} key={`option-${title}`}>
                                        <FormControlLabel
                                            control={<Checkbox disabled onChange={(e) => onSelect(e, title)} size="small" checked={isVisible} />}
                                            label={cellNameTypes[title].title || ''}
                                        />
                                    </div>
                                ) : title === 'checkbox' || title === 'id' || title === 'website' ? null : (
                                    <Draggable key={`option-${title}`} draggableId={title} index={index}>
                                        {(provided) => (
                                            <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                <div className={classes.switchBox}>
                                                    <FormControlLabel
                                                        control={<Checkbox onChange={(e) => onSelect(e, title)} size="small" checked={isVisible} />}
                                                        label={cellNameTypes[title].title || ''}
                                                    />
                                                    <ListIcon />
                                                </div>
                                            </div>
                                        )}
                                    </Draggable>
                                )
                            )}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </FormGroup>
    );
};

export default React.memo(ColumnsBar);
