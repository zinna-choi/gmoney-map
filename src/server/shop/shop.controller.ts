import { Router } from "express";
import asyncHandler from "express-async-handler";
import ShopService from "./shop.service";

const router = Router();

const shopService = new ShopService();

router.get(
  `/v/search`,
  asyncHandler(async (req, res) => {
    const { lat, lng, distance } = req.query;
    const data = await shopService.findAll({
      distance: Number(distance),
      lat: Number(lat),
      lng: Number(lng),
    });
    res.send(data);
  })
);

export default router;
