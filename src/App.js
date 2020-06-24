import React, { useState, useEffect } from "react";
import api from "./services/api";
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get("repositories").then((resp) => {
      setRepositories(resp.data);
    });
  }, []);

  async function handleAddRepository() {
    const result = await api.post("repositories", {
      title: `Repositorio: ${Date.now()}`,
      url: "http://github.com/...",
      techs: ["Node.js", "..."],
    });

    setRepositories([...repositories, result.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    const newList = repositories.filter((repo) => repo.id !== id);
    setRepositories(newList);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories && repositories.length > 0 ? (
          repositories.map((repo) => (
            <li key={repo.id}>
              {repo.title}
              <button onClick={() => handleRemoveRepository(repo.id)}>
                Remover
              </button>
            </li>
          ))
        ) : (
          <></>
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
