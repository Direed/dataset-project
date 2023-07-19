import { gql } from '@apollo/client';

export const GET_TABLE_QUERY = gql`
    query GetTableQuery(
        $uuid: [String]
        $name: [String]
        $founded_at: JSONObject
        $last_funding_date: JSONObject
        $last_funding_stage: [String]
        $country_code: [String]
        $region: [String]
        $city: [String]
        $postal_code: [String]
        $address: String
        $description: String
        $industries: String
        $email: String
        $phone_number: String
        $created_at: JSONObject
        $updated_at: JSONObject
        $orderBy: JSONObject
        $limit: Int
        $offset: Int
        $fraction_missing_gender_founders: JSONObject
        $fraction_female_founders: JSONObject
        $fraction_male_founders: JSONObject
        $fraction_other_founders: JSONObject
        $fraction_missing_gender_executives: JSONObject
        $fraction_female_executives: JSONObject
        $fraction_male_executives: JSONObject
        $fraction_other_executives: JSONObject
        $business_roles_count: JSONObject
        $other_roles_count: JSONObject
        $fraction_business_roles: JSONObject
        $executives_count: JSONObject
        $founders_count: JSONObject
        $team_founders_in_executives: JSONObject
        $institution_name_nunique_founders: JSONObject
        $institution_name_count_founders: JSONObject
        $subject_aggregated_nunique_founders: JSONObject
        $degree_type_aggregated_nunique_founders: JSONObject
        $degree_type_numeric_mean_founders: JSONObject
        $degree_type_numeric_std_founders: JSONObject
        $degree_type_numeric_max_founders: JSONObject
        $institution_name_count_executives: JSONObject
        $subject_aggregated_nunique_executives: JSONObject
        $degree_type_aggregated_nunique_executives: JSONObject
        $degree_type_numeric_mean_executives: JSONObject
        $degree_type_numeric_std_executives: JSONObject
        $degree_type_numeric_max_executives: JSONObject
        $probability_of_success: JSONObject
        $total_funding: JSONObject
    ) {
        organisations(
            uuid: $uuid
            name: $name
            founded_at: $founded_at
            country_code: $country_code
            region: $region
            city: $city
            postal_code: $postal_code
            address: $address
            description: $description
            industries: $industries
            email: $email
            phone_number: $phone_number
            created_at: $created_at
            updated_at: $updated_at
            last_funding_date: $last_funding_date
            last_funding_stage: $last_funding_stage
            orderBy: $orderBy
            limit: $limit
            offset: $offset
            fraction_missing_gender_founders: $fraction_missing_gender_founders
            fraction_female_founders: $fraction_female_founders
            fraction_male_founders: $fraction_male_founders
            fraction_other_founders: $fraction_other_founders
            fraction_missing_gender_executives: $fraction_missing_gender_executives
            fraction_female_executives: $fraction_female_executives
            fraction_male_executives: $fraction_male_executives
            fraction_other_executives: $fraction_other_executives
            business_roles_count: $business_roles_count
            other_roles_count: $other_roles_count
            fraction_business_roles: $fraction_business_roles
            executives_count: $executives_count
            founders_count: $founders_count
            team_founders_in_executives: $team_founders_in_executives
            institution_name_nunique_founders: $institution_name_nunique_founders
            institution_name_count_founders: $institution_name_count_founders
            subject_aggregated_nunique_founders: $subject_aggregated_nunique_founders
            degree_type_aggregated_nunique_founders: $degree_type_aggregated_nunique_founders
            degree_type_numeric_mean_founders: $degree_type_numeric_mean_founders
            degree_type_numeric_std_founders: $degree_type_numeric_std_founders
            degree_type_numeric_max_founders: $degree_type_numeric_max_founders
            institution_name_count_executives: $institution_name_count_executives
            subject_aggregated_nunique_executives: $subject_aggregated_nunique_executives
            degree_type_aggregated_nunique_executives: $degree_type_aggregated_nunique_executives
            degree_type_numeric_mean_executives: $degree_type_numeric_mean_executives
            degree_type_numeric_std_executives: $degree_type_numeric_std_executives
            degree_type_numeric_max_executives: $degree_type_numeric_max_executives
            probability_of_success: $probability_of_success
            total_funding: $total_funding
        ) {
            uuid
            name
            cb_url
            founded_at
            country_code
            region
            city
            postal_code
            address
            description
            industries
            email
            phone_number
            created_at
            updated_at
            metrics {
                probability_of_success
                fraction_missing_gender_founders
                fraction_female_founders
                fraction_male_founders
                fraction_other_founders
                fraction_missing_gender_executives
                fraction_female_executives
                fraction_male_executives
                fraction_other_executives
                founder_is_ceo
                business_roles_count
                other_roles_count
                fraction_business_roles
                executives_count
                founders_count
                team_founders_in_executives
                institution_name_nunique_founders
                institution_name_count_founders
                subject_aggregated_nunique_founders
                degree_type_aggregated_nunique_founders
                degree_type_numeric_mean_founders
                degree_type_numeric_std_founders
                degree_type_numeric_max_founders
                institution_name_count_executives
                subject_aggregated_nunique_executives
                degree_type_aggregated_nunique_executives
                degree_type_numeric_mean_executives
                degree_type_numeric_std_executives
                degree_type_numeric_max_executives
                last_funding_stage
                last_funding_date
                total_funding
            }
        }
    }
`;
