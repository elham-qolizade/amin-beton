import "./App.css";
import { Navigate } from "react-router-dom";
import Login from "../New folder/app/src/pages/landing/Login";
import GlobalStyles from "./styles/GlobalStyles";
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
import AdminLoginForm from "./features/AdminLoginForm";
// import Dashboard from "./features/auth/Dashboard";
import UserForm from "./Sales/UserForm ";
import AboutBluck from "./pages/AboutBluck";
import NewsLanding from "./ui/NewsLanding";
import NewsDetail from "./pages/NewsDetail";
import Salbs from "./pages/Slabs";
import Pipe from "./pages/pipe";
import Table from "./pages/Table";
import Contact from "./pages/Contact";
import News from "./pages/News";
import About from "./pages/About";
import VibratorPage from "./Sales/VibratorPage";
import PumpPage from "./Sales/PumpPage";
// import FormPage from "./Sales/FormPage";
import FormPage from "./Sales/FormPage";
import ExecutionPanelLayout from "../New folder/app/src/features/execution-panel/ExecutionPanelLayout";
import ExecutionPanelOrders from "../New folder/app/src/features/execution-panel/Orders";
// Financial Panel
import FinancialPanelLayout from "../New folder/app/src/features/financial-panel/FinancialPanelLayout";
import FinancialPanelOrders from "../New folder/app/src/features/financial-panel/Orders";
import ProtectedRoute from "../New folder/app/src/ui/ProtectedRoute";
import "leaflet/dist/leaflet.css";
// import GlobalStyles from "../New folder/app/src/styles/GlobalStyles";
// Lab Panel
import LabPanelLayout from "../New folder/app/src/features/lab-panel/LabPanelLayout";
import LabList from "../New folder/app/src/features/lab-panel/LabList";
import Films from "../New folder/app/src/features/lab-panel/Films";
// import MakeCompleteOrderPage from "./pages/user-panel/MakeCompleteOrderPage";
import SalePanelLayout from "../New folder/app/src/features/sale-panel/SalePanelLayout";
import Customers from "../New folder/app/src/features/sale-panel/Customers";
import Orders from "../New folder/app/src/features/sale-panel/Orders";
import Dashboard from "../New folder/app/src/features/auth/Dashboard";

const queryClient = new QueryClient();
const WithGlobalStyles = ({ children }) => {
  return (
    <>
      <GlobalStyles />
      {children}
    </>
  );
};
function App() {
  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        {/* <GlobalStyles /> */}
        <ApiProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="/admin-login" element={<AdminLoginForm />} /> */}
            {/* <Route path="/dashboard" element={<Dashboard />} /> */}
            <Route path="/LoginForm" element={<LoginForm />} />
            <Route path="login" element={<Login />} />
            <Route path="/OrdersPage/:projectId" element={<OrdersPage />} />
            <Route path="/HistoryProject/:id" element={<HistoryProject />} />
            <Route path="/Addproject" element={<Addproject />} />
            <Route path="/ProjectPage" element={<ProjectPage />} />
            <Route path="/SaleProject/:id" element={<SaleProject />} />
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
            {/* <Route path="/FormPage" element={<FormPage />} /> */}
            <Route path="/news/:news_id" element={<NewsDetail />} />
            <Route path="/PumpPage/:orderId" element={<PumpPage />} />
            <Route path="/VibratorPage/:orderId" element={<VibratorPage />} />
            <Route path="/FormPage/:orderId" element={<FormPage />} />
            <Route path="/" element={<FormPage />} />
            <Route
              path="/dashboard"
              element={
                <WithGlobalStyles>
                  <Dashboard />
                </WithGlobalStyles>
              }
            >
              <Route path="execution-panel" element={<ExecutionPanelLayout />}>
                <Route index element={<Navigate replace to="orders" />} />
                <Route path="orders" element={<ExecutionPanelOrders />} />
              </Route>

              <Route
                path="financial-panel"
                element={
                  <ProtectedRoute>
                    <FinancialPanelLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate replace to="orders" />} />
                <Route path="orders" element={<FinancialPanelOrders />} />
              </Route>

              <Route
                path="lab-panel"
                element={
                  <ProtectedRoute>
                    <LabPanelLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate replace to="list" />} />
                <Route path="list" element={<LabList />} />
                <Route path="list/films/:orderId" element={<Films />} />
              </Route>

              <Route
                path="sale-panel"
                element={
                  <ProtectedRoute>
                    <SalePanelLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate replace to="customers" />} />
                <Route path="customers" element={<Customers />} />
                <Route path="orders" element={<Orders />} />
              </Route>
            </Route>
          </Routes>
        </ApiProvider>
      </QueryClientProvider>
    </Router>
  );
}

export default App;
