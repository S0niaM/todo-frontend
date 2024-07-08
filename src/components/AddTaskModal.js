import React, { useState } from 'react';
import Modal from 'react-modal';
import { addTask } from '../services/api';

const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  content: {
    background: '#fff9c4', // Light yellow background to match notebook theme
    padding: '20px',
    maxWidth: '400px',
    margin: 'auto',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    border: '2px solid #e6ee9c' // Notebook-like border
  }
};

const AddTaskModal = ({ onAdd, onClose }) => {
  const [task, setTask] = useState({
    title: '',
    description: '',
    due_date: '', // Optional due date
    urgent: false
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTask(prevTask => ({
      ...prevTask,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    
    const dataToSend = {
      ...task,
      due_date: task.due_date || null,
    };
  
    try {
      await addTask(dataToSend);
      onAdd();
      onClose();
    } catch (error) {
      console.error("Error adding task:", error);
      // Handle error (e.g., show error message to user)
    }
  };

  return (
    <Modal
      isOpen={true}
      onRequestClose={onClose}
      style={customStyles}
      contentLabel="Add Task Modal"
      ariaHideApp={false}
    >
      <h2 className="text-2xl font-bold mb-4 text-red-800" style={{ fontFamily: "'Comic Sans MS', cursive" }}>Add New Task</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            value={task.title}
            onChange={handleInputChange}
            placeholder="Enter title"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm"
            style={{ fontFamily: "'Comic Sans MS', cursive" }}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={task.description}
            onChange={handleInputChange}
            placeholder="Enter description"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm"
            style={{ fontFamily: "'Comic Sans MS', cursive" }}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Due Date (optional)</label>
          <input
            type="date"
            name="due_date"
            value={task.due_date}
            onChange={handleInputChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm"
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50 text-white font-medium py-2 px-4 rounded-md mr-2"
          >
            Add
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50 text-gray-700 font-medium py-2 px-4 rounded-md"
          >
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddTaskModal;
