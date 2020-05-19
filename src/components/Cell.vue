<template>
	<td class="cell" @click="strike">{{ mark }}</td>
</template>

<script>
import { SET_MOVE } from '../../server/Event';
	export default {
		props: {
      position:Number,
      sender:Object,
      receiver:Object,
      user:Object,
      socket:Object
      },
		data () {
			return {
				// enables the player to place a mark
 				frozen: false,
				// holds either X or O to be displayed in the td
        mark: '',
        player1:null,
        player2:null,
			}
		},

		created () {
      let user = this.$props.user;
      let socket = this.$props.socket;
      this.getMove(socket);
		},

		methods: {
      getMove:function (socket) {
          socket.on(SET_MOVE,(poss,move) => {
              console.log(poss,move);
              let position = this.$props.position;
              if (position === poss) {
                this.mark = move;
                this.frozen = true;
              }
          })
      },
			strike () {

        if (!this.frozen) {

        let socket = this.$props.socket;
        let currentUser = this.$props.user;
        let sender = this.$props.sender;
        let receiver = this.$props.receiver;
          if (sender.name === currentUser.name) {
            this.mark = 'X';
            // this.player1 = 'X';
            this.frozen = true;
          }else{
            //   this.player2 = 'O';
          //   socket.emit(SET_MOVE,this.position,this.player2);
            this.mark = 'O';
            this.frozen = true;
          //   this.$emit('checkWin',this.position,this.player2)
          }
            socket.emit(SET_MOVE,this.position,this.mark);
            // this.$emit('checkWin',this.position,this.mark)
        }
			}
		},
	}
</script>

<style>
.cell {
  width: 33.333%;
  height: 90px;
  border: 6px solid #2c3e50;
  font-size: 3.5em;
  font-family: 'Gochi Hand', sans-serif;
}

.cell:hover {
	background-color: #7f8c8d;
}

.cell::after {
  content: '';
  display: block;
}

.cell:first-of-type {
  border-left-color: transparent;
  border-top-color: transparent;
}

.cell:nth-of-type(2) {
  border-top-color: transparent;
}

.cell:nth-of-type(3) {
  border-right-color: transparent;
  border-top-color: transparent;
}

tr:nth-of-type(3) .cell {
  border-bottom-color: transparent;
}
</style>
