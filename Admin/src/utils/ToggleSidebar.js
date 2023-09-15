import React from 'react';

 const toggleSidebar = (setSidebarOpen, windowWidth) => {
    if (windowWidth < 1024) {
      setSidebarOpen((prevSidebarOpen) => (prevSidebarOpen = false));
      setWideScreen((prevWideScreen) => (prevWideScreen = "lg:ml-0"));
    }
  };

  export default toggleSidebar;