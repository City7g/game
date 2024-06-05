<script setup lang="ts">
import { computed, nextTick, onMounted, reactive, ref, watch } from 'vue'
import { test, test2 } from './example'
import { removeExtraCharacters } from './utils/removeExtraCharacters'
import { countMatchingCharacters } from './utils/countMatchingCharacters'

const input = ref('')
const count = ref<string[]>([])
const list = ref<string[]>([])
const filteredList = ref<string[]>([])

const ggg = () => {
  document.querySelectorAll('ol p').forEach((i) => {
    let countoff = 0
    i.querySelectorAll('span').forEach((span) => {
      countoff += +span.classList[0][span.classList[0].length - 1] - 1
    })

    i.querySelector('b')!.textContent = countoff.toString()
  })
}

watch(input, async () => {
  list.value = removeExtraCharacters(input.value)
  const s: string[] = []
  list.value.forEach(() => s.push(''))

  count.value = s

  await nextTick()

  ggg()
})

watch(
  [list, count],
  () => {
    filteredList.value = list.value.filter((c, idx) => {
      // Math.random() > 0.5 ? true : false

      let foo = true

      if (count.value[idx] !== '') {
        foo = false
      }

      for (let item = 0; item < list.value.length; item++) {
        if (count.value[item] !== '') {
          const bar = countMatchingCharacters(c, list.value[item])

          if (+count.value[item] !== bar) {
            foo = false
          }
        }
      }

      return foo
    })

    ggg()
  },
  { deep: true }
)

const some = (letter: string, index: number): number => {
  return list.value.reduce((acc, val) => {
    return val[index] === letter ? acc + 1 : acc
  }, 0)
}
</script>

<template>
  <h1>Hello</h1>
  <div class="input-group mb-3">
    <input
      v-model="input"
      type="text"
      class="form-control"
      placeholder="Recipient's username"
    />
    <button @click="input = test" class="btn btn-dark" type="button">
      Text
    </button>
    <button @click="input = test2" class="btn btn-dark" type="button">
      Text 2
    </button>
  </div>

  <ol v-if="list.length">
    <li
      v-for="(item, index) in list"
      :key="item"
      class="d-flex align-items-center gap-3"
    >
      <p :class="filteredList.find((c) => c === item) ? '' : 'line'">
        <b>1</b>

        <span
          v-for="(letter, index) in item.split('')"
          :key="index"
          :class="`color${some(letter, index)}`"
        >
          {{ letter }}
        </span>
      </p>

      <input
        v-model="count[index]"
        type="text"
        class="form-control form-control-sm"
        placeholder="x"
      />
    </li>
  </ol>
</template>
