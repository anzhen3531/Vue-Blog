const Mock = require('mockjs');

// 文章假数据  标题假数据
export default [
    {
        url: '/category',
        type: 'get',
        response: () => {
            return {
                code: 20000,
                data: [
                    {
                        id: 1,
                        title: 'JAVA',
                        href: '/category/java'
                    },
                    {
                        id: 2,
                        title: 'SpringBoot',
                        href: '/category/SpringBoot',
                    },
                    {
                        id: 3,
                        title: 'MySql',
                        href: '/category/MySql'
                    },
                    {
                        id: 4,
                        title: '随笔',
                        href: '/category/live'
                    }
                ]
            }
        }
    }
]
