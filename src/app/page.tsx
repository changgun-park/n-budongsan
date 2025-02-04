"use client";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        "/api/articles?" +
          new URLSearchParams({
            zoom: "19",
            leftLon: "126.984094",
            rightLon: "126.9886001",
            topLat: "37.4975354",
            bottomLat: "37.4959607",
            realEstateType: "HOJT:SGJT:JWJT:DDDGG:VL",
            priceType: "RETAIL",
            tag: "::::::::",
          })
      );

      const data = await response.json();
      console.log("API Response:", data);
    }

    fetchData();
  }, []);

  return <div>check your console</div>;
}
