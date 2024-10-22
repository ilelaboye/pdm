<template>
  <div>
    <div class="orders px-2 py-4 mt-2" v-if="loaded">
      <h6>Create Price Change Request</h6>
      <div class="card mt-2">
        <div class="card-body py-2">
          <div class="row">
            <div class="col-sm-3">
              <b class="fs-13">Material no.</b>
              <p class="fs-12 mb-0">{{ item.material_no }}</p>
            </div>
            <div class="col-sm-3">
              <b class="fs-13">Op'Co</b>
              <p class="fs-12 mb-0">{{ item.opco }}</p>
            </div>

            <div class="col-sm-3">
              <b class="fs-13">TANN code</b>
              <p class="fs-12 mb-0">{{ item.tann_code }}</p>
            </div>
            <div class="col-sm-3">
              <b class="fs-13">TANN description </b>
              <p class="fs-12 mb-0">{{ item.tann_descp }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="card mt-2">
        <!-- <div class="card-header"> -->

        <!-- </div> -->
        <div class="card-body">
          <div class="row">
            <div class="col-12">
              <p class="fs-13 mb-1">
                FOB price per Bob. in USD according to order quantity
              </p>
            </div>
            <div class="col-sm-4">
              <div class="form-group">
                <label for="" class="fs-13">&lt;50 bobb. 50%</label>
                <input type="number" class="form-control" v-model="item.p1" />
              </div>
            </div>
            <div class="col-sm-4">
              <div class="form-group">
                <label for="" class="fs-13">&lt;99 bobb. 25.0%</label>
                <input type="number" class="form-control" v-model="item.p2" />
              </div>
            </div>
            <div class="col-sm-4">
              <div class="form-group">
                <label for="" class="fs-13">&gt;100 bobb. 0.00%</label>
                <input type="number" class="form-control" v-model="item.p3" />
              </div>
            </div>
            <div class="col-12">
              <p class="fs-13 mb-1">
                DDP price per Bob. in USD according to order quantity
              </p>
            </div>
            <div class="col-sm-4">
              <div class="form-group">
                <label for="" class="fs-13">&lt;50 bobb. 50%</label>
                <input type="number" class="form-control" v-model="item.p4" />
              </div>
            </div>
            <div class="col-sm-4">
              <div class="form-group">
                <label for="" class="fs-13">&lt;50 bobb. 50%</label>
                <input type="number" class="form-control" v-model="item.p5" />
              </div>
            </div>
            <div class="col-sm-4">
              <div class="form-group">
                <label for="" class="fs-13">&gt;50 bobb. 50%</label>
                <input type="number" class="form-control" v-model="item.p6" />
              </div>
            </div>

            <div class="col-sm-4">
              <div class="form-group">
                <label for="" class="fs-13">USD/100m² FCA baseprice</label>
                <input
                  type="number"
                  class="form-control"
                  v-model="item.fca_baseprice"
                />
              </div>
            </div>
            <div class="col-sm-4">
              <div class="form-group">
                <label for="" class="fs-13">USD/100m² + BOB - Me</label>
                <input
                  type="number"
                  class="form-control"
                  v-model="item.bob_me"
                />
              </div>
            </div>
            <div class="col-sm-4">
              <div class="form-group">
                <label for="" class="fs-13">USD/1000 m Perfo</label>
                <input
                  type="number"
                  class="form-control"
                  v-model="item.perfo"
                />
              </div>
            </div>
            <div class="col-sm-4">
              <div class="form-group">
                <label for="" class="fs-13">Basis/Bob FCA</label>
                <input
                  type="number"
                  class="form-control"
                  v-model="item.bob_fca"
                />
              </div>
            </div>
            <div class="col-sm-4">
              <div class="form-group">
                <label for="" class="fs-13">Print price/bobb</label>
                <input
                  type="number"
                  class="form-control"
                  v-model="item.print_bobb_price"
                />
              </div>
            </div>
            <div class="col-sm-4">
              <div class="form-group">
                <label for="" class="fs-13">Perfo price/bobb.</label>
                <input
                  type="number"
                  class="form-control"
                  v-model="item.perfo_price_bobb"
                />
              </div>
            </div>
            <div class="col-sm-4">
              <div class="form-group">
                <label for="" class="fs-13"
                  >Print price/bobb. incl. payment extension</label
                >
                <input
                  type="number"
                  class="form-control"
                  v-model="item.print_bobb_price_ext"
                />
              </div>
            </div>
            <div class="col-sm-4">
              <div class="form-group">
                <label for="" class="fs-13"
                  >Perfo price/bobb. incl. payment extension</label
                >
                <input
                  type="number"
                  class="form-control"
                  v-model="item.perfo_bobb_price_ext"
                />
              </div>
            </div>
            <div class="col-sm-4">
              <div class="form-group">
                <label for="" class="fs-13">Freight price/bobb</label>
                <input
                  type="number"
                  class="form-control"
                  v-model="item.freight_price"
                />
              </div>
            </div>
            <div class="col-sm-4">
              <div class="form-group">
                <label for="" class="fs-13"
                  >Cost Contribution 1st and 2nd round</label
                >
                <input
                  type="number"
                  class="form-control"
                  v-model="item.cost_contrib"
                />
              </div>
            </div>
            <div class="col-12">
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
            </div>
          </div>
          <div class="">
            <button class="btn btn-primary fs-13 mt-2" @click="submitRequest()">
              Submit
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
      setItem(item) {
        this.selectedItem = item;
      },
      getItem() {
        this.$store.commit("setLoader", true);
        this.$store
          .dispatch("get", `admin/pdm/get-request/${this.$route.params.id}`)
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
            console.log(this.$store.state.user.user.id);
          })
          .catch(() => {
            this.$store.commit("setLoader", false);
          });
      },
      submitRequest() {
        if (this.item.p1 < 1) {
          window.ToasterAlert("error", "<50 bobb. 50% price is required");
          return;
        }
        if (this.item.p2 < 1) {
          window.ToasterAlert("error", "<99 bobb. 25.0% is required");
          return;
        }
        if (this.item.p3 < 1) {
          window.ToasterAlert("error", ">100 bobb. 0.00% price is required");
          return;
        }
        if (this.item.p4 < 1) {
          window.ToasterAlert("error", "<50 bobb. 50% price is required");
          return;
        }
        if (this.item.p5 < 1) {
          window.ToasterAlert("error", "<50 bobb. 50% price is required");
          return;
        }
        if (this.item.p6 < 1) {
          window.ToasterAlert("error", ">50 bobb. 50% price is required");
          return;
        }
        if (!this.approver || this.approver.length < 1) {
          window.ToasterAlert("error", "Approver is required");
          return;
        }

        var data = {
          p1: null,
          p2: null,
          p3: null,
          p4: null,
          p5: null,
          p6: null,
          fca_baseprice: null,
          bob_me: null,
          perfo: null,
          bob_fca: null,
          print_bobb_price: null,
          perfo_price_bobb: null,
          print_bobb_price_ext: null,
          perfo_bobb_price_ext: null,
          freight_price: null,
          cost_contrib: null,
        };

        if (this.item.p1 != this.price.p1) {
          data.p1 = this.item.p1;
        } else {
          data.p1 = null;
        }
        if (this.item.p2 != this.price.p2) {
          data.p2 = this.item.p2;
        } else {
          data.p2 = null;
        }
        if (this.item.p3 != this.price.p3) {
          data.p3 = this.item.p3;
        } else {
          data.p3 = null;
        }
        if (this.item.p4 != this.price.p4) {
          data.p4 = this.item.p4;
        } else {
          data.p4 = null;
        }
        if (this.item.p5 != this.price.p5) {
          data.p5 = this.item.p5;
        } else {
          data.p5 = null;
        }
        if (this.item.p6 != this.price.p6) {
          data.p6 = this.item.p6;
        } else {
          data.p6 = null;
        }
        if (this.item.fca_baseprice != this.price.fca_baseprice) {
          data.fca_baseprice = this.item.fca_baseprice;
        } else {
          data.fca_baseprice = null;
        }
        if (this.item.bob_me != this.price.bob_me) {
          data.bob_me = this.item.bob_me;
        } else {
          data.bob_me = null;
        }
        if (this.item.perfo != this.price.perfo) {
          data.perfo = this.item.perfo;
        } else {
          data.perfo = null;
        }
        if (this.item.bob_fca != this.price.bob_fca) {
          data.bob_fca = this.item.bob_fca;
        } else {
          data.bob_fca = null;
        }
        if (this.item.print_bobb_price != this.price.print_bobb_price) {
          data.print_bobb_price = this.item.print_bobb_price;
        } else {
          data.print_bobb_price = null;
        }
        if (this.item.perfo_price_bobb != this.price.perfo_price_bobb) {
          data.perfo_price_bobb = this.item.perfo_price_bobb;
        } else {
          data.perfo_price_bobb = null;
        }
        if (this.item.print_bobb_price_ext != this.price.print_bobb_price_ext) {
          data.print_bobb_price_ext = this.item.print_bobb_price_ext;
        } else {
          data.print_bobb_price_ext = null;
        }
        if (this.item.perfo_bobb_price_ext != this.price.perfo_bobb_price_ext) {
          data.perfo_bobb_price_ext = this.item.perfo_bobb_price_ext;
        } else {
          data.perfo_bobb_price_ext = null;
        }
        if (this.item.freight_price != this.price.freight_price) {
          data.freight_price = this.item.freight_price;
        } else {
          data.freight_price = null;
        }
        if (this.item.cost_contrib != this.price.cost_contrib) {
          data.cost_contrib = this.item.cost_contrib;
        } else {
          data.cost_contrib = null;
        }

        console.log(data);
        this.$store.commit("setLoader", true);
        this.loading = true;
        this.$store
          .dispatch("post", {
            endpoint: "admin/pdm/submit-update-request",
            details: {
              item: this.item.id,
              price: JSON.stringify(data),
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
                window.location.href("/items");
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
      this.getItem();
      this.getApprovers();
    },
  };
</script>
