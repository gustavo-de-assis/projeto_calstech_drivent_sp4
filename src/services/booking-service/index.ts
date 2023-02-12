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

async function createBooking(userId: number, roomId: number){
    const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
    if (!enrollment) {
      throw forbiddenError();
    } 

    const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);
    if (!ticket || ticket.TicketType.isRemote || ticket.status !== "PAID" || !ticket.TicketType.includesHotel) {
        throw forbiddenError();
    }

    const booking = await bookingRepository.findBooking(roomId);
    if (!booking){
        throw notFoundError();
    }

    if(booking.Booking.length === booking.capacity){
        throw forbiddenError();
    }

    const newBooking = await bookingRepository.createBooking(userId, roomId);

    return {bookingId: newBooking.id};
}

const bookingService = {
    listUserRoom,
    createBooking,
}

export default bookingService;
