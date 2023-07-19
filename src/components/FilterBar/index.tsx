import React, { useMemo } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ColumnsBar from './components/ColumnsBar';
import { IClasses, useStyles } from './styles';
import { useSelector } from 'react-redux';
import { getFiltersColumn } from '../../store/filter/filter.selector';

const FilterBar: React.FC = () => {
    const [expanded, setExpanded] = React.useState<string | false>('Columns');
    const styles: IClasses = useStyles();
    const options = useSelector(getFiltersColumn);

    const handleChange = (panel: string) => (_, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };
    const barInformation = useMemo(
        () => [
            {
                title: 'Columns',
                component: <ColumnsBar />,
            },
        ],
        [options]
    );

    return (
        <div>
            {barInformation.map((item) => (
                <Accordion
                    square
                    className={styles.accordion}
                    disableGutters
                    expanded={expanded === item.title}
                    onChange={handleChange(item.title)}
                    key={`accordion-${item.title}`}
                >
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>{item.title}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>{item.component}</AccordionDetails>
                </Accordion>
            ))}
        </div>
    );
};

export default React.memo(FilterBar);
