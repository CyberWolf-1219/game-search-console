import "./search_panel.css";
import { ResultCard, API_URL, SuggestionItem } from "./../../resources";
import { useState } from "react";

function SearchPanel() {
  const [ cpu, setCpu ] = useState("");
  const [ gpu, setGpu ] = useState("");
  const [ memory, setMemory ] = useState("");
  const [ name, setName ] = useState("");
  const [ games, setGames ] = useState([]);
  const [ cpuSuggestions, setCpuSuggestions ] = useState([]);
  const [ gpuSuggestions, setGpuSuggestions ] = useState([]);
  const [ nameSuggestions, setNameSuggestions ] = useState([]);

  // SEARCH FUNCTION
  const search = () => {
    const data = {
      cpu: document.getElementById("cpu-input").value,
      gpu: document.getElementById("gpu-input").value,
      memory: document.getElementById("memory-input").value,
      name: document.getElementById("name-input").value,
    };
    fetch(API_URL + "/search", {
      method: "POST",
      headers: { 'Content-Type': "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setGames(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // AUTOSUGGESTION
  const get_suggestions = (categoy, val) => {
    const data = {
      value: val,
    };

    fetch(API_URL + "/search/" + categoy, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        if (categoy === 'cpu') {
          setCpuSuggestions(result);
        } else if (categoy === 'gpu') {
          setGpuSuggestions(result);
        } else if (categoy === 'name') {
          setNameSuggestions(result);
        }
      })
      .catch((error) => console.log(error));
  };

  // SUGGESTION TRIGGER
  const inputStateChange = (name, e) => {
    const value = e.target.value;
    if (name === "cpu") {
      setCpu(e.target.value.toUpperCase());
      if (value !== "") {
        get_suggestions("cpu", value);
      } else {
        setCpuSuggestions([]);
      }
    } else if (name === "gpu") {
      setGpu(e.target.value.toUpperCase());
      if (value !== "") {
        get_suggestions("gpu", value);
      } else {
        setGpuSuggestions([]);
      }
    } else if (name === "name") {
      setName(e.target.value.toUpperCase());
      if (value !== "") {
        get_suggestions("name", value);
      } else {
        setNameSuggestions([]);
      }
    }
  };

  // SUGGESTION ITEM ONCLICK HANDLE
  const cpuSuggestionClick = (value) => {
    setCpu(value)
    setCpuSuggestions([]);
  }

  const gpuSuggestionClick = (value) => {
    setGpu(value)
    setGpuSuggestions([]);
  }

  const nameSuggestionClick = (value) => {
    setName(value)
    setNameSuggestions([]);

  }

  return (
    <div id="search-panel" className="panel thirty">
      <div id="search-console">
        <span className="panel seventy" id="search-options-panel">
          <div id="top">
            <div className="input-wrapper cpu">
              <input
                type="text"
                name="cpu"
                id="cpu-input"
                placeholder="Ex: i5-6500"
                onChange={(e) => inputStateChange("cpu", e)}
                // onBlur={() => { setCpuSuggestions([]) }}
                value={cpu}
              />
              <div className="suggestion-wrapper">
                {cpuSuggestions.length !== 0 && cpuSuggestions.map((suggestion) => {
                  return <SuggestionItem key={suggestion._id} value={suggestion.MODEL} clickHandle={cpuSuggestionClick} />
                })}
              </div>
            </div>

            <div className="input-wrapper gpu">
              <input
                type="text"
                name="gpu"
                id="gpu-input"
                placeholder="Ex: GTX 660"
                onChange={(e) => inputStateChange("gpu", e)}
                // onBlur={() => { setGpuSuggestions([]) }}
                value={gpu}
              />
              <div className="suggestion-wrapper">
                {gpuSuggestions.length !== 0 && gpuSuggestions.map((suggestion) => {
                  return <SuggestionItem key={suggestion._id} value={suggestion.NAME} clickHandle={gpuSuggestionClick} />
                })}
              </div>
            </div>

            <div className="input-wrapper">
              <input
                type="text"
                name="memory"
                id="memory-input"
                placeholder="Ex: 12"
                onChange={(e) => setMemory(e.target.value)}
                value={memory}
              />
            </div>
          </div>
          <div id="bottom">
            <div className="input-wrapper name">
              <input
                type="text"
                name="name"
                id="name-input"
                placeholder="Metal Gear Solid V"
                onChange={(e) => inputStateChange("name", e)}
                // onBlur={() => { setNameSuggestions([]) }}
                value={name}
              />
              <div className="suggestion-wrapper">
                {nameSuggestions.length !== 0 && nameSuggestions.map((suggestion) => {
                  return <SuggestionItem key={suggestion._id} value={suggestion.DETAILS.NAME} clickHandle={nameSuggestionClick} />
                })}
              </div>
            </div>
          </div>
        </span>
        <span className="panel seventy" id="search-btn-container">
          <div id="search-btn" onClick={search}>
            SEARCH
          </div>
        </span>
      </div>
      <div className="panel ninety" id="results-panel">
        {
          games.map((game) => {
            return (
              <ResultCard
                key={game._id}
                id={game._id}
                name={game.DETAILS.NAME}
                dev={game.DETAILS.DEVELOPER}
                year={game.DETAILS.RELEASE_YEAR}
                genres={game.DETAILS.GENRES}
                cpu={game.SYSTEM_REQUIREMENTS.PROCESSORS}
                gpu={game.SYSTEM_REQUIREMENTS.GRAPHICS}
                memory={game.SYSTEM_REQUIREMENTS.MEMORY}
              />
            );
          })
        }
      </div>
    </div>
  );
}

export default SearchPanel;
