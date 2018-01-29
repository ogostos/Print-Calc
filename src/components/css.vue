<template>
  <div class="wrapper">
    <div class="box a">A</div>
    <div class="box b">B</div>
    <div class="box c">C</div>
  </div>
</template>

<script>
  
</script>

<style scoped>
.wrapper {
    display: grid;
    grid-gap: 10px;
    background-color: blue;
    color: blue;
  }
  .box {
    background-color: #444;
    color: #fff;
    padding: 20px;
    font-size: 150%;
  }
  .a {
    grid-column: 1 / 3;
    grid-row: 1;
  }
  .b {
    grid-column: 3 ;
    grid-row: 1 / 3;
  }
  .c {
    grid-column: 1 / 3;
    grid-row: 2 ;
  }
</style>
