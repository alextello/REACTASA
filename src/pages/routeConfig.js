import React from 'react';
import {BiAlignLeft} from 'react-icons/bi';

const routesConfig = [
  {
    id: 'app',
    title: 'Sample',
    messageId: 'sidebar.sample',
    type: 'group',
    children: [
      {
        id: 'page-1',
        title: 'Prendario',
        messageId: 'sidebar.sample.page1.demo',
        type: 'item',
        icon: <BiAlignLeft />,
        path: '/sample/page-1',
      },
      {
        id: 'page-2',
        title: 'Caja',
        messageId: 'sidebar.sample.page2.demo',
        type: 'item',
        icon: <BiAlignLeft />,
        path: '/sample/page-2',
      },
      {
        id: 'page-3',
        title: 'Clientes',
        messageId: 'sidebar.sample.page3.demo',
        type: 'item',
        icon: <BiAlignLeft />,
        path: '/sample/page-3',
      },
    ],
  },
];
export default routesConfig;
