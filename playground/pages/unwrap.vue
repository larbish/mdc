<script setup>
const mdList = `
- Hello
- World
`

const mdc = `
::hero
Hello World

#description
This is a description
::

::callout
This is a callout
::

::list
- Hello
- World
::
`
</script>

<template>
  <div class="p-4 prose dark:prose-invert">
    <NuxtLink to="/">
      Back home
    </NuxtLink>
    <div>No unwrap:</div>
    <MDC value="Hello **world**" cache-key="hello-world" />
    <div>Unwrap `p`:</div>
    <MDC unwrap="p" value="Hello **world**" cache-key="hello-world" />
    <hr>
    <div>No unwrap:</div>
    <MDC :value="mdList" />
    <div>Unwrap `ul`:</div>
    <MDC unwrap="ul" :value="mdList" />
    <div>Unwrap `ul li`:</div>
    <MDC unwrap="ul li" :value="mdList" />
    <hr>
    <MDC :value="mdc" />

    <Hero>
      Coucou
      <template #description>
        This is a description
      </template>
    </Hero>
  </div>
</template>
