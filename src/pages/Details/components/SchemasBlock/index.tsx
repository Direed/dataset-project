import React, { useCallback, useMemo, useState } from 'react';
import { Grid } from '@mui/material';
import ChartColumn from '../../../../components/ColumnChart';
import CustomSelect from '../../../../components/Select';
import { useStyles } from './styles';
import { LineChart } from '../../../../components/LineChart';
import { ChartType } from '../../../../enums/chartType';
import { chartSchema, options, typeOptions } from '../../../../constants';

const SchemasBlock: React.FC = () => {
    const classes = useStyles();
    const [selectedItem, setSelectedItem] = useState<{ [key: string]: { type: ChartType; value: string } | null }>({
        'Employee Growth': null,
        'Web Traffic': null,
        'Github Forks': null,
        'Github Stars': null,
        'ProductHunt Votes': null,
    });
    const [selectedCharts, setSelectedCharts] = useState([
        {
            value: 'Employee Growth',
            label: 'Employee Growth',
        },
    ]);
    const onSelect = useCallback((e) => setSelectedCharts(e), [selectedCharts]);
    const onSelectItem = useCallback(
        (option, key) => {
            setSelectedItem({
                ...selectedItem,
                [key]: { ...selectedItem[key], value: option?.value },
            });
        },
        [selectedItem]
    );
    const onSelectType = useCallback(
        (option, key) =>
            setSelectedItem({
                ...selectedItem,
                [key]: { ...selectedItem[key], type: option?.value },
            }),
        [selectedItem]
    );
    const chartsElements = useMemo(() => selectedCharts.map((item) => chartSchema[item.label]), [selectedCharts]);
    const chartType = useCallback(
        (type: ChartType | undefined, data) => {
            switch (type) {
                case ChartType.BAR:
                    return <ChartColumn data={data} />;
                case ChartType.LINE: {
                    return <LineChart />;
                }
                default:
                    return <ChartColumn data={data} />;
            }
        },
        [selectedItem, chartsElements]
    );
    return (
        <div className={classes.container}>
            <CustomSelect placeholder="Select schemas" isMulti options={options} value={selectedCharts} onChange={onSelect} />
            <Grid container spacing={4} style={{ marginTop: 0 }}>
                {chartsElements.map((item, index) => (
                    <Grid item xs={6} key={index}>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <CustomSelect placeholder={item.selectPlaceholder} onChange={onSelectItem} options={item.selectOption} item={item.name} />
                            </Grid>
                            <Grid item xs={6}>
                                <CustomSelect placeholder="Select chart type" onChange={onSelectType} options={typeOptions} item={item.name} />
                            </Grid>
                        </Grid>
                        <div className={classes.chartWrapper}>{chartType(selectedItem[item.name]?.type, item)}</div>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default React.memo(SchemasBlock);
