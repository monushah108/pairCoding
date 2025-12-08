export default function SeparatorWithTime({
  label = "Today", // text inside the time box
  ariaLabel = "Separator",
  className = "", // extra wrapper classes
}) {
  return (
    <div
      className={`flex items-center w-full ${className}`}
      role="separator"
      aria-label={ariaLabel}
    >
      <div className="flex-1 h-px bg-gray-300 dark:bg-gray-700" />
      <span className="mx-3 text-[10px] whitespace-nowrap px-3 py-0.5    text-gray-700 dark:text-gray-200 ">
        {label}
      </span>
      <div className="flex-1 h-px bg-gray-300 dark:bg-gray-700" />
    </div>
  );
}
