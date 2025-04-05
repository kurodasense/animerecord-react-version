import { memo, useEffect, useMemo, useState, useRef, useCallback } from "react";
import { VariableSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import HomeWrapper from "./style";
import { getAnimeDate } from "../../service";
import HomeSection from "./cpns/home-section/HomeSection";
import { IAnimeDate } from "@/service/request/style";
import useWindowSize from "@/hooks/useWindowSize";

// 默认行高（在未测量前使用）
const DEFAULT_ROW_HEIGHT = 327;

const Home = memo(() => {
  const [animeDates, setAnimeDates] = useState<IAnimeDate[]>([]);
  const listRef = useRef<List>(null);
  const rowHeights = useRef<Record<number, number>>({});
  const rowRefs = useRef<Record<number, HTMLDivElement | null>>({});
  const { width: windowWidth } = useWindowSize(); // 获取当前窗口宽度

  useEffect(() => {
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

  // 数据变化时重置行高缓存
  useEffect(() => {
    if (sortedAnimeDates.length > 0) {
      rowHeights.current = {};
      listRef.current?.resetAfterIndex(0);
    }
  }, [sortedAnimeDates, windowWidth]);

  // 获取行高的回调函数
  const getItemSize = useCallback((index: number) => {
    // 如果有缓存的高度，返回缓存值
    if (rowHeights.current[index]) {
      return rowHeights.current[index];
    }
    // 否则返回默认高度
    return DEFAULT_ROW_HEIGHT;
  }, []);

  // 行渲染函数
  const HomeSectionRow = useCallback(
    ({ index, style }: { index: number; style: React.CSSProperties }) => {
      const animeDate = sortedAnimeDates[index];

      // 测量行高的回调
      const measureRef = (node: HTMLDivElement | null) => {
        if (node) {
          // 保存 dom 引用
          rowRefs.current[index] = node;

          // 使用 requestAnimationFrame 确保在渲染后测量
          requestAnimationFrame(() => {
            if (node && node.scrollHeight) {
              const height = node.scrollHeight;
              // 如果高度与缓存不同，更新缓存并重置列表
              if (rowHeights.current[index] !== height) {
                rowHeights.current[index] = height;
                listRef.current?.resetAfterIndex(index);
              }
            }
          });
        }
      };

      return (
        <div ref={measureRef} style={style}>
          <HomeSection key={`${animeDate.date_id}-${windowWidth}`} animeDate={animeDate} />
        </div>
      );
    },
    [sortedAnimeDates, windowWidth]
  );

  return (
    <HomeWrapper>
      <AutoSizer>
        {({ height, width }) => (
          <List
            ref={listRef}
            height={height}
            width={width}
            itemCount={sortedAnimeDates.length}
            itemSize={getItemSize}
            estimatedItemSize={DEFAULT_ROW_HEIGHT} // 提供预估高度改善初始渲染
          >
            {HomeSectionRow}
          </List>
        )}
      </AutoSizer>
    </HomeWrapper>
  );
});

export default Home;
