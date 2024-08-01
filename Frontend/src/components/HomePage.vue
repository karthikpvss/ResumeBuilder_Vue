<template>
      <div>
      <v-app-bar
          color="#711429"
          density="compact"
          elevation="5"
        >
          <v-app-bar-title>Resume Builder</v-app-bar-title>
  
          <template v-slot:prepend>
            <v-btn
              color="white"
              icon="mdi-home"
              variant="text"
              to="/"
            ></v-btn>
          </template>
          
          <template v-slot:append>
            <div class="text-center">
              <v-btn
                prepend-icon="mdi-typewriter"
                @click="resume"
                v-show="this.$store.state.isUserLoggedIn && this.$store.state.permission == 'User'"
              >
                <template v-slot:prepend>
                  <v-icon color="#fff"></v-icon>
                </template>
                Resume
              </v-btn>

              <v-btn
                prepend-icon="mdi-typewriter"
                @click="login"
                v-show="!this.$store.state.isUserLoggedIn"
              >
                <template v-slot:prepend>
                  <v-icon color="#fff"></v-icon>
                </template>
                Login
              </v-btn>
              
              <v-btn
                prepend-icon="mdi-typewriter"
                @click="signup"
                v-show="!this.$store.state.isUserLoggedIn"
              >
                <template v-slot:prepend>
                  <v-icon color="#fff"></v-icon>
                </template>
                Sign Up
              </v-btn>
              
              <v-btn
                prepend-icon="mdi-typewriter"
                @click="logout"
                v-show="this.$store.state.isUserLoggedIn"
              >
                <template v-slot:prepend>
                  <v-icon color="#fff"></v-icon>
                </template>
                Logout
              </v-btn>
            </div>
        </template>

        </v-app-bar>
        </div>
  </template>
  
<script>
  import router from '../router'
  export default {
    data: () => ({
      isUserLoggedIn: false,
      userName: "",
      logoutUser: false
    }),

    methods: {
      onLoad(){
        console.log(sessionStorage.getItem('UserId'))
        console.log(sessionStorage.getItem('UserName'))
        console.log(sessionStorage.getItem('UserPermission'))
        console.log(sessionStorage.getItem('IsUserLoggedIn'))

        console.log(this.$store.state.UserId)
        console.log(this.$store.state.username)
        console.log(this.$store.state.permission)
        console.log(this.$store.state.isUserLoggedIn)

        if(sessionStorage.getItem("UserId") != null && sessionStorage.getItem("UserId") != this.$store.state.UserId){
          this.$store.state.UserId = sessionStorage.getItem("UserId")
        }
        if(sessionStorage.getItem("IsUserLoggedIn") != null && sessionStorage.getItem("IsUserLoggedIn") != this.$store.state.isUserLoggedIn){
          this.$store.state.isUserLoggedIn = sessionStorage.getItem("IsUserLoggedIn")
        }
        if(sessionStorage.getItem("UserName") !=  null && sessionStorage.getItem("UserName") != this.$store.state.username){
          this.$store.state.username = sessionStorage.getItem("UserName")
        }
        if(sessionStorage.getItem("UserPermission") != null && sessionStorage.getItem("UserPermission") != this.$store.state.permission){
          this.$store.state.permission = sessionStorage.getItem("UserPermission")
        }
      },
        login(){
          router.push("/login")
        },
        signup(){
          router.push("/signup")
        },
        resume(){
          router.push("/resume")
        },
        adminPage(){
          router.push("/admin")
        },
        profile(){
          router.push("/profile")
        },
        logout(){
          this.$store.commit('setUserName', "NA")
          this.$store.commit('setPermission', "NA")
          this.$store.commit('setIsUserLoggedIn', false)

          sessionStorage.clear();
          router.push("/login")
        }
    },
    beforeMount() {
      this.onLoad()
    }
  }
</script>