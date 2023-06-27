<template>
  <header class="header">
    <div class="container">
      <Logo />
      <Navigation />
    </div>
  </header>
</template>
<style lang="scss" scoped>
.header{
  padding: 10px 0;
  z-index: 20;margin-bottom: 30px;
  @media(min-width:1200px){
    margin-bottom: 50px;
  }
  .container{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>