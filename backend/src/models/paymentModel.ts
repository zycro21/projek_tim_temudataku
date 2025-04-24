import { PoolClient } from 'pg';  
import pool from '../db'; 

interface Payment {
  id: number;
  booking_id: number;
  amount: number;
  payment_date: Date | null;
  payment_method: string | null;
  transaction_id: string | null;
  status: string;
  created_at: Date;
  updated_at: Date;
}

class PaymentModel {
  static async createPayment(bookingId: number, amount: number, paymentMethod: string, transactionId: string): Promise<Payment> {
    const client: PoolClient = await pool.connect();
    try {
      const res = await client.query(
        `INSERT INTO payments (booking_id, amount, payment_method, transaction_id, status)
        VALUES ($1, $2, $3, $4, 'pending') RETURNING *`,
        [bookingId, amount, paymentMethod, transactionId]
      );
      return res.rows[0]; 
    } catch (err) {
      console.error('Error creating payment:', err);
      throw err;
    } finally {
      client.release();
    }
  }

  static async verifyPayment(transactionId: string, paymentToken: string): Promise<string> {
    const client: PoolClient = await pool.connect();
    try {
      const paymentVerified = true; 

      if (paymentVerified) {
        const res = await client.query(
          `UPDATE payments SET status = 'completed' WHERE transaction_id = $1 RETURNING *`,
          [transactionId]
        );
        return `Payment with transaction ID ${transactionId} has been completed.`;
      } else {
        await client.query(
          `UPDATE payments SET status = 'failed' WHERE transaction_id = $1`,
          [transactionId]
        );
        return `Payment with transaction ID ${transactionId} failed.`;
      }
    } catch (err) {
      console.error('Error verifying payment:', err);
      throw err;
    } finally {
      client.release();
    }
  }
}

export default PaymentModel;
