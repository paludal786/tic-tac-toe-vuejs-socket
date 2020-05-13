
<template>
    <div>

          <div class="row">
            <div class="pull-right">
              <div class="dropdown" style="float:right;">
                <button class="dropbtn btn-btn-xs">Welcome,{{ user.name }}</button>
                <div class="dropdown-content">
                  <a @click="logout()"><i class="fa fa-sign-out" aria-hidden="true"></i> Sign-Out</a>
                </div>
              </div>
            </div>
          </div>

          <div class="row" v-if="showUsers">
            <div class="col-md-6">
            <p>Online Players <i class="fa fa-users" aria-hidden="true"></i></p>
              <ul class="list-group" v-for="users in userList" :key="users.id">
                <li class="list-group-item"><label>{{ users.name.toUpperCase() }} </label> <label> {{ users.playing }}</label>
                <button class="btn btn-primary btn-xs pull-right" @click="sendNotification(users)">Play</button></li>
              </ul>
            </div>
            <div class="col-md-6">
                <p></p>
                <div v-for="notify in notification" :key="notify.id">
                  <div class="alert alert-info alert-dismissible fade show" v-if="notify.name">
                    <b>{{ notify.name }} want to play with you!..</b>
                    <button type="button" class="btn btn-outline-success btn-sm" @click="play(notify)">Play</button>
                    <button type="button" class="btn btn-outline-danger btn-sm pull-right" data-dismiss="alert">Dismiss</button>
                  </div>
                </div>
            </div>
          </div>

          <div v-if="showBoard">
            <p>You Are Playing With <b>{{ this.userList[0].name.toUpperCase() }}</b></p>
          </div>
          <board v-if="showBoard" v-bind:sender="this.sender" v-bind:receiver="this.receiver" v-bind:socket="this.$props.socket" v-bind:user="this.$props.user"></board>

    </div>
</template>

<script>
import board from './Board'
import { USER_LIST ,USER_CONNECTED , USER_DISCONNECTED , USER_SIGNOUT , SEND_NOTIFICATION , RECEIVED_NOTIFICATION , PRIVATE_ROOM } from '../../server/Event'
/* eslint-disable */
let notification = [];
export default {
    components:{
      board
    },
    props:{
        socket:Object,
        user:Object,
    },
    data(){
        return {
            userList:null,
            currentUserList:[],
            notification:[],
            sender:{},
            receiver:{},
            showBoard:false,
            showUsers:true
        }
    },
    mounted(){
      let socket = this.$props.socket;
      let user = this.$props.user;
      this.getUsers(socket,user)
      this.getNotification(socket)
      this.getBoardDetail(socket)
    },
    methods:{
        getBoardDetail:function (socket) {
            socket.on(PRIVATE_ROOM,(sender,receiver,showBoard,showUsers) => {
              console.log(typeof(sender));

                this.sender = sender;
                this.receiver = receiver;
                let user = this.$props.user;

                if (user.name === sender.name) {
                    this.showUsers = showUsers;
                    this.showBoard = showBoard;
                    let c = this.currentUserList;
                    c.push(sender.receiver);
                    console.log(sender,receiver,showBoard,showUsers);
                }

            })
        },
        play:function(sender){
            let socket = this.$props.socket;
            this.showUsers = false;
            this.showBoard = true;
            socket.emit(PRIVATE_ROOM,sender,this.receiver,this.showBoard,this.showUsers);
            console.log(typeof(sender),sender,this.receiver);
        },
        getNotification:function(socket){
            socket.on(RECEIVED_NOTIFICATION,(user,currentUser) => {
              // console.log("data comes from servaer",user,currentUser);
              let sender = currentUser;
              let receiver = user;
              // console.log('sender :- ' + sender.name, 'receiver :- ' + receiver.name,this.user);

              if (receiver.name === this.user.name) {
                  // console.log("aaayaaaaa!...",sender);
                  notification.push(sender);
                  this.notification = notification;
                  // console.log(typeof(this.sender));
                  this.sender = currentUser;
                  this.receiver = receiver;
              }

            });
        },
        sendNotification:function (user) {
            let currentUser = this.$props.user;
            let socket = this.$props.socket;
            console.log(user,currentUser);
            socket.emit(SEND_NOTIFICATION,user,currentUser);
        },
        logout:function (){
            this.$emit('logoutEvent',this.$props.user);
        },
        getUsers:function (socket,user){
          // listener for connected all users
          socket.on(USER_CONNECTED,(data) => {
              console.log('USER_CONNECTED',data);
              let a = Object.keys(data).map(function(key, value) {
                return key != user.name ? data[key] : {};
              });
              let b = a.filter(value => Object.keys(value).length !== 0);
              this.userList = b;
          });

          socket.on(USER_SIGNOUT, (data)=>{
            // console.log('this user has been logged out !..',data);
            //   let c = this.userList.map(function (key,value) {
            //     return key != data.name ? data[key] : {};
            //   });
            //   let d = this.userList.filter( x => {
            //       return x.name == data.name;
            //   });
            //   this.userList = d;
            console.log(data);
            let d = this.userList;
            let c = d.filter((item,index,data) => {
                // console.log(item,index,data,item.name != data.name);
                // this.userList = {};
                return item;
            })
            console.log(c);
            // this.userList = c;
            // console.log(this.userList);

	        })

        },
        // sendOpenPrivateMessage(receiver){
        //   let socket = this.$props.socket;
        //   socket.emit(PRIVATE_ROOM,{ receiver:this.parterName,sender: this.$props.user.name })
        // }
    }
}
</script>

<style scoped>
    .dropbtn {
      background-color: #0089ff;
      color: white;
      padding: 16px;
      font-size: 16px;
      border: none;
      border-radius: 15px;
      cursor: pointer;
    }

    .dropdown {
      position: relative;
      display: inline-block;
      border-radius: 10px;
    }

    .dropdown-content {
      border-radius: 10px;
      display: none;
      position: absolute;
      right: 0;
      background-color: #f9f9f9;
      min-width: 160px;
      box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
      z-index: 1;
    }

    .dropdown-content a {
      color: black;
      padding: 12px 16px;
      text-decoration: none;
      display: block;
    }
    .dropdown-content a:hover {
      background-color: #f1f1f1;
      border-radius: 10px;
      border-color:black ;
      }
    .dropdown:hover .dropdown-content {display: block;border-radius: 10px;}
    .dropdown:hover .dropbtn {background-color: #0089ff;border-radius: 10px;}
</style>
