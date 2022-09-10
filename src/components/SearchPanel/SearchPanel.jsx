import "./search_panel.css";
import { ResultCard, API_URL } from "./../../resources";
import { useState } from "react";

function SearchPanel() {
  const [cpu, setCpu] = useState("");
  const [gpu, setGpu] = useState("");
  const [memory, setMemory] = useState("");
  const [name, setName] = useState("");
  const [games, setGames] = useState([]);

  const search = () => {
    const data = {
      cpu: document.getElementById("cpu-input").value,
      gpu: document.getElementById("gpu-input").value,
      memory: document.getElementById("memory-input").value,
      name: document.getElementById("name-input").value,
    };

    fetch(API_URL + "/search", {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((response) => {
        response
          .json()
          .then((data) => {
            setGames(data);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div id="search-panel" className="panel thirty">
      <div id="search-console">
        <span className="panel seventy" id="search-options-panel">
          <div id="top">
            <input
              type="text"
              name="cpu"
              id="cpu-input"
              placeholder="Ex: Core i5-6500"
              onChange={(e) => setCpu(e.target.value)}
              value={cpu}
            />
            <input
              type="text"
              name="gpu"
              id="gpu-input"
              placeholder="Ex: GTX 660"
              onChange={(e) => setGpu(e.target.value)}
              value={gpu}
            />
            <input
              type="text"
              name="memory"
              id="memory-input"
              placeholder="Ex: 12"
              onChange={(e) => setMemory(e.target.value)}
              value={memory}
            />
          </div>
          <div id="bottom">
            <input
              type="text"
              name="name"
              id="name-input"
              placeholder="Metal Gear Solid V"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>
        </span>
        <span className="panel seventy" id="search-btn-container">
          <div id="search-btn" onClick={search}>
            SEARCH
          </div>
        </span>
      </div>
      <div className="panel ninety" id="results-panel">
        {games.map((game) => {
          return (
            <ResultCard
              key={game._id}
              id={game._id}
              name={game.DETAILS.NAME}
              dev={game.DETAILS.DEVELOPER}
              year={game.DETAILS.RELEASE_YEAR}
              genres={game.DETAILS.GENRES}
              cpu={game.SYSTEM_REQUIREMENTS.PROCESSOR}
              gpu={game.SYSTEM_REQUIREMENTS.GRAPHICS}
              memory={game.SYSTEM_REQUIREMENTS.MEMORY}
            />
          );
        })}
      </div>
    </div>
  );
}

export default SearchPanel;
