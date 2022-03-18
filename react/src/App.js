import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Defaultpage from "./Component/Dashboard/Defaultpage";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/*" exact element={<Defaultpage/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
