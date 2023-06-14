import React, { useState, useEffect, Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { cn } from "@/utils/functions";

export const Datepicker = ({
  onChange,
}: {
  onChange: (value: Date) => void;
}) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date() as Date);

  useEffect(() => {
    onChange(selectedDate);
  }, [selectedDate, onChange]);

  return (
    <div>
      {/* <label
        htmlFor={rest.name}
        className={cn(
          "block text-sm font-medium leading-6 text-gray-900 select-none",
          disabled && "text-gray-300"
        )}
      >
        {label}
      </label> */}
      <input type='date' className='w-full' />
      {/* <Menu as="div" className="relative flex-shrink-0">
        <div>
          <Menu.Button className="flex items-center justify-between space-x-4 w-full py-2 px-3 pl-4 text-xs rounded-md ring-1 ring-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 overflow-hidden ">
            <span className="min-w-max text-sm">
              {selectedDate.toLocaleDateString()}
            </span>
            <ChevronDownIcon className="text-gray-400 w-4" />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute z-20 mt-0 w-full origin-top-right rounded-md bg-none focus:outline-none">
            <Menu.Item>
              {({ active }) => (
                <div className="w-10 text-left px-0 py-2 text-sm text-gray-700">
                  <DatePicker
                    selected={selectedDate}
                    onChange={(date) => {
                      console.log("date", date);
                      setSelectedDate(date ?? new Date());
                    }}
                    className={cn(active && "bg-gray-100", "w-full")}
                    inline
                  />
                </div>
              )}
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu> */}
    </div>
  );
};

export default Datepicker;
