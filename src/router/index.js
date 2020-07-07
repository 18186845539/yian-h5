import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [{
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: {
        title: '首页',
        icon: 'dashboard',
      }
    }]
  },


  {
    path: '/userClassify',
    component: Layout,
    redirect: '/example/table',
    name: 'UserClassify',
    meta: {
      title: '用户分类',
      icon: 'user',
    },
    children: [{
        path: 'hospAandFamily',
        name: 'HospAandFamily',
        component: () => import('@/views/userClassify/hospAandFamily/index'),
        meta: {
          title: '医院/家庭用户',
          icon: 'example',
          roles:{ requiresAuth: 'yakf:user/user1'},
        },
        hidden: true
      }, {
        path: 'addHF',
        name: 'AddHF',
        component: () => import('@/views/userClassify/hospAandFamily/edit'),
        meta: {
          title: '添加医院/家庭用户',
        },
        hidden: true
      },
      {
        path: 'editHF',
        name: 'EditHF',
        component: () => import('@/views/userClassify/hospAandFamily/edit'),
        meta: {
          title: '修改医院/家庭用户',
        },
        hidden: true
      },
      {
        path: 'detailsPageHF',
        name: 'DetailsPageHF',
        component: () => import('@/views/userClassify/hospAandFamily/detailsPage'),
        meta: {
          title: '查看医院/家庭用户详情',
        },
        hidden: true
      },

      {
        path: 'channelUser',
        name: 'ChannelUser',
        component: () => import('@/views/userClassify/channelUser/index'),
        meta: {
          title: '渠道用户',
          icon: 'example',
          roles:{ requiresAuth: 'yakf:user/user2'},
        },
        hidden:true

      }, {
        path: 'addChannelUser',
        name: 'AddChannelUser',
        component: () => import('@/views/userClassify/channelUser/edit'),
        meta: {
          title: '添加渠道用户',
        },
        hidden: true
      }, {
        path: 'editChannelUser',
        name: 'EditChannelUser',
        component: () => import('@/views/userClassify/channelUser/edit'),
        meta: {
          title: '修改渠道用户',
        },
        hidden: true
      },
      {
        path: 'detailsPageCU',
        name: 'DetailsPageCU',
        component: () => import('@/views/userClassify/channelUser/detailsPage'),
        meta: {
          title: '查看渠道用户详情',
        },
        hidden: true
      },

      {
        path: 'staffList',
        name: 'StaffList',
        component: () => import('@/views/userClassify/staffList/index'),
        meta: {
          title: '员工用户',
          icon: 'example',
          roles:{ requiresAuth: 'yakf:user/user3'},
        },
        hidden: true
      }, {
        path: 'addStaffList',
        name: 'AddStaffList',
        component: () => import('@/views/userClassify/staffList/edit'),
        meta: {
          title: '添加员工用户',
        },
        hidden: true
      }, {
        path: 'editStaffList',
        name: 'EditStaffList',
        component: () => import('@/views/userClassify/staffList/edit'),
        meta: {
          title: '修改员工用户',
        },
        hidden: true
      },
      {
        path: 'detailsPageSL',
        name: 'DetailsPageSL',
        component: () => import('@/views/userClassify/staffList/detailsPage'),
        meta: {
          title: '查看员工用户详情',
        },
        hidden: true
      },

      // {
      //   path: 'table',
      //   name: 'Table',
      //   component: () => import('@/views/table/index'),
      //   meta: {
      //     title: '表格页',
      //     icon: 'table'
      //   }
      // },
      // {
      //   path: 'tree',
      //   name: 'Tree',
      //   component: () => import('@/views/tree/index'),
      //   meta: {
      //     title: '树形',
      //     icon: 'tree'
      //   }
      // }
    ]
  },

  {
    path: '/clientServe',
    component: Layout,
    redirect: '/example/table',
    name: 'ClientServe',
    meta: {
      title: '客户服务',
      // icon: 'example'
      icon: 'form'
    },
    children: [{
        path: 'clientRepairs',
        name: 'ClientRepairs',
        component: () => import('@/views/clientServe/clientRepairs/index'),
        meta: {
          title: '客户工单',
          icon: 'example',
          // icon: 'table'
          roles:{ requiresAuth: 'yakf:service/khbxd'},
        },
        hidden: true
      }, {
        path: 'Processdetails',
        name: 'Processdetails',
        component: () => import('@/views/clientServe/clientRepairs/Processdetails'),
        meta: {
          title: '工单流程详情',
          icon: 'example'
          // icon: 'table'
        },
        hidden: true
      },
      {
        path: 'addClientRepairs',
        name: 'AddClientRepairs',
        component: () => import('@/views/clientServe/clientRepairs/addClientRepairs'),
        meta: {
          title: '添加客户工单',
        },
        hidden: true
      },
      {
        path: 'sendOrders',
        name: 'SendOrders',
        component: () => import('@/views/clientServe/clientRepairs/sendOrders'),
        meta: {
          title: '派单',
        },
        hidden: true
      }, {
        path: 'auditPage',
        name: 'AuditPage',
        component: () => import('@/views/clientServe/clientRepairs/auditPage'),
        meta: {
          title: '审核客户工单',
        },
        hidden: true
      },

      {
        path: 'staffRepairs',
        name: 'StaffRepairs',
        component: () => import('@/views/clientServe/staffRepairs/index'),
        meta: {
          title: '员工工单',
          icon: 'example',
          // icon: 'table'
          roles:{ requiresAuth: 'yakf:service/ygbxd'},
        },
        hidden: true
      },
      {
        path: 'addStaffRepairs',
        name: 'AddStaffRepairs',
        component: () => import('@/views/clientServe/staffRepairs/addStaffRepairs'),
        meta: {
          title: '添加员工工单',
        },
        hidden: true
      },
      {
        path: 'auditStaffPage',
        name: 'AuditStaffPage',
        component: () => import('@/views/clientServe/staffRepairs/auditStaffPage'),
        meta: {
          title: '审核员工工单',
        },
        hidden: true
      },

      {
        path: 'sendOrdersList',
        name: 'SendOrdersList',
        component: () => import('@/views/clientServe/sendOrdersList/index'),
        meta: {
          title: '派单列表',
          icon: 'example',
          roles:{ requiresAuth: 'yakf:service/pdlb'},
          // icon: 'table'
        },
        hidden: true
      },
      {
        path: 'examineAppraise',
        name: 'ExamineAppraise',
        component: () => import('@/views/clientServe/sendOrdersList/examineAppraise'),
        meta: {
          title: '服务评价',
        },
        hidden: true
      },
      {
        path: 'workOrderDetails',
        name: 'WorkOrderDetails',
        component: () => import('@/views/clientServe/sendOrdersList/workOrderDetails'),
        meta: {
          title: '工单详情',
        },
        hidden: true
      },

      {
        path: 'productRecord',
        name: 'ProductRecord',
        component: () => import('@/views/clientServe/productRecord/index'),
        meta: {
          title: '产品档案',
          icon: 'example',
          roles:{ requiresAuth: 'yakf:service/cpda'},
          // icon: 'table'
        },
        hidden: true
      },
      {
        path: 'addProductRecord',
        name: 'AddProductRecord',
        component: () => import('@/views/clientServe/productRecord/edit'),
        meta: {
          title: '添加产品档案',
        },
        hidden: true
      },
      {
        path: 'editProductRecord',
        name: 'EditProductRecord',
        component: () => import('@/views/clientServe/productRecord/edit'),
        meta: {
          title: '修改产品档案',
        },
        hidden: true
      },
      {
        path: 'detailsPagePR',
        name: 'DetailsPagePR',
        component: () => import('@/views/clientServe/productRecord/detailsPage'),
        meta: {
          title: '查看产品档案详情',
        },
        hidden: true
      },

      // {
      //   path: 'productHistory',
      //   name: 'ProductHistory',
      //   component: () => import('@/views/clientServe/productHistory/index'),
      //   meta: {
      //     title: '产品历史',
      //     icon: 'example'
      //     // icon: 'table'
      //   }
      // },
      {
        path: 'productHistoryPR',
        name: 'ProductHistoryPR',
        component: () => import('@/views/clientServe/productHistory/detailsPage'),
        meta: {
          title: '查看维修记录详情',
        },
        hidden: true
      },

      {
        path: 'productMessage',
        name: 'ProductMessage',
        component: () => import('@/views/clientServe/productMessage/index'),
        meta: {
          title: '产品信息',
          icon: 'example',
          // icon: 'table'
          roles:{ requiresAuth: 'yakf:service/cpxx'},
        },
        hidden: true
      },
      {
        path: 'productLine',
        name: 'ProductLine',
        component: () => import('@/views/clientServe/productMessage/productLine'),
        meta: {
          title: '产品线',
        },
        hidden: true
      },
      {
        path: 'addProductLine',
        name: 'AddProductLine',
        component: () => import('@/views/clientServe/productMessage/editProductLine'),
        meta: {
          title: '添加产品线',
        },
        hidden: true
      },
      {
        path: 'editProductLine',
        name: 'EditProductLine',
        component: () => import('@/views/clientServe/productMessage/editProductLine'),
        meta: {
          title: '修改产品线',
        },
        hidden: true
      },
      {
        path: 'addProduct',
        name: 'AddProduct',
        component: () => import('@/views/clientServe/productMessage/editProduct'),
        meta: {
          title: '添加产品',
        },
        hidden: true
      },
      {
        path: 'editProduct',
        name: 'EditProduct',
        component: () => import('@/views/clientServe/productMessage/editProduct'),
        meta: {
          title: '修改产品',
        },
        hidden: true
      },
      {
        path: 'addModel',
        name: 'AddModel',
        component: () => import('@/views/clientServe/productMessage/editModel'),
        meta: {
          title: '添加型号',
        },
        hidden: true
      },
      {
        path: 'editModel',
        name: 'EditModel',
        component: () => import('@/views/clientServe/productMessage/editModel'),
        meta: {
          title: '修改型号',
        },
        hidden: true
      },
      {
        path: 'detailsPagePM',
        name: 'DetailsPagePM',
        component: () => import('@/views/clientServe/productMessage/detailsPage'),
        meta: {
          title: '查看产品信息详情',
        },
        hidden: true
      },

      {
        path: 'clientManage',
        name: 'ClientManage',
        component: () => import('@/views/clientServe/clientManage/index'),
        meta: {
          title: '客户管理',
          icon: 'example',
          roles:{ requiresAuth: 'yakf:service/khgl'},
          // icon: 'table'
        },
        hidden: true
      },
      {
        path: 'addClient',
        name: 'AddClient',
        component: () => import('@/views/clientServe/clientManage/edit'),
        meta: {
          title: '添加客户信息',
        },
        hidden: true
      },
      {
        path: 'editClient',
        name: 'EditClient',
        component: () => import('@/views/clientServe/clientManage/edit'),
        meta: {
          title: '修改客户信息',
        },
        hidden: true
      },
      {
        path: 'detailsPageEC',
        name: 'DetailsPageEC',
        component: () => import('@/views/clientServe/clientManage/detailsPage'),
        meta: {
          title: '查看客户信息详情',
        },
        hidden: true
      },

      {
        path: 'partsConsult',
        name: 'PartsConsult',
        component: () => import('@/views/clientServe/partsConsult/index'),
        meta: {
          title: '配件咨询',
          icon: 'example',
          roles:{ requiresAuth: 'yakf:service/pjzx'},
          // icon: 'table'
        },
        // hidden: true
      },
      {
        path: 'reply',
        name: 'Reply',
        component: () => import('@/views/clientServe/partsConsult/reply'),
        meta: {
          title: '咨询回复',
        },
        hidden: true
      },

      {
        path: 'partsManage',
        name: 'PartsManage',
        component: () => import('@/views/clientServe/partsManage/index'),
        meta: {
          title: '配件管理',
          icon: 'example',
          roles:{ requiresAuth: 'yakf:service/pjgl'},
          // icon: 'table'
        },
        hidden: true
      },
      {
        path: 'addParts',
        name: 'AddParts',
        component: () => import('@/views/clientServe/partsManage/editParts'),
        meta: {
          title: '添加配件',
        },
        hidden: true
      },
      {
        path: 'editParts',
        name: 'EditParts',
        component: () => import('@/views/clientServe/partsManage/editParts'),
        meta: {
          title: '修改配件',
        },
        hidden: true
      },
      {
        path: 'partsType',
        name: 'PartsType',
        component: () => import('@/views/clientServe/partsManage/partsType'),
        meta: {
          title: '配件分类',
        },
        hidden: true
      },
      {
        path: 'addType',
        name: 'AddType',
        component: () => import('@/views/clientServe/partsManage/editType'),
        meta: {
          title: '添加类型',
        },
        hidden: true
      },
      {
        path: 'editType',
        name: 'EditType',
        component: () => import('@/views/clientServe/partsManage/editType'),
        meta: {
          title: '修改类型',
        },
        hidden: true
      },
      {
        path: 'addChildType',
        name: 'AddChildType',
        component: () => import('@/views/clientServe/partsManage/editChildType'),
        meta: {
          title: '添加产品',
        },
        hidden: true
      },
      {
        path: 'editChildType',
        name: 'EditChildType',
        component: () => import('@/views/clientServe/partsManage/editChildType'),
        meta: {
          title: '修改产品',
        },
        hidden: true
      },
      {
        path: 'addPartsModel',
        name: 'AddPartsModel',
        component: () => import('@/views/clientServe/partsManage/editPartsModel'),
        meta: {
          title: '添加配件型号',
        },
        hidden: true
      },
      {
        path: 'editPartsModel',
        name: 'EditPartsModel',
        component: () => import('@/views/clientServe/partsManage/editPartsModel'),
        meta: {
          title: '修改配件型号',
        },
        hidden: true
      },
      {
        path: 'detailsPagePML',
        name: 'DetailsPagePML',
        component: () => import('@/views/clientServe/partsManage/detailsPage'),
        meta: {
          title: '查看配件详情',
        },
        hidden: true
      },


      {
        path: 'serviceGuide',
        name: 'ServiceGuide',
        component: () => import('@/views/clientServe/serviceGuide/index'),
        meta: {
          title: '维修指引',
          icon: 'example',
          roles:{ requiresAuth: 'yakf:service/wxjnzy'},
          // icon: 'table'
        },
        hidden: true
      },
      {
        path: 'addSkill',
        name: 'AddSkill',
        component: () => import('@/views/clientServe/serviceGuide/editSkill'),
        meta: {
          title: '添加指导',
        },
        hidden: true
      },
      {
        path: 'editSkill',
        name: 'EditSkill',
        component: () => import('@/views/clientServe/serviceGuide/editSkill'),
        meta: {
          title: '修改指导',
        },
        hidden: true
      },
      {
        path: 'detailsPageSG',
        name: 'DetailsPageSG',
        component: () => import('@/views/clientServe/serviceGuide/detailsPage'),
        meta: {
          title: '查看维修指引详情',
        },
        hidden: true
      },

      // {
      //   path: 'serviceKnowledge',
      //   name: 'ServiceKnowledge',
      //   component: () => import('@/views/clientServe/serviceKnowledge/index'),
      //   meta: {
      //     title: '维修知识宝库',
      //     icon: 'example'
      //     // icon: 'table'
      //   }
      // },
      // {
      //   path: 'addKnowledge',
      //   name: 'AddKnowledge',
      //   component: () => import('@/views/clientServe/serviceKnowledge/addKnowledge'),
      //   meta: {
      //     title: '添加维修知识',
      //   },
      //   hidden: true
      // },
      // {
      //   path: 'editKnowledge',
      //   name: 'EditKnowledge',
      //   component: () => import('@/views/clientServe/serviceKnowledge/editKnowledge'),
      //   meta: {
      //     title: '修改维修知识',
      //   },
      //   hidden: true
      // },

      {
        path: 'serviceGuidance',
        name: 'ServiceGuidance',
        component: () => import('@/views/clientServe/serviceGuidance/index'),
        meta: {
          title: '维修指导',
          icon: 'example',
          roles:{ requiresAuth: 'yakf:service/wxkfzy'},
          // icon: 'table'
        },
        hidden: true
      },
      {
        path: 'guidanceReply',
        name: 'GuidanceReply',
        component: () => import('@/views/clientServe/serviceGuidance/guidanceReply'),
        meta: {
          title: '指导回复',
        },
        hidden: true
      },

      {
        path: 'serviceImage',
        name: 'ServiceImage',
        component: () => import('@/views/clientServe/serviceImage/index'),
        meta: {
          title: '售后服务图片',
          icon: 'example',
          roles:{ requiresAuth: 'yakf:service/wxfwtp'},
          // icon: 'table'
        },
        hidden:true
      },
      {
        path: 'addserviceImage',
        name: 'AddserviceImage',
        component: () => import('@/views/clientServe/serviceImage/edit'),
        meta: {
          title: '添加售后服务图片',
        },
        hidden: true
      },
      {
        path: 'editserviceImage',
        name: 'EditserviceImage',
        component: () => import('@/views/clientServe/serviceImage/edit'),
        meta: {
          title: '修改售后服务图片',
        },
        hidden: true
      },


    ]
  },

  {
    path: '/logManage',
    component: Layout,
    redirect: '/example/table',
    name: 'LogManage',
    meta: {
      title: '日志管理',
      icon: 'nested'
    },
    children: [{
        path: 'ideaFeedback',
        name: 'IdeaFeedback',
        component: () => import('@/views/logManage/ideaFeedback/index'),
        meta: {
          title: '意见反馈',
          icon: 'example',
          roles:{ requiresAuth: 'yakf:log/yjfk'},
          // icon: 'table'
        },
        hidden: true
      },
      {
        path: 'ideaFeedbackDetails',
        name: 'IdeaFeedbackDetails',
        component: () => import('@/views/logManage/ideaFeedback/detailsPage'),
        meta: {
          title: '意见反馈详情',
        },
        hidden: true
      },

      {
        path: 'operationLog',
        name: 'OperationLog',
        component: () => import('@/views/logManage/operationLog/index'),
        meta: {
          title: '操作日志',
          icon: 'example',
          roles:{ requiresAuth: 'yakf:log/czrz'},
          // icon: 'table'
        },
        hidden: true
      },
    ]
  },

  {
    path: '/dataStatis',
    component: Layout,
    redirect: '/example/table',
    name: 'DataStatis',
    meta: {
      title: '数据统计',
      icon: 'tree'
    },
    children: [{
        path: 'productLineStatis',
        name: 'ProductLineStatis',
        component: () => import('@/views/dataStatis/productLineStatis/index'),
        meta: {
          title: '产品线-统计',
          icon: 'example',
          roles:{ requiresAuth: 'yakf:datastatistics/cpx'},
          // icon: 'table'
        },
        hidden: true
      },
      {
        path: 'productLineListStatis',
        name: 'ProductLineListStatis',
        component: () => import('@/views/dataStatis/productLineStatis/listStatis'),
        meta: {
          title: '产品线-统计',
        },
        hidden: true
      },

      {
        path: 'staffTakeStatis',
        name: 'StaffTakeStatis',
        component: () => import('@/views/dataStatis/staffTakeStatis/index'),
        meta: {
          title: '员工接单-统计',
          icon: 'example',
          roles:{ requiresAuth: 'yakf:datastatistics/ygjd'},
          // icon: 'table'
        },
        hidden: true
      },
      {
        path: 'staffTakeListStatis',
        name: 'StaffTakeListStatis',
        component: () => import('@/views/dataStatis/staffTakeStatis/listStatis'),
        meta: {
          title: '员工接单-统计',
        },
        hidden: true
      },

      {
        path: 'userOnlineStatis',
        name: 'UserOnlineStatis',
        component: () => import('@/views/dataStatis/userOnlineStatis/index'),
        meta: {
          title: '用户上线-统计',
          icon: 'example',
          roles:{ requiresAuth: 'yakf:datastatistics/yhsx'},
          // icon: 'table'
        },
        hidden: true
      },
      {
        path: 'userOnlineListStatis',
        name: 'UserOnlineListStatis',
        component: () => import('@/views/dataStatis/userOnlineStatis/listStatis'),
        meta: {
          title: '用户上线-统计',
        },
        hidden: true
      },

      {
        path: 'faultAndPartsStatis',
        name: 'FaultAndPartsStatis',
        component: () => import('@/views/dataStatis/faultAndPartsStatis/index'),
        meta: {
          title: '故障与配件-统计',
          icon: 'example',
          roles:{ requiresAuth: 'yakf:datastatistics/gzypj'},
          // icon: 'table'
        },
        hidden: true
      },
    ]
  },

  {
    path: '/CRMdata',
    component: Layout,
    redirect: '/example/table',
    name: 'CRMdata',
    meta: {
      title: '产品工单统计',
      icon: 'tree'
    },
    children: [


      {
        path: 'specialRecord',
        name: 'SpecialRecord',
        component: () => import('@/views/CRMdata/specialRecord/index'),
        meta: {
          title: '专项记录',
          icon: 'example',
          roles:{ requiresAuth: 'yakf:productorder/zxjl'},
          // icon: 'table'
        },
        hidden: true
      },

      {
        path: 'cultivateRecord',
        name: 'CultivateRecord',
        component: () => import('@/views/CRMdata/cultivateRecord/index'),
        meta: {
          title: '培训记录',
          icon: 'example',
          roles:{ requiresAuth: 'yakf:productorder/pxjl'},
          // icon: 'table'
        },
        hidden: true
      },

      {
        path: 'answerRecord',
        name: 'AnswerRecord',
        component: () => import('@/views/CRMdata/answerRecord/index'),
        meta: {
          title: '回访记录',
          icon: 'example',
          roles:{ requiresAuth: 'yakf:productorder/hfjl',},
          // icon: 'table'
        },
        hidden: true
      },

      {
        path: 'customerdetail',
        name: 'customerdetail',
        component: () => import('@/views/CRMdata/customerdetails/index'),
        meta: {
          title: '客户产品记录',
        },
        hidden: true
      },

      {
        path: 'serviceRecord',
        name: 'ServiceRecord',
        component: () => import('@/views/CRMdata/serviceRecord/index'),
        meta: {
          title: '维修记录',
          icon: 'example',
          roles:{ requiresAuth: 'yakf:productorder/wxjl'},
          // icon: 'table'
        },
        hidden: true
      },
    ]
  },

  // {
  //   path: '/form',
  //   component: Layout,
  //   children: [{
  //     path: 'index',
  //     name: 'Form',
  //     component: () => import('@/views/form/index'),
  //     meta: {
  //       title: '表单',
  //       icon: 'form'
  //     }
  //   }]
  // }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  // {
  //   path: '/nested',
  //   component: Layout,
  //   redirect: '/nested/menu1',
  //   name: 'Nested',
  //   meta: {
  //     title: 'Nested',
  //     icon: 'nested'
  //   },
  //   children: [{
  //       path: 'menu1',
  //       component: () => import('@/views/nested/menu1/index'), // Parent router-view
  //       name: 'Menu1',
  //       meta: {
  //         title: 'Menu1'
  //       },
  //       children: [{
  //           path: 'menu1-1',
  //           component: () => import('@/views/nested/menu1/menu1-1'),
  //           name: 'Menu1-1',
  //           meta: {
  //             title: 'Menu1-1'
  //           }
  //         },
  //         {
  //           path: 'menu1-2',
  //           component: () => import('@/views/nested/menu1/menu1-2'),
  //           name: 'Menu1-2',
  //           meta: {
  //             title: 'Menu1-2'
  //           },
  //           children: [{
  //               path: 'menu1-2-1',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
  //               name: 'Menu1-2-1',
  //               meta: {
  //                 title: 'Menu1-2-1'
  //               }
  //             },
  //             {
  //               path: 'menu1-2-2',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
  //               name: 'Menu1-2-2',
  //               meta: {
  //                 title: 'Menu1-2-2'
  //               }
  //             }
  //           ]
  //         },
  //         {
  //           path: 'menu1-3',
  //           component: () => import('@/views/nested/menu1/menu1-3'),
  //           name: 'Menu1-3',
  //           meta: {
  //             title: 'Menu1-3'
  //           }
  //         }
  //       ]
  //     },
  //     {
  //       path: 'menu2',
  //       component: () => import('@/views/nested/menu2/index'),
  //       meta: {
  //         title: 'menu2'
  //       }
  //     }
  //   ]
  // },

  // 404 page must be placed at the end !!!
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
