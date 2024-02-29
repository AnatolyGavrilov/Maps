import { Link} from "react-router-dom";
import { Routes } from "./enum";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Link to={Routes.USERS}>Перейти к пользователям</Link>
      </header>
    </div>
  );
}

export default App;
