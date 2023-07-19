import React, { useCallback, useState } from 'react';
import { Box, Paper, Tab, Tabs } from '@mui/material';
import AccessAlarmsIcon from '@mui/icons-material/AccessAlarms';
import AttachmentIcon from '@mui/icons-material/Attachment';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ArticleIcon from '@mui/icons-material/Article';
import RepeatIcon from '@mui/icons-material/Repeat';

const Sidebar: React.FC = () => {
    const [value, setValue] = useState<number>(0);
    const handleChange = useCallback(
        (_, newValue) => {
            setValue(newValue);
        },
        [value]
    );

    return (
        <Paper elevation={1}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                    sx={{
                        '& .Mui-selected': {
                            color: `#EF3125 !important`,
                        },
                        '& .MuiTabs-indicator': {
                            background: '#EF3125',
                        },
                        '& .MuiTab-root': {
                            minHeight: 40,
                        },
                    }}
                    value={value}
                    onChange={handleChange}
                    textColor="secondary"
                    indicatorColor="secondary"
                    variant="fullWidth"
                >
                    <Tab icon={<PeopleAltIcon />} iconPosition="start" />
                    <Tab icon={<RepeatIcon />} iconPosition="start" />
                    <Tab icon={<ArticleIcon />} iconPosition="start" />
                    <Tab icon={<AccessAlarmsIcon />} iconPosition="start" />
                    <Tab icon={<AttachmentIcon />} iconPosition="start" />
                </Tabs>
            </Box>
        </Paper>
    );
};

export default React.memo(Sidebar);
