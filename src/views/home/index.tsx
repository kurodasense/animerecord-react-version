import { memo, useEffect, useMemo, useState } from "react";

import HomeWrapper from "./style";
import { getAnimeDate } from "../../service";
import HomeSection from "./cpns/home-section/HomeSection";
import { IAnimeDate } from "@/service/request/style";

const Home = memo(() => {
  const [animeDates, setAnimeDates] = useState<IAnimeDate[]>([]);
  useEffect(() => {
    // 在这里请求 getAnimeDate
    getAnimeDate().then(
      (res) => {
        const { status, msg, data } = res.data;
        if (status === 200) {
          setAnimeDates(data);
        } else {
          console.log(msg);
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }, []);

  const sortedAnimeDates = useMemo(() => {
    return [...animeDates].sort((a, b) => {
      const [a_year, a_month] = a.date_name.split(".").map((str) => parseInt(str, 10));
      const [b_year, b_month] = b.date_name.split(".").map((str) => parseInt(str, 10));

      if (a_year > b_year) return 1;
      else if (a_year < b_year) return -1;
      else {
        return a_month - b_month;
      }
    });
  }, [animeDates]);
  return (
    <HomeWrapper>
      {sortedAnimeDates?.map((animeDate) => {
        return <HomeSection key={animeDate.date_id} animeDate={animeDate} />;
      })}
    </HomeWrapper>
  );
});

export default Home;
