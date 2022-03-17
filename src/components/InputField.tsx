import React from 'react';

interface props {
    todo: string | number;
    setTodo: React.Dispatch<React.SetStateAction<string | number>>;
    handleAdd: (e: React.FormEvent) => void;
}
const InputField: React.FC<props> = ({ todo, setTodo, handleAdd }) => {
    const inputRef = React.useRef<HTMLInputElement>(null);
    return (
        <form
            onSubmit={(e) => {
                handleAdd(e);
                inputRef.current?.blur()
            }}
            className="flex items-center relative"
        >
            <input
                ref={inputRef}
                type="text"
                placeholder="Enter Your Task"
                className="py-5 px-5 w-full rounded-md input__box "
                value={todo}
                onChange={(e) => setTodo(e.target.value)}
            />
            <button
                type="submit"
                className="py-2 px-5 text-md font-medium text-black absolute right-0 hover:scale-110"
            >
                ADD
            </button>
        </form>
    );
};

export default InputField;
