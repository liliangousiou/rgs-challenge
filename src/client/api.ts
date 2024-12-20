import axios from 'axios';

import { ThemeMapping } from './types';

const API_URL = 'http://localhost:3000/api';

export const fetchThemes = async (): Promise<ThemeMapping[]> => {
    const response = await axios.get<ThemeMapping[]>(`${API_URL}/themes`);
    return response.data;
};
