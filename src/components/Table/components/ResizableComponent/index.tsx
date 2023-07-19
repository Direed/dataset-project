import React, { useCallback, useRef } from 'react';
import { useStyles } from './style';
import { tableCellPadding, titlePadding } from '../../../../constants/table/tableSpacing';

interface IProps {
    children: React.ReactNode;
    width: number;
    index: number;
    setWidth: (width: number) => void;
    minWidth: number;
}

const ResizeComponent: React.FC<IProps> = ({ minWidth, width, index, children, setWidth }) => {
    const classes = useStyles();
    const scroller = useRef<HTMLDivElement>(null);

    const handleMouseDown = useCallback(
        (e) => {
            e.stopPropagation();
            const initPosition = e.clientX;
            const containerWidth = scroller?.current?.offsetWidth || 0;

            const handleMouseMove = (event: MouseEvent): void => {
                if (scroller.current) {
                    const updatedWidthNumber = event.clientX + containerWidth - initPosition;

                    // update of title width
                    scroller.current.style.width = `${updatedWidthNumber}px`;

                    const rows = document.querySelectorAll('tr');
                    rows.forEach((row, i) => {
                        // if not title
                        if (i !== 0) {
                            const childElem: any = row.childNodes[index].childNodes[0];

                            // update of table cell width
                            childElem.style.maxWidth = `${updatedWidthNumber - tableCellPadding + titlePadding}px`;
                        }
                    });
                }
            };
            const handleMouseUp = (): void => {
                window.removeEventListener('mousemove', handleMouseMove);
                window.removeEventListener('mouseup', handleMouseUp);
                window.removeEventListener('mousedown', handleMouseMove);
                if (scroller.current) {
                    setWidth(scroller?.current?.offsetWidth || 0);
                }
            };
            window.addEventListener('mousedown', handleMouseMove);
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        },
        [index]
    );

    return (
        <div
            style={{
                width: `${width}px` || '100%',
                minWidth: minWidth || 150,
            }}
            ref={scroller}
        >
            {children}
            <span onDragStart={(e) => e.stopPropagation()} onClick={(e) => e.stopPropagation()} className={classes.resizeBlock} onMouseDown={handleMouseDown} />
        </div>
    );
};

export default React.memo(ResizeComponent);
