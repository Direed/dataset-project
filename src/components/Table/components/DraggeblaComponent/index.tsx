import { Draggable } from 'react-beautiful-dnd';

const DraggableComponent = (id: string, index: number) => (props: any) => {
    return (
        <Draggable key={id} draggableId={id} index={index}>
            {(provided) => (
                <div {...props} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                    {props.children}
                </div>
            )}
        </Draggable>
    );
};

export default DraggableComponent;
