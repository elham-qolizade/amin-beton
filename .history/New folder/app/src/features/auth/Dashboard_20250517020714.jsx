import { useEffect, useState } from "react";
import { getCurrentUser } from "../../services/apiAuth";
import { useNavigate, Outlet } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  color: #1d4ed8;
  margin-bottom: 1.5rem;
`;

const PanelList = styled.ul`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  justify-content: center;

  @media (min-width: 640px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const PanelItem = styled.li`
  cursor: pointer;
  padding: 1.5rem;
  background-color: var(--color-green-600);

  color: white;
  border-radius: 1rem;
  text-align: center;
  font-size: 1.125rem;
  font-weight: 500;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #93c5fd;
    color: #1f2937;
  }
`;

const LoadingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const LoadingText = styled.p`
  font-size: 1.125rem;
  font-weight: 600;
  color: #4b5563;
`;

export default function Dashboard() {
  const [allowedPanels, setAllowedPanels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [panels, setPanels] = useState([]);
  const navigate = useNavigate();

  const ALL_PANELS = [
    { name: "پنل مالی", role: "Financial", path: "/dashboard/financial-panel" },
    { name: "پنل فروش", role: "Sales", path: "/dashboard/sale-panel" },
    { name: "پنل اجرا", role: "Execution", path: "/dashboard/execution-panel" },
    { name: "پنل آزمایشگاه", role: "Lab", path: "/dashboard/lab-panel" },
  ];

  useEffect(() => {
    async function fetchAndFilter() {
      try {
        const user = await getCurrentUser();
        const roles = user.roles || [];
        const isSuperUser = roles.includes("Super User");
        const filtered = isSuperUser
          ? ALL_PANELS
          : ALL_PANELS.filter((panel) => roles.includes(panel.role));
        setAllowedPanels(filtered);
      } catch (err) {
        console.error("خطا در دریافت نقش‌ها:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchAndFilter();
  }, []);

  if (loading) {
    return (
      <LoadingWrapper>
        <LoadingText>در حال بارگذاری...</LoadingText>
      </LoadingWrapper>
    );
  }

  return (
    <Container>
      <Title>داشبورد</Title>
      <PanelList>
        {allowedPanels.map((panel) => (
          <PanelItem key={panel.role} onClick={() => navigate(panel.path)}>
            {panel.name}
          </PanelItem>
        ))}
      </PanelList>
      <div style={{ marginTop: "2rem" }}>
        <Outlet />
      </div>
    </Container>
  );
}
