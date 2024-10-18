<template>
  <div class="order px-2 py-4 mt-2" v-if="loaded">
    <!-- <div class="d-flex justify-content-between align-items-center">
      <h5 class="card-title mb-0 text-uppercase">{{ item.name }}</h5>
    </div> -->
    <div>
      <div class="col-sm-4">
        <div class="d-flex mt-2">
          <b>Name:</b>
          <span class="ms-2">{{ item.name }}</span>
        </div>
      </div>
      <div class="col-sm-4">
        <div class="d-flex mt-2">
          <b>Price:</b>
          <span class="ms-2"
            >{{ item.currency }} {{ formatPrice(item.price) }}</span
          >
        </div>
      </div>
      <div class="col-sm-4">
        <div class="d-flex mt-2">
          <b>Last updated date:</b>
          <span class="ms-2">{{ formatDateTime(item.last_updated_at) }}</span>
        </div>
      </div>
    </div>
    <div class="card mt-2">
      <div class="card-body">
        <p>Price change history</p>

        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th>Supplier</th>
                <th>Old Price</th>
                <th>New Price</th>
                <th>Approver</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody v-if="history.length > 0">
              <tr v-for="(item, index) in history" :key="index">
                <td>{{ item.creator.username }}</td>
                <td>{{ formatPrice(item.old_price) }}</td>
                <td>
                  {{ item.item.currency }} {{ formatPrice(item.new_price) }}
                </td>
                <td>
                  {{ item.approver.username }}
                </td>
                <td>
                  <span
                    v-if="item.status == 'pending'"
                    class="badge bg-primary"
                    >{{ item.status }}</span
                  >
                  <span
                    v-if="item.status == 'approved'"
                    class="badge bg-success"
                    >{{ item.status }}</span
                  >
                  <span
                    v-if="item.status == 'declined'"
                    class="badge bg-danger"
                    >{{ item.status }}</span
                  >
                </td>
                <td>
                  {{ formatDateTime(item.created_at) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        loaded: false,
        item: {},
        history: [],
      };
    },
    methods: {
      getRequest() {
        this.$store
          .dispatch("get", `admin/pdm/get-request/${this.$route.params.id}`)
          .then((resp) => {
            this.item = resp.data.data;
            console.log(this.item);
          });
      },
      getRequestHistory() {
        this.$store.commit("setLoader", true);
        this.$store
          .dispatch(
            "get",
            `admin/pdm/get-request-history/${this.$route.params.id}`
          )
          .then((resp) => {
            this.$store.commit("setLoader", false);
            this.loaded = true;
            this.history = resp.data.data;
            console.log("history", this.history);
          })
          .catch(() => {
            this.$store.commit("setLoader", false);
          });
      },
    },
    created() {
      this.getRequest();
      this.getRequestHistory();
    },
  };
</script>

<style scoped lang="scss">
  .order {
    .order-body {
      .nav-pills .nav-link.active,
      .nav-pills .show > .nav-link {
        background: #012538 !important;
      }
      .nav-link {
        color: black;
        padding: 5px 54px;
        font-size: 14px;
      }
      .nav-pills .nav-link.active,
      .nav-pills .show > .nav-link {
        color: #fff;
      }

      .kpi {
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
          margin-left: 10px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          h6 {
            font-size: 21px;
            margin-bottom: 0;
            color: black;
          }
          p {
            font-size: 13px;
            margin-bottom: 0;
          }
        }
      }
    }
    .duration {
      .input-group-text {
        padding: 0;
        background: #fff;
      }
      select {
        border: none;
      }
    }
  }
</style>
