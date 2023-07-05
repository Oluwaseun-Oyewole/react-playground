export interface LinkModel {
  title: string;
  pathname?: string;
  isActive?: boolean;
}

export const navLinks = [
  { title: "User", pathname: "users" },
  { title: "Posts", pathname: "posts" },
];

export type DashboardModel = {
  title: string;
  pathname: string;
}[];

// export const DashboardLinks: DashboardModel = [
//   { title: "User", pathname: "users" },
//   { title: "Posts", pathname: "posts" },
// ];
