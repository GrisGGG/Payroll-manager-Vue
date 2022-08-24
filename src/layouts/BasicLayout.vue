<template>
  <div class="basic-layout">
    <Menu></Menu>
    <div class="ui container">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import Menu from '../components/Menu'
export default {
    name: "BasicLayout",
    components: {
        Menu,
    }

}
</script>

<style>

</style>