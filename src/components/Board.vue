<template>
    <div>
      <div class="row">
          <table class="grid">
            <tr>
              <cell :position="1" :sender="this.sender" :receiver="this.receiver" :socket="this.$props.socket" :user="this.$props.user"></cell>
              <cell :position="2" :sender="this.sender" :receiver="this.receiver" :socket="this.$props.socket" :user="this.$props.user"></cell>
              <cell :position="3" :sender="this.sender" :receiver="this.receiver" :socket="this.$props.socket" :user="this.$props.user"></cell>
            </tr>
            <tr>
              <cell :position="4" :sender="this.sender" :receiver="this.receiver" :socket="this.$props.socket" :user="this.$props.user"></cell>
              <cell :position="5" :sender="this.sender" :receiver="this.receiver" :socket="this.$props.socket" :user="this.$props.user"></cell>
              <cell :position="6" :sender="this.sender" :receiver="this.receiver" :socket="this.$props.socket" :user="this.$props.user"></cell>
            </tr>
            <tr>
              <cell :position="7" :sender="this.sender" :receiver="this.receiver" :socket="this.$props.socket" :user="this.$props.user"></cell>
              <cell :position="8" :sender="this.sender" :receiver="this.receiver" :socket="this.$props.socket" :user="this.$props.user"></cell>
              <cell :position="9" :sender="this.sender" :receiver="this.receiver" :socket="this.$props.socket" :user="this.$props.user"></cell>
            </tr>
          </table>
      </div>
    </div>
</template>

<script>
import { SET_MOVE } from '../../server/Event';
import cell from '../components/Cell';
let array = [];
let array1 = [];
export default {
  components:{
      cell
  },
  props:{
      sender:Object,
      receiver:Object,
      user:Object,
      socket:Object
  },
  created(){
    let user = this.$props.user;
    let socket = this.$props.socket;
  },

  data(){
    return {
      waitingMsg:'Waiting For Opponent !..',
      // cells: {
      //     1: '', 2: '', 3: '',
      //     4: '', 5: '', 6: '',
      //     7: '', 8: '', 9: ''
			//   },
			// winConditions: [
			// 	[1, 2, 3], [4, 5, 6], [7, 8, 9], // rows
			// 	[1, 4, 7], [2, 5, 8],	[3, 6, 9], // columns
			// 	[1, 5, 9], [3, 5, 7]             // diagonals
      // ],
      // winConditions:{
      //   r1:[1,2,3],
      //   r2:[4,5,6],
      //   r3:[7,8,9],
      //   c1:[1,4,7],
      //   c2:[2,5,8],
      //   c3:[3,6,9],
      //   d1:[1,5,9],
      //   d2:[3,5,7]
      // }
    }
  },
  methods:{
  //   checkWin(position,mark){
  //     // console.log(position,mark);

  //     // console.log();


  //     if (mark === "X") {
  //       //   console.log(position,mark);

  //     this.cells[position] = 'X';

  //     //   let winCon = this.winConditions;
  //     //   array.push(position);
  //     //   let a = array.length;

  //     //   console.log(array,a);

  //       }else{

  //         this.cells[position] = 'O';
  //     //   console.log(position,mark);

  //     //   let winCon = this.winConditions;
  //     //   array1.push(position);
  //     //   let b = array1.length;
  //     //   console.log(array1,b);

  //       }
  //   }
  }
}
</script>

<style scoped>
    h1 {
  text-align: center;
}
td {
  width: 100px;
  height: 100px;
}
table {
  margin: 5px auto;
}
.vert {
  border-left: 2px solid black;
  border-right: 2px solid black;
}
.hori {
  border-top: 2px solid black;
  border-bottom: 2px solid black;
}
</style>
