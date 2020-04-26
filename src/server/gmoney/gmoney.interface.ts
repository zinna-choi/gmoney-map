export interface Gmoney {}

export interface GmoneyApiInterface {
  CMPNM_NM: string; // 상호명
  INDUTYPE_CD?: string; // 업종코드
  BIZCOND_NM?: string; // 업태명
  INDUTYPE_NM?: string; // 업종(종목)명
  TELNO?: string; // 전화번호
  REGION_MNY_NM?: string; // 사용가능한지역화폐명
  BRNHSTRM_MNY_USE_POSBL_YN?: string; // 지류형지역화폐사용가능여부
  CARD_MNY_USE_POSBL_YN?: string; // 카드형지역화폐사용가능여부
  MOBILE_MNY_USE_POSBL_YN?: string; // 모바일형지역화폐사용가능여부
  DATA_STD_DE?: string; // 데이터기준일자 yyyy-mm-dd
  REFINE_LOTNO_ADDR?: string; // 소재지지번주소
  REFINE_ROADNM_ADDR?: string; // 소재지도로명주소
  REFINE_ZIP_CD?: string; // 우편번호
  REFINE_WGS84_LOGT?: string; // 경도
  REFINE_WGS84_LAT?: string; // 위도
  SIGUN_CD?: string; // 시군코드
  SIGUN_NM?: string; // 시군명
}
