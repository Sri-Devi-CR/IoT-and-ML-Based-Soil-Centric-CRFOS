import React, { useState, useEffect, useRef } from 'react';
import { Box, Drawer, List, ListItem, Typography, Avatar } from '@mui/material';
import { styled } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import GrainIcon from '@mui/icons-material/Grain';
import { useAuth } from '../../services/authContext';
import { gsap } from 'gsap';
import CropRecommendationPage from '../Crop Recommendation/CropRecommendationPage';
import FertilizerOptimization from '../Fertilizer Optimization/FertilizerOptimization';
import History from "../History/History"

const sidebarWidth = 240;

const TabItem = styled(Box)(({ theme, active }) => ({
  padding: theme.spacing(1.5, 2),
  cursor: 'pointer',
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  color: active ? "#4caf50" : "#ddd",
  fontWeight: active ? "bold" : "normal",
  transition: "color 0.3s ease, text-shadow 0.3s ease",
  textShadow: active ? "0 0 15px #4caf50" : "0 0 8px rgba(255, 255, 255, 0.3)",
  "&:hover": { color: "#4caf50", textShadow: "0 0 20px #4caf50" },
}));

const Underline = styled(Box)(({ active }) => ({
  height: 2,
  backgroundColor: "#4caf50",
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  transform: active ? "scaleX(1)" : "scaleX(0)",
  transformOrigin: 'left',
  transition: 'transform 0.3s ease-in-out',
}));

const Dashboard = () => {
  const { user } = useAuth();
  const [selectedTab, setSelectedTab] = useState('dashboard');
  const sidebarRef = useRef(null);
  const profileRef = useRef(null);
  const tabsRef = useRef([]);

  const tabs = [
    { key: 'dashboard', label: 'Dashboard', icon: <DashboardIcon /> },
    { key: 'crop', label: 'Get Crop Recommendation', icon: <AgricultureIcon /> },
    { key: 'fertilizer', label: 'Optimize Fertilizer', icon: <GrainIcon /> },
  ];

  useEffect(() => {
    if (tabsRef.current.length) {
      gsap.fromTo(
        tabsRef.current,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.6, stagger: 0.1 }
      );
    }
    if (profileRef.current) {
      gsap.fromTo(
        profileRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.6, delay: 0.5 }
      );
    }
  }, []);

  const renderContent = () => {
    switch (selectedTab) {
      case 'dashboard':
        return <History />;
      case 'crop':
        return <CropRecommendationPage />;
      case 'fertilizer':
        return <FertilizerOptimization />;
      default:
        return <History />;
    }
  };

  return (
    <Box sx={{ display: 'flex'}}>
      <Drawer
        variant="permanent"
        sx={{
          width: sidebarWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: sidebarWidth,
            boxSizing: 'border-box',
            background: "rgba(29, 56, 68, 0.9)",
            color: "#ddd",
            backdropFilter: "blur(10px)",
            borderRight: 'none',
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            pt: 2,
          },
        }}
        ref={sidebarRef}
      >
        <Box sx={{ overflow: 'hidden', mt: 8 }}>
          {tabs.map((tab, index) => (
            <List key={tab.key} disablePadding>
              <ListItem
                disablePadding
                onClick={() => setSelectedTab(tab.key)}
                sx={{ cursor: 'pointer'}}
                ref={(el) => (tabsRef.current[index] = el)}
              >
                <TabItem active={selectedTab === tab.key} sx={{ width: '100%' }}>
                  {tab.icon}
                  <Typography variant="body1">{tab.label}</Typography>
                  <Underline active={selectedTab === tab.key} />
                </TabItem>
              </ListItem>
            </List>
          ))}
        </Box>
        {user && (
          <Box
            ref={profileRef}
            sx={{ p: 2, borderTop: "1px solid #00e67644", display: "flex", alignItems: "center", cursor: "pointer" }}
          >
            <Avatar src={user.profilePic || "/default-avatar.png"} sx={{ width: 36, height: 36, mr: 1 }} />
            <Typography variant="body2" sx={{ fontWeight: "bold" }}>{user.username}</Typography>
          </Box>
        )}
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 2, 
        background: "linear-gradient(135deg, #0f2027, #203a43, rgb(37, 71, 86))", 
        minHeight: "100vh", overflow:"hidden"}}>
        {renderContent()}
      </Box>
    </Box>
  );
};

export default Dashboard;