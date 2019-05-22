export default [
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', name: 'login', component: './User/Login' },
      { path: '/user/register', name: 'register', component: './User/Register' },
      {
        path: '/user/register-result',
        name: 'register.result',
        component: './User/RegisterResult',
      },
      {
        component: '404',
      },
    ],
  },
  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    routes: [
      // redirect
      {
        path: '/',
        redirect: '/redirect',
        authority: ['admin', 'student'],
        component: './Redirect/index',
      },
      {
        path: '/redirect',
        name: 'home',
        icon: 'home',
        hideInMenu: true,
        component: './Redirect/index',
      },
      {
        path: '/index',
        authority: ['admin'],
        name: 'home',
        icon: 'home',
        component: './Index',
      },
      //info register
      {
        path: '/register',
        authority: ['admin'],
        name: 'register',
        icon: 'plus',
        routes: [
          {
            path: '/register/student',
            name: 'student',
            component: './Register/student',
          },
          {
            path: '/register/coach',
            name: 'coach',
            component: './Register/coach',
          },
          {
            path: '/register/source',
            name: 'source',
            component: './Register/source',
          },
          {
            path: '/register/vehicle',
            name: 'vehicle',
            component: './Register/vehicle',
          },
          {
            path: '/register/exam',
            name: 'exam',
            component: './Register/exam',
          },
        ],
      },

      // {
      //   path: '/student',
      //   name: 'student',
      //   icon: 'user',
      //   routes: [
      //     {
      //       path: '/student/studentData',
      //       name: 'data',
      //       component: './Student/StudentData',
      //     },
      //     {
      //       path: '/student/choiceCoach',
      //       name: 'choiceCoach',
      //       component: './Student/ChoiceCoach',
      //     },
      //     {
      //       path: '/student/addExam',
      //       name: 'addExam',
      //       component: './Student/AddExam',
      //     },
      //     {
      //       path: '/student/searchExam',
      //       name: 'searchExam',
      //       component: './Student/SearchExam',
      //     },
      //   ],
      // },
      // // coach
      // {
      //   path: ' /coach',
      //   name: 'coach',
      //   icon: 'user',
      //   routes: [
      //     {
      //       path: '/coach/coachData',
      //       name: 'data',
      //       component: './Student/StudentData',
      //     },
      //     {
      //       path: '/coach/student',
      //       name: 'student',
      //       component: './Manage/Student',
      //     },
      //   ],
      // },
      // news
      {
        path: '/news/publish',
        authority: ['admin'],
        icon: 'profile',
        name: '新闻发布',
        component: './News/publish',
      },
      {
        path: '/news',
        authority: ['admin'],
        name: 'news',
        icon: 'profile',
        routes: [
          {
            path: '/news/student',
            name: 'student',
            component: './News/list',
          },
          {
            path: '/news/manage',
            name: 'manage',
            component: './News/list',
          },
          {
            path: '/news/source',
            name: 'source',
            component: './News/list',
          },
          {
            path: '/news/person',
            name: 'person',
            component: './News/list',
          },
        ],
      },
      // manage
      {
        path: '/manage',
        authority: ['admin'],
        name: 'manage',
        icon: 'table',
        routes: [
          {
            path: '/manage/student',
            name: 'student',
            component: './Manage/Student',
          },
          {
            path: '/manage/coach',
            name: 'coach',
            component: './Manage/Coach',
          },
          {
            path: '/manage/source',
            name: 'source',
            component: './Manage/Source',
          },
          {
            path: '/manage/campus',
            name: 'campus',
            component: './Manage/Campus',
          },
          {
            path: '/manage/exam',
            name: 'exam',
            component: './Manage/Exam',
          },
          {
            path: '/manage/vehicle',
            name: 'vehicle',
            component: './Manage/Vehicle',
          },
        ],
      },
      // vehicle
      {
        path: '/vehicle/message',
        authority: ['admin'],
        name: '',
        icon: 'dashboard',
        component: './Student/ChoiceCoach',
      },
      //----------------------------------学员菜单开始-----------------------------------
      {
        path: '/learner/news',
        authority: ['student'],
        name: 'driveNews',
        icon: 'dashboard',
        component: './Index/news',
      },
      {
        path: '/learner/choiceCoach',
        authority: ['student'],
        name: 'choiceCoach',
        icon: 'dashboard',
        component: './Learner/choiceCoach',
      },
      {
        path: '/learner/sign',
        authority: ['student'],
        name: 'sign',
        icon: 'dashboard',
        component: './Learner/sign',
      },
      {
        path: '/learner/exam',
        authority: ['student'],
        name: 'myexam',
        icon: 'dashboard',
        component: './Learner/exam',
      },
      // {
      //   path: '/learner/info',
      //   authority: ['student'],
      //   name: 'info',
      //   icon: 'dashboard',
      //   component: './Register/exam',
      // },
      {
        path: '/learner/password',
        authority: ['student'],
        name: 'password',
        icon: 'dashboard',
        component: './Learner/password',
      },
      {
        path: '/learner/quarter',
        authority: ['admin'],
        name: 'quarter',
        icon: 'dashboard',
        component: './Learner/quarter',
      },
      // dashboard
      // { path: '/', redirect: '/dashboard/analysis', authority: ['admin', 'user'] },
      // {
      //   path: '/dashboard',
      //   name: 'dashboard',
      //   icon: 'dashboard',
      //   routes: [
      //     {
      //       path: '/dashboard/analysis',
      //       name: 'analysis',
      //       component: './Dashboard/Analysis',
      //     },
      //     {
      //       path: '/dashboard/monitor',
      //       name: 'monitor',
      //       component: './Dashboard/Monitor',
      //     },
      //     {
      //       path: '/dashboard/workplace',
      //       name: 'workplace',
      //       component: './Dashboard/Workplace',
      //     },
      //   ],
      // },
      // // forms
      // {
      //   path: '/form',
      //   icon: 'form',
      //   name: 'form',
      //   routes: [
      //     {
      //       path: '/form/basic-form',
      //       name: 'basicform',
      //       component: './Forms/BasicForm',
      //     },
      //     {
      //       path: '/form/step-form',
      //       name: 'stepform',
      //       component: './Forms/StepForm',
      //       hideChildrenInMenu: true,
      //       routes: [
      //         {
      //           path: '/form/step-form',
      //           redirect: '/form/step-form/info',
      //         },
      //         {
      //           path: '/form/step-form/info',
      //           name: 'info',
      //           component: './Forms/StepForm/Step1',
      //         },
      //         {
      //           path: '/form/step-form/confirm',
      //           name: 'confirm',
      //           component: './Forms/StepForm/Step2',
      //         },
      //         {
      //           path: '/form/step-form/result',
      //           name: 'result',
      //           component: './Forms/StepForm/Step3',
      //         },
      //       ],
      //     },
      //     {
      //       path: '/form/advanced-form',
      //       name: 'advancedform',
      //       authority: ['admin'],
      //       component: './Forms/AdvancedForm',
      //     },
      //   ],
      // },
      // // list
      // {
      //   path: '/list',
      //   icon: 'table',
      //   name: 'list',
      //   routes: [
      //     {
      //       path: '/list/table-list',
      //       name: 'searchtable',
      //       component: './List/TableList',
      //     },
      //     {
      //       path: '/list/basic-list',
      //       name: 'basiclist',
      //       component: './List/BasicList',
      //     },
      //     {
      //       path: '/list/card-list',
      //       name: 'cardlist',
      //       component: './List/CardList',
      //     },
      //     {
      //       path: '/list/search',
      //       name: 'searchlist',
      //       component: './List/List',
      //       routes: [
      //         {
      //           path: '/list/search',
      //           redirect: '/list/search/articles',
      //         },
      //         {
      //           path: '/list/search/articles',
      //           name: 'articles',
      //           component: './List/Articles',
      //         },
      //         {
      //           path: '/list/search/projects',
      //           name: 'projects',
      //           component: './List/Projects',
      //         },
      //         {
      //           path: '/list/search/applications',
      //           name: 'applications',
      //           component: './List/Applications',
      //         },
      //       ],
      //     },
      //   ],
      // },
      // {
      //   path: '/profile',
      //   name: 'profile',
      //   icon: 'profile',
      //   routes: [
      //     // profile
      //     {
      //       path: '/profile/basic',
      //       name: 'basic',
      //       component: './Profile/BasicProfile',
      //     },
      //     {
      //       path: '/profile/basic/:id',
      //       name: 'basic',
      //       hideInMenu: true,
      //       component: './Profile/BasicProfile',
      //     },
      //     {
      //       path: '/profile/advanced',
      //       name: 'advanced',
      //       authority: ['admin'],
      //       component: './Profile/AdvancedProfile',
      //     },
      //   ],
      // },
      // {
      //   name: 'result',
      //   icon: 'check-circle-o',
      //   path: '/result',
      //   routes: [
      //     // result
      //     {
      //       path: '/result/success',
      //       name: 'success',
      //       component: './Result/Success',
      //     },
      //     { path: '/result/fail', name: 'fail', component: './Result/Error' },
      //   ],
      // },
      // {
      //   name: 'exception',
      //   icon: 'warning',
      //   path: '/exception',
      //   routes: [
      //     // exception
      //     {
      //       path: '/exception/403',
      //       name: 'not-permission',
      //       component: './Exception/403',
      //     },
      //     {
      //       path: '/exception/404',
      //       name: 'not-find',
      //       component: './Exception/404',
      //     },
      //     {
      //       path: '/exception/500',
      //       name: 'server-error',
      //       component: './Exception/500',
      //     },
      //     {
      //       path: '/exception/trigger',
      //       name: 'trigger',
      //       hideInMenu: true,
      //       component: './Exception/TriggerException',
      //     },
      //   ],
      // },
      // {
      //   name: 'account',
      //   icon: 'user',
      //   path: '/account',
      //   routes: [
      //     {
      //       path: '/account/center',
      //       name: 'center',
      //       component: './Account/Center/Center',
      //       routes: [
      //         {
      //           path: '/account/center',
      //           redirect: '/account/center/articles',
      //         },
      //         {
      //           path: '/account/center/articles',
      //           component: './Account/Center/Articles',
      //         },
      //         {
      //           path: '/account/center/applications',
      //           component: './Account/Center/Applications',
      //         },
      //         {
      //           path: '/account/center/projects',
      //           component: './Account/Center/Projects',
      //         },
      //       ],
      //     },
      //     {
      //       path: '/account/settings',
      //       name: 'settings',
      //       component: './Account/Settings/Info',
      //       routes: [
      //         {
      //           path: '/account/settings',
      //           redirect: '/account/settings/base',
      //         },
      //         {
      //           path: '/account/settings/base',
      //           component: './Account/Settings/BaseView',
      //         },
      //         {
      //           path: '/account/settings/security',
      //           component: './Account/Settings/SecurityView',
      //         },
      //         {
      //           path: '/account/settings/binding',
      //           component: './Account/Settings/BindingView',
      //         },
      //         {
      //           path: '/account/settings/notification',
      //           component: './Account/Settings/NotificationView',
      //         },
      //       ],
      //     },
      //   ],
      // },
      // //  editor
      // {
      //   name: 'editor',
      //   icon: 'highlight',
      //   path: '/editor',
      //   routes: [
      //     {
      //       path: '/editor/flow',
      //       name: 'flow',
      //       component: './Editor/GGEditor/Flow',
      //     },
      //     {
      //       path: '/editor/mind',
      //       name: 'mind',
      //       component: './Editor/GGEditor/Mind',
      //     },
      //     {
      //       path: '/editor/koni',
      //       name: 'koni',
      //       component: './Editor/GGEditor/Koni',
      //     },
      //   ],
      // },
      // {
      //   component: '404',
      // },
    ],
  },
];
