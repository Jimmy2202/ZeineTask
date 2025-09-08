import { useEffect, useState, useMemo } from "react";
import { IoIosAdd } from "react-icons/io";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import { MdDoneOutline } from "react-icons/md";
import ToDo from "./ToDo";
import NewToDo from "./NewToDo";
import EditedToDo from "./EditedToDo";

const KEY = "all";
const MAX_CHARS = 160;

// TIPOS DE FILTRO
const FILTERS = {
  ALL: "all",
  DONE: "done",
  TODO: "todo",
};

function Menu() {
  const [array, setArray] = useState(() => {
    try {
      const raw = localStorage.getItem(KEY) ?? "[]";
      return JSON.parse(raw);
    } catch {
      return [];
    }
  });

  const [add, setAdd] = useState(false);
  const [edit, setEdit] = useState(false);
  const [indexedit, setIndexEdit] = useState();

  const [expanded, setExpanded] = useState({});

  const [filter, setFilter] = useState(FILTERS.ALL);

  function toggleExpand(id) {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  function addTodo(textOrTodo) { //cria uma terefa com ids unicos
    const todo =
      typeof textOrTodo === "string"
        ? { id: crypto.randomUUID(), content: textOrTodo, done: false }
        : { id: crypto.randomUUID(), done: false, ...textOrTodo };

    setArray((prev) => [...prev, todo]);
    setAdd(false);
  }

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(array));
  }, [array]);

  function getDisplayText(text, isExpanded) {
    if (isExpanded || text.length <= MAX_CHARS) return text;
    return text.slice(0, MAX_CHARS).trimEnd() + "…";
  }

  const view = useMemo(() => {
    //uso o memo pra guardar a lista de view atualizadaa cada mudança do array e do filter
    const items = array.map((el, idx) => ({ element: el, originalIndex: idx }));
    const reversed = [...items].reverse(); //inverto o array para colocar as tarefas mais novas em primeiro e não em último

    switch (filter) {
      case FILTERS.DONE:
        return reversed.filter(({ element }) => element.done); //filtro as feitas
      case FILTERS.TODO:
        return reversed.filter(({ element }) => !element.done); //filtro as não feitas
      default:
        return reversed; //mostro todas
    }
  }, [array, filter]);

  const counters = useMemo(() => {
    let done = 0;
    for (const t of array) if (t.done) done++;
    return { all: array.length, done, todo: array.length - done };
  }, [array]);

  return (
    <div className="w-screen min-h-screen p-10 bg-black/[0.7] backdrop-blur flex justify-center items-center">
      {!add && !edit ? (
        <div className="w-full h-full flex flex-col gap-3 p-2 sm-custom:items-center">
          <div className="flex sm-custom:flex-col items-center gap-2">
            <button
              onClick={() => setAdd(true)}
              className="w-[20vw] h-[20vw] sm-custom:w-[70vw] hover:scale-105 hover:bg-green-900 transition-all duration-300 ease-in-out p-3 flex flex-col justify-center items-center bg-green-600 text-white font-bruno relative rounded"
              title="Adicionar tarefa"
            >
              <IoIosAdd className="w-[90%] h-[90%]" />
              Adicionar Tarefa
            </button>

            <div className="flex gap-2 ml-auto sm-custom:ml-0">
              <button
                type="button"
                onClick={() => setFilter(FILTERS.ALL)}
                aria-pressed={filter === FILTERS.ALL}
                className={`px-3 py-2 rounded text-sm transition ${
                  filter === FILTERS.ALL
                    ? "bg-white text-black"
                    : "bg-white/10 text-white hover:bg-white/20"
                }`}
                title="Mostrar todas"
              >
                Todas ({counters.all})
              </button>
              <button
                type="button"
                onClick={() => setFilter(FILTERS.TODO)}
                aria-pressed={filter === FILTERS.TODO}
                className={`px-3 py-2 rounded text-sm transition ${
                  filter === FILTERS.TODO
                    ? "bg-white text-black"
                    : "bg-white/10 text-white hover:bg-white/20"
                }`}
                title="Mostrar não concluídas"
              >
                Não concluídas ({counters.todo})
              </button>
              <button
                type="button"
                onClick={() => setFilter(FILTERS.DONE)}
                aria-pressed={filter === FILTERS.DONE}
                className={`px-3 py-2 rounded text-sm transition ${
                  filter === FILTERS.DONE
                    ? "bg-white text-black"
                    : "bg-white/10 text-white hover:bg-white/20"
                }`}
                title="Mostrar concluídas"
              >
                Concluídas ({counters.done})
              </button>
            </div>
          </div>

          <div className="w-full h-full flex flex-wrap sm-custom:flex-col sm-custom:justify-center sm-custom:items-center gap-2">
            {view.map(({ element, originalIndex }) => { //mapeio o view com a lista especifica das tarefas em detrimento do filtro
              const id = element.id ?? String(originalIndex);
              const isExpanded = !!expanded[id];
              const fullText = element.content ?? "";
              const displayText = getDisplayText(fullText, isExpanded);
              const isLong = fullText.length > MAX_CHARS;

              return (
                <div key={id} className="relative">
                  <ToDo //
                    text={displayText}
                    done={!!element.done}
                    editIndex={() => {
                      setEdit(true);
                      setIndexEdit(originalIndex);
                    }}
                    funcDelete={() => {
                      setArray((prev) => {
                        const copy = [...prev];
                        copy.splice(originalIndex, 1);
                        return copy;
                      });
                    }}
                    onToggleDone={() => {
                      setArray((prev) => {
                        const copy = [...prev];
                        copy[originalIndex] = {
                          ...copy[originalIndex],
                          done: !copy[originalIndex].done,
                        };
                        return copy;
                      });
                    }}
                  >
                    <FaPencilAlt className="absolute top-0 right-0" />
                    <FaTrashAlt className="absolute top-0 right-5" />
                    <MdDoneOutline className="absolute top-0 right-10" />
                  </ToDo>

                  {isLong && (
                    <button
                      type="button"
                      onClick={() => toggleExpand(id)}
                      className="mt-1 text-white hover:underline text-sm"
                      aria-expanded={isExpanded}
                      title={isExpanded ? "Ver menos" : "Ver mais"}
                    >
                      {isExpanded ? "ver menos" : "ver mais"}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ) : add && !edit ? (
        <NewToDo addToDo={addTodo} onCancel={() => setAdd(false)} />
      ) : (
        <EditedToDo
          texto={array[indexedit]?.content ?? ""}
          funcEdit={(text) => {
            setArray((prev) => {
              const copy = [...prev];
              copy[indexedit].content = text;
              return copy;
            });
            setEdit(false);
          }}
          onCancel={() => setEdit(false)}
        />
      )}
    </div>
  );
}

export default Menu;
