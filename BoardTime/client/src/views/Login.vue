<template>
  <div id="login">
    <router-view></router-view>
    <v-app>
      <main>
        <v-container fluid class="loginOverlay">
          <v-layout flex align-center justify-center>
            <v-flex xs12 sm4 elevation-10>
              <v-toolbar class="pt-5 blue darken-4">
                <v-toolbar-title class="white--text"
                  ><h4 :style="{ marginBottom: '30px' }">
                    {{ register ? "Register" : "Login" }}
                  </h4></v-toolbar-title
                >
                <h2
                  :style="{
                    color: '#95A5A6',
                    marginLeft: '100px',
                    marginBottom: '30px',
                  }"
                >
                  {{ info }}
                </h2>
              </v-toolbar>
              <v-card>
                <v-card-text class="pt-4">
                  <div>
                    <v-form v-model="valid" ref="form">
                      <div v-if="register">
                        <v-text-field
                          label="Enter your name"
                          v-model="name"
                          type="text"
                          required
                        ></v-text-field>
                      </div>
                      <v-text-field
                        label="Enter your e-mail address"
                        v-model="email"
                        :rules="emailRules"
                        required
                      ></v-text-field>
                      <v-text-field
                        label="Enter your password"
                        v-model="password"
                        :rules="passwordRules"
                        type="password"
                        counter
                        required
                      ></v-text-field>
                      <v-layout justify-space-between>
                        <div v-if="register" class="formFooter">
                          <v-btn @click="registerSubmit">Register</v-btn>
                          <h4 :style="{ paddingLeft: '20px' }">
                            Already registered?
                            <a @click="goToRegister">click here</a>
                          </h4>
                        </div>
                        <div v-else class="formFooter">
                          <v-btn @click="loginSubmit">Login</v-btn>
                          <h4 :style="{ paddingLeft: '20px' }">
                            Not registered yet?
                            <a @click="goToRegister">click here </a>
                          </h4>
                        </div>
                      </v-layout>
                    </v-form>
                  </div>
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </main>
    </v-app>
  </div>
</template>

<script>

export default {
  name: "Login",
  components: {},
  data: () => ({
    register: false,
    info: "",
    valid: false,
    name: "",
    password: "",
    passwordRules: [(v) => !!v || "Password is required!"],
    email: "",
    emailRules: [
      (v) => !!v || "Email ir required",
      (v) =>
        /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/.test(v) ||
        "E-mail must be valid",
    ],
  }),
  methods: {
    goToRegister() {
      this.register = !this.register;
      this.clear();
    },
    async loginSubmit() {
      console.log("loginSubmit");
      if (this.$refs.form.validate()) {
        var resp = await fetch("http://localhost:3000/users/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer my-token",
          },
          body: JSON.stringify({
            email: this.email,
            password: this.password,
          }),
        }).then((response) => {
          this.token = response.data;
          console.log(response.data)
        });

        console.log(resp.headers.get("token"));
      }
    },
    async registerSubmit() {
      if (this.$refs.form.validate()) {
        var resp = await fetch("http://localhost:3000/users/signin", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: this.name,
            email: this.email,
            password: this.password,
          }),
        });

        if (resp.status === 201) {
          this.info = "Usuario registrado!";
          this.goToRegister();
        }
        if (resp.status === 400)
          this.info = "Rellena todos los campos correctamente";
        if (resp.status === 401) this.info = "El email ya está en uso";
      }
    },
    clear() {
      this.$refs.form.reset();
    },
  },
};
</script>

<style>
#app {
  background-image: url("https://images.pexels.com/photos/3042359/pexels-photo-3042359.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940");
  background-size: cover;
  overflow: hidden;
}

.loginOverlay {
  padding-top: 10px;
  margin-top: 80px;
}

.photoCredit {
  position: absolute;
  bottom: 15px;
  right: 15px;
}

.formFooter {
  display: flex;
  flex-direction: row;
}

.registerLink {
  display: flex;
  flex-direction: row;
}
</style>