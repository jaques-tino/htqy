import Mock from 'mockjs';

import './user';
import './message-box';

import '@/views/contract/template/mock';

Mock.setup({
  timeout: '600-1000',
});
