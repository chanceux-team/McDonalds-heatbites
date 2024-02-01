<script lang="ts" setup>
const { awesome } = useAppConfig();
definePageMeta({ layout: 'page' });
useHead({
  titleTemplate: '',
  title: awesome?.name || 'Nuxt 3 Awesome Starter',
});

const name = ref('');
const email = ref('');
const { data: users } = await useFetch<any>('/api/users');

async function save() {
  if (name && email) {
    const { data: result } = await useFetch('/api/users/create', {
      method: 'POST',
      body: JSON.stringify({
        name: name.value,
        email: email.value,
      }),
    });
    users.value.push(result.value);
  }
}
</script>

<template>
  <div class="flex flex-col p-6 bg-black">
    <div>
      <div v-for="user in users" :key="user.id">
        {{ user.name }}
      </div>
    </div>
    <form @submit.prevent="save">
      <div class="flex flex-col gap-2 max-w-52">
        <label>Form</label>
        <input v-model="name" type="text" placeholder="name" />
        <input v-model="email" type="text" placeholder="email" />
        <button type="submit">
          Save
        </button>
      </div>
    </form>
  </div>
  <AwesomeWelcome :with-alert="true" />
</template>
