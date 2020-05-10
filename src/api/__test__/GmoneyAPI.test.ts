import GmomeyAPI from "../GmoneyAPI";

describe("경기도 지역화폐 가맹점 API 테스트", () => {
  test("API 호출", async () => {
    const { data, status } = await GmomeyAPI.findAllShop({
      pSize: 2,
      Type: "json",
    });

    expect(status).toBe(200);

    expect(data.RegionMnyFacltStus).not.toBe(null);
    expect(Array.isArray(data.RegionMnyFacltStus[1].row)).toBe(true);

    console.log(data.RegionMnyFacltStus[1].row);
  });
});
