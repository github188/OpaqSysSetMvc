<%@ Page Language="C#" Inherits="System.Web.Mvc.ViewPage" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>数据库列表</title>
    <link href="../../Content/easyUI/default/easyui.css" rel="stylesheet" type="text/css" />
    <link href="../../Content/easyUI/extEasyUIIcon.css" rel="stylesheet" type="text/css" />
    <script src="../../Scripts/jquery-2.0.0.min.js" type="text/javascript"></script>
    <script src="../../Scripts/jquery.easyui.min.js" type="text/javascript"></script>
    <link href="../../Content/easyUI/themes/default/dialog.css" rel="stylesheet" type="text/css" />
</head>
<body>
    <div style="margin: 10px 0;">
    </div>
    <table id="tt" class="easyui-datagrid" title="数据库列表" style="width: 700px; height: 500px"
        data-options="rownumbers:true,singleSelect:true,url:'<%= Url.Action("DbQuery")%>',toolbar:toolbar"
        pagination="true">
        <thead>
            <tr>
                <th data-options="field:'Id',width:80,hidden:true">
                    Id
                </th>
                <th data-options="field:'Host',width:100">
                    主机IP
                </th>
                <th data-options="field:'Port',width:80,align:'right'">
                    端口
                </th>
                <th data-options="field:'Pass',width:80,align:'right'">
                    密码
                </th>
                <th data-options="field:'Db',width:80">
                    数据库实例
                </th>
                <th data-options="field:'DbType',width:80,align:'center'">
                    数据库类型
                </th>
            </tr>
        </thead>
    </table>
    <div id="dbInfo" class="easyui-dialog" style="width: 350px; height: 250px" title="数据库配置"
        closed="true">
        <table  style="margin-left:10px">
            <tr>
                <td>
                    主机IP:
                </td>
                <td>
                    <%=this.Html.TextBox("Host")%>
                </td>
            </tr>
            <tr>
                <td>
                    端口:
                </td>
                <td>
                    <%=this.Html.TextBox("Port")%>
                </td>
            </tr>
            <tr>
                <td>
                    密码:
                </td>
                <td>
                    <%=this.Html.TextBox("Pass")%>
                </td>
            </tr>
            <tr>
                <td>
                    数据库实例:
                </td>
                <td>
                    <%=this.Html.TextBox("Db")%>
                </td>
            </tr>
            <tr>
                <td>
                    数据库类型:
                </td>
                <td>
                    <%=this.Html.TextBox("DbType")%>
                </td>
            </tr>
            <tr>
                <td colspan="2" align="center">
                    <input type="button" value="提交" />
                    <input type="button" value="取消" />
                </td>
            </tr>
        </table>
    </div>
    <script type="text/javascript">
        var toolbar = [{
            text: '新增',
            iconCls: 'add',
            handler: function () { $("#dbInfo").dialog('open') }
        }, {
            text: '编辑',
            iconCls: 'edit',
            handler: function () { $("#dbInfo").dialog('open') }
        }, '-', {
            text: '删除',
            iconCls: 'del',
            handler: function () {
                if (confirm("确定删除数据")) {
                }
            }
        }];
        function changeP(pos) {
            $('#tt').datagrid('loadData', []);
            $('#tt').datagrid({ pagePosition: pos });
        }
    </script>
</body>
</html>
