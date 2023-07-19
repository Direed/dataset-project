export const tooltipForFounders = (level: number): string => {
    switch (Math.floor(level)) {
        case 0:
            return 'No degree';
        case 1:
            return 'Bachelor';
        case 2:
            return 'Master';
        case 3:
            return 'Ph.D';
        default:
            return 'No degree';
    }
};
