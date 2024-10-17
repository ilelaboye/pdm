<template>
  <div class="dashboard py-3 px-2">
    <div class="container-fluid">
      <h6 class="card-title">Dashboard</h6>
      <div class="row statistics">
        <div class="col-sm-4 mb-3">
          <div class="card">
            <a href="javascript:void()" class="d-flex">
              <div class="stat-no">
                <h6>0</h6>
                <p class="text-muted">Items</p>
              </div>
            </a>
          </div>
        </div>
        <div class="col-sm-4 mb-3">
          <div class="card">
            <a href="javascript:void()" class="d-flex">
              <div class="stat-no">
                <h6>0</h6>
                <p class="text-muted">Vendors</p>
              </div>
            </a>
          </div>
        </div>
        <div class="col-sm-4 mb-3">
          <div class="card">
            <a href="javascript:void()" class="d-flex">
              <div class="stat-no">
                <h6>0</h6>
                <p class="text-muted">Pending Approval</p>
              </div>
            </a>
          </div>
        </div>
      </div>
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
        balances: {},
        loaded: false,
      };
    },
    methods: {},
    created() {
      console.log("created", this.user);
    },
  };
</script>

<style scoped lang="scss">
  .statistics {
    .stat-icon {
      background: #5f63f210;
      height: fit-content;
      border-radius: 10px;
      width: 60px;
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        width: 31.996px;
      }
    }
    .stat-no {
      padding: 10px;

      h6 {
        font-size: 28px;
        margin-bottom: 0;
        color: black;
      }
      p {
        font-size: 13px;
        margin-bottom: 0;
      }
    }
  }
</style>
