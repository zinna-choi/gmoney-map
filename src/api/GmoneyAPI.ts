import Axios from "axios";

export interface IGmoney {
  CMPNM_NM: string;
  INDUTYPE_CD: string | null;
  BIZCOND_NM: string | null;
  INDUTYPE_NM: string | null;
  TELNO: string;
  REGION_MNY_NM: string | null;
  BRNHSTRM_MNY_USE_POSBL_YN: string | null;
  CARD_MNY_USE_POSBL_YN: string | null;
  MOBILE_MNY_USE_POSBL_YN: string | null;
  DATA_STD_DE: string;
  REFINE_LOTNO_ADDR: string;
  REFINE_ROADNM_ADDR: string;
  REFINE_ZIP_CD: string;
  REFINE_WGS84_LOGT: string;
  REFINE_WGS84_LAT: string;
  SIGUN_CD: string;
  SIGUN_NM: string;
}

export class IGmoneyApiRequest {
  Type: "json" = "json";
  pIndex?: number = 1;
  pSize: number = 1;
}

export class IGmoneyApiResponse {
  "RegionMnyFacltStus": [
    {
      head: [
        { list_total_count: number },
        { RESULT: { CODE: "INFO-000"; MESSAGE: "정상 처리되었습니다." } },
        { api_version: "1.0" }
      ];
    },
    {
      row: IGmoney[];
    }
  ];
}
const findAllShop = (params: IGmoneyApiRequest) => {
  return Axios.get<IGmoneyApiResponse>(
    `https://openapi.gg.go.kr/RegionMnyFacltStus`,
    {
      params: {
        KEY: process.env.GMONEY_API_KEY,
        ...params,
      },
    }
  );
};

export default {
  findAllShop,
};
