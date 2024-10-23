<template>
  <div class="orders px-2 py-4 mt-2" v-if="loaded">
    <div class="d-flex justify-content-between align-items-center">
      <div class="main-title">
        <h6 class="mb-0">Pending Requests</h6>
      </div>
    </div>
    <div class="orders-body mt-2">
      <div class="card">
        <div class="card-body p-1">
          <div class="table-responsive">
            <table class="table table-striped">
              <thead>
                <tr>
                  <th>TANN code</th>
                  <th>TANN description</th>
                  <th>Approver</th>
                  <th>Supplier</th>
                  <th>Date</th>
                  <th></th>
                </tr>
              </thead>
              <tbody v-if="requests.length > 0">
                <tr v-for="(item, index) in requests" :key="index">
                  <td>{{ item.item.tann_code }}</td>
                  <td>{{ item.item.tann_descp }}</td>

                  <td>
                    {{ item.approver.username }}
                  </td>
                  <td>
                    {{ item.creator.username }}
                  </td>
                  <td>
                    {{ formatDateTime(item.created_at) }}
                  </td>
                  <td>
                    <div class="d-flex">
                      <a
                        :href="`/item/${item.id}/review-price`"
                        class="btn btn-primary fs-13"
                        >Review</a
                      >
                    </div>
                  </td>
                </tr>
              </tbody>
              <NoData
                :data="{ colspan: 9, message: 'No available requests' }"
                v-else
              ></NoData>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import NoData from "@/components/dashboard/noData.vue";
  export default {
    components: { NoData },

    data() {
      return {
        loading: false,
        requests: [],
        loaded: false,
        search: "",
        selectedItem: {},
        approvers: [],
        approver: null,
      };
    },

    methods: {
      setItem(item) {
        this.selectedItem = item;
      },
      getPendingRequest() {
        this.$store.commit("setLoader", true);
        this.$store
          .dispatch("get", "admin/pdm/get-pending-requests")
          .then((resp) => {
            this.$store.commit("setLoader", false);
            this.loaded = true;
            this.requests = resp.data.data;
          })
          .catch(() => {
            this.$store.commit("setLoader", false);
          });
      },
      approveDeclineRequest(id, action = "decline") {
        this.$store.commit("setLoader", true);
        this.$store
          .dispatch("post", {
            endpoint: "admin/pdm/approve-decline-request",
            details: {
              item: id,
              action: action,
            },
          })
          .then((resp) => {
            this.$store.commit("setLoader", false);
            console.log(resp);
            if (resp.data.status) {
              window.ToasterAlert("success", resp.data.message);
              window.setTimeout(() => {
                window.location.reload();
              }, 1500);
            }
          })
          .catch(() => {
            this.$store.commit("setLoader", false);
          });
      },
    },
    created() {
      this.getPendingRequest();
    },
  };
</script>

<style scoped lang="scss">
  table button {
    font-size: 10px;
  }
  table thead tr th {
    color: #5a5f7d;
    background: #f8f9fb;
  }
  table tbody tr td {
    // padding: 16px;
    color: #272b41;
  }
  .card-title {
    font-size: 18px;
  }
  .btn-add {
    font-size: 14px;
    border-radius: 0;
  }
  #approveModal .modal-body {
    display: flex;
    flex-direction: column;
    align-items: center;
    .confirm i {
      font-size: 60px;
      color: green;
    }
  }
</style>
