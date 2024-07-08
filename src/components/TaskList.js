import React, { useState, useEffect } from 'react';
import { getTasks, deleteTask, editTask } from '../services/api';
import EditTaskModal from './EditTaskModal';
import AddTaskModal from './AddTaskModal';
import DetailsModal from './DetailsModal'; // Import DetailsModal component




const TASKS_PER_PAGE = 5;

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [editTaskModal, setEditTaskModal] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null); // State to track selected task for modal

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const response = await getTasks();
      const formattedTasks = response.data.map(task => ({
        ...task,
        due_date: formatDueDate(task.due_date)
      }));
      setTasks(formattedTasks);
    } catch (error) {
      console.error('Error loading tasks:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      loadTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleCompleteToggle = async (id) => {
  try {
    const taskToUpdate = tasks.find(task => task.id === id);
    if (!taskToUpdate) throw new Error(`Task with ID ${id} not found`);

    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);

    //console.log('Sending request to toggle task completion:', { id, completed: !taskToUpdate.completed });

    await editTask(id, { completed: !taskToUpdate.completed });

  } catch (error) {
    if (error.response) {
      console.error('Error response from server:', {
        status: error.response.status,
        data: error.response.data,
      });
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Error setting up request:', error.message);
    }
    console.error('Error stack:', error.stack);
  }
};


const handleUrgentToggle = async (id) => {
  try {
    const taskToUpdate = tasks.find(task => task.id === id);
    if (!taskToUpdate) throw new Error(`Task with ID ${id} not found`);

    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, urgent: !task.urgent } : task
    );
    setTasks(updatedTasks);

    //console.log('Sending request to toggle task completion:', { id, urgent: !taskToUpdate.urgent});

    await editTask(id, { urgent: !taskToUpdate.urgent });

  } catch (error) {
    if (error.response) {
      console.error('Error response from server:', {
        status: error.response.status,
        data: error.response.data,
      });
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Error setting up request:', error.message);
    }
    console.error('Error stack:', error.stack);
  }
};
  

  

  const formatDueDate = (dateString) => {
    if (!dateString) return '';
    const [year, month, day] = dateString.split('-');
    return `${day}-${month}-${year}`;
  };

  const handleTaskClick = (task) => {
    setSelectedTask(task);
  };

  const handleCloseModal = () => {
    setSelectedTask(null);
  };

  const indexOfLastTask = currentPage * TASKS_PER_PAGE;
  const indexOfFirstTask = indexOfLastTask - TASKS_PER_PAGE;
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);
  const totalPages = Math.ceil(tasks.length / TASKS_PER_PAGE);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="min-h-screen bg-yellow-50 py-4 px-4 flex flex-col">
      <div className="flex-grow flex flex-col max-w-4xl mx-auto w-full">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col" style={{ height: 'calc(100vh - 2rem)' }}>
          <div className="bg-red-100 p-4 border-b-2 border-red-200 flex justify-between items-center">
            <h1 className="text-3xl font-bold text-red-800" style={{ fontFamily: "'Comic Sans MS', cursive" }}>My To-Do List</h1>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="text-3xl font-bold text-red-800 hover:text-red-600 transition-colors duration-200"
            >
              +
            </button>
          </div>
          <div className="flex-grow overflow-y-auto p-4" style={{
            backgroundImage: "linear-gradient(#e5e7eb 1px, transparent 1px)",
            backgroundSize: "100% 2.5rem",
            lineHeight: "2.5rem",
            paddingTop: "1.25rem"
          }}>
            {currentTasks.map((task) => (
              <div
                key={task.id}
                className={`mb-4 pl-4 ${task.urgent ? 'text-red-600 font-semibold' : ''}`}
                style={{ fontFamily: "'Comic Sans MS', cursive" }}
              >
                <div className="flex items-center justify-between cursor-pointer" onClick={() => handleTaskClick(task)}>
                  <div className={`flex-1 text-lg ${task.completed ? 'line-through ' : ''}`} style={{ fontFamily: "'MyHandwriting', cursive" }}>
                    <span className="mr-2 text-xl">•</span>
                    {task.title}
                  </div>
                  <div className="text-md text-gray-600 ml-8" style={{ fontFamily: "'MyHandwriting', cursive" }}>{task.due_date}</div>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <div className="text-md text-gray-600 ml-8" style={{ fontFamily: "'MyHandwriting', cursive" }}>{task.description}</div>
                  <div className="flex space-x-3 text-xl">
                    <button
                      className="text-yellow-600 hover:text-yellow-800"
                      onClick={() => setEditTaskModal(task)}
                    >
                      ✎
                    </button>
                    <button
                      className="text-red-600 hover:text-red-800"
                      onClick={() => handleDelete(task.id)}
                    >
                      ✖
                    </button>
                    <button
                      className={`${task.completed ? 'text-green-600' : 'text-gray-400'} hover:text-green-800`}
                      onClick={() => handleCompleteToggle(task.id)}
                    >
                      ✔
                    </button>
                    <button
                      className={`${task.urgent ? 'text-red-600' : 'text-gray-400'} hover:text-red-800`}
                      onClick={() => handleUrgentToggle(task.id)}
                    >
                      !!
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-red-100 p-2 border-t-2 border-red-200 flex justify-center">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => paginate(i + 1)}
                className={`mx-1 px-3 py-1 rounded ${currentPage === i + 1 ? 'bg-red-500 text-white' : 'bg-white text-red-500'}`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
        {editTaskModal && (
          <EditTaskModal task={editTaskModal} onEdit={loadTasks} onClose={() => setEditTaskModal(null)} />
        )}
        <DetailsModal
          task={selectedTask}
          isOpen={selectedTask !== null}
          onOpen={() => setSelectedTask(selectedTask)}
          onClose={handleCloseModal}
        />
        {isAddModalOpen && (
          <AddTaskModal onAdd={loadTasks} onClose={() => setIsAddModalOpen(false)} />
        )}
      </div>
    </div>
  );
};

export default TaskList;
