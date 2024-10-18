<template>
  <div class="orders px-2 py-4 mt-2" v-if="loaded">
    <div class="d-flex justify-content-between align-items-center">
      <div class="main-title">
        <h6 class="mb-0">Items</h6>
      </div>
    </div>
    <div class="orders-body mt-2">
      <div class="card">
        <div class="card-body">
          <div class="table-responsive">
            <table class="table table-striped">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Vendor</th>
                  <th>Price</th>
                  <th>Date</th>
                  <th>Last Price Update</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody v-if="items.length > 0">
                <tr v-for="(item, index) in items" :key="index">
                  <td>{{ item.name }}</td>
                  <td>{{ item.vendor_name }}</td>
                  <td>{{ item.currency }} {{ formatPrice(item.price) }}</td>
                  <td>
                    {{ formatDateTime(item.created_at) }}
                  </td>
                  <td>
                    {{ formatDateTime(item.last_updated_at) }}
                  </td>
                  <td>
                    <div class="d-flex">
                      <router-link
                        class="btn btn-view"
                        :to="{ name: 'itemView', params: { id: item.id } }"
                        style="height: fit-content"
                        ><i class="fa fa-eye"></i
                      ></router-link>
                      <button
                        class="btn btn-primary ms-1"
                        data-bs-toggle="modal"
                        data-bs-target="#changePrice"
                        @click="setItem(item)"
                      >
                        Change Price
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
              <NoData
                :data="{ colspan: 9, message: 'No available items' }"
                v-else
              ></NoData>
            </table>
          </div>
        </div>
      </div>
    </div>

    <div
      class="modal fade"
      id="changePrice"
      tabindex="-1"
      aria-labelledby="changePriceLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered modal-md">
        <div class="modal-content">
          <div class="modal-header">
            <h6 class="modal-title" id="changePriceLabel">
              Change Price Request
            </h6>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form action="">
              <div class="form-group">
                <label class="f-13">Amount</label>
                <div class="input-group mb-3">
                  <span class="input-group-text" id="basic-addon1">{{
                    selectedItem.currency
                  }}</span>
                  <input
                    type="number"
                    class="form-control"
                    placeholder="Price"
                    v-model="selectedItem.price"
                  />
                </div>
              </div>
              <div class="form-group duration">
                <label class="f-13">Approvers</label>
                <select class="form-control" v-model="approver">
                  <option
                    v-for="(approver, index) in approvers"
                    :value="approver.id"
                    :key="index"
                  >
                    {{ approver.username }}
                  </option>
                </select>
              </div>
              <button
                class="btn btn-primary w-100"
                :disabled="loading"
                @click.prevent="submitRequest()"
              >
                <span v-if="!loading">Submit</span>
                <span v-else>Loading...</span>
              </button>
            </form>
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
        items: [],
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
      getItems() {
        this.$store.commit("setLoader", true);
        this.$store
          .dispatch("get", "admin/pdm/get-items")
          .then((resp) => {
            this.$store.commit("setLoader", false);
            this.loaded = true;
            this.items = resp.data.data;
          })
          .catch(() => {
            this.$store.commit("setLoader", false);
          });
      },
      getApprovers() {
        this.$store.commit("setLoader", true);
        this.$store
          .dispatch("get", "admin/pdm/get-approvers")
          .then((resp) => {
            this.$store.commit("setLoader", false);
            this.loaded = true;
            this.approvers = resp.data.data;
            this.approvers.splice(
              this.approvers.findIndex((item) => item.username == "vendor1"),
              1
            );
            console.log(this.approvers);
            console.log(this.$store.state.user.user.id);
          })
          .catch(() => {
            this.$store.commit("setLoader", false);
          });
      },
      submitRequest() {
        if (this.selectedItem.price < 1) {
          window.ToasterAlert("error", "Invalid price");
          return;
        }
        if (!this.approver || this.approver.length < 1) {
          window.ToasterAlert("error", "Approver is required");
          return;
        }
        this.$store.commit("setLoader", true);
        this.loading = true;
        this.$store
          .dispatch("post", {
            endpoint: "admin/pdm/submit-update-request",
            details: {
              item: this.selectedItem.id,
              price: this.selectedItem.price,
              approver: this.approver,
            },
          })
          .then((resp) => {
            this.$store.commit("setLoader", false);
            this.loading = false;
            console.log(resp);
            if (resp.data.status) {
              window.ToasterAlert("success", "Request submited");
              window.setTimeout(() => {
                window.location.reload();
              }, 1500);
            }
          })
          .catch(() => {
            this.loading = false;
            this.$store.commit("setLoader", false);
          });
      },
    },
    created() {
      this.getItems();
      this.getApprovers();
    },
  };
</script>

<style scoped lang="scss">
  .btn-success {
    font-size: 14px;
  }
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
