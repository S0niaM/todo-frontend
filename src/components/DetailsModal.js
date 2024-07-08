import React from 'react';
import Modal from 'react-modal';

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

const DetailsModal = ({ task, isOpen, onOpen, onClose }) => {
  // Return null if task is null or undefined
  if (!task) return null;

  return (
    <>
      <div className="cursor-pointer text-blue-600" onClick={onOpen}>
        {task.title}
      </div>
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        style={customStyles}
        contentLabel="Task Details Modal"
        ariaHideApp={false}
      >
        <h2 className="text-2xl font-bold mb-4 text-red-800" style={{ fontFamily: "'Comic Sans MS', cursive" }}>Task Details</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <div className="mt-1">{task.title}</div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <div className="mt-1">{task.description}</div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Due Date</label>
          <div className="mt-1">{task.due_date}</div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Urgent</label>
          <div className="mt-1">{task.urgent ? 'Yes' : 'No'}</div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Completed</label>
          <div className="mt-1">{task.completed ? 'Yes' : 'No'}</div>
        </div>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50 text-gray-700 font-medium py-2 px-4 rounded-md"
          >
            Close
          </button>
        </div>
      </Modal>
    </>
  );
};

export default DetailsModal;
