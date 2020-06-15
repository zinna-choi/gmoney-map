import { GmoneyApiInterface } from "../gmoney/gmoney.interface";
import { IShopDocument, IShop } from "./shop.interface";
import { shopModel } from "../database/schemes/shop.schema";
import { ISearchParams } from "./shop.model";
import { databaseProvider } from "../database/database.provider";
import mongoose from "mongoose";

const saveAllByGmoneyResponse = async (res: GmoneyApiInterface[]) => {
  await databaseProvider();
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

const clearAll = async () => {
  await databaseProvider();
  return shopModel.deleteMany({});
};

export const findAll = async (params: ISearchParams) => {
  await databaseProvider();

  let result = null;

  const aggregate = [];

  // 기본으로, 위/경도를 받아 주변 상점을 뿌려줌.
  if (!params.q) {
    aggregate.push({
      $geoNear: {
        near: {
          type: "point",
          coordinates: [params.lng, params.lat],
        },
        distanceField: "distance",
        maxDistance: params.distance,
      },
    });
  }

  if (!!params.category) {
    if (params.category === "etc") {
      const exclude = [
        "레저업소",
        "레저용품",
        "문화",
        "취미",
        "숙박업",
        "학원",
        "여행",
        "회원제형태",
        "병원",
        "기타의료기관",
        "의원",
        "약국",
        "유통",
        "도매",
        "소매",
        "신변",
        "잡화",
        "카페",
        "음료",
        "음식",
      ];

      aggregate.push({
        $match: {
          INDUTYPE_NM: {
            $nin: exclude.map((item) => new RegExp(item)),
          },
        },
      });
    } else {
      const ctgs = params.category.split(",").filter(Boolean);

      const $or = ctgs.map((ctg) => ({
        INDUTYPE_NM: {
          $regex: ctg,
          $options: "i",
        },
      }));

      aggregate.push({
        $match: {
          $or: $or,
        },
      });
    }
  }

  if (!!params.q) {
    aggregate.push({
      $match: {
        CMPNM_NM: {
          $regex: params.q,
          $options: "i",
        },
      },
    });
  }

  return shopModel.aggregate<IShopDocument>(aggregate);
};

const getCategory = async () => {
  const docs = await shopModel.aggregate([
    {
      $group: {
        _id: "$INDUTYPE_NM",
        total: { $sum: 1 },
      },
    },
    {
      $sort: {
        total: -1,
      },
    },
  ]);

  console.log(docs);

  return docs;
};

export default {
  saveAllByGmoneyResponse,
  clearAll,
  findAll,
  getCategory,
};
