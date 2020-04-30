import KakaoAPI from "../KakaoAPI";

describe("카카오 API", () => {
  it("좌표 -> 주소 변환 API test", async () => {
    // 지도상의 경희궁 좌표
    const { data } = await KakaoAPI.coord2address({
      x: 126.968836,
      y: 37.570723,
    });

    console.log(JSON.stringify(data));
    expect(data.documents).toHaveLength(data.meta.total_count);
  });
});
