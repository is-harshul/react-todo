import React, { useState } from 'react';
import "./index.scss";
import { Modal } from 'antd';

const AddTaskModal = (props) => {
  const [task, setTask] = useState("");

  const handleOk = () => {
    props.addNewTask(task);
    setTask("");
    props.hideModal();
  };

  const handleCancel = () => {
    props.hideModal();
  };

  const handleInputChange = (e) => {
    setTask(e.target.value);
  }

  return (
    <>
      <Modal
        title="Add new Task"
        visible={true}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Add"
        cancelText="Cancel"
      >
        <div className="add-task-modal">
          <input type="text" name="task" placeholder="Enter new task..." className="add-task-input-field" value={task} onChange={(e) => handleInputChange(e)} />
        </div>
      </Modal>
    </>
  );
};

export default AddTaskModal;
