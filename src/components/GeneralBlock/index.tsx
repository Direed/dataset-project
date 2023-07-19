import React from 'react';
import { Chip, Divider, Grid, Typography } from '@mui/material';
import { useStyles } from './styles';
import { DetailInfoType } from '../../enums/detailInfoType';

interface IProps {
    item: any;
    columns: ColumnType[];
}
export type ColumnType = {
    name: string;
    type: DetailInfoType;
    field?: string;
    fields?: string[];
};

const GeneralBlock: React.FC<IProps> = ({ item, columns }) => {
    const classes = useStyles();
    const itemContent = (column): JSX.Element => {
        const isEmptyField = !item?.[column.field] || item?.[column.field] === '0' || item?.[column.field] === '' || item?.[column.field] === '[]';
        switch (column.type) {
            case DetailInfoType.TEXT: {
                return <p>{!isEmptyField ? item?.[column.field] : 'None'}</p>;
            }
            case DetailInfoType.ARRAY: {
                const items = item?.[column.field].substring(1, item?.[column.field].length - 1);
                const arrayItems = items?.split(',').map((item) => item.substring(item[0] === ' ' ? 2 : 1, item.length - 1));
                return (
                    <div>
                        {!isEmptyField ? arrayItems?.map((item) => <Chip color="secondary" className={classes.chip} label={item} key={item} />) : <p>None</p>}
                    </div>
                );
            }
            case DetailInfoType.LINKS: {
                return (
                    <div>
                        {column.fields?.map((item) => (
                            <a href={item?.[item]} key={item} className={classes.chip}>
                                <Chip color="secondary" label={item} />
                            </a>
                        ))}
                    </div>
                );
            }
            case DetailInfoType.CHIP: {
                return !isEmptyField ? <Chip color="secondary" label={item?.[column.field]} /> : <p>None</p>;
            }
            default: {
                return <p>{item?.[column.field]}</p>;
            }
        }
    };
    return item ? (
        <div>
            <Typography className={classes.title}>Details</Typography>
            <Divider />
            <Grid container className={classes.blocksContainer}>
                {columns.map((column) => (
                    <Grid xs={6} key={column.name}>
                        <Typography className={classes.subtitle}>{column.name}</Typography>
                        {itemContent(column)}
                    </Grid>
                ))}
            </Grid>
        </div>
    ) : null;
};
export default React.memo(GeneralBlock);
