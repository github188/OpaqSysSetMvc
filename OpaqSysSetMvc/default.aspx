<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="default.aspx.cs" Inherits="WebCrm.Web.Admin.default_easyui" %>

<!DOCTYPE html>
<html>
<head>
    <title>
        <%=ConfigurationManager.AppSettings["SoftName"]%></title> 
        <link href="/favicon.ico" rel="shortcut icon">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <link id="easyuiTheme" href="/Content/easyUI/themes/default/easyui.css" rel="stylesheet"
        type="text/css" />
    <link href="/Content/easyUI/jquery-easyui-portal/portal.css" rel="stylesheet" type="text/css" />
    <link href="/Content/easyUI/themes/icon.css" rel="stylesheet" type="text/css" />
    <link href="/Content/easyUI/extEasyUIIcon.css" rel="stylesheet" type="text/css" />
    <link href="Content/top.css" rel="stylesheet" type="text/css" />
    <link href="Content/style.css" rel="stylesheet" type="text/css" />
    <style type="text/css">
        .tree-node
        {
            padding: 3px 0px;
        }
    </style>
</head>
<body>
    <div id="index_layout">
        <div data-options="region:'north'" style="height: 82px;">
            <div id="topArea" class="topArea">
                <div class="logobg">
                    <div class="topCol">
                        <div class="logo">
                        </div>
                        <div class="logoCol2">
                            <div class="logoCol2A">
                                <ul>
                                    <li><a href="javascript:void(0)" onclick="GotoHome()">首页</a></li>
                                    <li><a href="javascript:history.go(-1);">后退</a></li>
                                    <li><a href="javascript:history.go(1);">前进</a></li>
                                    <li><a href="#" onclick="javascript:window.location.reload(); ">刷新</a></li>
                                    <li><a href="javascript:void(0)" onclick="addTab({ url: 'ChangePwd.aspx', title: '密码修改' })">
                                        密码修改</a></li>
                                    <li><a href="Login.aspx?act=out" onclick="return confirm('确认退出？')">注销</a></li>
                                    <li class="login">[测试帐号]，欢迎您的登录！</li>
                                    <li>
                                        <div id="Clock">
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div class="logoCol2B">
                                <span align="right" class="clock" id="Clock"></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div id="region_west" data-options="region:'west'" title="模块导航" style="width: 180px;
            overflow: hidden;">
            <div class="easyui-accordion" id="accordion_menu" data-options="fit:false,border:false,onSelect:function(){}">
                <%foreach (var p in plugList)
                  { %>
                <div title="<%=p.PlugName %>" tid="<%=p.Id %>" style="padding: 5px;" data-options="border:false,iconCls:'<%=string.IsNullOrEmpty(p.PlugCode)?"anchor": p.PlugCode%>'">
                    <div class="well well-small">
                        <ul class="easy_tree">
                            <%foreach (var c in allPlugList)
                              {
                                  if (c.Parent != null && c.Parent.Id == p.Id)
                                  {%>
                            <li data-options="text:'  <%=c.PlugName %>',iconCls:'<%=c.PlugCode %>',url:'<%=c.PlugWebFile %>',state:'open',attributes:{'url':' <%=c.PlugWebFile %>'},sort:'<%=c.Sort %>',Id:'<%=c.Id %>'">
                                <span>
                                    <%=c.PlugName%></span> </li>
                            <%}
                              }%>
                        </ul>
                    </div>
                </div>
                <%}%>
                <div title="系统配置" tid="0" style="padding: 5px;" data-options="border:false,iconCls:'anchor'">
                    <div class="well well-small">
                        <ul class="easy_tree">
                            <li data-options="text:'数据库配置',iconCls:'database',url:'/home/dblist',state:'open',attributes:{'url':' /home/dblist'},sort:'0',Id:'0'">
                                <span>数据库配置</span> </li>
                        
                            <li data-options="text:'大表配置',iconCls:'wrench',url:'/home/BigTableList',state:'open',attributes:{'url':' /home/BigTableList'},sort:'1',Id:'1'">
                                <span>大表配置</span> </li>
                       
                            <li data-options="text:'大表组成配置',iconCls:'wrench_orange',url:'/home/BiginfoList',state:'open',attributes:{'url':' /home/BiginfoList'},sort:'2',Id:'2'">
                                <span>大表组成配置</span> </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div data-options="region:'center'" style="overflow: hidden;">
            <div id="index_tabs" style="overflow: hidden;">
                <div title="首页" data-options="border:false" style="overflow: hidden;">
                    <div id="welcome_containner" style="width: 100%; height: 100%">
                        <div id="portalLayout">
                            <div data-options="region:'center',border:false">
                                <div id="pp" style="position: relativel; padding: 10px">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div data-options="region:'south'" style="width: 100%; height: 22px; color: #929292;">
            <div class="footer" style="position: relative; margin: auto; width: 500px; line-height: 20px;
                color: #929292;">
                版权所有 东方网力 Copyright 2000-<%=DateTime.Now.Year %>, netposa.Inc
            </div>
        </div>
    </div>
    <div id="index_tabsMenu" style="width: 120px; display: none;">
        <div title="refresh" data-options="iconCls:'transmit'">
            刷新</div>
        <div class="menu-sep">
        </div>
        <div title="close" data-options="iconCls:'delete'">
            关闭</div>
        <div title="closeOther" data-options="iconCls:'delete'">
            关闭其他</div>
        <div title="closeAll" data-options="iconCls:'delete'">
            关闭所有</div>
    </div>
    <p id="ddd">
    </p>
</body>
<script src="/Scripts/jquery-2.0.0.min.js" type="text/javascript"></script>
<script src="/Scripts/jquery.easyui.min.js" type="text/javascript"></script>
<script src="/Content/easyUI/easyui-lang-zh_CN.js" type="text/javascript"></script>
<!-- 修复EasyUI1.3.3中layout组件的BUG -->
<script src="/Content/easyUI/plugins/jquery.layout.js" type="text/javascript"></script>
<!-- 引入EasyUI Portal插件 -->
<script src="/Content/easyUI/jquery-easyui-portal/jquery.portal.js" type="text/javascript"></script>
<!-- 扩展EasyUI -->
<script src="/Scripts/extEasyUI.js?v=201306031346" type="text/javascript"></script>
<script src="Scripts/default.js" type="text/javascript"></script>
</html>
