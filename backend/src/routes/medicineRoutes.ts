// routes/medicineRoutes.ts
import { Router } from "express";
import { getMedicines, createMedicine, updateMedicine, deleteMedicine } from "../controllers/medicineController";

const router = Router();

router.get("/", getMedicines);
router.post("/", createMedicine);
router.put("/:id", updateMedicine);
router.delete("/:id", deleteMedicine);

export default router;
