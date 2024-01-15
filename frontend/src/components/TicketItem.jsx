import { Link } from "react-router-dom"

function TicketItem({ ticket }) {
   return (
      <div className="ticket">
         {/* date from timestamp for appropriate timezone */}
         <div>{new Date(ticket.createdAt).toLocaleString("cs-CZ")}</div>
         <div>{ticket.product}</div>
         <div className={`status status-${ticket.status}`}>{ticket.status}</div>
         <Link to={`/ticket/${ticket._id}`} className="btn btn-reverse btn-sm">
            View
         </Link>
      </div>
   )
}

export default TicketItem
