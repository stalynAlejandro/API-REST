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
                  ><h4>LOGIN</h4></v-toolbar-title
                >
              </v-toolbar>
              <v-card>
                <v-card-text class="pt-4">
                  <div>
                    <v-form v-model="valid" ref="form">
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
                        <v-btn
                          @click="submit"
                          :class="{
                            'blue darken-4 white--text': valid,
                            disabled: !valid,
                          }"
                          >Login</v-btn
                        >
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
    valid: false,
    e1: false,
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
    submit() {
        console.log(this.email)
        console.log(this.password)
      if (this.$refs.form.validate()) {
        this.$refs.form.$el.submit();
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
  overflow:hidden;
}

.loginOverlay {
  padding-top: 10px;
  margin-top: 80px;
}

.photoCredit{
  position: absolute;
  bottom: 15px;
  right: 15px;
}


</style>