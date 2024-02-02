<script lang="ts" setup>
import { CalendarHeatmap } from 'vue3-calendar-heatmap';
import 'vue3-calendar-heatmap/dist/style.css';

const rangeColor = ['#1F1F22', '#663300', '#cc9900', '#ffcc00', '#FFF264'];

function handleUpdate() {}
</script>

<template>
  <div class="p-6">
    <div class="flex flex-col justify-center items-center gap-6 bg-gray-950 relative">
      <IconLogo class="w-28" />
      <div class="max-w-screen-xl w-full">
        <CalendarHeatmap
          :values="[{ date: '2014-2-6', count: 2 }, { date: '2014-8-9', count: 5 }]"
          end-date="2014-12-31"
          :max="10"
          :range-color="rangeColor"
        />
      </div>

      <button
        class="absolute right-0 top-0 bg-[#FFF264] rounded-full w-8 h-8 text-[#E63939] font-bold text-lg"
        @click="handleUpdate"
      >
        +
      </button>
    </div>
  </div>
</template>
