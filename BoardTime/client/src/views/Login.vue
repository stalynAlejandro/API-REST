<template>
  <div class="login-container">
    <div>
      <v-form v-model="valid" ref="form">
        <h3>{{ info }}</h3>
        <div v-if="register">
          <v-text-field
            label="Enter your name"
            v-model="name"
            type="text"
            required
            :style="{ marginTop: '10px' }"
          ></v-text-field>
        </div>
        <v-text-field
          label="Enter your e-mail address"
          v-model="email"
          :rules="emailRules"
          required
          :style="{ marginTop: '10px' }"
        ></v-text-field>
        <v-text-field
          label="Enter your password"
          v-model="password"
          :rules="passwordRules"
          type="password"
          counter
          required
          :style="{ marginTop: '10px' }"
        ></v-text-field>
        <v-layout justify-space-between>
          <div v-if="register" class="formFooter">
            <v-btn @click="registerSubmit" :style="{ marginTop: '10px' }"
              >Register</v-btn
            >
            <h4
              :style="{
                paddingLeft: '20px',
                fontSize: '14px',
                marginTop: '10px',
              }"
            >
              Already registered?
              <a @click="goToRegister" :style="{ color: '#4A235A ' }"
                >click here</a
              >
            </h4>
          </div>
          <div v-else class="formFooter">
            <v-btn @click="loginSubmit" :style="{ marginTop: '10px' }"
              >Login</v-btn
            >
            <h4
              :style="{
                paddingLeft: '20px',
                fontSize: '14px',
                marginTop: '10px',
              }"
            >
              Not registered yet?
              <a
                @click="goToRegister"
                :style="{ color: '#4A235A', marginTop: '10px' }"
                >click here</a
              >
            </h4>
          </div>
        </v-layout>
      </v-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  components: {},
  data: () => ({
    respSever: "",
    register: false,
    info: "",
    valid: false,
    name: "",
    email: "",
    password: "",
    passwordRules: [(v) => !!v || "Password is required!"],
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
      if (this.$refs.form.validate()) {
        this.respSever = await fetch("http://localhost:3000/users/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer my-token",
          },
          body: JSON.stringify({
            email: this.email,
            password: this.password,
          }),
        }).then((response) => {
          if (response.status === 201) {
            this.info = "Usuario correcto!";
            return response.json();
          } else {
            this.info = "Usuario y contraseña no coinciden";
            return undefined;
          }
        });
      }
      if (this.respSever) {
        console.log(this.respServer);
        this.addUser();
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
    addUser: function () {
      console.log("addUser");
      var user = {
        name: this.respSever.name,
        email: this.email,
        token: this.respSever.token,
      };
      this.$store.commit("addUser", user);
      this.$router.push({ path: `dashboard/${user.email}` });
    },
    clear() {
      this.$refs.form.reset();
    },
  },
};
</script>

<style>
.login-container {
  position: absolute;
  top: 100px;
  left: 450px;
  width: 500px;
  height: 60px;
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