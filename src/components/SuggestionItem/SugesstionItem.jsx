import "./suggestion-item.css";

function SuggestionItem({ value, clickHandle }) {
    return (
        <div className="suggestion-item" onClick={() => clickHandle(value)}>{value}</div>
    )
}

export default SuggestionItem;