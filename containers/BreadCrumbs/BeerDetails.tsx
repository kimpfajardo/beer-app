import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

export const BreadCrumbs = () => {
  return (
    <div className="mb-2">
      <div>
        <nav className="sm:hidden" aria-label="Back">
          <Link
            href="/beer-gallery"
            className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-700"
          >
            <ChevronLeftIcon
              className="-ml-1 mr-1 h-5 w-5 flex-shrink-0 text-gray-400"
              aria-hidden="true"
            />
            Back to beer gallery
          </Link>
        </nav>
        <nav className="hidden sm:flex" aria-label="Breadcrumb">
          <ol role="list" className="flex items-center space-x-4">
            <li>
              <div className="flex">
                <Link
                  href="/beer-gallery"
                  className="text-sm font-medium text-gray-500 hover:text-gray-700"
                >
                  Beer Gallery
                </Link>
              </div>
            </li>
            <li>
              <div className="flex items-center cursor-default">
                <ChevronRightIcon
                  className="h-5 w-5 flex-shrink-0 text-gray-400"
                  aria-hidden="true"
                />
                <p className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700">
                  Beer Name
                </p>
              </div>
            </li>
          </ol>
        </nav>
      </div>
    </div>
  );
};
