module.exports = [
    {
        desc: '获取组织数据',
        type: 'GET',
        url: '/org/tree',
        params: '从cookie里面获取',
        result: {
            code: '0',
            data: [
                { id: 1, name: 'APPD', parentId: 0 },
                {
                    id: 4,
                    name: 'SMO',
                    parentId: 0,
                    list: [
                        { id: 5, name: 'Project', parentId: 4 },
                        {
                            id: 7,
                            name: 'Platform',
                            parentId: 4,
                            list: [
                                { id: 8, parentId: 7, name: 'SQM' },
                                { id: 9, parentId: 7, name: 'AUTO' },
                                { id: 10, parentId: 7, name: 'CTR' }
                            ]
                        },
                        { id: 6, name: 'Product', parentId: 4 }
                    ]
                },
                { id: 2, parentId: 0, name: 'SYSD' },
                { id: 3, parentId: 0, name: 'UXD' }
            ]
        }
    },
    {
        desc: '添加组织',
        type: 'POST',
        url: '/org/create',
        params: {
            parentId: '上级组织ID',
            name: '组织名称'
        },
        result: {
            code: '0',
            data: {}
        }
    },
    {
        desc: '更新组织',
        type: 'POST',
        url: '/org/update',
        params: {
            id: '当前组织ID',
            parentId: '上级组织ID',
            name: '组织名称'
        },
        result: {
            code: '0',
            data: {}
        }
    },
    {
        desc: '删除组织',
        type: 'POST',
        url: '/org/delete',
        params: {
            id: '组织ID'
        },
        result: {
            code: '0',
            data: {}
        }
    }
];
