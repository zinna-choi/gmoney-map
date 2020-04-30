import axios from "axios";
import env from "../process";

export class Coord2AddressRequest {
  x: number;
  y: number;
  input_coord?: "WGS84" | "WCONGNAMUL" | "CONGNAMUL" | "WTM" | "TM" = "WGS84";
}

export interface Coord2AddressResponse {
  meta: {
    total_count: number;
  };
  documents: [
    {
      road_address: {
        address_name: string;
        region_1depth_name: string;
        region_2depth_name: string;
        region_3depth_name: string;
        road_name: string;
        underground_yn: "N" | "Y";
        main_building_no: string;
        sub_building_no: string;
        building_name: string;
        zone_no: string;
      };
      address: {
        address_name: string;
        region_1depth_name: string;
        region_2depth_name: string;
        region_3depth_name: string;
        mountain_yn: "N" | "Y";
        main_address_no: string;
        sub_address_no: string;
      };
    }
  ];
}

/**
 * 좌표로 주소 변환하기
 * @see https://developers.kakao.com/docs/latest/ko/local/dev-guide#coord-to-address
 */
const coord2address = async (params: Coord2AddressRequest) => {
  if (!env.KAKAO_REST_KEY) {
    console.error(".env KAKAO Rest Key Reuqired.");
  }
  return axios.get<Coord2AddressResponse>(
    `https://dapi.kakao.com/v2/local/geo/coord2address.json`,
    {
      params,
      headers: {
        Authorization: `KakaoAK ${env.KAKAO_REST_KEY}`,
      },
    }
  );
};

export default {
  coord2address,
};
