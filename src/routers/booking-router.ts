import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getRooms } from "@/controllers/booking-controller";
//import { getHotels, getHotelsWithRooms } from "@/controllers";

const bookingRouter = Router();

bookingRouter
  .all("/*", authenticateToken)
  .get("/", getRooms);
  //.post("/", postBooking, );
  //.put("/:bookingId", )
export { bookingRouter };
