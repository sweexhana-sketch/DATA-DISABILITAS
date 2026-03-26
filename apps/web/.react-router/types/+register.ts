import "react-router";

declare module "react-router" {
  interface Register {
    params: Params;
  }

  interface Future {
    unstable_middleware: false
  }
}

type Params = {
  "/": {};
  "/account/logout": {};
  "/account/signin": {};
  "/account/signup": {};
  "/admin/contractors": {};
  "/admin/contractors/:id": {
    "id": string;
  };
  "/admin/dashboard": {};
  "/admin/make-first-admin": {};
  "/contractor/profile": {};
  "/contractor/register": {};
  "/daftar-data": {};
  "/dashboard": {};
  "/tambah-data": {};
  "/*?": {};
};