import { DragDropContext, Droppable, DropResult, ResponderProvided } from 'react-beautiful-dnd';

const DroppableComponent = (onDragEnd: (result: DropResult, provided: ResponderProvided) => void) => (props: any) => {
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId={'droppableId'} direction="horizontal">
                {(provided) => {
                    return (
                        <div {...props} ref={provided.innerRef} {...provided.droppableProps}>
                            {props.children}
                            {provided.placeholder}
                        </div>
                    );
                }}
            </Droppable>
        </DragDropContext>
    );
};

export default DroppableComponent;
