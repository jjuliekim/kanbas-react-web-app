// export default function DeleteDialog({ assignmentId, onConfirm }: {
//   assignmentId: string | null;
//   onConfirm: (id: string) => void;
// }) {
//   return (
//     <div id="wd-delete-dialog" className="modal fade" data-bs-backdrop="static" data-bs-keyboard="false">
//       <div className="modal-dialog">
//         <div className="modal-content">
//           <div className="modal-header">
//             <h1 className="modal-title fs-5" id="staticBackdropLabel">Confirm Deletion</h1>
//           </div>
//           <div className="modal-body">
//             <p>Delete Assignment?</p>
//           </div>
//           <div className="modal-footer">
//             <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
//               No </button>
//             <button onClick={() => assignmentId && onConfirm(assignmentId)} type="button"
//               data-bs-dismiss="modal" className="btn btn-danger">
//               Yes </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/esm/Modal";


export default function DeleteDialog({ assignmentId, onConfirm, show, onHide }: {
  assignmentId: string | null;
  onConfirm: (id: string) => void;
  show: boolean;
  onHide: () => void;
}) {
  return (
    <Modal show={show} onHide={onHide} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Deletion</Modal.Title>
      </Modal.Header>
      <Modal.Body>Delete Assignment?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          No
        </Button>
        <Button variant="danger" onClick={() => assignmentId && onConfirm(assignmentId)}>
          Yes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
