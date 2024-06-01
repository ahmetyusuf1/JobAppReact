const DeleteButton = ({ handleDelete }) => {
  return (
    <button onClick={handleDelete} className="bin-button">
      <img src="/first.svg" className="bin-top" />
      <img src="/second.svg" className="bin-bottom" />
      <img src="/third.svg" className="garbage" />
    </button>
  );
};

export default DeleteButton;
