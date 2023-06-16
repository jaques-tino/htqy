<script lang="ts" setup>
import { TableColumnData } from '@arco-design/web-vue'
import { reactive, ref } from 'vue'

// const positions: string[] = ['001']

const templateBaseForm = reactive({
  file: '',
  name: '',
  isSecrey: false
})

const signatory = ref('1')

const tableColumns: TableColumnData[] = [
  {
    title: '参与主体',
    dataIndex: 'body',
    slotName: 'body'
  },
  {
    title: '参与方式',
    dataIndex: 'method',
    slotName: 'method'
  },
  {
    title: '参与要求',
    dataIndex: 'claim_id'
  },
  {
    title: '参与方信息',
    dataIndex: 'information'
  },
  {
    title: '操作',
    dataIndex: 'operator'
  }
]

const identitys = [
  {
    label: '企业',
    value: '0'
  },
  {
    label: '个人',
    value: '1'
  }
]

const methods = [
  {
    label: '填写',
    value: 0
  },
  {
    label: '签署',
    value: 1
  }
]

const tableData = ref([
  {
    id: '001',
    body: {
      name: '签署方1',
      identity_id: '0',
      isEdit: false
    },
    method: [0, 1],
    claim_id: 0,
    information: {
      name: '',
      telormail: '',
      company: ''
    }
  }
])

const index = ref(1)

const handleSignatory = (e: string) => {
  index.value += 1
  const createTableData = () => ({
    id: '002',
    body: {
      name: `签署方${index.value}`,
      identity_id: '1',
      isEdit: false
    },
    method: [0, 1],
    claim_id: 0,
    information: {
      name: '',
      telormail: '',
      company: ''
    }
  })
  switch (e) {
    case '1':
      tableData.value = tableData.value.slice(0, 1)
      break
    case '2':
      if (tableData.value.length > 2) {
        tableData.value = tableData.value.slice(0, 2)
        return
      }
      tableData.value.push(createTableData())
      break
    case '3':
      if (tableData.value.length === 1) {
        tableData.value.push(createTableData())
      }
      tableData.value.push(createTableData())
      break
    default:
      break
  }
}
</script>

<template>
  <div id="new-template">
    <div class="header">
      <div class="left">
        <div class="close">
          <icon-close size="20" />
        </div>
        <h2 class="title">{{ $t('template.new.header.title') }}</h2>
      </div>
      <a-steps :current="1" style="width: 600px">
        <a-step>{{ $t('template.new.header.steps1') }}</a-step>
        <a-step>{{ $t('template.new.header.steps2') }}</a-step>
        <a-step>{{ $t('template.new.header.steps3') }}</a-step>
      </a-steps>
      <a-button type="primary">{{ $t('template.new.header.next') }}</a-button>
    </div>
    <div class="main">
      <a-card :bordered="false">
        <h3 class="title">模板基本信息</h3>
        <div class="file">
          <a-space>
            <a-button type="primary">
              <template #icon>
                <icon-upload />
              </template>
              添加签署文件
            </a-button>
            <icon-question-circle-fill />
            <span>最多上传50份文件，单份文件小于30M</span>
          </a-space>
        </div>
        <a-form :model="templateBaseForm" :label-col-props="{ span: 1.5 }">
          <a-form-item label="模板名称">
            <a-input :max-length="50" show-word-limit />
          </a-form-item>
          <a-form-item label="是否保密">
            <a-switch type="round">
              <template #checked>是</template>
              <template #unchecked>否</template>
            </a-switch>
          </a-form-item>
        </a-form>
      </a-card>
      <a-card :bordered="false">
        <h3 class="title">设置签署方</h3>
        <a-radio-group v-model="signatory" @change="handleSignatory">
          <a-radio value="1">
            <template #radio="{ checked }">
              <a-space
                align="start"
                class="custom-radio-card"
                :class="{ 'custom-radio-card-checked': checked }"
              >
                <div className="custom-radio-card-mask">
                  <div className="custom-radio-card-mask-dot" />
                </div>
                <div>
                  <div className="custom-radio-card-title">单方签署</div>
                </div>
              </a-space>
            </template>
          </a-radio>
          <a-radio value="2">
            <template #radio="{ checked }">
              <a-space
                align="start"
                class="custom-radio-card"
                :class="{ 'custom-radio-card-checked': checked }"
              >
                <div className="custom-radio-card-mask">
                  <div className="custom-radio-card-mask-dot" />
                </div>
                <div>
                  <div className="custom-radio-card-title">双方签署</div>
                </div>
              </a-space>
            </template>
          </a-radio>
          <a-radio value="3">
            <template #radio="{ checked }">
              <a-space
                align="start"
                class="custom-radio-card"
                :class="{ 'custom-radio-card-checked': checked }"
              >
                <div className="custom-radio-card-mask">
                  <div className="custom-radio-card-mask-dot" />
                </div>
                <div>
                  <div className="custom-radio-card-title">多方签署</div>
                </div>
              </a-space>
            </template>
          </a-radio>
        </a-radio-group>
        <a-form
          :model="templateBaseForm"
          :label-col-props="{ span: 0 }"
          :wrapper-col-props="{ span: 24 }"
        >
          <a-form-item>
            <a-table
              :columns="tableColumns"
              :data="tableData"
              style="width: 100%"
            >
              <template #body="{ rowIndex }">
                <a-space>
                  <a-select v-model="tableData[rowIndex].body.identity_id">
                    <a-option
                      v-for="identity in identitys"
                      :key="identity.value"
                      :label="identity.label"
                      :value="identity.value"
                    />
                  </a-select>
                  <span v-show="!tableData[rowIndex].body.isEdit">
                    {{ tableData[rowIndex].body.name }}
                  </span>
                  <a-input
                    v-if="tableData[rowIndex].body.isEdit"
                    v-model="tableData[rowIndex].body.name"
                    v-focus.native
                    style="width: 120px"
                    @blur="tableData[rowIndex].body.isEdit = false"
                  />
                  <icon-edit
                    v-else
                    style="cursor: pointer"
                    @click="tableData[rowIndex].body.isEdit = true"
                  />
                </a-space>
              </template>

              <template #method="{ rowIndex }">
                <a-checkbox-group
                  v-model="tableData[rowIndex].method"
                  :options="methods"
                />
              </template>
            </a-table>
          </a-form-item>
        </a-form>
      </a-card>
    </div>
  </div>
</template>

<style lang="less" scoped>
#new-template {
  width: 100%;
  min-height: 100vh;
  background-color: var(--color-fill-2);

  .header {
    height: 56px;
    display: flex;
    padding-right: 24px;
    align-items: center;
    justify-content: space-between;
    background-color: var(--color-bg-2);

    .close {
      width: 56px;
      height: 56px;
      display: flex;
      color: rgb(var(--gray-10));
      align-items: center;
      justify-content: center;
      background-color: var(--color-neutral-2);
    }

    .left {
      display: flex;
      align-items: center;

      .title {
        margin: 0 0 0 24px;
        color: var(--color-text-1);
      }
    }
  }
  .main {
    width: 1200px;
    margin: 20px auto 0;

    .arco-card {
      margin-bottom: 20px;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
      .title {
        display: flex;
        align-items: center;
        color: var(--color-text-1);

        &::before {
          content: '';
          width: 4px;
          height: 20px;
          border-radius: 2px;
          margin-right: 8px;
          background-color: rgb(var(--primary-6));
        }
      }
      .file {
        height: 80px;
        width: 562px;
        display: flex;
        align-items: center;
        padding-left: 24px;
        margin-bottom: 20px;
        box-sizing: border-box;
        background: var(--color-primary-light-1);
        border: thin dashed rgb(var(--primary-6));
      }
      .arco-form {
        margin-top: 20px;
        :deep(.arco-input-wrapper) {
          width: 490px;
          border-color: var(--color-border-2);
          background-color: var(--color-bg-2);
          &.arco-input-focus {
            border-color: rgb(var(--primary-6));
            box-shadow: 0 0 0 0 var(--color-primary-light-2);
          }
        }
      }
    }
  }
}

.custom-radio-card {
  padding: 10px 16px;
  border: 1px solid var(--color-border-2);
  border-radius: 4px;
  box-sizing: border-box;
  align-items: center;
}

.custom-radio-card-mask {
  height: 14px;
  width: 14px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
  border: 1px solid var(--color-border-2);
  box-sizing: border-box;
}

.custom-radio-card-mask-dot {
  width: 8px;
  height: 8px;
  border-radius: 100%;
}

.custom-radio-card-title {
  color: var(--color-text-1);
  font-size: 14px;
  font-weight: bold;
}

.custom-radio-card:hover,
.custom-radio-card-checked,
.custom-radio-card:hover .custom-radio-card-mask,
.custom-radio-card-checked .custom-radio-card-mask {
  border-color: rgb(var(--primary-6));
}

.custom-radio-card-checked {
  background-color: var(--color-primary-light-1);
}

.custom-radio-card:hover .custom-radio-card-title,
.custom-radio-card-checked .custom-radio-card-title {
  color: rgb(var(--primary-6));
}

.custom-radio-card-checked .custom-radio-card-mask-dot {
  background-color: rgb(var(--primary-6));
}
</style>
