import axios from "axios";
import { GmoneyApiInterface } from "./gmoney.interface";
import shopService from "../shop/shop.service";
import GmoneyAPI from "../../api/GmoneyAPI";

let index: number = 1; // 호출 할 페이지 번호
let totalElement: number = 0; // 최초 호출 시 전체 레코드 갯수

/**
 * 객체들 집어 넣을 queue
 */
class Queue<T> {
  private _arr: T[] = [];

  constructor() {
    this._arr = [];
  }
  enqueue(item: T) {
    this._arr.push(item);
  }
  dequeue() {
    if (this._arr.length === 0) {
      return null;
    }
    return this._arr.shift();
  }

  get size() {
    return this._arr.length;
  }
}

// 상점 데이터를 임시로 저장 해 놓을 queue
const queue = new Queue<GmoneyApiInterface>();

const savedGmoneyData = async (): Promise<any> => {
  if (queue.size < totalElement || totalElement === 0) {
    const {
      data: { RegionMnyFacltStus },
    } = await GmoneyAPI.findAllShop({
      Type: "json",
      pSize: 1000,
      pIndex: index,
    });

    totalElement = RegionMnyFacltStus[0].head[0].list_total_count;
    const elements: GmoneyApiInterface[] = RegionMnyFacltStus[1].row;
    index++;

    for (let i = 0; i < elements.length; i++) {
      queue.enqueue(elements[i]);
    }

    const percent = ((queue.size / totalElement) * 100).toFixed(2);

    console.log(
      `Call Shop API Data...: [${percent}%] ${queue.size} / ${totalElement}`
    );

    // Recursive
    return savedGmoneyData();
  }

  // 큐에 쌓인 데이터들을 db 로 저장합니다.
  await shopService.clearAll();

  // 큐에서 나온 데이터를 임시로 저장 해 둘 변수
  let _tmp: GmoneyApiInterface[] = [];
  while (true) {
    const element = queue.dequeue();
    if (!!element) {
      _tmp.push(element);
    }
    const percent = (
      ((totalElement - queue.size) / totalElement) *
      100
    ).toFixed(2);

    if (_tmp.length === 500 || !element) {
      console.log(
        `Saved Shop TO Database...: [${percent}%] ${totalElement -
          queue.size} / ${totalElement}`
      );
      await shopService.saveAllByGmoneyResponse(_tmp);
      _tmp = [];
    }

    if (!element) break;
  }

  index = 1;
  totalElement = 0;
};

export default {
  savedGmoneyData,
};
