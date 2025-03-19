import { memo } from "react";
import ItemWrapper from "./style";
import { IAnimeRecord } from "@/service/request/style";
import { BentoGrid } from "@/components/ui/bento-grid";

interface IHomeItemProps {
  record: IAnimeRecord;
}
const HomeItem = memo(({ record }: IHomeItemProps) => {
  return (
    
  );
});

export default HomeItem;
