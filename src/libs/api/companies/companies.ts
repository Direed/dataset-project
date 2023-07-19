import { axios } from '../../../axios';
import axiosLib from 'axios';

interface IRowsData {
    page: number;
    size: number;
    filterQuery: { [key: string]: string };
    orderBy?: { columnName: string; direction: string }[];
}

let cancelToken;
export const getRowsData = async ({ page, size, filterQuery, orderBy }: IRowsData): Promise<any> => {
    if (typeof cancelToken != typeof undefined) {
        cancelToken.cancel('Operation canceled due to new request.');
    }
    cancelToken = axiosLib.CancelToken.source();
    return await axios.post('rows/paginated', { ...filterQuery, orderBy }, { params: { page, size }, cancelToken: cancelToken.token });
};

export const getCities = async (): Promise<any> => await axios.get('cities.json', { baseURL: '' });
``;
export const getRegions = async (): Promise<any> => await axios.get('regions.json', { baseURL: '' });
``;
export const getCountryCodes = async (): Promise<any> => await axios.get('countryCodes.json', { baseURL: '' });
``;
export const getFundingRounds = async (): Promise<any> => await axios.get('fundingRounds.json', { baseURL: '' });
``;
export const getIndustries = async (): Promise<any> => await axios.get('industries.json', { baseURL: '' });
``;
