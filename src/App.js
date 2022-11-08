import { Routes, Route } from "react-router-dom";
import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";

function Shop() {
  return <div>Shop</div>
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="test" element={<Shop />} />
      </Route>
    </Routes>
  );
}

export default App;
