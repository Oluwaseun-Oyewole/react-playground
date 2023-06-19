export interface LinkModel {
  title: string;
  pathname?: string;
  isActive?: boolean;
}

export const navLinks = [{ title: "Dashboard", pathname: "dashboard" }];

export type DashboardModel = {
  title: string;
  pathname: string;
}[];

export const DashboardLinks: DashboardModel = [
  { title: "Users", pathname: "users" },
  { title: "Posts", pathname: "posts" },
];
