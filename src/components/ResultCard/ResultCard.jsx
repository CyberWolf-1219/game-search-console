import "./resultcard.css";

function ResultCard({ name, dev, year, genres, cpu, gpu, memory, id, index }) {
  const changeDescriptionPanel = (e) => {
    const cardId = e.target.getAttribute("data-card-id");
    const resultCard = document.getElementById(cardId);

    const detailsHeader = resultCard.querySelector("#details-header");
    const detailsPanel = resultCard.querySelector("#details-panel");
    const systemHeader = resultCard.querySelector("#system-header");
    const systemPanel = resultCard.querySelector("#system-panel");

    detailsHeader.classList.toggle("active");
    systemHeader.classList.toggle("active");
    detailsPanel.classList.toggle("hidden");
    systemPanel.classList.toggle("hidden");
  };

  return (
    <div className="panel result-card" id={id} style={{ animationDelay: `${index * 0.25}s` }} >
      <img src="" alt="" />
      <span id="description">
        <div id="header">
          <span
            className="active"
            id="details-header"
            data-card-id={id}
            onClick={changeDescriptionPanel}
          >
            Details
          </span>
          <span
            className=""
            id="system-header"
            data-card-id={id}
            onClick={changeDescriptionPanel}
          >
            System Req.
          </span>
        </div>
        <div id="section-container">
          <div id="details-panel">
            <li id="name">Name: {name}</li>
            <li id="dev">Developer: {dev}</li>
            <li id="year">Year: {year}</li>
            <li id="genres">Genres: {genres.join(" / ")}</li>
          </div>
          <div className="hidden" id="system-panel">
            <li id="cpu">Processors: {cpu.join(" / ")}</li>
            <li id="gpu">Graphic Units: {gpu.join(" / ")}</li>
            <li id="memory">Memory: {(memory / 1024).toString() + " GB"}</li>
          </div>
        </div>
      </span>
    </ div>
  );
}

export default ResultCard;
