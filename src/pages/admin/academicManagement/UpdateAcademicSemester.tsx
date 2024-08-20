import { Modal } from "antd";

const UpdateAcademicSemester = ({ isOpen, onOk, onCancel, semester }) => {
  return (
    <Modal
      title="Update Academic Semester"
      open={isOpen}
      onOk={onOk}
      onCancel={onCancel}
    ></Modal>
  );
};

export default UpdateAcademicSemester;
