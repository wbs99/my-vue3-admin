<template>
  <t-card class="info-card" size="medium" :style="`--info-card-primary-color: ${info.color}`" :bordered="false">
    <template #header>
      <div class="text-16px font-bold">
        {{ info.title }}
      </div>
    </template>
    <div class="info">
      <div class="text-40px">
        {{ info.number.toLocaleString()
        }}<span class="text-16px ml-8px">{{ info.unit }}</span>
      </div>
      <Icon class="icon" :name="info.icon" />
    </div>
  </t-card>
</template>

<script lang="ts" setup>
import { Icon } from 'tdesign-vue-next'

interface Props {
  info: Info
}

type Info = {
  icon: string
  title: string
  color: string
  number: number
  unit: string
}

defineProps<Props>()
</script>

<style lang="scss" scoped>
.info-card {
  cursor: pointer;
  transition: 0.3s;

  .info {
    display: flex;
    justify-content: space-between;
    justify-items: baseline;

    .icon {
      font-size: 45px;
      color: var(--info-card-primary-color);
      transition: 0.3s;
    }

  }

  &:hover {
    background-color: var(--info-card-primary-color);
    color: #fff;

    .icon {
      color: #fff;
      transform: scale(1.3);
    }
  }
}
</style>
