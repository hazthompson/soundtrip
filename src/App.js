import logo from "./logo.svg";
import "./App.css";
import { EVENTS_QUERY } from "utils/queries";
import { useQuery } from "@apollo/client";

function App() {
  const { loading, data } = useQuery(EVENTS_QUERY);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Soundtrip</p>
        <div>
          {loading
            ? "loading"
            : data.events.map((event, index) => <p key={index}>{event.artistName}</p>)}
        </div>
      </header>
    </div>
  );
}

export default App;
