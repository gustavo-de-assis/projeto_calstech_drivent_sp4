import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getRooms, postBooking, updateBooking } from "@/controllers/booking-controller";

const bookingRouter = Router();

bookingRouter.all("/*", authenticateToken).get("/", getRooms).post("/", postBooking).put("/:bookingId", updateBooking);

export { bookingRouter };
