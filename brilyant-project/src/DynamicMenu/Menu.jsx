import React, { useState } from "react";
import './styles.css'

const Menu = ({ data, onItemClick }) => {
  const [openItems, setOpenItems] = useState({});

  const toggleItem = (label) => {
    setOpenItems((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  const renderMenu = (menuItems) => {
    return (
      <ul className="menu">
        {menuItems.map((item) => (
          <li key={item.label} className="menu-item">
            <div
              className={`menu-label ${
                openItems[item.label] ? "expanded" : ""
              }`}
              onClick={() => {
                toggleItem(item.label);
                onItemClick(item); 
              }}
            >
              {item.label}
              {item.children && (
                <span className="arrow">
                  {openItems[item.label] ? "<" : ">"}
                </span>
              )}
            </div>
            {item.children && openItems[item.label] && (
              <div className="submenu">{renderMenu(item.children)}</div>
            )}
          </li>
        ))}
      </ul>
    );
  };

  return <div className="multi-level-menu">{renderMenu(data)}</div>;
};

export default Menu;
