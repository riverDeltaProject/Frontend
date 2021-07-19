<template>
  <div class="item">
   <div id="itemImg"></div>
   <div id="itemInfo">
     <h3>식당 이름</h3>
     <p>그러하다</p>
   </div>
  </div>
</template>

<script>
export default {
  name: 'Item',
  data () {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.item{
  display: flex;
  flex-wrap: nowrap;
}

#itemImg{
  display:inline-block;
  width:50px;
  height:50px;
  background-color: black;
}

#itemInfo{
  display:inline-block;
  margin : 0 0 0 10px;
}

#itemInfo>*{
  margin:0;
}

#itemInfo>p{
  padding : 4px 0 0 0;
}

</style>
