<template>
  <div class="order px-2 py-4 mt-2" v-if="loaded">
    <!-- <div class="d-flex justify-content-between align-items-center">
      <h5 class="card-title mb-0 text-uppercase">{{ item.name }}</h5>
    </div> -->
    <div class="row">
      <div class="col-sm-7">
        <!-- <div class="d-flex mt-2">
          <b>Name:</b>
          <span class="ms-2">{{ item.name }}</span>
        </div>
        <div class="d-flex mt-2">
          <b>Price:</b>
          <span class="ms-2"
            >{{ item.currency }} {{ formatPrice(item.price) }}</span
          >
        </div>
        <div class="d-flex mt-2">
          <b>Last updated date:</b>
          <span class="ms-2">{{ formatDateTime(item.last_updated_at) }}</span>
        </div> -->
        <div class="card mt-2">
          <div class="card-body">
            <p>Material Details</p>
            <div class="row">
              <div class="col-sm-4">
                <b class="fs-13">Material no.</b>
                <p class="fs-12">{{ item.material_no }}</p>
              </div>
              <div class="col-sm-4">
                <b class="fs-13">Op'Co</b>
                <p class="fs-12">{{ item.opco }}</p>
              </div>

              <div class="col-sm-4">
                <b class="fs-13">TANN code</b>
                <p class="fs-12">{{ item.tann_code }}</p>
              </div>
              <div class="col-sm-4">
                <b class="fs-13">TANN description </b>
                <p class="fs-12">{{ item.tann_descp }}</p>
              </div>
              <div class="col-sm-4">
                <b class="fs-13">width</b>
                <p class="fs-12">{{ item.width }}</p>
              </div>
              <div class="col-sm-4">
                <b class="fs-13">length</b>
                <p class="fs-12">{{ item.length }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="card mt-2">
          <div class="card-body">
            <p class="mb-1">
              FOB price per Bob. in USD according to order quantity
            </p>
            <div class="row">
              <div class="col-sm-4">
                <b class="fs-13">&lt;50 bobb. 50%</b>
                <p class="fs-12">
                  {{ item.p1 }} <i class="fas fa-arrow-up text-danger"></i>
                </p>
              </div>
              <div class="col-sm-4">
                <b class="fs-13">&lt;99 bobb. 25.0%</b>
                <p class="fs-12">
                  {{ item.p2 }} <i class="fas fa-arrow-down text-success"></i>
                </p>
              </div>
              <div class="col-sm-4">
                <b class="fs-13">&gt;100 bobb. 0.00% </b>
                <p class="fs-12">
                  {{ item.p3 }} <i class="fas fa-arrow-up text-danger"></i>
                </p>
              </div>
            </div>

            <p class="mb-1 mt-3">
              DDP price per Bob. in USD according to order quantity
            </p>
            <div class="row">
              <div class="col-sm-4">
                <b class="fs-13">&lt;50 bobb. 50%</b>
                <p class="fs-12">
                  {{ item.p4 }} <i class="fas fa-arrow-up text-danger"></i>
                </p>
              </div>
              <div class="col-sm-4">
                <b class="fs-13">&lt;99 bobb. 25.0%</b>
                <p class="fs-12">
                  {{ item.p5 }}<i class="fas fa-arrow-down text-success"></i>
                </p>
              </div>
              <div class="col-sm-4">
                <b class="fs-13">&gt;100 bobb. 0.00%</b>
                <p class="fs-12">
                  {{ item.p6 }}<i class="fas fa-arrow-down text-success"></i>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="card mt-2">
          <div class="card-body">
            <p class="mb-1">Other Attributes</p>
            <div class="row">
              <div class="col-sm-4">
                <b class="fs-13">USD/100m² FCA baseprice</b>
                <p class="fs-12">
                  {{ item.fca_baseprice }}
                  <i class="fas fa-arrow-down text-success"></i>
                </p>
              </div>
              <div class="col-sm-4">
                <b class="fs-13">USD/100m² + BOB - Me</b>
                <p class="fs-12">
                  {{ item.bob_me }} <i class="fas fa-arrow-up text-danger"></i>
                </p>
              </div>
              <div class="col-sm-4">
                <b class="fs-13">USD/1000 m Perfo</b>
                <p class="fs-12">
                  {{ item.perfo }}
                  <i class="fas fa-arrow-down text-success"></i>
                </p>
              </div>
              <div class="col-sm-4">
                <b class="fs-13">Basis/Bob FCA</b>
                <p class="fs-12">
                  {{ item.bob_fca }}
                  <i class="fas fa-arrow-down text-success"></i>
                </p>
              </div>
              <div class="col-sm-4">
                <b class="fs-13">CC</b>
                <p class="fs-12">{{ item.cc }}</p>
              </div>
              <div class="col-sm-4">
                <b class="fs-13">Paper code </b>
                <p class="fs-12">{{ item.paper_code }}</p>
              </div>

              <div class="col-sm-4">
                <b class="fs-13">Combi-cc </b>
                <p class="fs-12">{{ item.comb_cc }}</p>
              </div>
              <div class="col-sm-4">
                <b class="fs-13">Print price/bobb.</b>
                <p class="fs-12">
                  {{ item.print_bobb_price }}
                  <i class="fas fa-arrow-down text-success"></i>
                </p>
              </div>
              <div class="col-sm-4">
                <b class="fs-13">Perfo price/bobb.</b>
                <p class="fs-12">
                  {{ item.perfo_price_bobb }}
                  <i class="fas fa-arrow-down text-success"></i>
                </p>
              </div>
              <div class="col-sm-4">
                <b class="fs-13">Print price/bobb. incl. payment extension</b>
                <p class="fs-12">
                  {{ item.print_bobb_price_ext }}
                  <i class="fas fa-arrow-down text-success"></i>
                </p>
              </div>
              <div class="col-sm-4">
                <b class="fs-13">Perfo price/bobb. incl. payment extension</b>
                <p class="fs-12">
                  {{ item.perfo_bobb_price_ext }}
                  <i class="fas fa-arrow-up text-danger"></i>
                </p>
              </div>
              <div class="col-sm-4">
                <b class="fs-13"> Freight price/bobb. </b>
                <p class="fs-12">
                  {{ item.freight_price }}
                  <i class="fas fa-arrow-up text-danger"></i>
                </p>
              </div>
              <div class="col-sm-4">
                <b class="fs-13"> Cost Contribution 1st and 2nd round </b>
                <p class="fs-12">
                  {{ item.cost_contrib }}
                  <i class="fas fa-arrow-down text-success"></i>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-sm-5">
        <div class="main-card mb-3 card">
          <div class="card-body">
            <h5 class="card-title">Price change history</h5>
            <div
              class="vertical-timeline vertical-timeline--animate vertical-timeline--one-column"
              v-if="history.length > 0"
            >
              <div
                class="vertical-timeline-item vertical-timeline-element"
                v-for="(item, index) in history"
                :key="index"
              >
                <a
                  :href="`/item/${item.id}/review-price`"
                  class="d-block text-dark"
                >
                  <span class="vertical-timeline-element-icon bounce-in">
                    <i
                      class="badge badge-dot badge-dot-xl"
                      :class="
                        item.status == 'approved'
                          ? 'bg-success'
                          : item.status == 'pending'
                          ? 'bg-primary'
                          : 'bg-danger'
                      "
                    ></i>
                  </span>
                  <div class="vertical-timeline-element-content bounce-in">
                    <h4 class="timeline-title">Supplier1</h4>
                    <p>
                      <!-- {{ item.item.currency }} {{ formatPrice(item.new_price) }} -->
                      {{ item.approver.username }}
                    </p>
                    <span class="vertical-timeline-element-date">
                      {{ formatDateTime(item.created_at) }}
                    </span>
                  </div>
                </a>
              </div>
            </div>
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
    body {
      background-color: #eee;
    }

    .mt-70 {
      margin-top: 70px;
    }

    .mb-70 {
      margin-bottom: 70px;
    }

    .card {
      box-shadow: 0 0.46875rem 2.1875rem rgba(4, 9, 20, 0.03),
        0 0.9375rem 1.40625rem rgba(4, 9, 20, 0.03),
        0 0.25rem 0.53125rem rgba(4, 9, 20, 0.05),
        0 0.125rem 0.1875rem rgba(4, 9, 20, 0.03);
      border-width: 0;
      transition: all 0.2s;
    }

    .card {
      position: relative;
      display: flex;
      flex-direction: column;
      min-width: 0;
      word-wrap: break-word;
      background-color: #fff;
      background-clip: border-box;
      border: 1px solid rgba(26, 54, 126, 0.125);
      border-radius: 0.25rem;
    }

    .card-body {
      flex: 1 1 auto;
      padding: 1.25rem;
    }
    .vertical-timeline {
      width: 100%;
      position: relative;
      padding: 1.5rem 0 1rem;
    }

    .vertical-timeline::before {
      content: "";
      position: absolute;
      top: 0;
      left: 67px;
      height: 100%;
      width: 4px;
      background: #e9ecef;
      border-radius: 0.25rem;
    }

    .vertical-timeline-element {
      position: relative;
      margin: 0 0 1rem;
    }

    .vertical-timeline--animate .vertical-timeline-element-icon.bounce-in {
      visibility: visible;
      animation: cd-bounce-1 0.8s;
    }
    .vertical-timeline-element-icon {
      position: absolute;
      top: 0;
      left: 60px;
    }

    .vertical-timeline-element-icon .badge-dot-xl {
      box-shadow: 0 0 0 5px #fff;
    }

    .badge-dot-xl {
      width: 18px;
      height: 18px;
      position: relative;
    }
    .badge:empty {
      display: none;
    }

    .badge-dot-xl::before {
      content: "";
      width: 10px;
      height: 10px;
      border-radius: 0.25rem;
      position: absolute;
      left: 50%;
      top: 50%;
      margin: -5px 0 0 -5px;
      background: #fff;
    }

    .vertical-timeline-element-content {
      position: relative;
      margin-left: 90px;
      font-size: 0.8rem;
    }

    .vertical-timeline-element-content .timeline-title {
      font-size: 0.8rem;
      text-transform: uppercase;
      margin: 0 0 0.5rem;
      padding: 2px 0 0;
      font-weight: bold;
    }

    .vertical-timeline-element-content .vertical-timeline-element-date {
      display: block;
      position: absolute;
      left: -90px;
      top: 0;
      padding-right: 10px;
      text-align: right;
      color: #adb5bd;
      font-size: 0.7619rem;
      white-space: nowrap;
    }

    .vertical-timeline-element-content:after {
      content: "";
      display: table;
      clear: both;
    }
  }
</style>
