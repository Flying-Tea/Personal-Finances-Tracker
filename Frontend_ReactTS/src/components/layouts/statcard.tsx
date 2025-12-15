import { type ReactNode } from "react";
import { MdArrowDownward, MdArrowUpward } from "react-icons/md";
import { Card } from "@/components/ui/card";
import { FaChalkboard, FaChartPie, FaUserCheck } from "react-icons/fa";
import { Skeleton } from "@/components/ui/skeleton";
import clsx from "clsx";

type StatCard = {
    title: string;
    value: string;
    metricDelta?: string;
    positiveMetric?: boolean;
    icon: ReactNode;
    className?: string;
    colors?: {
    bgColor?: string;
    iconColor?: string;
    };
};

type StatCardsProps = {
    cards?: ReadonlyArray<StatCard>;
    isGrid?: boolean;
    columns?: number;
    showMetricDelta?: boolean;
    className?: string;
    cardClassName?: string;
    isLoading?: boolean;
    showIcons?: boolean;
    layoutOrientation?: "vertical" | "horizontal";
};

const DEFAULT_CARDS: ReadonlyArray<StatCard> = Object.freeze([ // Holding default card data change as needed in web pages
    {
        title: "Total Metrics",
        value: "1,567",
        icon: <FaChalkboard />,
        colors: { bgColor: "bg-blue-100", iconColor: "text-blue-600" },
        metricDelta: "0.15",
        positiveMetric: true,
    },
    {
        title: "Performance",
        value: "91%",
        icon: <FaChartPie />,
        colors: { bgColor: "bg-green-100", iconColor: "text-green-600" },
        metricDelta: "0.45",
        positiveMetric: true,
    },
    {
        title: "User Engagement",
        value: "75%",
        icon: <FaUserCheck />,
        colors: { bgColor: "bg-yellow-100", iconColor: "text-yellow-600" },
        metricDelta: "0.05",
        positiveMetric: true,
    },
]);

export default function StatCards3({
  cards = DEFAULT_CARDS,
  isGrid = false,
  columns = 2,
  className,
  cardClassName,
  showMetricDelta = true,
  isLoading = false,
  showIcons = true,
  layoutOrientation = "vertical",
}: StatCardsProps) {
  const containerClass = clsx(
    isGrid
      ? `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-${Math.min(columns, 4)}`
      : "flex flex-wrap sm:flex-nowrap max-lg:flex-col w-full",
    "gap-4",
    className
  );

  return (
    <div className={containerClass}>
      {cards.map((card, index) => (
        <SingleCard
          key={index}
          card={card}
          showMetricDelta={showMetricDelta}
          isLoading={isLoading}
          className={clsx(
            cardClassName,
            !isGrid && "w-full sm:w-auto sm:flex-1 min-w-[200px]"
          )}
          isGridItem={isGrid}
          showIcons={showIcons}
          layoutOrientation={layoutOrientation}
        />
      ))}
    </div>
  );
}

function SingleCard({
  card,
  showMetricDelta,
  isLoading,
  className,
  isGridItem = true,
  showIcons = true,
  layoutOrientation,
}: {
  card: StatCard;
  showMetricDelta: boolean;
  isLoading: boolean;
  className?: string;
  isGridItem?: boolean;
  showIcons?: boolean;
  layoutOrientation?: "vertical" | "horizontal";
}) {
  const { bgColor = "bg-primary/10", iconColor = "text-primary" } =
    card.colors || {};

  return (
    <div className={clsx(isGridItem ? "w-full border" : "w-full sm:w-auto sm:flex-1")}>
      <Card
        className={clsx(
          "p-6 flex gap-3 h-full",
          layoutOrientation === "vertical" ? "items-center" : "flex-col gap-5",
          className,
          bgColor
        )}
      >
        {showIcons && (
          <div className="flex w-14 h-[53px] justify-center shrink-0">
            <div
              className={clsx(
                "w-full h-full rounded-md flex items-center justify-center text-xl sm:text-2xl font-bold",
                bgColor,
                iconColor
              )}
            >
              {card.icon}
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-start justify-between w-full gap-2 sm:gap-4">
          <div className="flex flex-col">
            <span className="text-lg sm:text-xl font-bold mt-2">{card.title}</span>
            {isLoading ? (
              <Skeleton className="w-[80px] h-[32px] sm:w-[100px] sm:h-[36px] rounded-md dark:bg-neutral-800" />
            ) : (
              <div className="text-sm sm:text-base opacity-65 sm:mt-2">{card.value}</div>
            )}
          </div>

          {showMetricDelta && (
            <div
              className={clsx(
                "text-sm flex items-center gap-1 self-end sm:self-auto text-muted-foreground",
                card.positiveMetric ? "text-green-600" : "text-red-600"
              )}
            >
              {isLoading ? (
                <Skeleton className="w-[40px] h-[20px] sm:w-[50px] sm:h-[25px] rounded-sm dark:bg-neutral-800" />
              ) : (
                <span className="flex items-center gap-1">
                  {card.positiveMetric ? <MdArrowUpward /> : <MdArrowDownward />}
                  <span>{card.metricDelta}</span>
                </span>
              )}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
