import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

import GlobalStyles from "./styles/GlobalStyles";

import Layout from "./ui/Layout";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ContactUs from "./pages/ContactUs";

import SalePanelLayout from "./features/sale-panel/SalePanelLayout";
import Customers from "./features/sale-panel/Customers";
import PageNotFound from "./pages/PageNotFound";
import Orders from "./features/sale-panel/Orders";

import TransportPanelLayout from "./features/transport-panel/TransportPanelLayout";
import Transports from "./features/transport-panel/Transports";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import TransportDetails from "./features/transport-panel/TransportDetails";

import UserPanelLayout from "./features/user-panel/UserPanelLayout";
import ProjectsPage from "./pages/user-panel/ProjectsPage";
import OrdersPage from "./pages/user-panel/OrdersPage";
import OrdersHistoryPage from "./pages/user-panel/OrdersHistoryPage";
import OrderDetailPage from "./pages/user-panel/OrderDetailPage";
import ProtectedRoute from "./ui/ProtectedRoute";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: 60 * 1000,
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

          <Route path="/sale-panel" element={<SalePanelLayout />}>
            <Route index element={<Navigate replace to="customers" />} />
            <Route path="customers" element={<Customers />} />
            <Route path="orders" element={<Orders />} />
          </Route>

          {/* ######################################################## */}

          <Route path="/transport-panel" element={<TransportPanelLayout />}>
            <Route index element={<Navigate replace to="transports" />} />
            <Route path="transports" element={<Transports />} />
            <Route
              path="transports/:transportId"
              element={<TransportDetails />}
            />
          </Route>

          {/* ######################################################## */}

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
            maxWidth: "500px",
            padding: "16px 24px",
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
