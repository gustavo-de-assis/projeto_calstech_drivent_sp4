import bookingRepository from "@/repositories/booking-repository";
import { forbiddenError, notFoundError } from "@/errors";
import enrollmentRepository from "@/repositories/enrollment-repository";
import ticketRepository from "@/repositories/ticket-repository";

async function listUserRoom(userId: number){
    
    const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
    if (!enrollment) {
      //throw forbiddenError();
      throw notFoundError();
    } 

    const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);
    if (!ticket) {
        throw notFoundError();
        //throw forbiddenError();
    }

    const booking = await bookingRepository.findUserBooking(userId);

    if(!booking){
        throw notFoundError();
    }

    return booking;
}

const bookingService = {
    listUserRoom,
}

export default bookingService;