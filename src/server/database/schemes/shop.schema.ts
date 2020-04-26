import mongoose, { connection } from "mongoose";
import { IShopDocument } from "../../shop/shop.interface";

export const ShopSchema = new mongoose.Schema<IShopDocument>({
  CMPNM_NM: String, // 상호명
  INDUTYPE_CD: String, // 업종코드
  BIZCOND_NM: String, // 업태명
  INDUTYPE_NM: String, // 업종(종목)명
  TELNO: String, // 전화번호
  REGION_MNY_NM: String, // 사용가능한지역화폐명
  BRNHSTRM_MNY_USE_POSBL_YN: String, // 지류형지역화폐사용가능여부
  CARD_MNY_USE_POSBL_YN: String, // 카드형지역화폐사용가능여부
  MOBILE_MNY_USE_POSBL_YN: String, // 모바일형지역화폐사용가능여부
  DATA_STD_DE: String, // 데이터기준일자 yyyy-mm-dd
  REFINE_LOTNO_ADDR: String, // 소재지지번주소
  REFINE_ROADNM_ADDR: String, // 소재지도로명주소
  REFINE_ZIP_CD: String, // 우편번호
  REFINE_WGS84_LOGT: String, // 경도
  REFINE_WGS84_LAT: String, // 위도
  SIGUN_CD: String, // 시군코드
  SIGUN_NM: String, // 시군명
  location: {
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ["Point"], // 'location.type' must be 'Point'
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
});

export const shopModel = mongoose.model<IShopDocument>(
  "shop",
  ShopSchema,
  "Shop"
);
