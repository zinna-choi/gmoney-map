require("dotenv").config();
import "reflect-metadata";

import express from "express";
import { useExpressServer } from "routing-controllers";
import next from "next";
import { databaseProvider } from "./database/database.provider";

import ShopController from "./shop/shop.controller";
import gmoneyService from "./gmoney/gmoney.service";

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const bootstrap = async () => {
  await databaseProvider();
  await app.prepare();
  const server = express();

  useExpressServer(server, {
    controllers: [ShopController],
    classTransformer: false,
  });

  server.all("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
    // test
  });

  /**
   * === 주의 ===
   * 이 주석을 해제하면, 기존 데이터를 지우고, 새로운 데이터로 덮어 씌우는 작업을 진행합니다.
   * 1. 상점 데이터를 수집합니다.
   * 2. 수집이 모두 완료되면, 기존데이터를 삭제합니다.
   * 3. 기존데이터를 db 로 insert 합니다.
   */
  // await gmoneyService.savedGmoneyData();
};

bootstrap();
