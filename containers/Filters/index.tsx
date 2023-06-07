import { FilterPills } from "../FilterPills";

export const filtersList = ["All", "High Alcohol", "High Acidity"];

export const Filters = () => {
  return (
    <div className="mx-auto w-max">
      <h3 className="font-bold text-center mb-4">Categories</h3>
      <div className="flex justify-center">
        <div className="flex items-center space-x-4">
          {filtersList.map((item, index) => (
            <FilterPills key={`filter-${item}-${index}`} isActive={true}>
              {item}
            </FilterPills>
          ))}
        </div>
      </div>
    </div>
  );
};
