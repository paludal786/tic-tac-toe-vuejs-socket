<template>
    <div>
        <h3>This is board</h3>
        <div class="col-md-12">
            <button type="button" class="btn btn-grad-out btn-xs pull-left" @click="logout()"><i class="fa fa-sign-out" aria-hidden="true"></i> Sign-Out</button>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        socket:Object,
        user:Object
    },
    data(){
        return {
            //
        }
    },
    methods:{
        logout:function (){
            this.$emit('logoutEvent',this.$props.user);
        },
    }
}
</script>

<style>

</style>