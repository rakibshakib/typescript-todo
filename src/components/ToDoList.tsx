import React from 'react';
import { TODO } from '../model';
import SingleToDo from './SingleToDo';
import { Droppable } from 'react-beautiful-dnd';

interface Props {
    todos: TODO[];
    setTodos: React.Dispatch<React.SetStateAction<TODO[]>>;
    completedTodos: TODO[];
    setcompletedTodos: React.Dispatch<React.SetStateAction<TODO[]>>;
}
const ToDoList: React.FC<Props> = ({
    todos,
    setTodos,
    completedTodos,
    setcompletedTodos,
}) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 justify-center my-5">
            <Droppable droppableId="TodoList">
                {(provided, snapshot) => (
                    <div
                        className={`active__task bg-yellow-200 p-5 rounded-lg ${
                            snapshot.isDraggingOver ? 'dragactive' : ''
                        }`}
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        <h4 className="text-center text-2xl font-medium py-2 border-b-2 border-black">
                            Active Task
                        </h4>
                        <div>
                            {todos.map((item, index) => (
                                <SingleToDo
                                    index={index}
                                    key={item.id}
                                    todo={item}
                                    todos={todos}
                                    setTodos={setTodos}
                                ></SingleToDo>
                            ))}
                        </div>
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
            <Droppable droppableId="TodoRemove">
                {(provided, snapshot) => (
                    <div
                        className={`complete__task bg-green-200 p-5 rounded-lg ${
                            snapshot.isDraggingOver ? 'dragcomplete' : ''
                        }`}
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        <h4 className="text-center text-2xl font-medium py-2 border-b-2 border-black">
                            Complete Task
                        </h4>
                        <div>
                            {completedTodos.map((item, index) => (
                                <SingleToDo
                                    index={index}
                                    key={item.id}
                                    todo={item}
                                    todos={completedTodos}
                                    setTodos={setcompletedTodos}
                                ></SingleToDo>
                            ))}
                        </div>
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    );
};

export default ToDoList;
