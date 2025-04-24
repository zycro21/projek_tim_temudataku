import express from "express";
import * as bookingController from "../controllers/bookingController";

const router = express.Router();

// Pendekatan 2: Import RequestHandler secara eksplisit
import { RequestHandler } from "express";

// Cast handler sebagai RequestHandler
router.post("/", bookingController.createBookingHandler as RequestHandler);
router.get("/", bookingController.getBookingsHandler as RequestHandler);
router.get("/:id", bookingController.getBookingByIdHandler as RequestHandler);
router.put("/:id", bookingController.updateBookingHandler as RequestHandler);
router.delete("/:id", bookingController.deleteBookingHandler as RequestHandler);

export default router;