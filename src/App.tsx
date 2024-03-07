import { useState } from "react"

export default function App() {

  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState([
    'Baixar',
    'Limpar',
    'Imprimir',
    'Fazer',
    'Colocar no ranking',
    'Corrigir'
  ]);

  function handleRegister() {
    if (!input) {
      alert("Não pode ser vazio")
      return;
    }

    setTasks(tarefas => [...tarefas, input]) //Adiciona o input à lista já existente
    setInput("")
    return alert(`O item ${input} será adicionado`)
  }

  function handleDelete(item: string) {
    const removeTask = tasks.filter(task => task !== item) /*Filtro, daí passa apenas aquilo que não seja o item*/
    setTasks(removeTask)
    return alert(`Item a excluir: ${item}`);
  }

  function handleEdit(item: string) {
    setInput(item)
    return alert(`Editando item ${item}`);
  }

  return (
    <div>
      <h1>Roteiro padrão - simulado</h1>
      <input
        placeholder="Digite o nome da tarefa..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        type="text"
      />
      <button onClick={handleRegister}>Adicionar tarefa</button> {/*Ao clicar, chama a função handleRegister*/}

      <hr />

      {tasks.map((item) => (
        <section key={item}>
          <span>{item}</span> {/*Com Span o botão sai do lado */}
          <button onClick={() => handleEdit(item)}>Editar</button>
          <button onClick={() => handleDelete(item)}>Excluir</button> {/*Ao clicar, chama a função handleDelete*/}
        </section>
      ))}
    </div>
  )
}