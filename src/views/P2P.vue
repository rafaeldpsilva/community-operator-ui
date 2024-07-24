<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-lg-12">
        <div class="card z-index-2">
          <p2-p-map />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import P2PMap from "./components/Energy/P2PMap.vue";

export default {
  name: "P2P",
  components: {
    P2PMap
  },
  data() {
    return {
    };
  },
};
</script>
