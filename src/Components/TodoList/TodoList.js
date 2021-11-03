import React, { useState } from 'react';
import "./index.scss";

import AddTaskModal from '../AddTaskModal/AddTaskModal';
import newId from '../utils/newId';

import Delete from "../../Assets/delete.svg";
import Edit from "../../Assets/edit.svg";
import EditTaskModal from '../EditTaskModal/EditTaskModal';

const LIST = [
  {
    id: 1,
    task: "Bring eggs"
  },
  {
    id: 2,
    task: "Fetch milk"
  },
  {
    id: 3,
    task: "Learn JS"
  },
  {
    id: 4,
    task: "Learn React"
  },
]

export default function TodoList() {
  const [todo, setTodo] = useState(LIST);
  const [currentTask, setCurrentTask] = useState(null);
  const [isAddTaskModalOpen, setAddTaskModalVisible] = useState(false);
  const [isEditTaskModalOpen, setEditTaskModalVisible] = useState(false);

  const addNewTask = (task) => {
    const id = newId();
    const taskObject = { id, task };
    setTodo(() => [...todo, taskObject]);
  };

  const editTask = (updatedTask) => {
    console.log(updatedTask);
    const taskListWithoutTask = todo.map(item => {
      if (item.id === updatedTask.id) {
        return { id: item.id, task: updatedTask.task }
      }
      return item;
    });
    setTodo(() => [...taskListWithoutTask]);
  };

  const handleEdit = (e, clickedTask) => {
    console.log(clickedTask);
    setCurrentTask(clickedTask);
    setEditTaskModalVisible(true);
  };

  const handleDelete = (e, id) => {
    console.log(id);
    let tempTodo = todo.filter(item => item.id !== id);
    setTodo([...tempTodo]);
  };

  const handleAddTaskBtnClick = () => {
    setAddTaskModalVisible(true);
  };

  const renderHead = () => {
    return (
      <div className="info-head">
        <div className="heading-info"><h5>Todo List ({todo.length})</h5></div>
        <div className="create-btn-container">
          <button className="add-new-task" onClick={handleAddTaskBtnClick}>Add new task</button>
        </div>
      </div>
    );
  };

  const renderTodo = () => {
    return (
      <div className="todo-list-container">
        <ul className="list-container">
          {todo.map((taskItem, i) => {
            return (
              <li className="list-item-container" key={taskItem.id} index={i}>
                <div className="inner-li">
                  <div className="task-container">
                    {taskItem.task}
                  </div>
                  <div className="right-control-container">
                    <div className="li-controls">
                      <img src={Edit} alt="edit" className="edit-icon action-icon" onClick={(e) => handleEdit(e, taskItem)} />
                      <img src={Delete} alt="delete" className="del-icon action-icon" onClick={(e) => handleDelete(e, taskItem.id)} />
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    );
  };

  return (
    <div className="task-list-head-wrapper">
      {renderHead()}
      {isEditTaskModalOpen && <EditTaskModal editTask={editTask} currentTask={currentTask} hideModal={() => setEditTaskModalVisible(false)} />}
      {isAddTaskModalOpen && <AddTaskModal addNewTask={addNewTask} hideModal={() => setAddTaskModalVisible(false)} />}
      {renderTodo()}
    </div>
  );
};
