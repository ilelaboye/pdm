<template>
  <div class="login-wrapper">
    <div class="row login-row">
      <div class="col-12 login-section-wrapper">
        <div class="login-section">
          <div class="logo">
            <img src="@/assets/img/logo.jpeg" class="w-100" />
          </div>
          <div class="login-header"></div>
          <div class="login-body mt-3">
            <form @submit.prevent="login()">
              <div class="form-group">
                <label for="email">Username</label>
                <input
                  id="email"
                  type="text"
                  class="form-control"
                  v-model="admin.username"
                  placeholder="Username"
                  required
                />
              </div>
              <div class="form-group mb-2">
                <label for="psw">Password</label>
                <input
                  id="psw"
                  type="password"
                  class="form-control"
                  placeholder="Password"
                  v-model="admin.password"
                  required
                />
              </div>
              <div class="form-group mt-4">
                <button
                  type="submit"
                  :disabled="loading"
                  class="btn btn-primary w-100 submit"
                >
                  <span v-if="!loading">Login</span>
                  <span v-else>Loading...</span>
                </button>
              </div>
            </form>
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
        admin: {
          username: "",
          password: "",
        },
        loading: false,
      };
    },
    methods: {
      login() {
        if (this.admin.username.length < 1 || this.admin.password.length < 1) {
          window.ToasterAlert("error", "All fields are required");
          return false;
        }
        this.loading = true;
        this.$store
          .dispatch("post", {
            endpoint: "admin/login",
            details: {
              username: this.admin.username,
              password: this.admin.password,
              CountryId: 1,
            },
          })
          .then((resp) => {
            // console.log(resp)
            if (resp.data.status) {
              var data = resp.data.data;
              this.$store.commit("setUser", { ...data, supervisor: false });
              this.$router.push("/dashboard");
            } else {
              window.ToasterAlert("error", "Invalid username and password");
            }
            this.loading = false;
          })
          .catch(() => {
            this.loading = false;
          });
      },
    },
  };
</script>

<style scoped lang="scss">
  .login-row {
    min-height: 100vh;
    .logo {
      width: 12em;
      margin-bottom: 20px;
    }
  }
  .img-row {
    background-color: #2d68cb;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    .img-wrapper {
      width: 78%;
    }
  }
  .login-section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;

    .login-header {
      .lh-descp {
        max-width: 25em;
        text-align: center;
        color: grey;
        font-size: 14px;
      }
    }
    .login-body {
      min-width: 30em;
      padding: 20px;
      box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
      border-radius: 7px;
      .form-group {
        margin-bottom: 20px;
        .form-control {
          height: 48px;
          font-size: 14px;
        }
        .google-signin {
          border: 1px solid #8080803d;
          background-color: transparent;
          font-size: 15px;
          padding: 15px 0;
        }
      }
      .forgot-psw {
        .form-check-label {
          font-size: 13px;
        }
        a {
          font-size: 13px;
        }
      }
      .submit {
        padding: 13px;
        background-color: #0a0a0a;
        border: none;
        &:hover {
          background-color: #676464;
        }
      }
    }
    .signup {
      font-size: 14px;
      color: #808080ab;
      a {
        font-weight: bold;
        color: #0a0a0a;
      }
    }
  }
  @media (max-width: 576px) {
    .img-row {
      display: none;
    }
    .login-section .login-body {
      min-width: 22em;
    }
    .login-section-wrapper {
      padding-right: 0;
      min-height: 97vh;
    }
  }
</style>
