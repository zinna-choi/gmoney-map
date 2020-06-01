import { Get, QueryParams, Controller } from "routing-controllers";
import { ISearchParams } from "./shop.model";
import shopService from "./shop.service";

@Controller()
class ShopController {
  @Get("/v/search")
  async findAllShop(@QueryParams() req: ISearchParams) {
    const data = await shopService.findAll({
      distance: Number(req.distance),
      lat: Number(req.lat),
      lng: Number(req.lng),
      q: req.q,
    });
    return data;
  }
}

export default ShopController;
