import React, { useState } from "react";
import Menu from "./Menu"; 
import { menuData } from "./menuData"; 
import './styles.css'; 

const DynamicMenu = () => {
  const [menu, setMenu] = useState(menuData);
  const [newMenu, setNewMenu] = useState({ label: "", children: [] });
  const [newSubmenu, setNewSubmenu] = useState({ label: "" });
  const [selectedItem, setSelectedItem] = useState(null);
  const addMenuItem = () => {
    if (newMenu.label) {
      setMenu((prev) => [
        ...prev,
        { label: newMenu.label, children: newMenu.children },
      ]);
      setNewMenu({ label: "", children: [] });
    }
  };

  const addSubmenu = () => {
    if (newSubmenu.label && selectedItem) {
      const updatedMenu = [...menu];
      const parentMenu = findMenuByLabel(updatedMenu, selectedItem);
      if (parentMenu) {
        if (!parentMenu.children) {
          parentMenu.children = [];
        }
        parentMenu.children.push({ label: newSubmenu.label, children: [] });
        setMenu(updatedMenu);
        setNewSubmenu({ label: "" });
      }
    }
  };

  const findMenuByLabel = (menuItems, label) => {
    for (let item of menuItems) {
      if (item.label === label) return item;
      if (item.children && item.children.length > 0) {
        const found = findMenuByLabel(item.children, label);
        if (found) return found;
      }
    }
    return null;
  };

  const handleMenuChange = (e) => {
    const { name, value } = e.target;
    setNewMenu((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmenuChange = (e) => {
    const { name, value } = e.target;
    setNewSubmenu((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleItemClick = (item) => {
    setSelectedItem(item.label);
  };

  return (
    <div className="App">
      <h1>Dynamic Multi-Level Menu</h1>
      <div className="input-section">
        <input
          type="text"
          name="label"
          value={newMenu.label}
          onChange={handleMenuChange}
          placeholder="New Menu Label"
        />
        <button className="add-menu-btn" onClick={addMenuItem}>Add Menu Item</button>
      </div>

      {selectedItem && (
        <div className="input-section">
          <h2>Selected Item: {selectedItem}</h2>
          <input
            type="text"
            name="label"
            value={newSubmenu.label}
            onChange={handleSubmenuChange}
            placeholder="Child Label"
          />
          <button className="add-menu-btn" onClick={addSubmenu}>Add Child to Selected Item</button>
        </div>
      )}

      <Menu data={menu} onItemClick={handleItemClick} />
    </div>
  );
};

export default DynamicMenu;
