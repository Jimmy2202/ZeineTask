import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import { MdDoneOutline } from "react-icons/md";

function ToDo({ text, done, onToggleDone, funcDelete, editIndex }) {
  return (
    <div
      className={`relative sm-custom:w-[70vw] sm-custom:h-[70vw] w-[15vw] min-h-[15vw] p-3 flex flex-col justify-center items-center
                  ${done ? "bg-green-700/80" : "bg-green-600"}
                  text-white font-alumni rounded transition-all duration-300 ease-in-out`}
    >
      <FaPencilAlt
        onClick={editIndex}
        className="absolute top-3 right-4 hover:scale-105 hover:text-green-950 hover:cursor-pointer"
        title="Editar"
      />
      <FaTrashAlt
        onClick={funcDelete}
        className="absolute top-3 right-14 hover:text-green-950 hover:cursor-pointer"
        title="Excluir"
      />
      <MdDoneOutline
        onClick={onToggleDone}
        className={`absolute top-3 right-24 hover:text-green-950 hover:cursor-pointer ${
          done ? "opacity-70" : ""
        }`}
        title={done ? "Desmarcar" : "Concluir"}
        aria-pressed={done}
      />

      <p
        className={`mt-6 w-full text-center px-2 break-words ${
          done ? "line-through decoration-2 decoration-white/80 opacity-60" : ""
        }`}
      >
        {text}
      </p>
    </div>
  );
}

export default ToDo;
