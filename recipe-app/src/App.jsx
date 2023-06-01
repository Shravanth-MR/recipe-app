import "./App.css";
import Home from "./pages/Home";
import Pages from "./pages/Pages";
import Category from "./components/category";
import { BrowserRouter } from "react-router-dom";
import Search from "./components/Search";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Search />
        <Category />
        <Pages />
      </BrowserRouter>
    </div>
  );
}

export default App;
