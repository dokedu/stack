import { cacheExchange as graphCacheExchange } from "@urql/exchange-graphcache";
import { makeDefaultStorage } from "@urql/exchange-graphcache/default-storage";
import { createClient, ssrExchange, fetchExchange, Client } from "@urql/core";
import type { GraphCacheConfig } from "@/gql/schema";
import { authExchange } from "@urql/exchange-auth";
import schema from "@/gql/introspection";
import { defineNuxtPlugin } from "#app";
import { ref } from "vue";

const ssrKey = "__URQL_DATA__";

export default defineNuxtPlugin((nuxt) => {
  const runtimeConfig = useRuntimeConfig();

  const { vueApp } = nuxt;

  const ssr = ssrExchange({
    isClient: process.client,
  });

  // when app is created in browser, restore SSR state from nuxt payload
  if (process.client) {
    nuxt.hook("app:created", () => {
      // @ts-expect-error
      ssr.restoreData(nuxt.payload[ssrKey]);
    });
  }

  // when app has rendered in server, send SSR state to client
  if (process.server) {
    nuxt.hook("app:rendered", () => {
      nuxt.payload[ssrKey] = ssr.extractData();
    });
  }

  // use urql graph cache
  const cacheConfig: GraphCacheConfig = {
    schema,
    keys: {},
    resolvers: {},
    updates: {},
    // @ts-ignore
    storage: process.client ? makeDefaultStorage() : undefined,
  };
  const cache = graphCacheExchange(cacheConfig);

  const client = createClient({
    url: `${runtimeConfig.public.apiUrl}/query`,
    requestPolicy: "cache-and-network",
    exchanges: [
      cache,
      ssr,
      authExchange(async (utils) => {
        return {
          addAuthToOperation(operation) {
            if (!token.value) return operation;

            if (!operation.context.fetchOptions) {
              operation.context.fetchOptions = {};
            }

            if (token) {
              // @ts-expect-error
              operation.context.fetchOptions.headers = {
                // @ts-expect-error
                ...operation.context.fetchOptions.headers,
                Authorization: token.value,
              };
            }

            return utils.appendHeaders(operation, {
              Authorization: token.value,
            });
          },
          willAuthError(_operation) {
            return false;
          },
          didAuthError(error, _operation) {
            return error.graphQLErrors.some((e) => e.extensions?.code === "UNAUTHENTICATED");
          },
          async refreshAuth() {
            token.value = null;

            await navigateTo("/sign_in");
          },
        };
      }),
      fetchExchange,
    ],
  });

  nuxt.provide("urql", client);
  vueApp.provide("$urql", ref(client));
});

declare module "#app" {
  interface NuxtApp {
    $urql: Client;
  }
}
