// controllers/saleController.ts
import { Request, Response } from "express";
import Sale from "../models/Sale";
import Medicine from "../models/Medicine";

export const getSales = async (req: Request, res: Response) => {
  try {
    const sales = await Sale.find().populate("medicines.medicineId", "name");
    res.json(sales);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch sales" });
  }
};

export const createSale = async (req: Request, res: Response) => {
  try {
    const { medicines, customerName } = req.body;
    let total = 0;

    for (const item of medicines) {
      const med = await Medicine.findById(item.medicineId);
      if (!med || med.stock < item.quantity) {
        return res.status(400).json({ error: `Not enough stock for ${med?.name}` });
      }
      med.stock -= item.quantity;
      await med.save();
      total += item.quantity * item.price;
    }

    const sale = new Sale({ medicines, total, customerName });
    await sale.save();
    res.status(201).json(sale);
  } catch (err) {
    res.status(500).json({ error: "Sale creation failed" });
  }
};
