var index_tabs;
var index_tabsMenu;
var index_layout;
var itemAccording;

var IsAlertClose = true;
//初始化
$(function () {

    //初始化左侧菜单
    itemAccording = $(".easy_tree").tree({
        onClick: function (node) {
            if (node.attributes && node.attributes.url) {
                var url;
                if (node.attributes.url.indexOf('/') == 0) {/*如果url第一位字符是"/"，那么代表打开的是本地的资源*/
                    url = '' + node.attributes.url;
                } else {/*打开跨域资源*/
                    url = node.attributes.url;
                }
                addTab({
                    url: url,
                    title: node.text
                });
            }
        }
    });

    //初始化布局
    index_layout = $('#index_layout').layout({
        fit: true
    });
    //初始化选项卡
    index_tabs = $('#index_tabs').tabs({
        fit: true,
        border: false,
        onContextMenu: function (e, title) {
            e.preventDefault();
            index_tabsMenu.menu('show', {
                left: e.pageX,
                top: e.pageY
            }).data('tabTitle', title);
        },
        tools: [{
            iconCls: 'database_refresh',
            handler: function () {
                var href = index_tabs.tabs('getSelected').panel('options').href;
                if (href) {/*说明tab是以href方式引入的目标页面*/
                    var index = index_tabs.tabs('getTabIndex', index_tabs.tabs('getSelected'));
                    index_tabs.tabs('getTab', index).panel('refresh');
                } else {/*说明tab是以content方式引入的目标页面*/
                    var panel = index_tabs.tabs('getSelected').panel('panel');
                    var frame = panel.find('iframe');
                    try {
                        if (frame.length > 0) {
                            for (var i = 0; i < frame.length; i++) {
                                frame[i].contentWindow.document.write('');
                                frame[i].contentWindow.close();
                                frame[i].src = frame[i].src;
                            }
                            if (navigator.userAgent.indexOf("MSIE") > 0) {// IE特有回收内存方法
                                try {
                                    CollectGarbage();
                                } catch (e) {
                                }
                            }
                        }
                    } catch (e) {
                    }
                }
            }
        }, {
            iconCls: 'delete',
            handler: function () {
                var index = index_tabs.tabs('getTabIndex', index_tabs.tabs('getSelected'));
                var tab = index_tabs.tabs('getTab', index);
                if (tab.panel('options').closable) {
                    index_tabs.tabs('close', index);
                } else {
                    $.messager.alert('提示', '[' + tab.panel('options').title + ']不可以被关闭！', 'error');
                }
            }
        }
                ]
    });
    //初始化选项卡右键菜单
    index_tabsMenu = $('#index_tabsMenu').menu({
        onClick: function (item) {
            var curTabTitle = $(this).data('tabTitle');
            var type = $(item.target).attr('title');

            if (type === 'refresh') {
                index_tabs.tabs('getTab', curTabTitle).panel('refresh');
                return;
            }
            if (type === 'close') {
                var t = index_tabs.tabs('getTab', curTabTitle);
                if (t.panel('options').closable) {
                    index_tabs.tabs('close', curTabTitle);
                }
                return;
            }

            var allTabs = index_tabs.tabs('tabs');
            var closeTabsTitle = [];

            $.each(allTabs, function () {
                var opt = $(this).panel('options');
                if (opt.closable && opt.title != curTabTitle && type === 'closeOther') {
                    closeTabsTitle.push(opt.title);
                } else if (opt.closable && type === 'closeAll') {
                    closeTabsTitle.push(opt.title);
                }
            });

            for (var i = 0; i < closeTabsTitle.length; i++) {
                index_tabs.tabs('close', closeTabsTitle[i]);
            }
        }
    });
    InitialWelcomePage();
});
function exit() {
    return '退出应用程序吗？';
}
function addTab(params) {
    var iframe = CreateIframe(params);
    
    if (index_tabs.tabs('exists', params.title)) {
        index_tabs.tabs('select', params.title);
        var tab = index_tabs.tabs('getSelected');  // get selected panel
        index_tabs.tabs('update', { tab: tab, options: {
            content: iframe
        }
        });
        return;
    }

    var t = $('#index_tabs');
    var opts = {
        title: params.title,
        closable: true,
        iconCls: params.iconCls,
        content: iframe,
        border: false,
        fit: true
    };
    parent.$.messager.progress({
        title: '提示',
        text: '数据处理中，请稍后....'
    });
    t.tabs('add', opts);
    var tabs = t.tabs('tabs');
    var defaultTabs = 5;
    if (tabs.length > defaultTabs) {
        t.tabs('close', tabs[1].panel('options').title);
    }
    //var dialogContent = 'div id="dd" class="easyui-dialog" title="选项卡已超过10个" style="width:400px;height:200px;" data-options="iconCls:\'icon-save\',resizable:true,modal:true"> Dialog Content.</div>';
}

function CreateIframe(params) {
    var iframe = document.createElement("iframe");
    iframe.src = params.url;
    if (iframe.attachEvent) {
        iframe.attachEvent("onload", function () {
            parent.$.messager.progress('close');
        });
    } else {
        iframe.onload = function () {
            parent.$.messager.progress('close');
        };
    }
    $(iframe).attr("style", "border:0;width:100%;height:98%;");
    $(iframe).attr("frameborder", "0");
    return iframe;
}

var url = location.href;
var index = url.indexOf('jsessionid');
if (index != -1) {
    var sid = url.substr(index + 11);
    document.cookie = "JSESSIONID=" + sid + ";path=/;";
}

$(window).load(function () {
    tick();
});
$(window).resize(function () {
    resizeFrame();
});
function resizeFrame() {
    //document.getElementById("mainFrame").style.height = document.body.offsetHeight - document.getElementById("topArea").offsetHeight - 1 + "px";
}
function refresh() {
    if (window.XMLHttpRequest) {
        http_request = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        http_request = new ActiveXObject("Microsoft.XMLHTTP");
    }
    var linkurl = '/xxg_manager/manage/login!loginRefresh.htm';
    http_request.open("POST", linkurl, false);
    http_request.send(null);
    parent.mainFrame.location.reload();
}
//完整显示当前时间
function tick() {
    var hours, minutes, seconds, xfile;
    var intHours, intMinutes, intSeconds;
    var today, theday;
    today = new Date();
    function initArray() {
        this.length = initArray.arguments.length
        for (var i = 0; i < this.length; i++)
            this[i + 1] = initArray.arguments[i]
    }
    var d = new initArray("星期日 ", "星期一 ", "星期二 ", "星期三 ", "星期四 ", "星期五 ", "星期六 ");
    theday = today.getFullYear() + "年" + [today.getMonth() + 1] + "月" + today.getDate() + "日 " + d[today.getDay() + 1];
    intHours = today.getHours();
    intMinutes = today.getMinutes();
    intSeconds = today.getSeconds();
    if (intHours == 0) {
        hours = "12:";
        xfile = "午夜 ";
    } else if (intHours < 12) {
        hours = intHours + ":";
        xfile = "上午 ";
    } else if (intHours == 12) {
        hours = "12:";
        xfile = "正午 ";
    } else {
        intHours = intHours - 12
        hours = intHours + ":";
        xfile = "下午 ";
    }
    if (intMinutes < 10) {
        minutes = "0" + intMinutes + ":";
    } else {
        minutes = intMinutes + ":";
    }
    if (intSeconds < 10) {
        seconds = "0" + intSeconds + " ";
    } else {
        seconds = intSeconds + " ";
    }
    timeString = "&nbsp;当前时间：" + theday + xfile + hours + minutes + seconds;
    document.getElementById("Clock").innerHTML = timeString;
    //Clock.innerHTML = timeString;
    window.setTimeout("tick();", 100);
}

function GotoHome() {
    $('#index_tabs').tabs("select", 0);
}

function InitialWelcomePage() {
    var portalLayout = $('#portalLayout').layout({
        fit: true
    });
    $(window).resize(function () {
        portalLayout.layout('panel', 'center').panel('resize', {
            width: 1,
            height: 1
        });
    });
    var portalContent = $("#pp");
    portalContent.portal({
        border: false,
        fit: true, border: false, fit: true
    });

//    var welcomeUrl = "/JsApi/GetMyWelcomePage";
//    $.post(welcomeUrl, {}, function (postBackData) {
//        if (postBackData.Success) {
//            $(postBackData.Data).each(function (index, data) {
//                var p = GetPortalPanel(data);
//                p.appendTo(portalContent);
//                p.panel({ height: 200, collapsible: true, width: 400 });
//                portalContent.portal('add', { panel: p, columnIndex: index });
//            });
//        }
//    });
}

function GetPortalPanel(data, portalContent) {
    var pDiv = $('<div ></div>');
    var gTable = $('<table ></table>');
    pDiv.attr("title", data.PageTitle);
    var url;
    if (!data.PageUrl)
    { url = "/JsApi/GetWelcomePage?pageId=" + data.Id; }
    else {
        url = data.PageUrl;
    }
    var tHead = $(" <thead>  </thead>").appendTo(gTable);
    var tRow = $("<tr></tr>").appendTo(tHead);
    $(data.Heads).each(function (index, element) {
        var th = $(" <th></th>").appendTo(tRow);
        th.html(element.DisplayName);
        th.attr("data-options", "field:'" + element.DbName + "',hidden:" + !element.Visiable);
    });
    //加入详情链接
    var th = $(" <th></th>").appendTo(tRow);
    th.html("操作");
    th.attr("data-options", "field:'" + "DetialUrl" + "',hidden:" + "false");
    pDiv.html(gTable);
    gTable.datagrid({
        loadFilter: function (loadData) {
            if (loadData.Success) {
                var parsedData = eval(loadData.Data.Grid);
                $(parsedData).each(function () {
                    var detailUrl = data.DetailPage + this.ID;
                    this.DetialUrl = '<span style="color: #006699;cursor: pointer" onclick="AddDetailTab(\'' + detailUrl + '\')" >详情</span>';
                });
                return { total: parsedData.length, rows: parsedData };
            } else {
                return loadData;
            }
        },
        border: false,
        rownumbers: true,
        fit: true,
        fitColumns: false,
        singleSelect: true,
        url: url
    });
    return pDiv;
}
function AddDetailTab(detailUrl) {
    addTab({ url: detailUrl, title: "详情" });
    return false;
}