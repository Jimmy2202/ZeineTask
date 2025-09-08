import { useState } from "react";

function NewToDo({ addToDo, onCancel }) {
  const [texto, setTexto] = useState("");
  return (
    <div className="w-screen h-screen flex justify-center items-center backdrop-blur-md">
      <div className="w-[80%] h-[80%] shadow-xl shadow-green-950 rounded-2xl flex flex-col gap-6 justify-center items-center">
        <input
          type="text"
          name=""
          id=""
          placeholder="Digite a tarefa: "
          className="p-5 w-[90%] h-[70%] text-white text-center border-[4px] border-green-900 bg-black/[0.6]"
          onChange={(e) => setTexto(e.target.value)}
        />
        <button
          onClick={() => {
            addToDo({ status: true, content: texto, done: false });
            onCancel();
          }}
          className="rounded-lg bg-green-500 border-green-600 border-[3px] text-white w-[90%] pt-2 pb-2 hover:bg-green-900 hover:text-green-300"
        >
          Criar
        </button>
      </div>
    </div>
  );
}

export default NewToDo;
