import { ReactNode } from "react";

export const DetailFields = ({
  label,
  value,
  customLabelIcon,
}: {
  label: string;
  value: string;
  customLabelIcon?: ReactNode;
}) => {
  return (
    <div className="space-y-2">
      <div className="flex space-x-2">
        <p className="text-sm text-gray-400 font-semibold">{label}</p>
        {customLabelIcon}
      </div>
      <p>{value}</p>
    </div>
  );
};
