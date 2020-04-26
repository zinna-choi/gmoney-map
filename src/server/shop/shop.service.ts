import { GmoneyApiInterface } from "../gmoney/gmoney.interface";
import { IShopDocument, IShop } from "./shop.interface";
import { shopModel } from "../database/schemes/shop.schema";
import { ISearchParams } from "./shop.model";

class ShopService {
  async saveAllByGmoneyResponse(
    res: GmoneyApiInterface[]
  ): Promise<IShopDocument[]> {
    const convert_doc: IShop[] = res.map((item) => ({
      ...item,
      location: {
        type: "Point",
        coordinates: [
          Number(item.REFINE_WGS84_LOGT),
          Number(item.REFINE_WGS84_LAT),
        ],
      },
    }));
    return shopModel.insertMany(convert_doc);
  }

  async clearAll() {
    return shopModel.deleteMany({});
  }

  async findAll(params: ISearchParams) {
    console.log(params);
    const result = await shopModel.aggregate([
      {
        $geoNear: {
          near: {
            type: "point",
            coordinates: [params.lng, params.lat],
          },
          distanceField: "distance",
          maxDistance: params.distance,
        },
      },
      { $limit: 1000 },
    ]);

    console.log(result.length);
    return result;
  }
}

export default ShopService;
