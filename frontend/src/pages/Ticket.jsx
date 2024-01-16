import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import Modal from "react-modal"
import { FaPlus } from "react-icons/fa"
import { useSelector, useDispatch } from "react-redux"
import { getTicket, reset, closeTicket } from "../features/tickets/ticketSlice"
import { getNotes, createNote, reset as notesReset } from "../features/notes/noteSlice"
import { useParams, useNavigate } from "react-router-dom"
import BackButton from "../components/BackButton"
import Spinner from "../components/Spinner"
import NoteItem from "../components/NoteItem"
import { compareSync } from "bcryptjs"

// Custom styles for modal
const customStyles = {
   content: {
      width: "600px",
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      position: "relative",
   },
}

// Modal will mount on the root in html
Modal.setAppElement("#root")

function Ticket() {
   const [modalIsOpen, setModalIsOpen] = useState(false)
   const [noteText, setNoteText] = useState("")
   const { ticket, isLoading, isSuccess, isError, message } = useSelector(
      (state) => state.tickets
   )
   const { notes, isLoading: notesIsLoading } = useSelector(
      (state) => state.notes
   )

   const navigate = useNavigate()
   const dispatch = useDispatch()
   const { ticketId } = useParams()

   useEffect(() => {
      dispatch(getTicket(ticketId)).unwrap().catch(toast.error)
      dispatch(getNotes(ticketId)).unwrap().catch(toast.error)
   }, [ticketId, dispatch])

   // Close ticket
   const onTicketClose = () => {
      dispatch(closeTicket(ticketId))
      toast.success("Ticket closed")
      navigate("/tickets")
   }

   // Create note submit
   const onNoteSubmit = (e) => {
      e.preventDefault()
      dispatch(createNote({ ticketId, noteText }))
      closeModal()
   }

   // Open/close modal
   const openModal = () => setModalIsOpen(true)
   const closeModal = () => setModalIsOpen(false)

   if (isLoading || notesIsLoading) {
      return <Spinner />
   }

   if (isError) {
      return <h3>Something went wrong...</h3>
   }

   return (
      <div className="ticket-page">
         <header className="ticket-header">
            <BackButton url="/tickets" />
            <h2>
               Ticket ID: {ticket._id}{" "}
               {/* _id - it's formated like this in mongoDB */}
               <span className={`status status-${ticket.status}`}>
                  {ticket.status}
               </span>
            </h2>
            <h3>
               Date submitted:{" "}
               {new Date(ticket.createdAt).toLocaleString("cs-CZ")}
            </h3>
            <h3>Product: {ticket.product}</h3>
            <hr />
            <div className="ticket-desc">
               <h3>Description of issue</h3>
               <p>{ticket.description}</p>
            </div>

            <h2>Notes</h2>
         </header>

         {ticket.status !== "closed" && (
            <button onClick={openModal} className="btn">
               <FaPlus />
               Add note
            </button>
         )}

         <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Add Note"
         >
            <h2>Add Note</h2>
            <button className="btn-close" onClick={closeModal}>
               X
            </button>
            <form onSubmit={onNoteSubmit}>
               <div className="form-group">
                  <textarea
                     name="noteText"
                     id="noteText"
                     className="form-control"
                     placeholder="Note text"
                     value={noteText}
                     onChange={(e) => setNoteText(e.target.value)}
                  ></textarea>
               </div>
               <div className="form-group">
                  <button className="btn" type="submit">
                     Submit
                  </button>
               </div>
            </form>
         </Modal>

         {/* notes */}
         {notes.map((note) => (
            <NoteItem key={note._id} note={note} />
         ))}

         {/* close */}
         {ticket.status !== "closed" && (
            <button
               onClick={onTicketClose}
               className="btn btn-block btn-danger"
            >
               Close Ticket
            </button>
         )}
      </div>
   )
}

export default Ticket