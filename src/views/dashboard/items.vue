<template>
  <div class="orders px-2 py-4 mt-2" v-if="loaded">
    <div class="d-flex justify-content-between align-items-center">
      <div class="main-title d-flex justify-content-between w-100">
        <h6 class="mb-0">Materials</h6>
        <button
          class="btn btn-primary fs-13"
          data-bs-toggle="modal"
          data-bs-target="#uploadChanges"
          v-if="$store.state.user.user.username == 'supplier1'"
        >
          Upload changes
        </button>
      </div>
    </div>
    <div class="orders-body mt-2">
      <div class="card">
        <div class="card-body">
          <div class="table-responsive">
            <table class="table table-striped">
              <thead>
                <tr>
                  <th>TANN code</th>
                  <th>TANN description</th>
                  <th>Op'Co</th>
                  <th>Last Price Update</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody v-if="items.length > 0">
                <tr v-for="(item, index) in items" :key="index">
                  <td>{{ item.tann_code }}</td>
                  <td>{{ item.tann_descp }}</td>
                  <td>{{ item.opco }}</td>
                  <td>
                    {{ formatDateTime(item.last_updated_at) }}
                  </td>
                  <td>
                    <div class="d-flex align-items-center">
                      <router-link
                        class="btn btn-view"
                        :to="{ name: 'itemView', params: { id: item.id } }"
                        style="height: fit-content"
                        ><i class="fa fa-eye"></i
                      ></router-link>
                      <a
                        :href="`item/${item.id}/change-price`"
                        v-if="$store.state.user.user.username == 'supplier1'"
                        class="btn btn-primary ms-1 fs-10"
                      >
                        Change Price
                      </a>
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
      id="uploadChanges"
      tabindex="-1"
      aria-labelledby="uploadChangesLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered modal-md">
        <div class="modal-content">
          <div class="modal-header">
            <h6 class="modal-title" id="uploadChangesLabel">
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
                <label class="f-13">Attachment</label>
                <div class="form-group">
                  <input
                    type="file"
                    class="form-control"
                    accept=".xlsx, .xls"
                    @change="onFileChange"
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
  import * as XLSX from "xlsx";
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
        excelData: [],
        formData: [],
      };
    },

    methods: {
      async onFileChange(event) {
        const file = event.target.files[0];
        if (file) {
          // Read the file as a binary string
          const data = await file.arrayBuffer();
          const workbook = XLSX.read(data, { type: "array" });

          // Assuming you want the first sheet's data
          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];

          // Convert sheet data to JSON format
          this.excelData = XLSX.utils.sheet_to_json(sheet, { header: 0 });
          // console.log(this.excelData);

          for (const data of this.excelData) {
            var rd = {
              tann_code: data["TANN code"],
              p1: `${data["FOB price per Bob. in USD according to order quantity <50 bobb. 50%"]}`.replace(
                /\s/g,
                ""
              ),
              p2: `${data["FOB price per Bob. in USD according to order quantity < 99 bobb. 25.0%"]}`.replace(
                /\s/g,
                ""
              ),
              p3: `${data["FOB price per Bob. in USD according to order quantity >100 bobb. 0.0%"]}`.replace(
                /\s/g,
                ""
              ),
              p4: `${data["DDP price per Bob. in USD according to order quantity: <50 bobb. 50%"]}`.replace(
                /\s/g,
                ""
              ),
              p5: `${data["DDP price per Bob. in USD according to order quantity: < 99 bobb. 25.0%"]}`.replace(
                /\s/g,
                ""
              ),
              p6: `${data["DDP price per Bob. in USD according to order quantity: >100 bobb. 0.0%"]}`.replace(
                /\s/g,
                ""
              ),
              fca_baseprice: `${data["USD/100m² FCA baseprice"]}`.replace(
                /\s/g,
                ""
              ),
              bob_me: `${data["USD/100m² + BOB - Me"]}`.replace(/\s/g, ""),
              perfo: `${data["USD/1000 m Perfo"]}`.replace(/\s/g, ""),
              bob_fca: `${data["Basis/Bob FCA"]}`.replace(/\s/g, ""),
              print_bobb_price: `${data["print price/bobb."]}`.replace(
                /\s/g,
                ""
              ),
              perfo_price_bobb: `${data["perfo price/bobb."]}`.replace(
                /\s/g,
                ""
              ),
              print_bobb_price_ext:
                `${data["print price/bobb. incl. payment extension"]}`.replace(
                  /\s/g,
                  ""
                ),
              perfo_bobb_price_ext:
                `${data["perfo price/bobb. incl. payment extension"]}`.replace(
                  /\s/g,
                  ""
                ),
              freight_price: `${data["freight price/bobb."]}`.replace(
                /\s/g,
                ""
              ),
              cost_contrib:
                `${data["Cost Contribution 1st and 2nd round"]}`.replace(
                  /\s/g,
                  ""
                ),
            };

            if (isNaN(parseFloat(rd.bob_fca)) || rd.bob_fca.length < 1) {
              this.formData = [];
              window.ToasterAlert("error", "Invalid Basis/Bob FCA price");
              return;
            }
            if (isNaN(parseFloat(rd.perfo)) || rd.perfo.length < 1) {
              this.formData = [];
              window.ToasterAlert("error", "Invalid USD/1000 m Perfo. price");
              return;
            }
            if (isNaN(parseFloat(rd.bob_me)) || rd.bob_me.length < 1) {
              this.formData = [];
              window.ToasterAlert(
                "error",
                "Invalid USD/100m² + BOB - Me price"
              );
              return;
            }
            if (
              isNaN(parseFloat(rd.fca_baseprice)) ||
              rd.fca_baseprice.length < 1
            ) {
              this.formData = [];
              window.ToasterAlert("error", "Invalid USD/100m² FCA baseprice");
              return;
            }
            if (
              isNaN(parseFloat(rd.cost_contrib)) ||
              rd.cost_contrib.length < 1
            ) {
              this.formData = [];
              window.ToasterAlert(
                "error",
                "Invalid cost contribution 1st and 2nd round price"
              );
              return;
            }
            if (
              isNaN(parseFloat(rd.freight_price)) ||
              rd.freight_price.length < 1
            ) {
              this.formData = [];
              window.ToasterAlert("error", "Invalid freight price/bobb. price");
              return;
            }
            if (
              isNaN(parseFloat(rd.perfo_bobb_price_ext)) ||
              rd.perfo_bobb_price_ext.length < 1
            ) {
              this.formData = [];
              window.ToasterAlert(
                "error",
                "Invalid perfo price/bobb. incl. payment extension price"
              );
              return;
            }
            if (
              isNaN(parseFloat(rd.print_bobb_price_ext)) ||
              rd.print_bobb_price_ext.length < 1
            ) {
              this.formData = [];
              window.ToasterAlert(
                "error",
                "Invalid print price/bobb. incl. payment extension price"
              );
              return;
            }
            if (
              isNaN(parseFloat(rd.perfo_price_bobb)) ||
              rd.perfo_price_bobb.length < 1
            ) {
              this.formData = [];
              window.ToasterAlert("error", "Invalid perfo price/bobb. price");
              return;
            }
            if (
              isNaN(parseFloat(rd.print_bobb_price)) ||
              rd.print_bobb_price.length < 1
            ) {
              this.formData = [];
              window.ToasterAlert("error", "Invalid print price/bobb. price");
              return;
            }
            if (isNaN(parseFloat(rd.p1)) || rd.p1.length < 1) {
              this.formData = [];
              window.ToasterAlert("error", "Invalid <50 bobb. 50% price");
              return;
            }
            if (isNaN(parseFloat(rd.p2)) || rd.p2.length < 1) {
              this.formData = [];
              window.ToasterAlert("error", "Invalid <99 bobb. 25.0% price");
              return;
            }
            if (isNaN(parseFloat(rd.p3)) || rd.p3.length < 1) {
              this.formData = [];
              window.ToasterAlert("error", "Invalid >100 bobb. 0.00% price");
              return;
            }
            if (isNaN(parseFloat(rd.p4)) || rd.p4.length < 1) {
              this.formData = [];
              window.ToasterAlert("error", "Invalid <50 bobb. 50% price");
              return;
            }
            if (isNaN(parseFloat(rd.p5)) || rd.p5.length < 1) {
              this.formData = [];
              window.ToasterAlert("error", "Invalid <50 bobb. 50% price");
              return;
            }
            if (isNaN(parseFloat(rd.p6)) || rd.p6.length < 1) {
              this.formData = [];
              window.ToasterAlert("error", "Invalid >50 bobb. 50% price");
              return;
            }
            this.formData.push(rd);
          }
          console.log("fd", this.formData);
        }
      },
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
            // this.approvers.splice(
            //   this.approvers.findIndex((item) => item.username == "supplier1"),
            //   1
            // );
            console.log(this.approvers);
          })
          .catch(() => {
            this.$store.commit("setLoader", false);
          });
      },
      submitRequest() {
        if (!this.approver || this.approver.length < 1) {
          window.ToasterAlert("error", "Approver is required");
          return;
        }
        this.$store.commit("setLoader", true);
        this.loading = true;
        this.$store
          .dispatch("post", {
            endpoint: "admin/pdm/submit-update-request-multiple",
            details: {
              items: JSON.stringify(this.formData),
              approver: this.approver,
            },
          })
          .then((resp) => {
            console.log(resp);
            this.$store.commit("setLoader", false);
            this.loading = false;
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
