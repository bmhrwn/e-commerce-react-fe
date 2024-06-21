import React from 'react';
import { Menu } from 'primereact/menu';
import { useAuth } from '../auth/useAuth';

const Sidebar = () => {
  const {signout} = useAuth();
  const items = [
    {
      label: "Dashboard",
      icon: "pi pi-th-large",
      command: () => {
        window.location.hash = "/admin/dashboard";
      }
    },
    {
      label: "Order",
      icon: "pi pi-shopping-cart",
      command: () => {
        window.location.hash = "/admin/order";
      }
    },
    {
      label: "Category",
      icon: "pi pi-tags",
      command: () => {
        window.location.hash = "/admin/category";
      }
    },
    {
      label: "Product",
      icon: "pi pi-box",
      command: () => {
        window.location.hash = "/admin/product";
      }
    },
    {
      label: "Users",
      icon: "pi pi-users",
      command: () => {
        window.location.hash = "/admin/users";
      }
    },
    {
      label: "Sign Out",
      icon: "pi pi-sign-out",
      command: () => signout()
    }
  ];

  return (
    <div className='sidebar'>
      <h3>Sidebar</h3>
      <Menu model={items} />
    </div>
  );
}

export default Sidebar;
