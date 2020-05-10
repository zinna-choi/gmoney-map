import { GmoneyApiInterface } from "../gmoney/gmoney.interface";
import { IShopDocument, IShop } from "./shop.interface";
import { shopModel } from "../database/schemes/shop.schema";
import { ISearchParams } from "./shop.model";

const saveAllByGmoneyResponse = (res: GmoneyApiInterface[]) => {
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
};

const clearAll = () => {
  return shopModel.deleteMany({});
};

export const findAll = async (params: ISearchParams) => {
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
};

export default {
  saveAllByGmoneyResponse,
  clearAll,
  findAll,
};
