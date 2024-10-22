<template>
  <div>
    <div class="orders px-2 py-4 mt-2" v-if="loaded">
      <div class="d-flex justify-content-between">
        <h6>Price Change Request - {{ item.item.material_no }}</h6>
        <div>
          <span v-if="item.status == 'pending'" class="badge bg-primary">{{
            item.status
          }}</span>
          <span v-if="item.status == 'approved'" class="badge bg-success">{{
            item.status
          }}</span>
          <span v-if="item.status == 'declined'" class="badge bg-danger">{{
            item.status
          }}</span>
        </div>
      </div>
      <div class="card my-2">
        <div class="card-body py-2">
          <div class="row">
            <div class="col-sm-3">
              <b class="fs-13">Material no.</b>
              <p class="fs-12 mb-0">{{ item.item.material_no }}</p>
            </div>
            <div class="col-sm-3">
              <b class="fs-13">Op'Co</b>
              <p class="fs-12 mb-0">{{ item.item.opco }}</p>
            </div>

            <div class="col-sm-3">
              <b class="fs-13">TANN code</b>
              <p class="fs-12 mb-0">{{ item.item.tann_code }}</p>
            </div>
            <div class="col-sm-3">
              <b class="fs-13">TANN description </b>
              <p class="fs-12 mb-0">{{ item.item.tann_descp }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="card">
        <!-- <div class="card-header"> -->

        <!-- </div> -->
        <div class="card-body">
          <div class="row">
            <div class="col-12">
              <p class="fs-13 mb-1">
                FOB price per Bob. in USD according to order quantity
              </p>
            </div>
            <div class="col-sm-4" v-if="item.p1 != -1">
              <div class="form-group">
                <label for="" class="fs-13">&lt;50 bobb. 50%</label>
                <div class="input-group mb-3">
                  <span class="input-group-text" id="basic-addon1"
                    >{{ item.item.p1 }} ->
                  </span>
                  <input
                    disabled
                    type="number"
                    class="form-control"
                    v-model="item.p1"
                  />
                </div>
              </div>
            </div>
            <div class="col-sm-4" v-if="item.p2 != -1">
              <div class="form-group">
                <label for="" class="fs-13">&lt;99 bobb. 25.0%</label>
                <div class="input-group mb-3">
                  <span class="input-group-text" id="basic-addon1"
                    >{{ item.item.p2 }} -></span
                  >

                  <input
                    disabled
                    type="number"
                    class="form-control"
                    v-model="item.p2"
                  />
                </div>
              </div>
            </div>
            <div class="col-sm-4" v-if="item.p3 != -1">
              <div class="form-group">
                <label for="" class="fs-13">&gt;100 bobb. 0.00%</label>
                <div class="input-group mb-3">
                  <span class="input-group-text" id="basic-addon1"
                    >{{ item.item.p3 }} -></span
                  >

                  <input
                    disabled
                    type="number"
                    class="form-control"
                    v-model="item.p3"
                  />
                </div>
              </div>
            </div>
            <div class="col-12">
              <p class="fs-13 mb-1">
                DDP price per Bob. in USD according to order quantity
              </p>
            </div>
            <div class="col-sm-4" v-if="item.p4 != -1">
              <div class="form-group">
                <label for="" class="fs-13">&lt;50 bobb. 50%</label>
                <div class="input-group mb-3">
                  <span class="input-group-text" id="basic-addon1"
                    >{{ item.item.p4 }} -></span
                  >

                  <input
                    disabled
                    type="number"
                    class="form-control"
                    v-model="item.p4"
                  />
                </div>
              </div>
            </div>
            <div class="col-sm-4" v-if="item.p5 != -1">
              <div class="form-group">
                <label for="" class="fs-13">&lt;50 bobb. 50%</label>
                <div class="input-group mb-3">
                  <span class="input-group-text" id="basic-addon1"
                    >{{ item.item.p5 }} ->
                  </span>

                  <input
                    disabled
                    type="number"
                    class="form-control"
                    v-model="item.p5"
                  />
                </div>
              </div>
            </div>
            <div class="col-sm-4" v-if="item.p6 != -1">
              <div class="form-group">
                <label for="" class="fs-13">&gt;50 bobb. 50%</label>
                <div class="input-group mb-3">
                  <span class="input-group-text" id="basic-addon1"
                    >{{ item.item.p6 }} -></span
                  >

                  <input
                    disabled
                    type="number"
                    class="form-control"
                    v-model="item.p6"
                  />
                </div>
              </div>
            </div>

            <div class="col-sm-4" v-if="item.fca_baseprice != -1">
              <div class="form-group">
                <label for="" class="fs-13">USD/100m² FCA baseprice</label>
                <div class="input-group mb-3">
                  <span class="input-group-text" id="basic-addon1"
                    >{{ item.item.fca_baseprice }} -></span
                  >

                  <input
                    disabled
                    type="number"
                    class="form-control"
                    v-model="item.fca_baseprice"
                  />
                </div>
              </div>
            </div>
            <div class="col-sm-4" v-if="item.bob_me != -1">
              <div class="form-group">
                <label for="" class="fs-13">USD/100m² + BOB - Me</label>
                <div class="input-group mb-3">
                  <span class="input-group-text" id="basic-addon1"
                    >{{ item.item.bob_me }}-></span
                  >

                  <input
                    disabled
                    type="number"
                    class="form-control"
                    v-model="item.bob_me"
                  />
                </div>
              </div>
            </div>
            <div class="col-sm-4" v-if="item.perfo != -1">
              <div class="form-group">
                <label for="" class="fs-13">USD/1000 m Perfo</label>

                <div class="input-group mb-3">
                  <span class="input-group-text" id="basic-addon1"
                    >{{ item.item.perfo }} -></span
                  >

                  <input
                    disabled
                    type="number"
                    class="form-control"
                    v-model="item.perfo"
                  />
                </div>
              </div>
            </div>
            <div class="col-sm-4" v-if="item.bob_fca != -1">
              <div class="form-group">
                <label for="" class="fs-13">Basis/Bob FCA</label>
                <div class="input-group mb-3">
                  <span class="input-group-text" id="basic-addon1"
                    >{{ item.item.bob_fca }} ->
                  </span>

                  <input
                    disabled
                    type="number"
                    class="form-control"
                    v-model="item.bob_fca"
                  />
                </div>
              </div>
            </div>
            <div class="col-sm-4" v-if="item.print_bobb_price != -1">
              <div class="form-group">
                <label for="" class="fs-13">Print price/bobb</label>

                <div class="input-group mb-3">
                  <span class="input-group-text" id="basic-addon1"
                    >{{ item.item.print_bobb_price }} ->
                  </span>

                  <input
                    disabled
                    type="number"
                    class="form-control"
                    v-model="item.print_bobb_price"
                  />
                </div>
              </div>
            </div>
            <div class="col-sm-4" v-if="item.perfo_price_bobb != -1">
              <div class="form-group">
                <label for="" class="fs-13">Perfo price/bobb.</label>
                <div class="input-group mb-3">
                  <span class="input-group-text" id="basic-addon1"
                    >{{ item.item.perfo_price_bobb }} -></span
                  >

                  <input
                    disabled
                    type="number"
                    class="form-control"
                    v-model="item.perfo_price_bobb"
                  />
                </div>
              </div>
            </div>
            <div class="col-sm-4" v-if="item.print_bobb_price_ext != -1">
              <div class="form-group">
                <label for="" class="fs-13"
                  >Print price/bobb. incl. payment extension</label
                >
                <div class="input-group mb-3">
                  <span class="input-group-text" id="basic-addon1"
                    >{{ item.item.print_bobb_price_ext }} ->
                  </span>

                  <input
                    disabled
                    type="number"
                    class="form-control"
                    v-model="item.print_bobb_price_ext"
                  />
                </div>
              </div>
            </div>
            <div class="col-sm-4" v-if="item.perfo_bobb_price_ext != -1">
              <div class="form-group">
                <label for="" class="fs-13"
                  >Perfo price/bobb. incl. payment extension</label
                >
                <div class="input-group mb-3">
                  <span class="input-group-text" id="basic-addon1"
                    >{{ item.item.perfo_bobb_price_ext }} ->
                  </span>

                  <input
                    disabled
                    type="number"
                    class="form-control"
                    v-model="item.perfo_bobb_price_ext"
                  />
                </div>
              </div>
            </div>
            <div class="col-sm-4" v-if="item.freight_price != -1">
              <div class="form-group">
                <label for="" class="fs-13">Freight price/bobb</label>
                <div class="input-group mb-3">
                  <span class="input-group-text" id="basic-addon1"
                    >{{ item.item.freight_price }} ->
                  </span>
                  <input
                    disabled
                    type="number"
                    class="form-control"
                    v-model="item.freight_price"
                  />
                </div>
              </div>
            </div>
            <div class="col-sm-4" v-if="item.cost_contrib != -1">
              <div class="form-group">
                <label for="" class="fs-13"
                  >Cost Contribution 1st and 2nd round</label
                >
                <div class="input-group mb-3">
                  <span class="input-group-text" id="basic-addon1"
                    >{{ item.item.cost_contrib }} -></span
                  >
                  <input
                    disabled
                    type="number"
                    class="form-control"
                    v-model="item.cost_contrib"
                  />
                </div>
              </div>
            </div>
          </div>
          <div
            class=""
            v-if="
              $store.state.user.user.username != 'vendor1' &&
              item.status == 'pending' &&
              item.approver_id == $store.state.user.user.id
            "
          >
            <button
              class="btn btn-success fs-13"
              @click.prevent="approveDeclineRequest('approve')"
            >
              Approve
            </button>
            <button
              class="btn btn-danger ms-1 fs-13"
              @click.prevent="approveDeclineRequest('decline')"
            >
              Decline
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        loading: false,
        item: {},
        loaded: false,
        search: "",
        selectedItem: {},
        approvers: [],
        approver: null,
        price: {},
      };
    },

    methods: {
      approveDeclineRequest(action = "decline") {
        this.$store.commit("setLoader", true);
        this.$store
          .dispatch("post", {
            endpoint: "admin/pdm/approve-decline-request",
            details: {
              item: this.$route.params.id,
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
      getItem() {
        this.$store.commit("setLoader", true);
        this.$store
          .dispatch(
            "get",
            `admin/pdm/get-single-request-history/${this.$route.params.id}`
          )
          .then((resp) => {
            this.$store.commit("setLoader", false);
            this.loaded = true;
            this.item = resp.data.data;
            this.price = { ...this.item };
            console.log(this.price);
          })
          .catch(() => {
            this.$store.commit("setLoader", false);
          });
      },
    },
    created() {
      this.getItem();
    },
  };
</script>

<style scoped>
  input {
    border-left: 0;
  }
  .input-group-text {
    font-size: 13px;
  }
</style>
