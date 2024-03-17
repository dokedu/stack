<template>
  <div class="p-8">
    <form @submit.prevent="onSubmit" class="flex flex-col max-w-sm mx-auto gap-4 mt-[10vh]">
      <h1 class="text-2xl font-semibold text-stone-950">Sign in</h1>
      <div class="flex flex-col">
        <label for="email" class="text-sm mb-1.5 text-stone-700">Email</label>
        <input
          type="email"
          id="email"
          v-model="email"
          required
          class="px-3 py-2 text-base shadow-sm rounded-md border border-stone-300 focus-visible:outline-blue-500"
          placeholder="Your email"
        />
      </div>
      <div class="flex flex-col">
        <label for="password" class="text-sm mb-1.5 text-stone-700">Password</label>
        <input
          type="password"
          id="password"
          v-model="password"
          required
          class="px-3 py-2 text-base shadow-sm border border-stone-300 rounded-md focus-visible:outline-blue-500"
          placeholder="Your password"
        />
      </div>
      <button
        type="submit"
        class="focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 transition-color inline-flex select-none items-center justify-center gap-2 rounded-lg border shadow-sm border-transparent bg-neutral-950 text-white hover:shadow-md hover:bg-neutral-900 active:bg-neutral-700 px-3 py-1.5"
      >
        Sign in
      </button>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const email = ref("");
const password = ref("");

import { useMutation } from "@urql/vue";
import { computed } from "vue";

import { graphql } from "@/gql";

const { executeMutation: signIn } = useMutation(
  graphql(`
    mutation signIn($input: SignInInput!) {
      signIn(input: $input) {
        token
        user {
          id
          email
        }
      }
    }
  `),
);

async function onSubmit() {
  console.log(email.value, password.value);

  const { data, error } = await signIn({
    input: {
      email: email.value,
      password: password.value,
    },
  });

  if (error) {
    console.log(error);
    return;
  }

  token.value = data?.signIn.token;

  await navigateTo("/");
}
</script>
