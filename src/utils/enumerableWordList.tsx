export const enumerableWordList = (items: string[]): JSX.Element[] =>
    items.map((item, i) => {
        const addAnd = items.length > 1 && i === items.length - 2;
        const addComma = items.length - 2 > i;

        return (
            <>
                <span style={{ fontWeight: 700 }}>{item}</span>
                {addComma && ','} {addAnd && ' and '}
            </>
        );
    });
