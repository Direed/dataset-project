import { CellNameType } from '../../enums/cellNameType';

export const ranges = {
    [CellNameType.FOUNDERS_COUNT]: {
        min: 0,
        max: 10,
    },
    [CellNameType.FRACTION_MALE_FOUNDERS]: {
        min: 0,
        max: 100,
    },
    [CellNameType.FRACTION_FEMALE_FOUNDERS]: {
        min: 0,
        max: 100,
    },
    [CellNameType.FRACTION_OTHER_FOUNDERS]: {
        min: 0,
        max: 100,
    },
    [CellNameType.FRACTION_MISSING_GENDER_FOUNDERS]: {
        min: 0,
        max: 100,
    },
    [CellNameType.FRACTION_MALE_EXECUTIVES]: {
        min: 0,
        max: 100,
    },
    [CellNameType.FRACTION_FEMALE_EXECUTIVES]: {
        min: 0,
        max: 100,
    },
    [CellNameType.FRACTION_OTHER_EXECUTIVES]: {
        min: 0,
        max: 100,
    },
    [CellNameType.FRACTION_MISSING_GENDER_EXECUTIVES]: {
        min: 0,
        max: 100,
    },
    [CellNameType.INSTITUTION_NAME_NUNIQUE_FOUNDERS]: {
        min: 0,
        max: 8,
    },
    [CellNameType.INSTITUTION_NAME_COUNT_FOUNDERS]: {
        min: 0,
        max: 10,
    },
    [CellNameType.SUBJECT_AGGREGATED_NUNIQUE_FOUNDERS]: {
        min: 0,
        max: 5,
    },
    [CellNameType.DEGREE_TYPE_AGGREGATED_NUNIQUE_FOUNDERS]: {
        min: 0,
        max: 100,
    },
    [CellNameType.DEGREE_TYPE_NUMERIC_MEAN_FOUNDERS]: {
        min: 0,
        max: 3,
    },
    [CellNameType.DEGREE_TYPE_NUMERIC_STD_FOUNDERS]: {
        min: 0,
        max: 3,
    },
    [CellNameType.DEGREE_TYPE_NUMERIC_MAX_FOUNDERS]: {
        min: 0,
        max: 3,
    },
    [CellNameType.INSTITUTION_NAME_COUNT_EXECUTIVES]: {
        min: 0,
        max: 50,
    },
    [CellNameType.SUBJECT_AGGREGATED_NUNIQUE_EXECUTIVES]: {
        min: 0,
        max: 6,
    },
    [CellNameType.DEGREE_TYPE_AGGREGATED_NUNIQUE_EXECUTIVES]: {
        min: 0,
        max: 50,
    },
    [CellNameType.DEGREE_TYPE_NUMERIC_MEAN_EXECUTIVES]: {
        min: 0,
        max: 3,
    },
    [CellNameType.DEGREE_TYPE_NUMERIC_STD_EXECUTIVES]: {
        min: 0,
        max: 3,
    },
    [CellNameType.DEGREE_TYPE_NUMERIC_MAX_EXECUTIVES]: {
        min: 0,
        max: 3,
    },
    [CellNameType.TEAM_FOUNDERS_IN_EXECUTIVES]: {
        min: 0,
        max: 100,
    },
    [CellNameType.BUSINESS_ROLES_COUNT]: {
        min: 0,
        max: 200,
    },
    [CellNameType.OTHER_ROLES_COUNT]: {
        min: 0,
        max: 100,
    },
    [CellNameType.FRACTION_BUSINESS_ROLES]: {
        min: 0,
        max: 100,
    },
    [CellNameType.EXECUTIVES_COUNT]: {
        min: 0,
        max: 200,
    },
    [CellNameType.TOTAL_FUNDING]: {
        min: 0,
        max: 2000000000,
    },
    [CellNameType.PROBABILITY_OF_SUCCESS]: {
        min: 0,
        max: 100,
    },
};
