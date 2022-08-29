import "./resultcard.css";

function ResultCard() {
  return (
    <div className="panel result-card">
      <img src="" alt="" srcset="" />
      <span id="description">
        <div id="header">
          <span className="active" id="details">
            Details
          </span>
          <span id="system">System Req.</span>
        </div>
        <div id="section-container">
          <div id="details-panel">
            <li id="name">Name: Grand Theft Auto V</li>
            <li id="dev">Developer: Rockstar Studio</li>
            <li id="year">Year: 2012</li>
            <li id="genres">Genres: Open-World RPG Simulation</li>
          </div>
          <div className="hidden" id="system-panel">
            <li id="cpu">Intel Core i5-6500</li>
            <li id="gpu">GTX 1060</li>
            <li id="memory">12 GB</li>
            <li id="dx">2012</li>
            <li id="vc">2012</li>
          </div>
        </div>
      </span>
    </div>
  );
}

export default ResultCard;
