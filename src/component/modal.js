import './modal.css';

const Modal = ({ show, children, handleClose }) => {
  const showHideModalClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideModalClassName}>
      <section className="modal-main">
        {children}
        <button type="button" onClick={handleClose}>Close</button>
      </section>
    </div>
  );
};

export default Modal;
