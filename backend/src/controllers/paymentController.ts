import { Request, Response } from "express";
import PaymentModel from "../models/paymentModel"; 
import pool from "../db"; 
import axios from "axios"; // Untuk integrasi dengan API Duitku

export async function createPayment(
  req: Request,
  res: Response
): Promise<Response> {
  const { bookingId, amount, paymentMethod, transactionId } = req.body;

  try {
    const result = await pool.query("SELECT * FROM bookings WHERE id = $1", [
      bookingId,
    ]);
    const booking = result.rows[0]; 

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    const payment = await PaymentModel.createPayment(
      bookingId,
      amount,
      paymentMethod,
      transactionId
    );

    return res.status(201).json(payment);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to create payment" });
  }
}

// Fungsi untuk memverifikasi pembayaran dengan Duitku
export async function verifyPayment(
  req: Request,
  res: Response
): Promise<Response> {
  const { transactionId, paymentToken } = req.body;

  try {
    // Melakukan request ke API Duitku untuk memverifikasi status pembayaran
    const verificationResult = await axios.post(
      "https://api.duitku.com/v1/payment/verify",
      {
        transactionId,
        paymentToken,
      }
    );

    if (verificationResult.data.status === "success") {
      await PaymentModel.verifyPayment(transactionId, paymentToken);
      return res.status(200).json({ message: "Payment successful" });
    } else {
      await PaymentModel.verifyPayment(transactionId, paymentToken);
      return res.status(400).json({ message: "Payment failed" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Payment verification failed" });
  }
}
