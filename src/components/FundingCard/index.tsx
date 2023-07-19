import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { IFundingCardContent } from '../../pages/Company/helpers';
import { IClasses, useStyles } from './style';
import TableLogo from '../../Icons/FundingCardIcons/TableLogo.svg';
import { Tooltip } from '@mui/material';

interface IProps {
    content: IFundingCardContent[];
}

const FundingCard: React.FC<IProps> = ({ content }) => {
    const classes: IClasses = useStyles();

    return (
        <Paper className={classes.container}>
            <div className={classes.header}>
                <div className={classes.title}>Funding rounds</div>
                <img src={TableLogo} alt="Logo" />
            </div>
            <div className={classes.body}>
                <Table className={classes.table} stickyHeader aria-label="sticky table">
                    <TableHead className={classes.tableHead}>
                        <TableRow>
                            <th className={classes.tableHeaders} align="center">
                                Date
                            </th>
                            <th className={classes.tableHeaders} align="center">
                                Stage
                            </th>
                            <th className={classes.tableHeaders} align="center">
                                Number of investors
                            </th>
                            <th className={classes.tableHeaders} align="center">
                                Money raised (of which from grants)
                            </th>
                            <th className={classes.tableHeaders} align="center">
                                Lead investors
                            </th>
                        </TableRow>
                    </TableHead>
                    <TableBody className={classes.tableBody}>
                        {content.map((row) => (
                            <TableRow key={row.id} className={classes.bodyContent}>
                                <th className={classes.tableBodyRows} align="center">
                                    {row.date}
                                </th>
                                <th className={classes.tableBodyRows} align="center">
                                    {row.stage}
                                </th>
                                <Tooltip
                                    title={
                                        <span className={classes.tooltipContainer}>
                                            <span className={classes.boldText}>Coatue</span>
                                            <span>
                                                <span className={classes.boldText}>Third Point Ventures</span>
                                                <span>(Heath Terry)</span>
                                            </span>
                                            <span className={classes.tooltipTextSpacing}>Dragoneer Investment Group*</span>
                                            <span>* Existing investor</span>
                                        </span>
                                    }
                                >
                                    <th className={classes.tableBodyRows} align="center">
                                        {row.numberOfInvestors}
                                    </th>
                                </Tooltip>
                                <th className={classes.tableBodyRows} align="center">
                                    <span className={classes.moneyRaised}>
                                        <span>{row.moneyRaised}</span>
                                        <span>({row.moneyRaisedM})</span>
                                    </span>
                                </th>
                                <th className={classes.tableBodyRows} align="center">
                                    {row.leadInvestors}
                                </th>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </Paper>
    );
};

export default React.memo(FundingCard);
