import express from "express";
import {
  createCertificate,
  getCertificatesByMentee,
  getCertificateDetail,
  deleteCertificate,
} from "../controllers/certificateController";

const router = express.Router();

router.post("/", createCertificate);
router.get("/mentee/:mentee_id", getCertificatesByMentee);
router.get("/:id", getCertificateDetail);
router.delete("/:id", deleteCertificate);

export default router;
