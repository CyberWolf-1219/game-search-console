import "./search_panel.css";
import { ResultCard, API_URL, SuggestionItem } from "./../../resources";
import { useEffect, useState } from "react";

function SearchPanel() {
  const [cpu, setCpu] = useState("");
  const [gpu, setGpu] = useState("");
  const [memory, setMemory] = useState("");
  const [name, setName] = useState("");
  const [games, setGames] = useState([]);
  const [cpuSuggestions, setCpuSuggestions] = useState([]);
  const [gpuSuggestions, setGpuSuggestions] = useState([]);
  const [nameSuggestions, setNameSuggestions] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);

  useEffect(() => {
    search();
  }, [pageNumber]);

  // SEARCH FUNCTION
  const search = () => {
    const data = {
      cpu: document.getElementById("cpu-input").value,
      gpu: document.getElementById("gpu-input").value,
      memory: document.getElementById("memory-input").value,
      name: document.getElementById("name-input").value,
      sorting: document.getElementById("sort").value,
      pageNumber: pageNumber,
    };
    setGames([]);

    fetch(API_URL + "/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
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
        if (categoy === "cpu") {
          setCpuSuggestions(result);
        } else if (categoy === "gpu") {
          setGpuSuggestions(result);
        } else if (categoy === "name") {
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
    setCpu(value);
    setCpuSuggestions([]);
  };

  const gpuSuggestionClick = (value) => {
    setGpu(value);
    setGpuSuggestions([]);
  };

  const nameSuggestionClick = (value) => {
    setName(value);
    setNameSuggestions([]);
  };

  // MISC FUNCS
  // const hideToggle = (e) => {
  //   const element = e.target;
  //   element.classList.toggle("hide");
  // }

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
                {cpuSuggestions.length !== 0 &&
                  cpuSuggestions.map((suggestion) => {
                    return (
                      <SuggestionItem
                        key={suggestion._id}
                        value={suggestion.MODEL}
                        clickHandle={cpuSuggestionClick}
                      />
                    );
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
                {gpuSuggestions.length !== 0 &&
                  gpuSuggestions.map((suggestion) => {
                    return (
                      <SuggestionItem
                        key={suggestion._id}
                        value={suggestion.NAME}
                        clickHandle={gpuSuggestionClick}
                      />
                    );
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
                {nameSuggestions.length !== 0 &&
                  nameSuggestions.map((suggestion) => {
                    return (
                      <SuggestionItem
                        key={suggestion._id}
                        value={suggestion.DETAILS.NAME}
                        clickHandle={nameSuggestionClick}
                      />
                    );
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
      <div className="" id="filter-container">
        <select id="filter" className="option-container panel forty-five">
          <option value="">UNFILTERED</option>
          <option value={1}>option one</option>
          <option value={2}>option two</option>
          <option value={3}>option three</option>
          <option value={4}>option four</option>
          <option value={5}>option five</option>
        </select>

        <select id="sort" className="option-container panel forty-five">
          <option value="">UNSORTED</option>
          <option value={"NAME"}>NAME</option>
          <option value={"DEVELOPER"}>DEVELOPER</option>
          <option value={"YEAR"}>YEAR</option>
        </select>
      </div>
      <div className="panel ninety" id="results-panel">
        {games.map((game, index) => {
          return (
            <ResultCard
              key={index}
              id={game._id}
              name={game.DETAILS.NAME}
              dev={game.DETAILS.DEVELOPER}
              year={game.DETAILS.RELEASE_YEAR}
              genres={game.DETAILS.GENRES}
              cpu={game.SYSTEM_REQUIREMENTS.PROCESSORS}
              gpu={game.SYSTEM_REQUIREMENTS.GRAPHICS}
              memory={game.SYSTEM_REQUIREMENTS.MEMORY}
              index={index}
              imgSrc={game.DETAILS.IMG}
            />
          );
        })}
      </div>
      <div id="page-btn-container">
        <span
          className="page-btn"
          id="left-page"
          onClick={() => {
            setPageNumber(pageNumber - (pageNumber === 0 ? 0 : 1));
          }}
        >
          ◀ PREVIOUS
        </span>
        <span className="page-btn" id="page-number-display">
          {pageNumber + 1}
        </span>
        <span
          className="page-btn"
          id="right-page"
          onClick={() => {
            setPageNumber(pageNumber + 1);
          }}
        >
          NEXT ▶
        </span>
      </div>
    </div>
  );
}

export default SearchPanel;
