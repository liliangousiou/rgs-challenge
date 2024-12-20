import { Container, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Select from 'react-select';

import { fetchThemes } from '../../api';
import { ThemeMapping } from '../../types';

const Dashboard: React.FC = () => {
    const [themes, setThemes] = useState<ThemeMapping[]>([]);
    const [selectedTheme, setSelectedTheme] = useState<string | null>(null);
    useEffect(() => {
        const loadThemes = async () => {
            const data = await fetchThemes();
            setThemes(data);
        };
        loadThemes();
    }, []);
    const options = themes.map(theme => ({
        value: theme['RGS Product Category'],
        label: theme['RGS Product Category'],
    }));
    return (
        <Container>
            <Typography variant='h4' gutterBottom>
                Historical company revenues
            </Typography>
            <Select
                options={options}
                onChange={selectedOption =>
                    setSelectedTheme(selectedOption?.value || null)
                }
                placeholder='Select a Product Category'
                isClearable
            />
            {selectedTheme && (
                <Typography variant='h6'>
                    Selected Theme: {selectedTheme}
                </Typography>
            )}
        </Container>
    );
};
export default Dashboard;
