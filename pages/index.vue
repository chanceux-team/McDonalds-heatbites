<script lang="ts" setup>
import 'vue3-calendar-heatmap/dist/style.css';
import dayjs from 'dayjs';
import * as pkg from 'vue3-calendar-heatmap';
const { CalendarHeatmap } = pkg;

const { data: initData } = await useFetch<any[]>('/api/calendar');
const calendar = computed(() => {
  return initData.value
    ?.filter((item: any) => item.count > 0)
    .map((item: any) => ({ date: item.date, count: item.count }))
    || [];
});
async function handleUpdate(count = 1) {
  const { data } = await useFetch<any>('/api/calendar/update', {
    method: 'POST',
    body: JSON.stringify({ count }),
  });
  const index = initData.value?.find((item: any) => item.id === data.value.id);
  index ? index.count = data.value.count : initData.value?.push(data.value);
  // eslint-disable-next-line no-alert
  alert(`Updated: ${data.value.date} - ${data.value.count}`);
}
</script>

<template>
  <div class="p-6">
    <div class="flex flex-col justify-center items-center gap-6 bg-gray-950 max-w-screen-xl m-auto">
      <IconLogo class="w-28" />
      <div class="w-full">
        <CalendarHeatmap
          :values="calendar"
          :end-date="dayjs().format('YYYY-MM-DD')"
          :range-color="['#1F1F22', '#1F1F22', '#E76F51', '#E9C46A', '#FFD166', '#0275D8']"
          tooltip-unit="counts"
        />
      </div>

      <div class="flex flex-col w-full gap-4">
        <div class="py-2 border-b-2 border-gray-500">
          {{ dayjs().format('YYYY-MM-DD') }}
        </div>

        <div class="flex gap-2 items-center justify-center">
          <button
            class="bg-[#FFF264] rounded-lg py-2 px-6 text-[#E63939] font-bold text-xl hover:bg-yellow-100 transition-all duration-300 ease-in-out"
            @click="handleUpdate()"
          >
            +1
          </button>

          <button
            class="bg-[#FFF264] rounded-lg py-2 px-6 text-[#E63939] font-bold text-xl hover:bg-yellow-100 transition-all duration-300 ease-in-out"
            @click="handleUpdate(-1)"
          >
            -1
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
:deep(.vch__external-legend-wrapper) {
  margin-left: -8px;
  .vch__legend__wrapper {

    rect:first-child {
      display: none;
    }
  }
}
</style>
