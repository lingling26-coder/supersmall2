<template>
  <div class="nav-bar">
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div class="center">
      <slot name="center"></slot>
    </div>
    <div class="right">
        <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavBar",
};
</script>

<style>
.nav-bar{
    display: flex;
    line-height: 44px;
    text-align: center;
    box-shadow: 0 1px 1px rgba(100,100,100,.1);
}
.left{
 /* width: 60px; */
 flex:1;
 height: 44px;
}
.center{
 flex: 4.6;
 height: 44px;
}
.right{
  flex: 1;
 /* width: 60px; */
 height: 44px;
}
</style>