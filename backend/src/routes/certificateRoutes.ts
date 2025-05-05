import express from "express";
import {
  createCertificate,
  getCertificatesByMentee,
  getCertificateDetail,
  deleteCertificate,
} from "../controllers/certificateController";
import { RequestHandler } from "express";

const router = express.Router();

router.post("/", createCertificate as RequestHandler);
router.get("/mentee/:mentee_id", getCertificatesByMentee as RequestHandler);
router.get("/:id", getCertificateDetail as RequestHandler);
router.delete("/:id", deleteCertificate as RequestHandler);

export default router;
