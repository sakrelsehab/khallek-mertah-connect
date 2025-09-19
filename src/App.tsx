import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Home, Truck, Building, Car, Wrench, Headphones, HelpCircle, MessageCircle, Shield } from "lucide-react";

import DeliveryServices from "./DeliveryServices";
import RealEstate from "./RealEstate";
import Cars from "./Cars";
import Equipment from "./Equipment";
import Support from "./Support";
import HelpCenter from "./HelpCenter";
import FAQ from "./FAQ";
import PrivacyPolicy from "./PrivacyPolicy";

interface MenuItem {
  name: string;
  path: string;
  icon: JSX.Element;
}

function App() {
  const menuItems: MenuItem[] = [
    { name: "خدمات التوصيل", path: "/delivery", icon: <Truck size={28} /> },
    { name: "العقارات", path: "/realestate", icon: <Building size={28} /> },
    { name: "السيارات", path: "/cars", icon: <Car size={28} /> },
    { name: "المعدات", path: "/equipment", icon: <Wrench size={28} /> },
    { name: "الدعم", path: "/support", icon: <Headphones size={28} /> },
    { name: "مركز المساعدة", path: "/help", icon: <HelpCircle size={28} /> },
    { name: "الأسئلة الشائعة", path: "/faq", icon: <MessageCircle size={28} /> },
    { name: "سياسة الخصوصية", path: "/privacy", icon: <Shield size={28} /> },
  ];

  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-10 flex items-center gap-2">
          <Home size={32} className="text-blue-500" /> خليك مرتاح
        </h1>

        <div className="grid grid-cols-2 gap-6 w-full max-w-md">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className="flex flex-col items-center justify-center bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition"
            >
              <div className="text-blue-500 mb-3">{item.icon}</div>
              <span className="text-gray-700 font-semibold text-lg text-center">
                {item.name}
              </span>
            </Link>
          ))}
        </div>

        <Routes>
          <Route path="/delivery" element={<DeliveryServices />} />
          <Route path="/realestate" element={<RealEstate />} />
          <Route path="/cars" element={<Cars />} />
          <Route path="/equipment" element={<Equipment />} />
          <Route path="/support" element={<Support />} />
          <Route path="/help" element={<HelpCenter />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
        </Routes>
      </div>
    </Router>
  );
}
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
