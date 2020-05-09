import httpClient from "./httpClient";
import { ISearchParams } from "../server/shop/shop.model";
import { IShopDocument } from "../server/shop/shop.interface";

const search = async (params: ISearchParams) => {
  return httpClient.get<IShopDocument[]>(`/v/search`, { params });
};

export default {
  search,
};
