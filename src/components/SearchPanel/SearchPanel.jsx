import "./search_panel.css";
import { ResultCard } from "./../../resources";

function SearchPanel() {
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
            />
            <input
              type="text"
              name="gpu"
              id="gpu-input"
              placeholder="Ex: GTX 660"
            />
            <input
              type="text"
              name="memory"
              id="memory-input"
              placeholder="Ex: 12"
            />
          </div>
          <div id="bottom">
            <input type="text" name="name" id="name-input" />
          </div>
        </span>
        <span className="panel seventy" id="search-btn-container">
          <div id="search-btn">SEARCH</div>
        </span>
      </div>
      <div className="panel ninety" id="results-panel">
        <ResultCard />
      </div>
    </div>
  );
}

export default SearchPanel;
