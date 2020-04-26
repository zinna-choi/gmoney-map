import axios, { AxiosInstance } from "axios";
import { GmoneyApiInterface } from "./gmoney.interface";
import ShopService from "../shop/shop.service";

class GmoneyService {
  public index: number = 1;
  public items: any[] = [];
  public totalElement: number = 0;

  constructor(
    private httpClient: AxiosInstance,
    private shopService: ShopService
  ) {
    this.httpClient = httpClient;
  }

  /**
   * API 에서 데이터를 수집합니다.
   */
  async savedGmoneyData(): Promise<void> {
    if (this.items.length < this.totalElement || this.totalElement === 0) {
      console.log(`CALLING OpenAPI Server...`);
      const {
        data: { RegionMnyFacltStus },
      } = await this.httpClient.get(
        `https://openapi.gg.go.kr/RegionMnyFacltStus`,
        {
          params: {
            KEY: process.env.GMONEY_API_KEY,
            Type: "json",
            pIndex: this.index,
            pSize: 1000,
          },
        }
      );

      this.totalElement = RegionMnyFacltStus[0].head[0].list_total_count;
      const elements: GmoneyApiInterface[] = RegionMnyFacltStus[1].row;
      this.index++;
      this.items = this.items.concat(elements);

      const percent = ((this.items.length / this.totalElement) * 100).toFixed(
        2
      );

      console.log(
        `Current Saved Contents: [${percent}%] ${this.items.length} / ${this.totalElement}`
      );

      try {
        console.log("Start Save Mongodb");
        await this.shopService.saveAllByGmoneyResponse(elements);
      } catch (e) {
        console.error("Update Error");
      } finally {
        console.log(" G-Money Data Save End ");
      }

      // Recursive
      return this.savedGmoneyData();
    }

    this.index = 1;
    this.items = [];
    this.totalElement = 0;
  }
}

export default GmoneyService;
