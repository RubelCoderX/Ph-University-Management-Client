import React from "react";
import { Modal } from "antd";

type StatusChangeProps = {
  isOpen: boolean;
  onOk: () => void;
  onCancel: () => void;
  status: string;
};

const StatusChange: React.FC<StatusChangeProps> = ({
  isOpen,
  onOk,
  onCancel,
  status,
}) => {
  return (
    <Modal
      title="Change Student Status"
      open={isOpen}
      onOk={onOk}
      onCancel={onCancel}
    >
      <p>{`Change status to: ${status}`}</p>
    </Modal>
  );
};

export default StatusChange;
