import "./App.css";
import FormController from "./components/form-controller/FormController";
import data from "./data/dishes.json";

function App() {
  return (
    <div className="App">
      <h1>Restaurant Order System</h1>
      <FormController data={data} />
    </div>
  );
}

export default App;
