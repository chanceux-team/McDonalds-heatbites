<script lang="ts" setup>
const { awesome } = useAppConfig();
definePageMeta({ layout: 'page' });
useHead({
  titleTemplate: '',
  title: awesome?.name || 'Nuxt 3 Awesome Starter',
});

const calendar = ref<any>([]);
const { data: initData } = await useFetch<any>('/api/calendar');
calendar.value = initData.value;

async function submit() {
  const { data } = await useFetch<any>('/api/calendar/update', {
    method: 'POST',
  });
  const index = calendar.value.find((item: any) => item.id === data.value.id);
  if (index) {
    index.count = data.value.count;
  } else {
    calendar.value.push(data.value);
  }
  // eslint-disable-next-line no-alert
  alert(data.value.count);
}
</script>

<template>
  <div class="w-full flex flex-col p-6 bg-black">
    <div>
      <div v-for="item in calendar" :key="item.id">
        {{ item.date }} - {{ item.count }}
      </div>
    </div>
    <button class="bg-white text-black" type="submit" @click="submit">
      +1
    </button>
  </div>
  <!-- <AwesomeWelcome :with-alert="true" /> -->
</template>
