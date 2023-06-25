<template>
  <div class="yandex-card">
    <yandex-map
      :coords="[56.838011, 60.597474]"
      :settings="settings"
      @click="onClick"
    >
      <ymap-marker marker-id="marker-id" :coords="state.coords"></ymap-marker>
    </yandex-map>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";

export default defineComponent({
  name: "YandexCard",
  props: {},
  setup(props, { emit }) {
    const state = reactive({
      coords: [54, 39],
    });

    const settings = {
      apiKey: "4145c464-2066-4a2d-ad06-af45e6041204",
      lang: "ru_RU",
      coordorder: "latlong",
      enterprise: false,
      version: "2.1",
    };

    const onClick = (e: any) => {
      state.coords = e.get("coords");
      emit("setLocation", state.coords);
    };
    return { state, settings, onClick };
  },
});
</script>

<style lang="scss">
.yandex-card {
  width: 100%;
  height: 100%;
}
.ymap-container {
  height: 500px;
}
</style>
