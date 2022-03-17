import React from 'react';
import { TODO } from '../model';
import { FaEdit } from 'react-icons/fa';
import { AiFillDelete } from 'react-icons/ai';
import { MdDownloadDone } from 'react-icons/md';
import { Draggable } from 'react-beautiful-dnd';
type Props = {
    todo: TODO;
    todos: TODO[];
    setTodos: React.Dispatch<React.SetStateAction<TODO[]>>;
    index: number;
};
const SingleToDo = ({ todo, todos, setTodos, index }: Props) => {
    const [edit, setEdit] = React.useState<boolean>(false);
    const [editTodo, seteditTodo] = React.useState<string | number>(todo?.todo);
    const inputRef = React.useRef<HTMLInputElement>(null);

    // todo done function
    const handleDone = (id: number) => {
        setTodos(
            todos.map((item) =>
                item.id === id
                    ? { ...item, isComplete: !item.isComplete }
                    : item
            )
        );
    };
    // todo delete function
    const handleDelete = (id: number) => {
        setTodos(todos.filter((item) => item.id !== id));
    };
    // edit todo
    const handleEdit = (e: React.FormEvent, id: number) => {
        e.preventDefault();
        setTodos(
            todos.map((item) =>
                item.id === id ? { ...item, todo: editTodo } : item
            )
        );
        setEdit(false);
    };
    // do focus when edit the todo name
    React.useEffect(() => {
        inputRef.current?.focus();
    }, [edit]);

    return (
        <Draggable draggableId={`${todo?.id}`} index={index}>
            {(provided, snapshot) => (
                <form
                    className={`todos__single ${snapshot.isDragging? "drag" : ""}`}
                    onSubmit={(e) => handleEdit(e, todo.id)}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >
                    {edit ? (
                        <input
                            ref={inputRef}
                            className="text-xl flex-1 focus:bg-yellow-200 bg-orange-100 px-2 py-1"
                            value={editTodo}
                            onChange={(e) => seteditTodo(e.target.value)}
                            type="text"
                        />
                    ) : todo.isComplete ? (
                        <s className="todo__name text-xl flex-1 px-2 py-1">
                            {todo.todo}
                        </s>
                    ) : (
                        <h2 className="todo__name text-xl flex-1 px-2 py-1">
                            {todo.todo}
                        </h2>
                    )}
                    <div className="icons ml-5 text-xl">
                        <span>
                            <FaEdit
                                onClick={() => {
                                    if (!edit && !todo.isComplete) {
                                        setEdit(!edit);
                                    }
                                }}
                                className="text-black inline-block ml-2 cursor-pointer"
                            />
                        </span>
                        <span>
                            <AiFillDelete
                                onClick={() => handleDelete(todo.id)}
                                className="text-black inline-block ml-3 cursor-pointer"
                            />
                        </span>
                        <span>
                            <MdDownloadDone
                                onClick={() => handleDone(todo.id)}
                                className="text-black inline-block ml-3 cursor-pointer"
                            />
                        </span>
                    </div>
                </form>
            )}
        </Draggable>
    );
};

export default SingleToDo;
