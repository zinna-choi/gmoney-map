import { NowRequest, NowResponse } from "@vercel/node";
import shopService from "../../server/shop/shop.service";

export default async (req: NowRequest, res: NowResponse) => {
  console.log("req.query", req.query);
  const { distance, lat, lng, q } = req.query;
  const data = await shopService.findAll({
    distance: Number(distance),
    lat: Number(lat),
    lng: Number(lng),
    q: q as string,
  });
  res.json(data);
};
