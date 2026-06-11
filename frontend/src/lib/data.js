export const FilterType = {
  all: "tất cả",
  active: "đang làm",
  completed: "hoàn thành",
};

export const options = [
  {
    value: "today",
    label: "Hôm nay",
  },
  {
    value: "week",
    label: "Tuần này",
  },
  {
    value: "month",
    label: "Tháng này",
  },
  {
    value: "all",
    label: "Tất cả",
  },
];

export const visibleTaskLimit = 4;

export const priorityConfig = {
  low: {
    label: "Thấp",
    color: "#22c55e",
    icon: "🟢",
  },
  medium: {
    label: "Trung bình",
    color: "#3b82f6",
    icon: "🔵",
  },
  high: {
    label: "Cao",
    color: "#f59e0b",
    icon: "🟠",
  },
  urgent: {
    label: "Khẩn cấp",
    color: "#ef4444",
    icon: "🔴",
  },
};
