<script lang="ts" setup>
import { CalendarHeatmap } from 'vue3-calendar-heatmap';
import 'vue3-calendar-heatmap/dist/style.css';
import dayjs from 'dayjs';

const rangeColor = ['#1F1F22', '#663300', '#cc9900', '#ffcc00', '#FFF264'];

const calendar = ref<any>([]);
const { data: initData } = await useFetch<any>('/api/calendar');
calendar.value = initData.value;
async function handleUpdate() {
  const { data } = await useFetch<any>('/api/calendar/update', {
    method: 'POST',
  });
  const index = calendar.value.find((item: any) => item.id === data.value.id);
  index ? index.count = data.value.count : calendar.value.push(data.value);
  // eslint-disable-next-line no-alert
  alert('成功+1');
}
</script>

<template>
  <div class="p-6">
    <div class="flex flex-col justify-center items-center gap-6 bg-gray-950 relative">
      <IconLogo class="w-28" />
      <div class="max-w-screen-xl w-full">
        <CalendarHeatmap
          :values="calendar.map((item: any) => ({ date: item.date, count: item.count }))"
          :end-date="dayjs().format('YYYY-MM-DD')"
          :max="10"
          :range-color="rangeColor"
        />
      </div>

      <button
        class="absolute right-0 top-0 bg-[#FFF264] rounded-full w-8 h-8 text-[#E63939] font-bold text-lg"
        @click="handleUpdate"
      >
        +1
      </button>
    </div>
  </div>
</template>
