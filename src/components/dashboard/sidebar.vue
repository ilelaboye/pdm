<template>
  <div id="sidebar-wrapper">
    <div class="list-group list-group-flush">
      <router-link
        class="list-group-item list-group-item-action list-group-item-light px-3"
        to="/dashboard"
        :class="$route.name == 'dashboard' ? 'active' : ''"
      >
        <i class="fas fa-home"></i>
        <span>Dashboard</span>
      </router-link>
      <router-link
        class="list-group-item list-group-item-action list-group-item-light px-3"
        to="/items"
        :class="$route.name == 'items' ? 'active' : ''"
      >
        <i class="fa fa-building"></i>
        <span>Materials</span>
      </router-link>
      <router-link
        class="list-group-item list-group-item-action list-group-item-light px-3"
        :to="{ name: 'requests' }"
        :class="$route.name == 'requests' ? 'active' : ''"
        v-if="
          user.user.username == 'category_manager1' ||
          user.user.username == 'supplier1'
        "
      >
        <i class="fa fa-table"></i>
        <span>Requests</span>
      </router-link>

      <router-link
        class="list-group-item list-group-item-action list-group-item-light px-3"
        :to="{ name: 'pending-requests' }"
        :class="$route.name == 'pending-requests' ? 'active' : ''"
        v-if="user.user.username == 'category_manager1'"
      >
        <i class="fa fa-table"></i>
        <span>Pending Requests</span>
      </router-link>
      <router-link
        class="list-group-item list-group-item-action list-group-item-light px-3"
        :to="{ name: 'vendors' }"
        :class="$route.name == 'vendors' ? 'active' : ''"
        v-if="user.user.username == 'category_manager1'"
      >
        <i class="fas fa-users"></i>
        <span>Suppliers</span>
      </router-link>
      <a
        class="list-group-item list-group-item-action list-group-item-light px-3"
        href="javascript:void()"
        @click="logout()"
      >
        <i class="fas fa-power-off"></i>
        <span>Logout</span>
      </a>
    </div>
  </div>
</template>

<script>
  import { mapState } from "vuex";
  export default {
    computed: {
      ...mapState({
        user: (context) => context.user,
      }),
    },
    data() {
      return {
        count: 0,
      };
    },
    methods: {
      logout() {
        this.$store.commit("logout");
      },
    },
    created() {
      console.log(this.user);
    },
  };
</script>
<style scoped lang="scss">
  #sidebar-wrapper {
    strong {
      padding: 4px 7px;
      border-radius: 20px;
      background: #5f63f2;
      color: #fff;
      font-size: 13px;
      margin-left: 10px;
    }
    .pa-dropd {
      .nav-link {
        display: block;
        padding-left: 62px;
        color: #636464;
        font-size: 14px;
        &:hover {
          color: #272b41;
          background-color: #f0f3ff;
          // border-radius: 6px;
        }
        &.active {
          color: #272b41;
          background-color: #f0f3ff !important;
        }
      }
    }
    .dash-logo {
      width: 180px;
      .c-name {
        font-size: 14px;
        margin-left: 5px;
        display: block;
        margin-top: -2px;
      }
      .role {
        margin-left: 5px;
        span {
          font-size: 10px;
          margin-right: 5px;
        }
      }
    }
    .list-group {
      margin-top: 20px;
      .list-group-item {
        border: none;
        font-size: 14px;
        margin-bottom: 11px;

        padding: 10px 0;
        display: flex;
        align-items: center;
        a {
          color: #272b41;
        }
        &.active {
          color: #272b41;
          background-color: #f0f3ff;
          // border-radius: 6px;
          svg,
          i {
            color: #5f63f2;
          }
        }
        &:hover {
          color: #272b41;
          background-color: #f0f3ff;
          // border-radius: 6px;
        }
      }
      i,
      svg {
        margin-right: 17px;
        font-size: 14px;
        width: 20px;
      }
      svg {
        width: 15px;
        margin-right: 21px;
      }
    }
  }
</style>
