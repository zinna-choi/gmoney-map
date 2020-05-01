export interface KakaoLocation {
  getLat: () => number;
  getLng: () => number;
}

export interface KakaoMapRef {
  getCenter: () => KakaoLocation;
}

export type KakaoMapEventTypes = "idle";

export declare namespace kakao.maps {
  export interface KakaoMapOptions {
    center: LatLng;
    level: number;
  }

  export interface SetLevelOptions {
    anchor?: LatLng;
    animate?:
      | boolean
      | {
          duration?: number;
        };
  }
  export class LatLng {
    constructor(lat: number, lng: number);

    getLat(): number;
    getLng(): number;
  }

  export class Map {
    constructor(element: HTMLElement, options: KakaoMapOptions);

    // center
    getCenter(): LatLng;
    setCenter(latLng: LatLng): void;

    // level
    setLevel(level: number, options?: SetLevelOptions): void;
    getLevel(): number;
  }

  export class event {
    public static addListener(
      map: Map,
      event: KakaoMapEventTypes,
      listner: () => void
    ): void;
    public static removeListener(
      map: Map,
      event: KakaoMapEventTypes,
      listner: () => void
    ): void;
  }
}
