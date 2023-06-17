<script lang="ts" setup>
// import { getLoggers } from '@/api/loggers'
// import { Logger } from '@/api/loggers/type'
// import { useRequest } from '@/hooks/useRequest'
// import { onMounted } from 'vue'

import { Message, PaginationProps, TableColumnData } from '@arco-design/web-vue'
import { unref, ref, reactive } from 'vue'

// onMounted(async () => {
//   const loggers = await useRequest<Logger[]>(() => getLoggers(1))
//   console.log(loggers)
// })
const LoggerFormRef = ref()
const loggerForm = reactive({
  id: ''
})
const tableColumns = ref<TableColumnData[]>([
  {
    title: '错误信息',
    slotName: 'errorMessage'
  },
  {
    title: '请求地址',
    slotName: 'requestURL'
  },
  {
    title: '请求参数',
    dataIndex: 'requestParams'
  },
  {
    title: '请求体',
    dataIndex: 'requestBody'
  },
  {
    title: '请求时间',
    dataIndex: 'createdAt'
  },
  {
    title: '操作',
    slotName: 'operator'
  }
])
const tableData = ref([
  {
    id: '19jehdi1ei1',
    requestURL: '/v1/api/loggers',
    requestMethod: 'GET',
    requestParams: 'page=1&size=16',
    requestBody: '{}',
    requestIp: '192.168.0.1',
    errorMessage: '"size" is not a number',
    errorStatus: '500',
    appVersion: 'v1',
    browserInfo: 'Google Chrome',
    serviceInfo: 'Macbook Air',
    createdAt: '2023-06-12 09:08:17',
    updateAt: '2023-06-12 09:08:17'
  }
])

const tablePager = reactive<PaginationProps>({
  pageSize: 20
})

const handleSearch = () => {}
const removeLogger = (index: number) => {}
const getTagColor = (method: string) => {
  switch (method.toLowerCase()) {
    case 'get':
      return 'green'
    case 'post':
      return 'blue'
    case 'put':
      return 'cyan'
    case 'delete':
      return 'red'
    case 'patch':
      return 'magenta'
    default:
      return 'gray'
  }
}
const copyUid = (index: number) => {
  const uid = unref(tableData)[index].id
  const input = document.createElement('input')
  input.setAttribute('value', uid)
  document.body.appendChild(input)
  input.select()
  document.execCommand('copy')
  document.body.removeChild(input)
  Message.success({
    content: '复制成功'
  })
}

const search = () => {}
</script>

<template>
  <div id="developer-error">
    <div class="header">
      <a-form
        ref="LoggerFormRef"
        layout="inline"
        :model="loggerForm"
        @submit="handleSearch"
      >
        <a-form-item label="日志索引">
          <a-input v-model="loggerForm.id" placeholder="输入ID搜索" />
        </a-form-item>
        <a-form-item>
          <a-button type="primary" @click="search">查询</a-button>
        </a-form-item>
      </a-form>
    </div>
    <div class="main">
      <a-table
        :data="tableData"
        :columns="tableColumns"
        :pagination="tablePager"
      >
        <template #errorMessage="{ rowIndex }">
          <a-tooltip
            content="点击复制日志索引"
            position="rb"
            background-color="#3491fa"
          >
            <a-link
              href="javascript:;"
              :hoverable="false"
              @click="copyUid(rowIndex)"
            >
              {{ tableData[rowIndex].errorMessage }}
            </a-link>
          </a-tooltip>
        </template>
        <template #operator="{ rowIndex }">
          <a-button
            type="primary"
            status="danger"
            @click="removeLogger(rowIndex)"
            >删除</a-button
          >
        </template>
        <template #requestURL="{ rowIndex }">
          <a-tag :color="getTagColor(tableData[rowIndex].requestMethod)">{{
            tableData[rowIndex].requestMethod
          }}</a-tag>
          <span style="margin-left: 20px">{{
            tableData[rowIndex].requestURL
          }}</span>
        </template>
      </a-table>
    </div>
  </div>
</template>

<style lang="less" scoped>
#developer-error {
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

    .arco-table {
      margin: 16px 0;
    }
  }
}
</style>
