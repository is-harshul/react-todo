import React, { useState } from 'react';
import "./index.scss";
import { Modal } from 'antd';

const EditTaskModal = (props) => {
  const [task, setTask] = useState(() => props.currentTask);
  console.log(props.currentTask)
  const handleOk = () => {
    props.editTask(task);
    setTask("");
    props.hideModal();
  };

  const handleCancel = () => {
    props.hideModal();
  };

  const handleInputChange = (e) => {
    setTask({ id: task.id, task: e.target.value });
  }

  return (
    <>
      <Modal
        title="Edit Task"
        visible={true}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Edit/ Save"
        cancelText="Cancel"
      >
        <div className="add-task-modal">
          <input type="text" name="task" placeholder="Enter task..." className="add-task-input-field" value={task?.task} onChange={(e) => handleInputChange(e)} />
        </div>
      </Modal>
    </>
  );
};

export default EditTaskModal;
