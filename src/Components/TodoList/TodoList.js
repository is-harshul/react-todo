import React, { useState } from 'react';
import "./index.scss";

import AddTaskModal from '../AddTaskModal/AddTaskModal';
import newId from '../utils/newId';

import Check from "../../Assets/check.svg";
import Delete from "../../Assets/delete.svg";
import Edit from "../../Assets/edit.svg";
import EditTaskModal from '../EditTaskModal/EditTaskModal';

const LIST = [
  {
    id: 1,
    task: "Bring eggs",
    editOpen: false,
  },
  {
    id: 2,
    task: "Fetch milk",
    editOpen: false,
  },
  {
    id: 3,
    task: "Learn JS",
    editOpen: false,

  },
  {
    id: 4,
    task: "Learn React",
    editOpen: false,
  },
]

export default function TodoList() {
  const [todo, setTodo] = useState(LIST);
  const [isAddTaskModalOpen, setAddTaskModalVisible] = useState(false);

  const addNewTask = (task) => {
    const id = newId();
    const taskObject = { id, task };
    setTodo(() => [...todo, taskObject]);
  };

  const handleEdit = (e, clickedTask) => {
    console.log(clickedTask);
    const list = todo.map(item => {
      if (item.id === clickedTask.id) {
        return { ...item, editOpen: true };
      }
      return item;
    })
    setTodo(list);
  };

  const handleEditChange = (e, taskItem) => {
    const value = e.target.value;
    console.log(value, taskItem.id);
    const list = todo.map(item => {
      if (item.id === taskItem.id) {
        return { ...item, task: value };
      }
      return item;
    })
    setTodo(list);
  }

  const handleDelete = (e, id) => {
    console.log(id);
    let tempTodo = todo.filter(item => item.id !== id);
    setTodo([...tempTodo]);
  };

  const handleSave = (e, clickedTask) => {
    clickedTask.editOpen = true;
    const list = todo.map(item => {
      if (item.id === clickedTask.id) {
        return { ...item, editOpen: false };
      }
      return item;
    })
    setTodo(list)
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
                    <input value={taskItem.task} disabled={!taskItem.editOpen} onChange={(e) => handleEditChange(e, taskItem)} />
                  </div>
                  <div className="right-control-container">
                    <div className="li-controls">
                      {
                        taskItem.editOpen ?
                          <img src={Check} alt="check" className="check-icon action-icon" onClick={(e) => handleSave(e, taskItem)} />
                          :
                          <img src={Edit} alt="edit" className="edit-icon action-icon" onClick={(e) => handleEdit(e, taskItem)} />
                      }
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
      {isAddTaskModalOpen && <AddTaskModal addNewTask={addNewTask} hideModal={() => setAddTaskModalVisible(false)} />}
      {renderTodo()}
    </div>
  );
};
