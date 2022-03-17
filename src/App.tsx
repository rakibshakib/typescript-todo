import { useState } from 'react';
import './App.css';
import InputField from './components/InputField';

function App() {
  const [todos, setTodos] = useState<string>("");
  console.log(todos);
  return (
    <div className="App container mx-auto">
      <h2 className="text-xl text-black font-medium uppercase text-center z-10 py-5">TO-DO fication</h2>
      <InputField todo={todos}
          setTodo={setTodos} />
    </div>
  );
}

export default App;
