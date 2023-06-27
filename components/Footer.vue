<template>
  <footer class="footer">
    <span>All Rights Reserved - Geekout 2022</span>
  </footer>
</template>
<style lang="scss" scoped>
.footer{
  position: absolute;
  left: 0; bottom: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
  text-align: center;
  z-index: 19;
  & span{
    color: #fff;
    font-size: 16px;
  }
}
.mode-dark{
  .footer{
    background: #1E2022;
  }
}
.mode-white{
  .footer{
    background: var(--active);
  }
}
</style>