import ReactModal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "1000px",
    // height: "800px",
    maxHeight: "800px",
  },
  overlay: { zIndex: 1000 },
};

const BaseModal = (props) => {
  const { modalIsOpen, afterOpenModal, closeModal, contentLabel } = props;
  return (
    <ReactModal
      isOpen={modalIsOpen}
      onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel={contentLabel}
    >
      {props.children}
    </ReactModal>
  );
};

export default BaseModal;
