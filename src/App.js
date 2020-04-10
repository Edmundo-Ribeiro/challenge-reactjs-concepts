import React, { useState, useEffect } from "react";

import "./styles.css";
import api from "./services/api";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect( () => {
    api.get('repositories').then( ({data}) => setRepositories(data));
  }, []);

  async function handleAddRepository() {
    const newRepository = {
      url: "https://github.com/josepholiveira",
      title: "Desafio ReactJS",
      techs: ["React", "Node.js"],
    };

    const {data} = await api.post('repositories',newRepository);
    setRepositories([...repositories,data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
    setRepositories(repositories.filter(({id:pid}) => pid !== id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map( (repository) => {
          return(
            <li key={repository.id}> {repository.title}
              <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
              </button>
            </li>
          )})
        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
