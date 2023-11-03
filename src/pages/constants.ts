const envRoute = `${import.meta.env.VITE_PUBLIC_URL}`;

const checkSlash = (url: string) => {
  if (!!url) {
    return url.substr(-1) !== "/" ? url + "/" : url;
  }
  return undefined;
};

const HOME_PATH = checkSlash(envRoute) || "/";
const VOTE_PATH = `${checkSlash(envRoute) || "/"}vote/`;
const RESULTS_PATH = `${checkSlash(envRoute) || "/"}results/`;
const ADMIN_PATH = `${checkSlash(envRoute) || "/"}admin/`;

export { HOME_PATH, ADMIN_PATH, RESULTS_PATH, VOTE_PATH };

export const INITIAL_VOTES = [
  {
    id: 1,
    enabled: false,
    completed: false,
    results: false,
    options: [
      {
        id: 1,
        text: "Утопать в рутине",
        votes: 0,
      },
      {
        id: 2,
        text: "Вырваться на свободу",
        votes: 0,
      },
    ],
  },
  {
    id: 2,
    enabled: false,
    completed: false,
    results: false,
    options: [
      {
        id: 1,
        text: "Поверить в себя",
        votes: 0,
      },
      {
        id: 2,
        text: "Прислушаться к чужому мнению",
        votes: 0,
      },
    ],
  },
  {
    id: 3,
    enabled: false,
    completed: false,
    results: false,
    options: [
      {
        id: 1,
        text: 'Сказать "Прости"',
        votes: 0,
      },
      {
        id: 2,
        text: 'Сказать "Прощай"',
        votes: 0,
      },
    ],
  },
  {
    id: 4,
    enabled: false,
    completed: false,
    results: false,
    options: [
      {
        id: 1,
        text: "Переступить черту",
        votes: 0,
      },
      {
        id: 2,
        text: "Преодолеть свою слабость",
        votes: 0,
      },
    ],
  },
];
