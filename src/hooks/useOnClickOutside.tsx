import React, { useEffect } from 'react';

const useOutsideClick = (ref: React.MutableRefObject<HTMLDivElement | undefined | null>, callback: () => void): void => {
    const handleClick = (e): void => {
        if (ref.current && !ref.current.contains(e.target)) {
            callback();
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClick);

        return () => {
            document.removeEventListener('mousedown', handleClick);
        };
    });
};

export default useOutsideClick;
