import { memo, useEffect, useMemo, useState } from "react";
import SectionWrapper from "./style";
import { getAnimeRecordByDateId } from "../../../../service";
import { IAnimeDate, IAnimeRecord } from "@/service/request/style";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import ImageComponent from "@/components/image-component";

interface IHomeSectionProps {
  animeDate: IAnimeDate;
}
const HomeSection = memo(({ animeDate }: IHomeSectionProps) => {
  const [animeRecords, setAnimeRecords] = useState<IAnimeRecord[]>([]);
  useEffect(() => {
    // 根据 animeDate 请求相应的追番记录
    getAnimeRecordByDateId(animeDate.date_id).then(
      (res) => {
        const { status, msg, data } = res.data;
        if (status === 200) {
          setAnimeRecords(data);
        } else {
          console.log(msg);
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }, []);

  const newDateName = useMemo(() => {
    const [year, month] = animeDate.date_name.split(".");
    return `${year}年${month}月番`;
  }, [animeDate.date_name]);
  return (
    <SectionWrapper>
      <h1>{newDateName}</h1>
      <BentoGrid className="mx-8">
        {animeRecords.map((animerecord) => (
          <BentoGridItem
            key={animerecord.record_id}
            title={animerecord.anime_name}
            header={<ImageComponent src={animerecord.image_url} />}
            description={animerecord.watch_status}
          />
        ))}
      </BentoGrid>
    </SectionWrapper>
  );
});

export default HomeSection;
