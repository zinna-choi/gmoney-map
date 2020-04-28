import ShopAPI from "../ShopAPI";
describe("상점 API 테스트", () => {
  test("상점 좌표로 API 호출 테스트", async () => {
    const { data } = await ShopAPI.search({ distance: 500, lat: 11, lng: 11 });
    console.log(data);
  });
  test("상점 키워드로 API 호출 테스트", () => {});
});
