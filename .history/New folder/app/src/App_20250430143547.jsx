/*eslint-disable */
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "leaflet/dist/leaflet.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import GlobalStyles from "./styles/GlobalStyles";
// Route Management

import ProtectedRoute from "./ui/ProtectedRoute";
import PageNotFound from "./pages/PageNotFound";
// Landing
import Layout from "./ui/Layout";
import Home from "./pages/landing/Home";
import Signup from "./pages/landing/Signup";
import Login from "./pages/landing/Login";
import ContactUs from "./pages/landing/ContactUs";

// Sale Panel
import SalePanelLayout from "./features/sale-panel/SalePanelLayout";
import Customers from "./features/sale-panel/Customers";
import Orders from "./features/sale-panel/Orders";

// Execution Panel
import ExecutionPanelLayout from "./features/execution-panel/ExecutionPanelLayout";
import ExecutionPanelOrders from "./features/execution-panel/Orders";

// // Transport Panel
// import TransportPanelLayout from "./features/transport-panel/TransportPanelLayout";
// import Transports from "./features/transport-panel/Transports";
// import TransportDetails from "./features/transport-panel/TransportDetails";

// User Panel
import UserPanelLayout from "./features/user-panel/UserPanelLayout";
import ProjectsPage from "./pages/user-panel/ProjectsPage";
import OrdersPage from "./pages/user-panel/OrdersPage";
import OrdersHistoryPage from "./pages/user-panel/OrdersHistoryPage";
import OrderDetailPage from "./pages/user-panel/OrderDetailPage";
import MakeInitialOrderPage from "./pages/user-panel/MakeInitialOrderPage";
import PumpOrderPage from "./pages/user-panel/PumpOrderPage";
import VibratorOrderPage from "./pages/user-panel/VibratorOrderPage";

// Lab Panel
import LabPanelLayout from "./features/lab-panel/LabPanelLayout";
import LabList from "./features/lab-panel/LabList";
import Films from "./features/lab-panel/Films";
import MakeCompleteOrderPage from "./pages/user-panel/MakeCompleteOrderPage";

// Financial Panel
import FinancialPanelLayout from "./features/financial-panel/FinancialPanelLayout";
import FinancialPanelOrders from "./features/financial-panel/Orders";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />

      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          {/* ######################################################## */}
          <Route element={<Layout />}>
            <Route index element={<Navigate replace to="home" />} />
            <Route path="home" element={<Home />} />
            <Route path="signup" element={<Signup />} />
            <Route path="login" element={<Login />} />
            <Route path="contact-us" element={<ContactUs />} />
          </Route>
          {/* ######################################################## */}
          <Route
            path="/sale-panel"
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
          {/* ######################################################## */}
          <Route
            path="/execution-panel"
            element={
              // <ProtectedRoute>
              <ExecutionPanelLayout />
              // </ProtectedRoute>
            }
          >
            <Route index element={<Navigate replace to="orders" />} />
            <Route path="orders" element={<ExecutionPanelOrders />} />
          </Route>
          {/* ######################################################## */}
          {/* <Route path="/transport-panel" element={<TransportPanelLayout />}>
            <Route index element={<Navigate replace to="transports" />} />
            <Route path="transports" element={<Transports />} />
            <Route
              path="transports/:transportId"
              element={<TransportDetails />}
            />
          </Route> */}
          {/* ######################################################## */}
          <Route
            path="/lab-panel"
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
          {/* ######################################################## */}
          <Route
            path="/financial-panel"
            element={
              <ProtectedRoute>
                <FinancialPanelLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate replace to="orders" />} />
            <Route path="orders" element={<FinancialPanelOrders />} />
          </Route>
          {/* ######################################################## */}
          {/* USER PANEL */}
          <Route
            path="/user-panel"
            element={
              <ProtectedRoute>
                <UserPanelLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate replace to="projects" />} />
            <Route path="projects" element={<ProjectsPage />} />
            <Route path="projects/:projectId" element={<OrdersPage />} />
            <Route
              path="projects/:projectId/history"
              element={<OrdersHistoryPage />}
            />

            {/* MAKE ORDER */}
            <Route
              path="projects/:projectId/make-order"
              element={<MakeInitialOrderPage />}
            />

            <Route
              path="projects/:projectId/make-order/pump-order/:orderId"
              element={<PumpOrderPage />}
            />

            <Route
              path="projects/:projectId/make-order/vibrator-order/:orderId"
              element={<VibratorOrderPage />}
            />

            <Route
              path="projects/:projectId/make-order/complete-order/:orderId"
              element={<MakeCompleteOrderPage />}
            />

            {/* END ORDER */}

            <Route
              path="projects/:projectId/:orderId"
              element={<OrderDetailPage />}
            />
          </Route>
          {/* ######################################################## */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>

      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 4000,
            style: {
              color: "var(--color-green-700)",
              backgroundColor: "var(--color-green-50)",
            },
          },
          error: {
            duration: 6000,
            style: {
              color: "var(--color-red-700)",
              backgroundColor: "var(--color-red-50)",
            },
          },
          style: {
            fontSize: "16px",
            maxWidth: "700px",
            padding: "16px 24px",
            textAlign: "center",
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
