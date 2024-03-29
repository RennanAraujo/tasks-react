import { useState, useEffect } from "react";

export default function App() {
  const [input, setInput] = useState(""); //Funciona como um get/set da OOP
  const [tasks, setTasks] = useState<string[]>([]);
  const [editTask, setEditTask] = useState({
    enabled: false,
    task: "",
  });

  useEffect(() => {
    //Para conservar os valores no local storage quando a página for recarregada ou navegador fechado
    const tarefasSalvas = localStorage.getItem("@curso-react");

    if (tarefasSalvas) {
      setTasks(JSON.parse(tarefasSalvas));
    }
  }, []);

  function handleRegister() {
    if (!input) {
      alert("Não pode ser vazio");
      return;
    }
    if (editTask.enabled) {
      handleSaveEdit();
      return;
    }
    setTasks((tarefas) => [...tarefas, input]); //Adiciona o input à lista já existente
    setInput("");
    localStorage.setItem("@curso-react", JSON.stringify([...tasks, input])); //Primeira vez que ele define
    return alert(`O item ${input} será adicionado`); //Diretiva return deve ser a última
  }

  function handleSaveEdit() {
    const findIndexTask = tasks.findIndex((task) => task === editTask.task);
    const allTasks = [...tasks];

    allTasks[findIndexTask] = input; //Substitui o valor atual da task encontrada pelo valor do input
    setTasks(allTasks);

    setEditTask({
      enabled: false,
      task: "",
    });
    setInput("");
    localStorage.setItem("@curso-react", JSON.stringify(allTasks));
  }

  function handleDelete(item: string) {
    const removeTask = tasks.filter(
      (task) => task !== item
    ); /*Filtro, daí passa apenas aquilo que não seja o item*/
    setTasks(removeTask);
    return alert(`Item a excluir: ${item}`);
  }

  function handleEdit(item: string) {
    setInput(item);
    setEditTask({
      enabled: true,
      task: item,
    });
    return alert(`Editando item ${item}`);
  }

  return (
    <div>
      <h1>Roteiro padrão - simulado</h1>
      <input
        placeholder="Digite o nome da tarefa..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={handleRegister}>
        {editTask.enabled ? "Atualizar tarefa" : "Adicionar tarefa"}
      </button>
      {/*Ao clicar, chama a função handleRegister*/}
      <hr />
      {tasks.map((item) => (
        <section key={item}>
          <span>{item}</span> {/*Com Span o botão sai do lado */}
          <button onClick={() => handleEdit(item)}>Editar</button>
          <button onClick={() => handleDelete(item)}>Excluir</button>{" "}
          {/*Ao clicar, chama a função handleDelete*/}
        </section>
      ))}
    </div>
  );
}
