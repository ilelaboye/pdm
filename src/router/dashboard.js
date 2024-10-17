import Dashboard from "../views/dashboard/dashboard.vue";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "dashboard",
    component: Dashboard,
  },
  {
    path: "/items",
    name: "items",
    component: () => import("@/views/dashboard/items.vue"),
  },
  {
    path: "/item/:id",
    name: "itemView",
    component: () => import("@/views/dashboard/item.vue"),
  },
  {
    path: "/requests",
    name: "requests",
    component: () => import("@/views/dashboard/requests.vue"),
  },

  {
    path: "/pending-requests",
    name: "pending-requests",
    component: () => import("@/views/dashboard/pending.vue"),
  },
  {
    path: "/vendors",
    name: "vendors",
    component: () => import("@/views/dashboard/vendors.vue"),
  },
];
export default dashboardRoutes;
