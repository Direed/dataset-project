import { IFilterTable } from './types/filterTypes';

export enum CompaniesActionTypes {
    REQUEST_TABLE_DATA = '@@table/REQUEST_TABLE_DATA',
    REQUEST_TABLE_DATA_SUCCESS = '@@table/REQUEST_TABLE_DATA_SUCCESS',
    REQUEST_TABLE_DATA_FAILURE = '@@table/REQUEST_TABLE_DATA_FAILURE',
    SET_FILTER_TABLE_DATA = '@@table/FILTER_TABLE_DATA',
    FILTER_TABLE_BY_SEARCH = '@@table/FILTER_TABLE_BY_SEARCH',
    FILTER_TABLE_BY_SELECT = '@@table/FILTER_TABLE_BY_SELECT',
    FILTER_TABLE_BY_RANGE = '@@table/FILTER_TABLE_BY_RANGE',
    FILTER_TABLE_BY_MIN = '@@table/FILTER_TABLE_BY_MIN',
    FILTER_TABLE_BY_MAX = '@@table/FILTER_TABLE_BY_MAX',
    FILTER_TABLE_BY_MIN_DATE = '@@table/FILTER_TABLE_BY_MIN_DATE',
    FILTER_TABLE_BY_MAX_DATE = '@@table/FILTER_TABLE_BY_MAX_DATE',
    FILTER_TABLE_BY_ORDER = '@@table/FILTER_TABLE_BY_ORDER',
    FILTER_TABLE_BY_CITY = '@@table/FILTER_TABLE_BY_CITY',
    FILTER_TABLE_BY_REGION = '@@table/FILTER_TABLE_BY_REGION',
    FILTER_TABLE_BY_LOCATION = '@@table/FILTER_TABLE_BY_LOCATION',
    RESET_FILTER = '@@table/RESET_FILTER',
    SET_CURRENT_ITEM = '@@table/SET_CURRENT_ITEM',
    CHANGE_TABLE_HEADER_ORDER = '@@table/CHANGE_TABLE_HEADER_ORDER',
    CHANGE_GLOBAL_SEARCH = '@@table/CHANGE_GLOBAL_SEARCH',
    CHANGE_FIND_IN_VIEW = '@@table/CHANGE_FIND_IN_VIEW',
    TOGGLE_EXPORT_DATA = '@@table/TOGGLE_EXPORT_DATA',
    TOGGLE_EXPORT_ALL_DATA = '@@table/TOGGLE_EXPORT_ALL_DATA',
    RESET_RESIZING = '@@table/RESET_RESIZING',
    CLOSE_STATUS_RESIZE = '@@table/CLOSE_STATUS_RESIZE',
    SET_FIELD = '@@table/SET_FIELD',
    SET_NEED_FILTER = '@@table/SET_NEED_FILTER',
    CHANGE_SOURCE_COLUMN = '@@table/CHANGE_SOURCE_COLUMN',
    RESET_ALL_FILTERS = '@@table/RESET_ALL_FILTERS',
    CHANGE_CHIP_HEADER = '@@table/CHANGE_CHIP_HEADER',
    CHANGE_FILTERS = '@@table/CHANGE_FILTERS',
    SORT_FILTERS = '@@table/SORT_FILTERS',
    ON_SET_IS_OPEN_KEYWORD_SIDEBAR = '@@table/ON_SET_IS_OPEN_KEYWORD_SIDEBAR',
    GET_CITIES = '@@table/GET_CITIES',
    GET_CITIES_SUCCESS = '@@table/GET_CITIES_SUCCESS',
    GET_CITIES_FAILURE = '@@table/GET_CITIES_FAILURE',
    GET_REGIONS = '@@table/GET_REGIONS',
    GET_REGIONS_SUCCESS = '@@table/GET_REGIONS_SUCCESS',
    GET_REGIONS_FAILURE = '@@table/GET_REGIONS_FAILURE',
    GET_COUNTRY_CODES = '@@table/GET_COUNTRY_CODES',
    GET_COUNTRY_CODES_SUCCESS = '@@table/GET_COUNTRY_CODES_SUCCESS',
    GET_COUNTRY_CODES_FAILURE = '@@table/GET_COUNTRY_CODES_FAILURE',
    GET_FUNDING_ROUNDS = '@@table/GET_FUNDING_ROUNDS',
    GET_FUNDING_ROUNDS_SUCCESS = '@@table/GET_FUNDING_ROUNDS_SUCCESS',
    GET_FUNDING_ROUNDS_FAILURE = '@@table/GET_FUNDING_ROUNDS_FAILURE',
    GET_INDUSTRIES = '@@table/GET_INDUSTRIES',
    GET_INDUSTRIES_SUCCESS = '@@table/GET_INDUSTRIES_SUCCESS',
    GET_INDUSTRIES_FAILURE = '@@table/GET_INDUSTRIES_FAILURE',
}

export interface ICompany {
    affinity_list: string;
    affinity_status: string;
    affinity_url: string;
    agm1_app_ratings: number;
    agm1_employees: number;
    agm1_twitter_mentions: number;
    agm1_web_traffic: number;
    agm3_app_ratings: number;
    agm3_employees: number;
    agm3_twitter_mentions: number;
    agm3_web_traffic: number;
    agm6_app_ratings: number;
    agm6_employees: number;
    agm6_twitter_mentions: number;
    agm6_web_traffic: number;
    all_investors: string;
    app_download_de: number;
    app_rating_30d: number;
    app_store: string;
    avg_review_90d: number;
    clinical_trial_condition: null | number | string;
    clinical_trial_enrollment: null | number | string;
    clinical_trial_name: string;
    clinical_trial_phase: string;
    clinical_trial_status: null | string;
    clinical_trial_url: null | string;
    company_register_info: null | string;
    company_register_score: null | string;
    country_ip_address: string;
    ct_end_date: null | string;
    ct_start_date: null | string;
    daily_time_spent: string;
    date_of_entry: string;
    deal_score: number;
    description: string;
    employees_linkedin: number;
    founding_year: string;
    github_creation_date: null | string;
    github_entry_date: null | string;
    github_forks: null | string;
    github_frequency: null | string;
    github_last_commit: null | string;
    github_lwag_forks: null | string;
    github_lwag_stars: null | string;
    github_lwrg_forks: null | string;
    github_lwrg_stars: null | string;
    github_stars: null | string;
    github_type: null | string;
    github_url: null | string;
    global_traffic_rank: number;
    grant_amount: null | number | string;
    grant_project: null | string;
    hq: string;
    id: number;
    uuid: string;
    industries: string;
    last_contact: string;
    last_updated: string;
    latest_investment_type: string;
    latest_investment_year: string;
    linkedin: string;
    lmag_downloads: number;
    lmrg_downloads_perc: number;
    m1_app_ratings: number;
    m1_employees: number;
    m1_twitter_mentions: number;
    m1_web_traffic: number;
    m2_app_ratings: number;
    m2_employees: number;
    m2_twitter_mentions: number;
    m2_web_traffic: number;
    m3_app_ratings: number;
    m3_employees: number;
    m3_twitter_mentions: number;
    m3_web_traffic: number;
    m4_app_ratings: number;
    m4_employees: number;
    m4_twitter_mentions: number;
    m4_web_traffic: number;
    m5_app_ratings: number;
    m5_employees: number;
    m5_twitter_mentions: number;
    m5_web_traffic: number;
    m6_app_ratings: number;
    m6_employees: number;
    m6_twitter_mentions: number;
    m6_web_traffic: number;
    name: string;
    news_articles: number;
    number_of_employees_cb: string;
    previous_mentions: number;
    previous_rating: number;
    previous_web_rank: number;
    product_hunt_date: string;
    product_hunt_url: null | string;
    product_hunt_votes: number;
    rgm1_app_ratings: number;
    rgm1_employees: number;
    rgm1_twitter_mentions: number;
    rgm1_web_traffic: number;
    rgm3_app_ratings: number;
    rgm3_employees: number;
    rgm3_twitter_mentions: number;
    rgm3_web_traffic: number;
    rgm6_app_ratings: number;
    rgm6_employees: number;
    rgm6_twitter_mentions: number;
    rgm6_web_traffic: number;
    similar_sites: string;
    source: string;
    total_funding: number;
    tweets_from_user: number;
    twitter: string;
    twitter_followers: number;
    twitter_friends: number;
    twitter_mentions_30d: number;
    website: string;
    cb_url: string;
}

export interface ICell {
    id: string;
    label: string;
}

export interface IExportCompany {
    id: string;
}

export interface ITableSortArrows {
    title: string;
    sort: string;
}

export interface ICompanies {
    isLoading: boolean;
    data: ICompany[];
    total: number;
    page: number;
    globalSearch: string;
    findInView: boolean;
    filterTable: IFilterTable;
    tableHeader: ICell[];
    currentItem: null | ICompany;
    defaultColumns: null | ICell[];
    needResetResize: boolean;
    infinityLoading: boolean;
    needHeaderSorting: boolean;
    needChipHeader: boolean;
    tableSortArrows: ITableSortArrows;
    isOpenKeywordSidebar: boolean;
    isLoadMore: boolean;
    needRefetch: boolean;
}

export interface IExportData {
    dataForExport: IExportCompany[];
    isSelectedAllDataForExport: boolean;
}

export interface ILocationData {
    cities: IOption[];
    regions: IOption[];
    countryCodes: { [key: string]: string };
    countryCodesList: IOption[];
    fundingRounds: IOption[];
    industries: IOption[];
}

export interface IOption {
    label: string;
    value: string;
}
export interface ICompaniesState {
    companies: ICompanies;
    exportData: IExportData;
    locationData: ILocationData;
}

interface IRequestExtraData {
    isSidebar?: boolean;
    info?: any;
}

export interface IRequestDataInterface {
    page?: number;
    size?: number;
    data?: IRequestExtraData;
    getTableData?: (props: any) => void;
}
