<template>
  <div class="yandex-card">
    <yandex-map :coords="state.coords" :settings="settings" @click="onClick">
      <ymap-marker marker-id="marker-id" :coords="state.coords"></ymap-marker>
    </yandex-map>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive } from "vue";

export default defineComponent({
  name: "YandexCard",
  props: {
    location: {
      type: Array,
      default: () => [56.838011, 60.597474],
    },
  },
  setup(props, { emit }) {
    const state = reactive({
      coords: [] as any[],
    });

    onMounted(() => {
      state.coords = props.location;
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
  height: 400px;
}
</style>
