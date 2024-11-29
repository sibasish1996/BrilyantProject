import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './styles.css';

const DragAndDrop_List = () => {
  const [items, setItems] = useState([
    { id: '1', content: 'Item 1' },
    { id: '2', content: 'Item 2' },
    { id: '3', content: 'Item 3' },
  ]);
  const [newItem, setNewItem] = useState('');
  const [editId, setEditId] = useState(null);

  const onDragEnd = (result) => {
    const { destination, source } = result;

    if (!destination) {
      return;
    }

    const reorderedItems = Array.from(items);
    const [removed] = reorderedItems.splice(source.index, 1);
    reorderedItems.splice(destination.index, 0, removed);

    setItems(reorderedItems);
  };

  const handleSaveItem = () => {
    if (newItem.trim()) {
      if (editId) {
        const updatedItems = items.map((item) =>
          item.id === editId ? { ...item, content: newItem } : item
        );
        setItems(updatedItems);
        setEditId(null); 
      } else {
        setItems([...items, { id: Date.now().toString(), content: newItem }]);
      }
      setNewItem(''); 
    }
  };

  const handleEditItem = (id) => {
    const itemToEdit = items.find((item) => item.id === id);
    setEditId(id);
    setNewItem(itemToEdit.content); 
  };

  const handleDeleteItem = (id) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
  };

  return (
    <div className="container">
      <h1>Drag and Drop List</h1>
      <div className="add-item-container">
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder={editId ? 'Edit item' : 'Add a new item'}
        />
        <button onClick={handleSaveItem}>{editId ? 'Save' : 'Add'}</button>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided) => (
            <ul
              className="item-list"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {items.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided) => (
                    <li
                      className="item"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <span style={{color: "gray"}}>{item.content}</span>
                      <div className="item-actions">
                        <button onClick={() => handleEditItem(item.id)}>Edit</button>
                        <button onClick={() => handleDeleteItem(item.id)}>
                          Delete
                        </button>
                      </div>
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default DragAndDrop_List;
