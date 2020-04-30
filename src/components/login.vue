<template>
    <div>
        
        <ValidationObserver v-slot="{ invalid }">
              <div class="row">
                  <!-- <div class="col-md-12"> -->
                    <div class="col-md-6">
                        <ValidationProvider name="First Name" rules="required" v-slot="{ errors }">
                        <input v-model="username" type="text" class="form-control no-outline" placeholder="Enter Your Name">
                        <span style="color:red">{{ errors[0] }}</span>
                        </ValidationProvider>
                    </div>
                    <div class="col-md-3">
                        <button type="submit" :disabled="invalid" class="btn btn-md btn-primary" @click="onSubmit"><i class="fa fa-sign-in" aria-hidden="true"></i></button>
                    </div>
                  <!-- </div> -->
              </div>
          </ValidationObserver>
    </div>
</template>

<script>
import { VERIFY_USER } from '../../server/Event'
export default {
  props:{
    setUser:{ type:Function },
    socket:Object
  },
  data(){
    return {
      username:null
    }
  },
  methods:{
    onSubmit(){
      let socket = this.socket;
      socket.emit(VERIFY_USER,this.username,this.setUserChild)
    },
    setUserChild:function({isUser,user}){
		console.log("called loginForm --",user,isUser);
        if (isUser) {
            alert("User Name Taken !...");
        } else {
            this.$emit('submit',user);
        }
    }
  }
}
</script>
<style scoped>
</style>
