import { useForm } from 'react-hook-form';
import { BaseButton } from '@ui/atoms/BaseButton';
import { BaseInput } from '@ui/atoms/Inputs';
import { Typography } from '@ui/atoms';
import { IHomeRoutes, homeRoutes } from './routes';

/* eslint-disable jsx-a11y/anchor-is-valid */
export function NavbarHome() {
  const { control } = useForm();
  return (
    <nav className="bg-white w-full border-gray-200 dark:bg-gray-900 dark:border-gray-700">
      <div className="flex items-center justify-between p-4">
        <div className="flex">
          <a href="#" className="flex items-center ml-6">
            <img src="/logo.jpg" className="h-8 mr-3" alt="Logo" />
          </a>
          <button
            data-collapse-toggle="navbar-dropdown"
            type="button"
            className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-dropdown"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          {/* navbar */}
          <div className="hidden w-full md:block md:w-auto">
            <ul className="flex items-around">
              {homeRoutes.map((route: IHomeRoutes) => {
                return (
                  <li
                    key={route.id}
                    className="mx-2 p-3 text-gray-900 rounded hover:bg-gray-100  md:border-0 md:hover:text-blue-700  dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
                  >
                    {!route.children ? (
                      <a
                        href={route.path}
                        className="block dark:hover:text-white"
                      >
                        <Typography>{route.label}</Typography>
                      </a>
                    ) : (
                      <>
                        <button
                          type="button"
                          id="dropdownNavbarLink"
                          data-dropdown-toggle="dropdownNavbar"
                          className="flex items-center justify-between w-full dark:hover:bg-gray-700 "
                        >
                          Dropdown{' '}
                          <svg
                            className="w-5 h-5 ml-1"
                            aria-hidden="true"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                        {/* <!-- Dropdown menu --> */}
                        <div
                          id="dropdownNavbar"
                          className="z-10 hidden font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
                        >
                          <ul
                            className="py-2 text-sm text-gray-700 dark:text-gray-400"
                            aria-labelledby="dropdownLargeButton"
                          >
                            <li>
                              <a
                                href="#"
                                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                              >
                                Dashboard
                              </a>
                            </li>
                            <li>
                              <a
                                href="#"
                                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                              >
                                Settings
                              </a>
                            </li>
                            <li>
                              <a
                                href="#"
                                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                              >
                                Earnings
                              </a>
                            </li>
                          </ul>
                          <div className="py-1">
                            <a
                              href="#"
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white"
                            >
                              Sign out
                            </a>
                          </div>
                        </div>
                      </>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        {/* search and button */}
        <div className="hidden p-2 items-start justify-between md:flex">
          <BaseInput
            control={control}
            name="search"
            id="search"
            size="sm"
            placeholder="...جستجو"
            className="self-baseline ml-10"
            startIcon="material-symbols:search"
            hiddenError
          />
          <BaseButton
            type="shadow"
            label="پشتیبانی"
            size="md"
            endIcon="ph:phone"
          />
        </div>
      </div>
    </nav>
  );
}
