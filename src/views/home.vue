<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { CalendarHeatmap } from 'vue3-calendar-heatmap';
import 'vue3-calendar-heatmap/dist/style.css';
import dayjs from 'dayjs';
import IconLogo from '@/components/icon/logo.vue';
import { request } from '@/utils';
import type { Calendar } from '@/models/calendar';

const currentDate = ref(dayjs());
const initData = ref<Calendar[]>([]);
const calendar = computed(() => {
  return initData.value
    ?.filter((item: Calendar) => item.count > 0)
    .map((item: Calendar) => ({ date: item.date, count: item.count }))
    || [];
});

function handleDayClick({ date }: { date: string }) {
  currentDate.value = dayjs(date);
}
async function handleUpdate(count = 1) {
  const { data } = await request.post('/calendar', {
    count,
    date: currentDate.value,
  });
  const index = initData.value?.find((item: Calendar) => item.id === data.id);
  index ? index.count = data.count : initData.value?.push(data);
  // eslint-disable-next-line no-alert
  alert(`Updated: ${data.date} - ${data.count}`);
}

onMounted(async () => {
  const { data } = await request.get('/calendar');
  initData.value = data;
});
</script>

<template>
  <div class="p-6">
    <div class="flex flex-col justify-center items-center gap-6 max-w-screen-xl m-auto">
      <IconLogo class="w-28" />
      <div class="w-full heatmap">
        <CalendarHeatmap
          :values="calendar"
          :end-date="dayjs().format('YYYY-MM-DD')"
          :range-color="['#1F1F22', '#1F1F22', '#E76F51', '#E9C46A', '#FFD166', '#0275D8']"
          :max="10"
          tooltip-unit="counts"
          @day-click="handleDayClick"
        />
      </div>

      <div class="flex flex-col w-full gap-4">
        <div class="py-2 border-b-2 border-gray-500 text-gray-500">
          {{ currentDate.format('YYYY-MM-DD') }}
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
