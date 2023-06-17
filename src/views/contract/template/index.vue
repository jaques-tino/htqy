<script lang="ts" setup>
import { ref, reactive } from 'vue'

const searchFormRef = ref()
const searchForm = reactive({
  name: '',
  category_id: '',
  state: ''
})

const categorys = ref([
  {
    label: 'A',
    value: 'a'
  },
  {
    label: 'B',
    value: 'b'
  }
])

const states = ref([
  {
    label: '全部',
    value: '*'
  },
  {
    label: '已启用',
    value: '1'
  },
  {
    label: '已停用',
    value: '0'
  }
])

const tableColumns = [
  {
    title: '模板名称',
    dataIndex: 'name'
  },
  {
    title: '创建人',
    dataIndex: 'author'
  },
  {
    title: '更新人',
    dataIndex: 'teamworker'
  },
  {
    title: '时间',
    dataIndex: 'created_time'
  },
  {
    title: '启用状态',
    dataIndex: 'state'
  },
  {
    title: '操作',
    dataIndex: 'operator'
  }
]

const templates = ref([])

const handleSearch = (data: any) => {
  if (!data.errors) {
    // 请求数据
  }
}
</script>

<template>
  <div id="contract-template">
    <div class="header">
      <a-form
        ref="searchFormRef"
        layout="inline"
        :model="searchForm"
        @submit="handleSearch"
      >
        <a-form-item field="name" :label="$t('template.header.search.name')">
          <a-input
            v-model="searchForm.name"
            style="width: 200px"
            :placeholder="$t('template.header.search.name.placeholder')"
          />
        </a-form-item>
        <a-form-item
          field="category_id"
          :label="$t('template.header.search.category')"
        >
          <a-select
            v-model="searchForm.category_id"
            style="width: 200px"
            :placeholder="$t('template.header.search.category.placeholder')"
          >
            <a-option
              v-for="category of categorys"
              :key="category.value"
              :label="category.label"
              :value="category.value"
            />
          </a-select>
        </a-form-item>
        <a-form-item field="state" :label="$t('template.header.search.state')">
          <a-select
            v-model="searchForm.state"
            style="width: 100px"
            :placeholder="$t('template.header.search.state.placeholder')"
          >
            <a-option
              v-for="state of states"
              :key="state.value"
              :label="state.label"
              :value="state.value"
            />
          </a-select>
        </a-form-item>
        <a-form-item>
          <a-space>
            <a-button type="primary" html-type="submit">
              {{ $t('template.header.search.button.submit') }}
            </a-button>
            <a-button
              type="outline"
              style="
                --primary-6: 102, 102, 102;
                border-color: var(--color-border-3);
              "
              @click="searchFormRef.resetFields()"
            >
              {{ $t('template.header.search.button.reset') }}
            </a-button>
          </a-space>
        </a-form-item>
      </a-form>
    </div>
    <div class="main">
      <div class="operators">
        <a-button type="primary" @click="$router.push({ name: 'NewTemplate' })">
          {{ $t('template.main.operators.btn') }}
        </a-button>
      </div>
      <a-table :columns="tableColumns" :data="templates" pagination />
    </div>
  </div>
</template>

<style lang="less" scoped>
#contract-template {
  height: 100%;
  display: flex;
  flex-direction: column;

  .header {
    height: 64px;
    display: flex;
    align-items: center;
    padding-left: 24px;
    background-color: var(--color-bg-2);
    :deep(.arco-form) {
      .arco-form-item {
        margin-bottom: 0;
        align-items: center;
        .arco-form-item-label-col {
          line-height: 40px;
        }
      }

      .arco-input-wrapper,
      .arco-select {
        width: 200px;
        height: 40px;
        border-color: var(--color-border-2);
        background-color: var(--color-bg-2);
      }
      .arco-input-wrapper.arco-input-focus,
      .arco-select-view-single.arco-select-view-focus {
        border-color: rgb(var(--primary-6));
        box-shadow: 0 0 0 0 var(--color-primary-light-2);
      }
    }
  }
  .main {
    flex: 1;
    margin-top: 2px;
    padding: 0 24px;
    display: flex;
    flex-direction: column;
    background-color: var(--color-bg-2);

    .operators {
      padding: 16px 0 14px;
    }

    .arco-table {
      margin-bottom: 16px;
    }
  }
}
</style>
