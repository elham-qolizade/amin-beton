import "./App.css";
import LoginForm from "./features/auth/LoginForm";
import Home from "./pages/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProjectPage from "./user-panel/ProjectPage";
import { ApiProvider } from "./Context/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Addproject from "./user-panel/AddProjectForm";
import OrdersPage from "./user-panel/OrdersPage";
import HistoryProject from "./user-panel/HistoryProject";
import SaleProject from "./Sales/SaleProject";
import SecondSalePage from "./Sales/SecendSalePage";
import UserForm from "./Sales/UserForm ";
import AboutBluck from "./pages/AboutBluck";
import NewsLanding from "./ui/NewsLanding";
const queryClient = new QueryClient();

function App() {
  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <ApiProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/LoginForm" element={<LoginForm />} />
            <Route path="/OrdersPage" element={<OrdersPage />} />
            <Route path="/HistoryProject" element={<HistoryProject />} />
            <Route path="/Addproject" element={<Addproject />} />
            <Route path="/ProjectPage" element={<ProjectPage />} />
            <Route path="/SaleProject" element={<SaleProject />} />
            <Route path="/SecondSalePage" element={<SecondSalePage />} />
            <Route path="/UserForm" element={<UserForm />} />{" "}
            <Route path="/AboutBluck" element={<AboutBluck />} />
            <Route path="/NewsLanding" element={<NewsLanding />} />
          </Routes>
        </ApiProvider>
      </QueryClientProvider>
    </Router>
  );
}

export default App;
