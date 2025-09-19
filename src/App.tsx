import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import DeliveryService from "./pages/DeliveryService";
import DeliveryServiceReal from "./pages/DeliveryServiceReal";
import RealEstate from "./pages/RealEstate";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/delivery" element={<DeliveryService />} />
        <Route path="/real-estate" element={<RealEstate />} />
        <Route path="/equipment" element={<DeliveryServiceReal />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;