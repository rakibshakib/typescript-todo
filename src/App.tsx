import { useState } from 'react';
import './App.css';
import InputField from './components/InputField';
import ToDoList from './components/ToDoList';
import { TODO } from './model';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

function App() {
    const [todo, setTodo] = useState<string | number>('');
    const [todos, setTodos] = useState<TODO[]>([]);
    const [completedTodos, setcompletedTodos] = useState<TODO[]>([]);

    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();
        if (todo) {
            setTodos([...todos, { id: Date.now(), todo, isComplete: false }]);
            setTodo('');
        }
    };
    // console.log(todos);
    const onDragEnd = (result: DropResult) => {
        const { source, destination } = result;
        if (!destination) return;
        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        )
            return;
        let add;
        let active = todos;
        let complete = completedTodos;
        // Source Logic
        if (source.droppableId === 'TodoList') {
            add = active[source.index];
            active.splice(source.index, 1);
        } else {
            add = complete[source.index];
            complete.splice(source.index, 1);
        }
        // /destination logic
        if (destination.droppableId === 'TodoList') {
            active.splice(destination.index, 0, add);
        } else {
            complete.splice(destination.index, 0, add);
        }
        setcompletedTodos(complete);
        setTodos(active);
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="App">
                <h2 className="text-3xl text-white font-medium uppercase text-center py-5 heading">
                    TO-DO fication
                </h2>
                <div className="container mx-auto">
                    <InputField
                        todo={todo}
                        setTodo={setTodo}
                        handleAdd={handleAdd}
                    />
                    <ToDoList
                        todos={todos}
                        setTodos={setTodos}
                        completedTodos={completedTodos}
                        setcompletedTodos={setcompletedTodos}
                    />
                </div>
            </div>
        </DragDropContext>
    );
}

export default App;
