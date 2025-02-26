<template>
  <div class="base-table">
    <table :class="{ 'base-table--bordered': bordered, 'base-table--striped': striped }">
      <thead>
        <tr>
          <th
            v-for="column in columns"
            :key="column.prop"
            :class="{
              'base-table__sortable': column.sortable,
              'base-table__sorted': sortKey === column.prop
            }"
            @click="handleSort(column)"
          >
            {{ column.label }}
            <span v-if="column.sortable" class="base-table__sort-icon">
              {{ sortKey === column.prop ? (sortOrder === 'asc' ? '↑' : '↓') : '↕' }}
            </span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in sortedData" :key="index">
          <td v-for="column in columns" :key="column.prop">
            <slot :name="column.prop" :row="row">
              {{ row[column.prop] }}
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-if="!sortedData.length" class="base-table__empty">
      <slot name="empty">暂无数据</slot>
    </div>
  </div>
</template>

<script setup>
import { defineProps, computed, ref } from 'vue'

const props = defineProps({
  data: {
    type: Array,
    default: () => []
  },
  columns: {
    type: Array,
    default: () => [],
    validator: (columns) => columns.every(col => col.prop && col.label)
  },
  bordered: {
    type: Boolean,
    default: false
  },
  striped: {
    type: Boolean,
    default: false
  }
})

const sortKey = ref('')
const sortOrder = ref('asc')

const handleSort = (column) => {
  if (!column.sortable) return
  
  if (sortKey.value === column.prop) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortKey.value = column.prop
    sortOrder.value = 'asc'
  }
}

const sortedData = computed(() => {
  const data = [...props.data]
  if (!sortKey.value) return data

  return data.sort((a, b) => {
    const aValue = a[sortKey.value]
    const bValue = b[sortKey.value]

    if (sortOrder.value === 'asc') {
      return aValue > bValue ? 1 : -1
    } else {
      return aValue < bValue ? 1 : -1
    }
  })
})
</script>

<style lang="scss" scoped>
.base-table {
  width: 100%;
  border-collapse: collapse;
  
  table {
    width: 100%;
    border-collapse: collapse;
  }

  th, td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #ebeef5;
  }

  th {
    font-weight: 500;
    color: #606266;
    background-color: #f5f7fa;
    user-select: none;
  }

  td {
    color: #606266;
  }

  &--bordered {
    th, td {
      border: 1px solid #ebeef5;
    }
  }

  &--striped {
    tr:nth-child(even) {
      background-color: #fafafa;
    }
  }

  &__sortable {
    cursor: pointer;

    &:hover {
      background-color: #ebeef5;
    }
  }

  &__sorted {
    background-color: #ebeef5;
  }

  &__sort-icon {
    margin-left: 4px;
    color: #909399;
  }

  &__empty {
    padding: 32px;
    text-align: center;
    color: #909399;
    font-size: 14px;
  }

  tr:hover {
    td {
      background-color: #f5f7fa;
    }
  }
}
</style>