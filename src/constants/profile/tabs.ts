import { ProfileMenu, RoutePaths } from '../../enums';

export const adminProfileTabs = [
    {
        label: ProfileMenu.INVITE,
        route: RoutePaths.INVITE_USER,
    },
    {
        label: ProfileMenu.SETTINGS,
        route: RoutePaths.SETTINGS,
    },
];

export const userProfileTabs = [
    {
        label: ProfileMenu.SETTINGS,
        route: RoutePaths.SETTINGS,
    },
];
