<template>
  <div>
      <!-- <h3>{{ title }}</h3> -->
      <div v-if="Object.keys(this.user).length == 0">
        <login-form v-bind:socket="socket" @submit="setUser"></login-form>
      </div>
      <div v-else>
        <game-board v-bind:socket="socket" v-bind:user="user" @logoutEvent="logout"></game-board>
      </div>
  </div>
</template>

<script>
import LoginForm from '../components/login'
import GameBoard from '../components/GameBoard'
import io from 'socket.io-client'
import {USER_CONNECTED,LOGOUT} from '../../server/Event'
const socketUrl = 'http://localhost:4000'
const socket = io(socketUrl)
export default {
  props:["title"],
  components:{
    'login-form' : LoginForm,
    'game-board' : GameBoard
  },
  data(){
    return{
      socket:null,
      user:{},
      connected:false
    }
  },
  mounted(){
    this.initSocket();
  },
  methods:{
    initSocket(){
      socket.on('connect', function(){
        this.connected = true;
        console.log("Connected");
      })

      socket.on('disconnect', ()=>{
        this.connected = false;
	  })

      this.socket = socket;
    },
    setUser: function (user){
      const socket = io(socketUrl)
      socket.emit(USER_CONNECTED,user); // user data goes here to server (sender)
      this.user = user;
    },
    logout:function(user){
      let socket = this.socket;
      socket.emit(LOGOUT,user);
      this.user = {};
    }
  }
}
</script>

<style>

</style>
