export const transformGrowthMetricsOption = (title: string): string => {
    switch (title) {
        case 'Web Traffic':
            return 'web_traffic_growth';
        case 'Twitter':
            return 'twitter_mentions_growth';
        case 'App Ratings':
            return 'app_rating_growth';
        default:
            return '';
    }
};

export const growthMetricsOptions = ['Web Traffic', 'Twitter', 'App Ratings'];
