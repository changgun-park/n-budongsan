import { NextRequest, NextResponse } from "next/server";

interface ArticleQueryParams {
  zoom: string;
  leftLon: string;
  rightLon: string;
  topLat: string;
  bottomLat: string;
  order?: "rank";
  realEstateType: string;
  tradeType?: string;
  tag?: string;
  rentPriceMin?: string;
  rentPriceMax?: string;
  priceMin?: string;
  priceMax?: string;
  areaMin?: string;
  areaMax?: string;
  oldBuildYears?: string;
  recentlyBuildYears?: string;
  minHouseHoldCount?: string;
  maxHouseHoldCount?: string;
  showArticle?: string;
  sameAddressGroup?: string;
  minMaintenanceCost?: string;
  maxMaintenanceCost?: string;
  priceType?: string;
  directions?: string;
  page?: string;
  articleState?: string;
}

interface Article {
  articleNo: string;
  articleName: string;
  articleStatus: string;
  realEstateTypeCode: string;
  realEstateTypeName: string;
  articleRealEstateTypeCode: string;
  articleRealEstateTypeName: string;
  tradeTypeCode: string;
  tradeTypeName: string;
  verificationTypeCode: string;
  floorInfo: string;
  priceChangeState: string;
  isPriceModification: boolean;
  dealOrWarrantPrc: string;
  area1: number;
  area2: number;
  direction: string;
  articleConfirmYmd: string;
  representativeImgUrl?: string;
  representativeImgTypeCode?: string;
  representativeImgThumb?: string;
  siteImageCount: number;
  articleFeatureDesc?: string;
  tagList: string[];
  buildingName: string;
  sameAddrCnt: number;
  sameAddrDirectCnt: number;
  sameAddrMaxPrc: string;
  sameAddrMinPrc: string;
  cpid: string;
  cpName: string;
  cpPcArticleUrl: string;
  cpPcArticleBridgeUrl: string;
  cpPcArticleLinkUseAtArticleTitleYn: boolean;
  cpPcArticleLinkUseAtCpNameYn: boolean;
  cpMobileArticleUrl: string;
  cpMobileArticleLinkUseAtArticleTitleYn: boolean;
  cpMobileArticleLinkUseAtCpNameYn: boolean;
  latitude: string;
  longitude: string;
  isLocationShow: boolean;
  realtorName: string;
  realtorId?: string;
  tradeCheckedByOwner: boolean;
  isDirectTrade: boolean;
  isInterest: boolean;
  isComplex: boolean;
  detailAddress: string;
  detailAddressYn: string;
  virtualAddressYn: string;
  isVrExposed: boolean;
  rentPrc?: string;
}

interface ArticleListResponse {
  isMoreData: boolean;
  articleList: Article[];
  mapExposedCount: number;
  nonMapExposedIncluded: boolean;
}

export async function GET(request: NextRequest) {
  const NAVER_TOKEN = process.env.NAVER_LAND_TOKEN;

  try {
    const searchParams = request.nextUrl.searchParams;
    const params: Partial<ArticleQueryParams> = {
      zoom: searchParams.get("zoom") || "",
      leftLon: searchParams.get("leftLon") || "",
      rightLon: searchParams.get("rightLon") || "",
      topLat: searchParams.get("topLat") || "",
      bottomLat: searchParams.get("bottomLat") || "",
      order: (searchParams.get("order") as "rank") || undefined,
      realEstateType: searchParams.get("realEstateType") || "",
      tradeType: searchParams.get("tradeType") || undefined,
      tag: searchParams.get("tag") || undefined,
      rentPriceMin: searchParams.get("rentPriceMin") || "0",
      rentPriceMax: searchParams.get("rentPriceMax") || "900000000",
      priceMin: searchParams.get("priceMin") || "0",
      priceMax: searchParams.get("priceMax") || "900000000",
      areaMin: searchParams.get("areaMin") || "0",
      areaMax: searchParams.get("areaMax") || "900000000",
      oldBuildYears: searchParams.get("oldBuildYears") || undefined,
      recentlyBuildYears: searchParams.get("recentlyBuildYears") || undefined,
      minHouseHoldCount: searchParams.get("minHouseHoldCount") || undefined,
      maxHouseHoldCount: searchParams.get("maxHouseHoldCount") || undefined,
      showArticle: searchParams.get("showArticle") || "false",
      sameAddressGroup: searchParams.get("sameAddressGroup") || "false",
      minMaintenanceCost: searchParams.get("minMaintenanceCost") || undefined,
      maxMaintenanceCost: searchParams.get("maxMaintenanceCost") || undefined,
      priceType: searchParams.get("priceType") || "RETAIL",
      directions: searchParams.get("directions") || undefined,
      page: searchParams.get("page") || "1",
      articleState: searchParams.get("articleState") || undefined,
    };

    const requiredParams = [
      "zoom",
      "leftLon",
      "rightLon",
      "topLat",
      "bottomLat",
      "realEstateType",
    ];

    for (const param of requiredParams) {
      if (!params[param as keyof ArticleQueryParams]) {
        return NextResponse.json(
          { error: `Missing required parameter: ${param}` },
          { status: 400 }
        );
      }
    }

    const response = await fetch(
      `https://new.land.naver.com/api/articles?${searchParams.toString()}`,
      {
        headers: {
          Authorization: NAVER_TOKEN!,
          Accept: "*/*",
          "Accept-Language": "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7",
          Referer: "https://new.land.naver.com/houses",
          "sec-ch-ua":
            '"Not A(Brand";v="8", "Chromium";v="132", "Google Chrome";v="132"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": '"macOS"',
          "User-Agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Naver API responded with status: ${response.status}`);
    }

    const data: ArticleListResponse = await response.json();

    return NextResponse.json(data, {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
    });
  } catch (error) {
    console.error("Error in articles API", error);
    return NextResponse.json(
      {
        error: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}
