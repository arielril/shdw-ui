import { Modal as BModal, Button } from 'react-bootstrap';

import './modal.css';

const Modal = ({
  show,
  children,
  handleClose,
  style = {},
  title,
}) => {
  const showHideModalClassName = show ? "modal display-block" : "modal display-none";

  return (
    <BModal show={show} onHide={handleClose} className={showHideModalClassName} >
      <section className="modal-main" style={style}>
        <BModal.Header>
          <BModal.Title>{title || 'Modal'}</BModal.Title>
          <Button onClick={handleClose} variant="secondary">Close</Button>
        </BModal.Header>
        <BModal.Body>
          {children}
        </BModal.Body>
      </section>
    </BModal>
  );
};

export default Modal;
