<%@ Page Language="C#" Inherits="System.Web.Mvc.ViewPage" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" >
<head id="Head1" runat="server">
    <title>大表组成配置</title>
    <link href="../../Content/easyUI/default/easyui.css" rel="stylesheet" type="text/css" />
    <link href="../../Content/easyUI/extEasyUIIcon.css" rel="stylesheet" type="text/css" />
    <script src="../../Scripts/jquery-2.0.0.min.js" type="text/javascript"></script>
    <script src="../../Scripts/jquery.easyui.min.js" type="text/javascript"></script>
</head>
<body>
    
    <div style="margin:10px 0;"></div>
    <table id="tt" class="easyui-datagrid" title="大表组成配置" style="width:700px;height:500px"
            data-options="rownumbers:true,singleSelect:true,url:'<%= Url.Action("BiginfoQuery")%>',toolbar:toolbar"  pagination="true">
        <thead>
            <tr>
                
                <th data-options="field:'TableName',width:100">大表名称</th>
                <th data-options="field:'Col',width:80,align:'right'">拆分字段</th>
                <th data-options="field:'ValueType',width:80,align:'right'">值类型</th> 
            </tr>
        </thead>
    </table>
    <script type="text/javascript">
        var toolbar = [{
            text: '新增',
            iconCls: 'add',
            handler: function () { alert('add') }
        }, {
            text: '编辑',
            iconCls: 'edit',
            handler: function () { alert('cut') }
        }, '-', {
            text: '删除',
            iconCls: 'del',
            handler: function () { alert('save') }
        }];
        function changeP(pos) {
            $('#tt').datagrid('loadData', []);
            $('#tt').datagrid({ pagePosition: pos });
        }
    </script>
</body>
</html>