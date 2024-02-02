import "./Modal.css";
const Modal = (params) => {
  const { title, desc, close } = params;

  return (
    <div className="modal-container">
      <div className="modal-body" onClick={() => close()}>
        <img
          src="assets/close.svg"
          width="30px"
          height="30px"
          alt={"error-icon"}
        />
        <h2>{title}</h2>
        <p>{desc}</p>
        <button className="modal-close">Close</button>
      </div>
    </div>
  );
};

export default Modal;
