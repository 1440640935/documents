/** v1.0 by helijun **/ 
define([
    'jquery',
    'common', 
    'text!tpl/project/authorize-add.tpl',
    'js/project/authorize-add-device',
    'layuiAll',
    'area',
    'css!css/project/authorize-manage'
], function(
    $, 
    HSKJ,
    addAuthorizeTpl,
    authorizeAddDevice
){
return function (roleid, parentJs) {
    void 0
    HSKJ.ready(function () {
        var authorizeAdd = {
            init: function () {
                this.openAddAuthorizeDialog();
                this.renderHtml();
                this.wactch();
            },

            data: {
                roleid: roleid
            },

            renderHtml: function() {
                
            },

            openAddAuthorizeDialog: function () {
                var self = this;
                layer.open({
                    type: 1,
                    title: '添加授权',
                    btn: [],
                    content: layui.laytpl(addAuthorizeTpl).render(self.data || {}),
                    area: ['688px'],
                    skin: 'module-authorize-add-dialog',
                    success: function (layero, index) {
                        layui.form.render('checkbox');
                        layui.form.render('radio');
                        layui.laydate.render({ //渲染日期
                            elem: '#startAndEndtime'
                            , type: 'time'
                            , range: '~'
                            , format: 'HH:mm'
                        });
                        self.formVerify();
                    }
                })
            },

            formVerify: function(){
                layui.form.verify({
                    macaddress: function (value, item) { //value：表单的值、item：表单的DOM对象，macaddress 对应form 里lay-filter
                        //if (/^\d+\d+\d$/.test(value)) {
                        //    return 'Mac地址不能全为数字';
                        //}
                        if (/^[\u4e00-\u9fa5],{0,}$/.test(value)) {
                            return 'Mac地址不能为中文';
                        }
                        //if (/^[^%&',;=?$\x22]+/.test(value)) {
                        //    return 'Mac地址不能有特殊字符';
                        //}

                        //([0-9A-Fa-f]{2}:){5}[0-9A-Fa-f]{2}
                        // /^[A-F0-9]{2}(-[A-F0-9]{2}){5}$|^[A-F0-9]{2}(:[A-F0-9]{2}){5}$/
                        if (!new RegExp("^([A-Fa-f0-9]{2}:){5}[A-Fa-f0-9]{2}$").test(value)) {
                            return 'Mac地址格式不正确';
                        }
                        
                    }
                });   
            },

            //项目保存请求
            doAuthorizeAddAjax: function(data){
                void 0
                var json = {
                    projectid: router.getParameter('pid'),
                    organizationid: HSKJ.getUserInfo('organizationid'),
                    starttime: data.field.startAndEndtime.split('~')[0],
                    endtime: data.field.startAndEndtime.split('~')[1]
                }
                var ids = '';
                $('input[name=employeetypes]').each(function(index, item){
                    if($(item).next().hasClass('layui-form-checked')){
                        void 0
                        ids += (index == 0 ?'':',') + $(item).val()
                    }
                });
                json.employeetypes = ids;
                HSKJ.POST({
                    url: 'system/author/add',
                    data: Object.assign(data.field, json),
                    beforeSend: function () {
                        HSKJ.loadingShow();
                    },
                    success: function (json) {
                        if (json && json.code == 0) {
                            layui.layer.msg('添加成功', { icon: 1 }, function () {
                                parentJs.renderTable();
                                layui.layer.closeAll();
                            })
                        } else {
                            layui.layer.msg(json.message)
                        }
                    }
                })
            },

            wactch: function () {
                var self = this; 

                //添加项目的保存
                layui.form.on('submit(element-submit)', function (data) {
                    self.doAuthorizeAddAjax(data);
                    return false;
                });

                $(document)
                .off('click', '#deviceidNames')
                .on('click', '#deviceidNames', function () {
                    authorizeAddDevice();
                })
            }
        }
        authorizeAdd.init();
    })
}}
)