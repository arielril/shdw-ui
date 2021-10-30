import { Modal as BModal, CloseButton } from 'react-bootstrap';

import './modal.css';

const Modal = ({
  children,
  handleClose,
  title,
  ...restProps
}) => {

  return (
    <BModal
      {...restProps}
      onHide={handleClose}
    >
      <BModal.Header>
        <BModal.Title>{title || 'Modal'}</BModal.Title>
        <CloseButton onClick={handleClose} />
      </BModal.Header>
      <BModal.Body>
        {children}
      </BModal.Body>
    </BModal>
  );
};

export default Modal;
