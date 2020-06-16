import React from "react";
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "next/document";
import { ServerStyleSheet as StyledComponentSheets } from "styled-components";
import { ServerStyleSheets as MaterialUiServerStyleSheets } from "@material-ui/styles";

class MyDocument extends Document<any> {
  static async getInitialProps(ctx: DocumentContext) {
    const styledComponentSheet = new StyledComponentSheets();
    const materialUiSheets = new MaterialUiServerStyleSheets();
    const originalRenderPage = ctx.renderPage;
    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            styledComponentSheet.collectStyles(
              materialUiSheets.collect(<App {...props} />)
            ),
        });
      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: [
          <React.Fragment key="styles">
            {initialProps.styles}
            {materialUiSheets.getStyleElement()}
            {styledComponentSheet.getStyleElement()}
          </React.Fragment>,
        ],
      };
    } finally {
      styledComponentSheet.seal();
    }
  }

  render() {
    return (
      <Html>
        <Head>
          <script src="https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
          <script
            type="text/javascript"
            src={`https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.KAKAO_REST_KEY}&libraries=services`}
          ></script>
          <title>경기도지역화폐 / 재난기본소득 가맹점 맵</title>
          <meta
            name="description"
            content="경기도지역화폐 (gmoney) , 경기도 재난기본소득을 사용할 수 있는 음식점, 카페, 마트, 편의점, 생활편의, 문화시설 등의 사용처(가맹점)를 나의 위치 기반으로 조회할 수 있는 홈페이지 / 가평군, 고양시, 과천시, 광주시, 구리시, 군포시, 남양주시, 동두천시, 부천시, 수원시, 안산시, 안성시, 안양시, 양주시, 양평군, 여주시, 연천군, 오산시, 용인시, 의왕시, 의정부시, 이천시, 파주시, 평택시, 포천시, 하남시, 화성시 재난기본소득 조회
    "
          />
          <meta
            name="keywords"
            content="경기도지역화폐, 지역화폐, 경기재난기본소득, 재난기본소득, 지역화폐, 경지도지역화폐 사용처, 경기도지역화폐 가맹점, gmoney, 지머니, 경기도 지역화폐 10만원, 경기도 지역화폐 신청방법, 경기도 지역화폐 맵, 지역화폐 편의점, 지역화폐 배달, 재난기본소득 편의점, 재난기본소득 배달, 재난기본소득 음식점, 재난기본소득 카페, 지역화폐 신청, 재난기본소득 지역화폐, 재난기본소득 가맹점,긴급재난지원금, 재난지원금"
          />
          <meta name="author" content="JiEun-choio-Dev, Ziponia" />

          <meta property="og:type" content="website" />
          <meta
            property="og:title"
            content="경기도지역화폐 / 재난기본소득 가맹점(사용처) 맵"
          />
          <meta property="og:url" content="https://g-money-map.now.sh/" />
          <meta property="og:site_name" content="경기도 지역화폐 가맹점 맵" />
          <meta
            property="og:description"
            content="경기도지역화폐 (gmoney) , 경기도 재난기본소득을 사용할 수 있는 음식점, 카페, 마트, 편의점, 생활편의, 문화시설 등의 사용처(가맹점)를 나의 위치 기반으로 조회할 수 있는 홈페이지 / 가평군, 고양시, 과천시, 광주시, 구리시, 군포시, 남양주시, 동두천시, 부천시, 수원시, 안산시, 안성시, 안양시, 양주시, 양평군, 여주시, 연천군, 오산시, 용인시, 의왕시, 의정부시, 이천시, 파주시, 평택시, 포천시, 하남시, 화성시 재난기본소득 조회"
          />
          <meta property="og:image:width" content="400" />
          <meta property="og:image:height" content="210" />
          <meta
            property="og:image"
            content="https://lh3.googleusercontent.com/r508Xo6pwv-NCI6zzePKdHAmrdY_cyMsYt-79nemVjauQL4y9ODgdkS-8E4pI5xsoug"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
