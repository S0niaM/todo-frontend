import React, { useState } from 'react';
import Modal from 'react-modal';
import { editTask } from '../services/api';

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

const EditTaskModal = ({ task, onEdit, onClose }) => {
  const [updatedTask, setUpdatedTask] = useState(task);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUpdatedTask(prevTask => ({
      ...prevTask,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await editTask(task.id, updatedTask);
    onEdit();
    onClose();
  };

  return (
    <Modal
      isOpen={true}
      onRequestClose={onClose}
      style={customStyles}
      contentLabel="Edit Task Modal"
      ariaHideApp={false}
    >
      <div className="p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-red-800" style={{ fontFamily: "'Comic Sans MS', cursive" }}>Edit Task</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              value={updatedTask.title}
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
              value={updatedTask.description}
              onChange={handleInputChange}
              placeholder="Enter description"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm"
              style={{ fontFamily: "'Comic Sans MS', cursive" }}
            />
          </div>
          <div className="mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="completed"
                checked={updatedTask.completed}
                onChange={handleInputChange}
                className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-700">Completed</span>
            </label>
          </div>
          <div className="mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="urgent"
                checked={updatedTask.urgent}
                onChange={handleInputChange}
                className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-700">Urgent</span>
            </label>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Due Date*</label>
            <input
              type="date"
              name="due_date"
              value={updatedTask.due_date}
              onChange={handleInputChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50 text-white font-medium py-2 px-4 rounded-md mr-2"
            >
              Save
            </button>
            <button
              onClick={onClose}
              className="bg-gray-300 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50 text-gray-700 font-medium py-2 px-4 rounded-md"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default EditTaskModal;