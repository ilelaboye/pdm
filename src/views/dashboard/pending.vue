<template>
  <div class="orders px-2 py-4 mt-2" v-if="loaded">
    <div class="d-flex justify-content-between align-items-center">
      <h6 class="mb-0">Pending Requests</h6>

      <div>
        <button
          class="btn btn-primary fs-13"
          data-bs-toggle="modal"
          data-bs-target="#viewPending"
          v-if="selectedItem.length > 0"
        >
          View
        </button>
      </div>
    </div>
    <div class="orders-body mt-2">
      <div class="card">
        <div class="card-body p-1">
          <div class="table-responsive">
            <table class="table table-striped">
              <thead>
                <tr>
                  <th>
                    <input
                      type="checkbox"
                      :checked="checkAll"
                      @change="setItem(null, true)"
                    />
                  </th>
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
                  <td>
                    <input
                      type="checkbox"
                      :checked="
                        checkAll ||
                        selectedItem.some((item2) => item2.id == item.id)
                          ? checked
                          : !checked
                      "
                      @change="setItem(item)"
                    />
                  </td>
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
    <div
      class="modal fade viewPending"
      id="viewPending"
      tabindex="-1"
      aria-labelledby="viewPendingLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-xl">
        <div class="modal-content">
          <div class="modal-header">
            <div class="d-flex">
              <button class="btn btn-primary fs-13 me-1">Export</button>
              <button
                class="btn btn-success fs-13 me-1"
                @click.prevent="approveDeclineRequest('approve')"
              >
                Approve
              </button>
              <button
                class="btn btn-danger fs-13"
                @click.prevent="approveDeclineRequest('decline')"
              >
                Decline
              </button>
            </div>

            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="table-responsive">
            <table class="table">
              <thead>
                <tr>
                  <th>TANN code</th>
                  <th>
                    FOB price per Bob. in USD according to order quantity &lt;
                    50 bobb. 50%
                  </th>
                  <th>
                    FOB price per Bob. in USD according to order quantity &lt;
                    99 bobb. 25.0%
                  </th>
                  <th>
                    FOB price per Bob. in USD according to order quantity &gt;
                    100 bobb. 0.0%
                  </th>
                  <th>
                    DDP price per Bob. in USD according to order quantity: &lt;
                    50 bobb. 50%
                  </th>
                  <th>
                    DDP price per Bob. in USD according to order quantity: &lt;
                    99 bobb. 25.0%
                  </th>
                  <th>
                    DDP price per Bob. in USD according to order quantity: &gt;
                    100 bobb. 0.0%
                  </th>
                  <th>USD/100m² FCA baseprice</th>
                  <th>USD/100m² + BOB - Me</th>
                  <th>USD/1000 m Perfo</th>
                  <th>Basis/Bob FCA</th>
                  <th>print price/bobb.</th>
                  <th>perfo price/bobb.</th>
                  <th>print price/bobb. incl. payment extension</th>
                  <th>perfo price/bobb. incl. payment extension</th>
                  <th>freight price/bobb.</th>
                  <th>Cost Contribution 1st and 2nd round</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(pr, index) in selectedItem" :key="index">
                  <td>{{ pr.item.tann_code }}</td>
                  <td>
                    <span v-if="pr.p1 == -1"> {{ pr.old_prices.p1 }} </span>
                    <span v-else class="changed"> {{ pr.p1 }} </span>
                  </td>
                  <td>
                    <span v-if="pr.p2 == -1"> {{ pr.old_prices.p2 }}</span>
                    <span v-else class="changed">{{ pr.p2 }}</span>
                  </td>
                  <td>
                    <span v-if="pr.p3 == -1"> {{ pr.old_prices.p3 }}</span>
                    <span v-else class="changed">{{ pr.p3 }}</span>
                  </td>
                  <td>
                    <span v-if="pr.p4 == -1"> {{ pr.old_prices.p4 }}</span>
                    <span v-else class="changed">{{ pr.p4 }}</span>
                  </td>
                  <td>
                    <span v-if="pr.p5 == -1"> {{ pr.old_prices.p5 }}</span>
                    <span v-else class="changed">{{ pr.p5 }}</span>
                  </td>
                  <td>
                    <span v-if="pr.p6 == -1"> {{ pr.old_prices.p6 }}</span>
                    <span v-else class="changed">{{ pr.p6 }}</span>
                  </td>
                  <td>
                    <span v-if="pr.fca_baseprice == -1">
                      {{ pr.old_prices.fca_baseprice }}</span
                    ><span v-else class="changed">{{ pr.fca_baseprice }}</span>
                  </td>
                  <td>
                    <span v-if="pr.bob_me == -1">
                      {{ pr.old_prices.bob_me }}</span
                    ><span v-else class="changed">{{ pr.bob_me }}</span>
                  </td>
                  <td>
                    <span v-if="pr.perfo == -1"> {{ pr.old_prices.perfo }}</span
                    ><span v-else class="changed">{{ pr.perfo }}</span>
                  </td>
                  <td>
                    <span v-if="pr.bob_fca == -1">
                      {{ pr.old_prices.bob_fca }}</span
                    ><span v-else class="changed">{{ pr.bob_fca }}</span>
                  </td>
                  <td>
                    <span v-if="pr.print_bobb_price == -1">
                      {{ pr.old_prices.print_bobb_price }}</span
                    ><span v-else class="changed">{{
                      pr.print_bobb_price
                    }}</span>
                  </td>
                  <td>
                    <span v-if="pr.perfo_price_bobb == -1">
                      {{ pr.old_prices.perfo_price_bobb }}</span
                    ><span v-else class="changed">{{
                      pr.perfo_price_bobb
                    }}</span>
                  </td>
                  <td>
                    <span v-if="pr.print_bobb_price_ext == -1">
                      {{ pr.old_prices.print_bobb_price_ext }}</span
                    ><span v-else class="changed">{{
                      pr.print_bobb_price_ext
                    }}</span>
                  </td>
                  <td>
                    <span v-if="pr.perfo_bobb_price_ext == -1">
                      {{ pr.old_prices.perfo_bobb_price_ext }}</span
                    ><span v-else class="changed">{{
                      pr.perfo_bobb_price_ext
                    }}</span>
                  </td>
                  <td>
                    <span v-if="pr.freight_price == -1">
                      {{ pr.old_prices.freight_price }}</span
                    ><span v-else class="changed">{{ pr.freight_price }}</span>
                  </td>
                  <td>
                    <span v-if="pr.cost_contrib == -1">
                      {{ pr.old_prices.cost_contrib }}</span
                    ><span v-else class="changed">{{ pr.cost_contrib }}</span>
                  </td>
                </tr>
              </tbody>
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
        selectedItem: [],
        checkAll: false,
        approvers: [],
        approver: null,
        checked: true,
      };
    },

    methods: {
      setItem(item, all = false) {
        if (all) {
          if (this.checkAll) {
            this.selectedItem = [];
          } else {
            this.selectedItem = [...this.requests];
          }
          this.checkAll = !this.checkAll;
        } else {
          this.checkAll = false;
          if (this.selectedItem.some((s) => s.id == item.id)) {
            this.selectedItem.splice(
              this.selectedItem.findIndex((s) => s.id == item.id),
              1
            );
          } else {
            this.selectedItem.push(item);
          }
        }
        console.log(this.selectedItem);
      },
      getPendingRequest() {
        this.$store.commit("setLoader", true);
        this.$store
          .dispatch("get", "admin/pdm/get-pending-requests")
          .then((resp) => {
            this.$store.commit("setLoader", false);
            this.loaded = true;
            this.requests = resp.data.data;
            this.requests.forEach((req) => {
              req.old_prices = JSON.parse(req.old_prices);
            });
          })
          .catch(() => {
            this.$store.commit("setLoader", false);
          });
      },
      approveDeclineRequest(action = "decline") {
        var id = this.selectedItem.map((item) => item.id);
        console.log(id, action);
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
  .changed {
    font-weight: bold;
    color: blue;
  }
  .viewPending .modal-xl {
    max-width: 99vw;
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
