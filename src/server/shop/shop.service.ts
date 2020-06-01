import { GmoneyApiInterface } from "../gmoney/gmoney.interface";
import { IShopDocument, IShop } from "./shop.interface";
import { shopModel } from "../database/schemes/shop.schema";
import { ISearchParams } from "./shop.model";

const saveAllByGmoneyResponse = (res: GmoneyApiInterface[]) => {
  const convert_doc: IShop[] = res.filter(Boolean).map((item) => ({
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
  let result = null;

  console.log("query", params);

  if (!params.q) {
    result = await shopModel.aggregate<IShopDocument>([
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
  }

  if (!!params.q) {
    result = await shopModel.find({
      CMPNM_NM: {
        $regex: params.q,
        $options: "i",
      },
    });
  }

  return result;
};

export default {
  saveAllByGmoneyResponse,
  clearAll,
  findAll,
};
