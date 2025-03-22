import { cn } from "@/lib/utils";
export const BentoGrid = ({
  className,
  children
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn("w-full h-fit grid gap-4 md:auto-rows-[18rem] justify-center", className)}
      style={{ gridTemplateColumns: "repeat(auto-fit, 400px)" }}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "group/bento shadow-input row-span-1 flex flex-col justify-between space-y-4 rounded-xl border border-neutral-200 bg-white p-4 transition duration-200 hover:shadow-xl dark:border-white/[0.2] dark:bg-black dark:shadow-none",
        className
      )}
    >
      <div className="flex-3 max-h-[200px]">{header}</div>
      <div className="transition duration-200 group-hover/bento:translate-x-2 flex-1">
        {icon}
        <div
          className="font-sans font-bold text-neutral-600 dark:text-neutral-200 truncate"
          title={title as string}
        >
          {title}
        </div>
        <div className="font-sans text-xs font-normal text-neutral-600 dark:text-neutral-300">
          {description}
        </div>
      </div>
    </div>
  );
};
