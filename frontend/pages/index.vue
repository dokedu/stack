<template>
  <div>
    <header>
      <nav class="bg-zinc-900 px-8 py-4">
        <div class="container mx-auto">
          <div class="flex justify-between items-center">
            <div>
              <NuxtLink to="/" class="text-white">Home</NuxtLink>
            </div>
            <div>
              <NuxtLink to="/sign_out" class="text-white">Sign out</NuxtLink>
            </div>
          </div>
        </div>
      </nav>
    </header>
    <div class="p-8">
      <h1 class="text-zinc-900 mb-4 text-5xl font-bold">Users</h1>
      <p class="max-w-2xl mb-2 text-zinc-500">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci, aliquid animi atque autem, beatae commodi
        consequatur cumque delectus doloremque doloribus ducimus ea eius eligendi eos error est ex exercitationem
        explicabo facere facilis fugiat fugit harum id illum ipsa iure iusto laborum laudantium magni maxime minima
        molestias natus nemo nesciunt nihil nobis.
      </p>
      <pre>{{ users }}</pre>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useQuery } from "@urql/vue";
import { computed } from "vue";

import { graphql } from "@/gql";

const { data } = useQuery({
  query: graphql(`
    query users {
      users {
        edges {
          id
          firstName
          lastName
        }
      }
    }
  `),
});

const users = computed(() => data.value?.users?.edges!);
</script>
