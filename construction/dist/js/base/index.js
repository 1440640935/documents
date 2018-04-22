/** v1.0 by helijun **/ 

require(
    [
        'jquery',
        'common',
        'cookie',
        'layuiAll'
    ],
    function (
        $,
        HSKJ
    ) {
        HSKJ.ready(function () {
            //usertype 1是总部，2是机构
            var roleid = HSKJ.getUserInfo('roleid');

            if (!roleid) {//检查登录
                HSKJ.toLoginPage();
                return;
            }
            //roleid = 2;
            var defaultRouter = 'project-list';

            //路由信息配置
            router.start({
                view: '.module-container',
                baseUrl: ENV.PAGE,
                router: {
                    'run-all': {//实时监控-全部企业
                        controller: 'js/run/all.js',
                        role: 1
                    },
                    'run-project': {//运营管理-项目动态
                        controller: 'js/run/project.js',
                        role: [1, 2] //总部和机构都能访问
                    },
                    'project-list': {//项目列表
                        controller: 'js/project/list.js',
                        role: [1, 2] //number || array ，页面权限控制
                    },
                    'project-add': {//项目添加
                        controller: 'js/project/add.js',
                        role: [1, 2]
                    },
                    'discern-record': {//识别记录
                        controller: 'js/project/discern-record.js',
                        role: [1, 2]
                    },
                    'attendance-manage': {//考勤管理
                        controller: 'js/project/attendance-manage.js',
                        role: [1, 2]
                    },
                    'project-user': {//项目人员管理
                        controller: 'js/project/project-user.js',
                        role: [1, 2]
                    },
                    'project-user-add': {//项目人员添加
                        controller: 'js/project/project-user-add.js',
                        role: 2
                    },
                    'project-user-edit': {//项目人员编辑
                        controller: 'js/project/project-user-edit.js',
                        role: 2
                    },
                    'user-list': {//人员管理
                        controller: 'js/user/list.js',
                        role: [1, 2]
                    },
                    'project-device': {//项目设备管理
                        controller: 'js/project/project-device.js',
                        role: [1, 2]
                    },
                    'device-list': {//设备信息
                        controller: 'js/device/list.js',
                        role: [1, 2]
                    },
                    'account-list': {//机构账号列表
                        controller: 'js/account/list.js',
                        role: 1
                    },
                    'authorize-manage': {//授权管理
                        controller: 'js/project/authorize-manage.js',
                        role: 2
                    },
                    'message-manage': {//信息管理
                        controller: 'js/message/index.js',
                        role: [1, 2]
                    },
                    'defaults': defaultRouter //默认路由
                },
                errorTemplateId: '#errorTpl',  //可选的错误模板，用来处理加载html模块异常时展示错误内容
                enterCallback: function (routeObj) {

                    //页面权限控制逻辑
                    void 0
                    if (!routeObj.url) return;
                    if (typeof routeObj.role == 'object') {
                        var notLook = false;
                        for (var i = 0; i < routeObj.role.length; i++) {
                            if (routeObj.role[i] == roleid) {
                                notLook = true;
                                break;
                            }
                        }
                        if (!notLook) {
                            router.isNotLook = false;
                            void 0
                        } else {
                            router.isNotLook = true;
                        }
                    } else {
                        if (routeObj.role != roleid) {
                            router.isNotLook = false;
                            void 0
                        } else {
                            router.isNotLook = true;
                        }
                    }

                }
            });

            var index = {
                init: function () {
                    this.renderHtml();
                    this.wactch();
                },

                data: {
                    list: [//左边菜单权限控制数据集
                        {
                            name: '实时监控',
                            show: roleid == 1,
                            icon: 'sbgl-icon.png',
                            isDeploy: false,//是否展开
                            children: [
                                {
                                    name: '全部企业',
                                    controller: 'page/index.html',
                                    isPage: true,//页面
                                    icon: 'sbgl-icon.png'
                                },
                                {
                                    name: '项目动态',
                                    controller: 'page/project.html',
                                    isPage: true,//页面
                                    icon: 'sbgl-icon.png'
                                }
                            ]
                        },
                        {
                            name: '项目列表',
                            show: roleid == 1,
                            icon: 'sbgl-icon.png',
                            controller: 'project-list'/* ,
                        children: [
                            {
                                name: '识别记录',
                                controller: 'discern-record',
                                icon: 'sbgl-icon.png'
                            },
                            {
                                name: '考勤记录',
                                controller: 'attendance-manage',
                                icon: 'sbgl-icon.png'
                            },
                            {
                                name: '人员列表',
                                controller: 'user-list',
                                icon: 'sbgl-icon.png'
                            },
                            {
                                name: '设备列表',
                                controller: 'device-list',
                                icon: 'sbgl-icon.png'
                            }
                        ] */
                        },
                        {
                            name: '企业资源',
                            show: roleid == 1,
                            icon: 'sbgl-icon.png',
                            children: [
                                {
                                    name: '人员信息',
                                    controller: 'user-list',
                                    icon: 'sbgl-icon.png'
                                },
                                {
                                    name: '设备信息',
                                    controller: 'device-list',
                                    icon: 'sbgl-icon.png'
                                }
                            ]
                        },
                        {
                            name: '账号管理',
                            show: roleid == 1,
                            icon: 'sbgl-icon.png',
                            controller: 'account-list'
                        },
                        {
                            name: '信息管理',
                            show: roleid == 1,
                            icon: 'sbgl-icon.png',
                            controller: 'message-manage'
                        },

                        {
                            name: '项目动态',
                            show: roleid == 2,
                            icon: 'sbgl-icon.png',
                            isDeploy: true,
                            isPage: true,
                            controller: 'page/project.html'
                        },
                        {
                            name: '项目列表',
                            show: roleid == 2,
                            icon: 'sbgl-icon.png',
                            controller: 'project-list'/* ,
                        children: [
                            {
                                name: '识别记录',
                                controller: 'discern-record',
                                icon: 'sbgl-icon.png'
                            },
                            {
                                name: '考勤管理',
                                controller: 'attendance-manage',
                                icon: 'sbgl-icon.png'
                            },
                            {
                                name: '项目人员管理',
                                controller: 'user-list',
                                icon: 'sbgl-icon.png'
                            },
                            {
                                name: '项目设备管理',
                                controller: 'device-list',
                                icon: 'sbgl-icon.png'
                            },
                            {
                                name: '授权管理',
                                controller: 'authorize-manage',
                                icon: 'sbgl-icon.png'
                            }
                        ] */
                        },
                        {
                            name: '人员管理',
                            show: roleid == 2,
                            icon: 'sbgl-icon.png',
                            controller: 'user-list'
                        },
                        {
                            name: '设备管理',
                            show: roleid == 2,
                            icon: 'sbgl-icon.png',
                            controller: 'device-list'
                        },
                        {
                            name: '信息管理',
                            show: roleid == 2,
                            icon: 'sbgl-icon.png',
                            controller: 'message-manage'
                        }
                    ]
                },

                renderHtml: function () {
                    var self = this;
                    //左边菜单权限控制数据集模板渲染
                    layui.laytpl(navLeftTpl.innerHTML).render({
                        roleid: roleid,
                        list: self.data.list
                    },
                        function (html) {
                            $('#userName').html(HSKJ.getUserInfo('name'));
                            $('.nav-left').html(html);
                            layui.element.init();//动态渲染后的导航需要重新初始化element
                        });
                },

                wactch: function () {
                    $(document)
                        .off('click', '.icon-menu')
                        .on('click', '.icon-menu', function () {
                            var $left = $('.layui-side'),
                                $right = $('.layui-body');
                            if ($(this).hasClass('packup-menu')) {
                                void 0
                                $left.css({
                                    'width': 0
                                })

                                $right.css({
                                    'left': 0
                                })

                                $(this).html('&#xe602;').attr('title', '展开左边菜单')
                            } else {
                                $left.css({
                                    'width': 200
                                })

                                $right.css({
                                    'left': 200
                                })

                                $(this).html('&#xe603;').attr('title', '收起左边菜单')
                            }

                            $(this).toggleClass('packup-menu').toggleClass('deploy-menu');
                        })
                }
            }
            index.init();
        })
    })