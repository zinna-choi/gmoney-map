# 경기도 지역화폐 찾아보기

## 개요

## 시작하기

경기도 지역화폐 (이하 지머니 애플리케이션) 은 vercel (구. now) 에서 호스팅되고 있습니다.

이 애플리케이션이 동작하기 위해서는, 사전에 아래 기관에서 API KEY 를 발급 받아야 합니다.

- Kakao Developer
- 경기도 지역화폐 API

또, 사전에 아래와 같이 설정 되어있어야 합니다.

- node.js 12.x 이상
- npm install -g vercel
- npm install -g typescript

## vercel 에서 호스팅 하기

지머니 애플리케이션은 vercel (구. now) 에서 serverless 형태로 호스팅 하는것에 초점을 맞추고 있습니다.

애플리케이션을 다운받은 후, 다음과 같이 설정해주세요.

- `$ vercel` 로 vercel 을 링크합니다.
- .env.example 파일을 .env 로 파일 변경합니다.
- .env 항목의 각 환경변수들을 설정합니다.
- vercel 로 호스팅 하기 위해 다음과 같이 실행합니다.
- `$ vercel env add` 를 실행합니다.

`vercel env add` 명령어로 각 항목에 맞춰 환경변수를 프로젝트로 설정 해주세요.

예)

```
$ vercel env add
REACT_APP_KAKAO_MAP_KEY
{카카오에서 발급받은 javascript key}

$ vercel env add
KAKAO_REST_KEY
{카카오에서 발급받은 맵 REST KEY}

...
```

위 안내에 따라, 다음 4개 환경변수를 설정 해주세요.

- REACT_APP_KAKAO_MAP_KEY
- KAKAO_REST_KEY
- MONGODB_URI
- GMONEY_API_KEY

## 앱 배포하기

vercel 은 단순합니다.

```
$ vercel

// or production

$ vercel --prod
```

이게 끝입니다.

## 애플리케이션의 구조

지머니 애플리케이션은, 경기도 지역화폐 API 에서 데이터를 다운받아, 애플리케이션 고유의 MongoDB 로 관리합니다.

이 사유는, 데이터 제공자 (경기도 지역화폐 API)에서 제공 하는 데이터를 더 효율적으로 가공하기 위함입니다.
