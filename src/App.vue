<template>
  <div id="app">
    <HeaderBar />
    <div class="main-section columns">
      <NavBar />
      <main class="column">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/nav-bar';

export default {
  name: 'App',
  components: { NavBar },
};
</script>

<style>
@import './design/index.scss';
</style>
