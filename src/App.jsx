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

import Salbs from "./pages/Slabs";
import Pipe from "./pages/pipe";
import Table from "./pages/Table";
import Contact from "./pages/Contact";
import News from "./pages/News";
import About from "./pages/About";
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
            <Route path="/product/1" element={<Salbs />} />
            <Route path="/product/2" element={<AboutBluck />} />
            <Route path="/product/3" element={<Pipe />} />
            <Route path="/product/4" element={<Table />} />
            <Route path="/NewsLanding" element={<NewsLanding />} />
            <Route path="/Contact" element={<Contact />} />
            <Route path="/News" element={<News />} />
            <Route path="/About" element={<About />} />
          </Routes>
        </ApiProvider>
      </QueryClientProvider>
    </Router>
  );
}

export default App;
