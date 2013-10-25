// 存放CRM 功能的JS脚本
var crm = {
    showMsg: function (msg) {
        alert(msg);
    },
    showWait: function () {
        $('<div>正在提交</div>').dialog(
                            {
                                height: 200,
                                minHeight: 320,
                                width: 300, title: '消息提示', autoOpen: true, modal: true,
                                buttons: {
                                    '确定': function () { $(this).dialog('destroy'); }
                                }
                            });
    },
    // 客户最近一年的消费趋势
    consumeTrend: function (url, customerId) {
        $.post(url, { CustomerId: customerId }, function (data) {
            if (data.Success) {
                $('#container').highcharts({
                    chart: {
                        type: 'line',
                        marginRight: 130,
                        marginBottom: 25
                    },
                    title: {
                        text: ' 最近一年的消费趋势,总消费金额：' + data.Data.Total + "¥",
                        x: -20
                    },
                    subtitle: {
                        text: '',
                        x: -20
                    },
                    xAxis: data.Data.xAxis,
                    yAxis: {
                        title: {
                            text: '消费金额'
                        },
                        plotLines: [{
                            value: 0,
                            width: 1,
                            color: '#808080'
                        }]
                    },
                    tooltip: {
                        valueSuffix: '¥'
                    },
                    plotOptions: {
                        line: {
                            dataLabels: {
                                enabled: true
                            },
                            enableMouseTracking: true
                        }
                    },
                    legend: {
                        layout: 'vertical',
                        align: 'right',
                        verticalAlign: 'top',
                        x: -10,
                        y: 100,
                        borderWidth: 0
                    },
                    series: data.Data.series
                });
            }
        }, 'json');
    },
    bindTreeGrid: function (BindFlexigrid, BindFileGrid, BindFlexigridWithoutAdd) {
        var data = {};
        //联系人
        var contactListModel = [
            { display: '序号', name: 'RowId', width: 50, sortable: false, align: 'center', hide: false },
            { display: '姓名', name: 'Name', width: 50, sortable: false, align: 'center', hide: false },
            { display: '性别', name: 'Sex', width: 50, sortable: false, align: 'center' },
            { display: '联系电话', name: 'TelNumber', width: 120, sortable: false, align: 'center' },
            { display: '手机号码', name: 'PhoneNumber', width: 120, sortable: false, align: 'center' },
            { display: '职位', name: 'DutyName', width: 120, sortable: false, align: 'center' },
            { display: '生日', name: 'Birthday', width: 120, sortable: false, align: 'center' },
            { display: '地址', name: 'Address', width: 120, sortable: false, align: 'center' },
            { display: '籍贯', name: 'NativePlace', width: 120, sortable: false, align: 'center' },
            { display: '身份证', name: 'IdCard', width: 120, sortable: false, align: 'center' },
            { display: '操作', name: 'DetailUrl', width: 120, sortable: false, align: 'center' }
            ];
        data.id = "table_ContactList";
        data.requestType = "ContactList";
        data.title = "客户联系人";
        data.colModel = contactListModel;
        data.url = "/Pages/WebCustomer/WebCorpContactInfo/NewOrEdit.aspx?";
        BindFlexigrid(data);

        //项目
        var projectListModel = [
		{ display: '序号', name: 'rowId', width: 30, sortable: false, align: 'center' },
		{ display: '项目名称', name: 'name', width: 100, sortable: false, align: 'center' },
		{ display: '预计成交日期', name: 'ForecastDate', width: 100, sortable: false, align: 'center' },
		{ display: '客户名称', name: 'CustomerName', width: 110, sortable: false, align: 'center' },
		{ display: '销售人员', name: 'SallerName', width: 80, sortable: false, align: 'center' },
        { display: '项目进度', name: 'ProjectStep', width: 80, sortable: false, align: 'center' },
        { display: '项目关系', name: 'ProjectRelation', width: 80, sortable: false, align: 'center' },
        { display: '成交金额', name: 'Amount', width: 80, sortable: false, align: 'center' },
        { display: "操作", name: "aShow", width: 200, sortable: false, align: 'center' }
		];
        data.id = "table_project";
        data.title = "客户相关项目";
        data.colModel = projectListModel;
        data.url = "/Pages/WebProject/NewOrEdit.aspx?";
        BindProjectFlexigrid(data);
        /**
        //回访记录
        var visitRecordModel = [
        { display: '序号', name: 'RowId', width: 50, sortable: false, align: 'center', hide: false },
        { display: '业务人员', name: 'BusinessPeople', width: 50, sortable: false, align: 'center', hide: false },
        { display: '回访日期', name: 'VisitDate', width: 120, sortable: false, align: 'center' },
        { display: '其他回访人员', name: 'OtherPerson', width: 100, sortable: false, align: 'center' },
        { display: '回访内容', name: 'Content', width: 200, sortable: false, align: 'center' },
        { display: '回访内容概要', name: 'ShortContent', width: 120, sortable: false, align: 'center' },
        { display: '录入人', name: 'CreateUser', width: 100, sortable: false, align: 'center' },
        { display: '详细', name: 'DetailUrl', width: 120, sortable: false, align: 'center' }
        ];
        var data = { id: "table_VisitRecord", requestType: 'visitrecord', title: '回访记录', colModel: visitRecordModel, url: "/Pages/WebCustomer/VisitRecord.aspx?" };
        BindFlexigridWithoutAdd(data);
        //洽谈记录
        var discussRecordModel = [
        { display: '序号', name: 'RowId', width: 50, sortable: false, align: 'center', hide: false },
        { display: '业务人员', name: 'BusinessPeople', width: 50, sortable: false, align: 'center', hide: false },
        { display: '洽谈日期', name: 'DiscussDate', width: 120, sortable: false, align: 'center' },
        { display: '其他回访人员', name: 'OtherPerson', width: 100, sortable: false, align: 'center' },
        { display: '洽谈内容', name: 'Content', width: 220, sortable: false, align: 'center' },
        { display: '洽谈内容概要', name: 'ShortContent', width: 120, sortable: false, align: 'center' },
        { display: '详细', name: 'DetailUrl', width: 120, sortable: false, align: 'center' }
        ];
        data.id = "table_discussCustomerRecord";
        data.requestType = "discussCustomerRecord";
        data.title = "洽谈记录";
        data.colModel = discussRecordModel;
        data.url = "/Pages/WebDiscuss/NewOrEdit.aspx?";
        BindFlexigrid(data);
        //消费记录
        var consumRecordsModel = [
        { display: '序号', name: 'RowId', width: 50, sortable: false, align: 'center', hide: false },
        { display: '总花费', name: 'SpendTotal', width: 80, sortable: false, align: 'center', hide: false },
        { display: '消费日期', name: 'ConsumptionDate', width: 120, sortable: false, align: 'center' },
        { display: '消费类型', name: 'ConsumerBusinessType', width: 100, sortable: false, align: 'center' },
        { display: '本次消费积分', name: 'Score', width: 80, sortable: false, align: 'center' },
        { display: '打折方式', name: 'DiscountType', width: 60, sortable: false, align: 'center' },
        { display: '录入人', name: 'CreateUser', width: 100, sortable: false, align: 'center' },
        { display: '操作', name: 'DetailUrl', width: 120, sortable: false, align: 'center' }
        ];
        data.id = "table_consumeRecord";
        data.requestType = "consumerecord";
        data.title = "消费记录";
        data.colModel = consumRecordsModel;
        data.url = "/Pages/WebConsume/NewOrEdit.aspx?";
        BindFlexigridWithoutAdd(data);
      
        //客户合同
        var contractListModel = [
        { display: '序号', name: 'RowId', width: 50, sortable: true, align: 'center', hide: false },
        { display: '合同名称', name: 'ContractName', width: 50, sortable: false, align: 'center', hide: false },
        { display: '合同状态', name: 'State', width: 50, sortable: false, align: 'center', hide: false },
        { display: '编号', name: 'Code', width: 200, sortable: false, align: 'center' },
        { display: '客户名称', name: 'CustomerName', width: 100, sortable: false, align: 'center' },
        { display: '公司签约人', name: 'SignPerson', width: 100, sortable: false, align: 'center' },
        { display: '客户签约人', name: 'CustomerSignPerson', width: 100, sortable: false, align: 'center' },
        { display: '存放地址', name: 'SignAddress', width: 160, sortable: false, align: 'center' },
        { display: '签约日期', name: 'SignDate', width: 120, sortable: true, align: 'center' },
        { display: '录入人', name: 'CreateUser', width: 100, sortable: false, align: 'center' },
        { display: '操作', name: 'DetailUrl', width: 120, sortable: false, align: 'center' }
        ];
        data.id = "table_ContractList";
        data.requestType = "ContractList";
        data.title = "客户合同";
        data.colModel = contractListModel;
        data.url = "/Pages/WebContract/NewOrEdit.aspx?";
        BindFlexigridWithoutAdd(data);

        //客户协议
        var customerAgreementListModel = [
        { display: '序号', name: 'RowId', width: 50, sortable: true, align: 'center', hide: false },
        { display: '标题', name: 'Subject', width: 50, sortable: false, align: 'center', hide: false },
        { display: '创建人', name: 'CreateUser', width: 50, sortable: false, align: 'center', hide: false },
        { display: '客户', name: 'CustomerName', width: 120, sortable: false, align: 'center' },
        { display: '协议类型', name: 'AgreementType', width: 100, sortable: false, align: 'center' },
        { display: '到期时间', name: 'Expire', width: 120, sortable: true, align: 'center' },
        { display: '创建时间', name: 'CreateTime', width: 120, sortable: true, align: 'center' },
        { display: '录入人', name: 'CreateUser', width: 100, sortable: false, align: 'center' },
        { display: '操作', name: 'DetailUrl', width: 120, sortable: false, align: 'center' }
        ];
        data.id = "table_CustomerAgreementList";
        data.requestType = "customeragreementList";
        data.title = "客户协议";
        data.colModel = customerAgreementListModel;
        data.url = "/Pages/WebCustomerAgreement/NewOrEdit.aspx?";
        BindFlexigridWithoutAdd(data);

        //客户投诉
        var complaintsListModel = [
        { display: '序号', name: 'RowId', width: 50, sortable: false, align: 'center', hide: false },
        { display: '投诉人姓名', name: 'CustomerName', width: 100, sortable: false, align: 'center', hide: false },
        { display: '类别', name: 'SuggestType', width: 50, sortable: false, align: 'center', hide: false },
        { display: '投诉日期', name: 'SuggestDate', width: 120, sortable: true, align: 'center' },
        { display: '处理时间', name: 'SolveDate', width: 120, sortable: true, align: 'center' },
        { display: '处理人', name: 'DealPerson', width: 100, sortable: false, align: 'center' },
        { display: '经手人', name: 'HandlerPerson', width: 100, sortable: false, align: 'center' },
        { display: '录入人', name: 'CreateUser', width: 100, sortable: false, align: 'center' },
        { display: '操作', name: 'DetailUrl', width: 120, sortable: false, align: 'center' }
        ];

        data.id = "table_ComplaintsList";
        data.requestType = "ComplaintsList";
        data.title = "客户投诉";
        data.colModel = complaintsListModel;
        data.url = "/Pages/WebComplaSugg/NewOrEdit.aspx?SuggestComplaints=Complaints";
        BindFlexigridWithoutAdd(data);
        //客户建议
        var suggestListModel = [
        { display: '序号', name: 'RowId', width: 50, sortable: false, align: 'center', hide: false },
        { display: '投诉人姓名', name: 'CustomerName', width: 100, sortable: false, align: 'center', hide: false },
        { display: '类别', name: 'SuggestType', width: 50, sortable: false, align: 'center', hide: false },
        { display: '投诉日期', name: 'SuggestDate', width: 120, sortable: false, align: 'center' },
        { display: '处理时间', name: 'SolveDate', width: 120, sortable: false, align: 'center' },
        { display: '处理人', name: 'DealPerson', width: 100, sortable: false, align: 'center' },
        { display: '经手人', name: 'HandlerPerson', width: 100, sortable: false, align: 'center' },
        { display: '录入人', name: 'CreateUser', width: 100, sortable: false, align: 'center' },
        { display: '操作', name: 'DetailUrl', width: 120, sortable: false, align: 'center' }
        ];
        data.id = "table_SuggestList";
        data.requestType = "SuggestList";
        data.title = "客户建议";
        data.colModel = suggestListModel;
        data.url = "/Pages/WebComplaSugg/NewOrEdit.aspx?SuggestComplaints=Suggest";
        BindFlexigridWithoutAdd(data);
        //客户应付款项
        var customerPayListModel = [
        { display: '序号', name: 'RowId', width: 50, sortable: false, align: 'center', hide: false },
        { display: '名称', name: 'Name', width: 120, sortable: false, align: 'center', hide: false },
        { display: '欠款客户', name: 'CustomerName', width: 100, sortable: false, align: 'center', hide: false },
        { display: '应收净额', name: 'SumPrice', width: 100, sortable: false, align: 'center' },
        { display: '是否已付', name: 'State', width: 100, sortable: false, align: 'center' },
        { display: '应付日期', name: 'FinancialDate', width: 120, sortable: false, align: 'center' },
        { display: '负责人', name: 'ChargePerson', width: 120, sortable: false, align: 'center' },
        { display: '处理结果', name: 'TreatResult', width: 120, sortable: false, align: 'center' },
        { display: '录入时间', name: 'CreateTime', width: 120, sortable: false, align: 'center' },
        { display: '操作', name: 'DetailUrl', width: 120, sortable: false, align: 'center' }
        ];
        data.id = "table_CustomerPayList";
        data.requestType = "CustomerPayList";
        data.title = "客户应付款项";
        data.colModel = customerPayListModel;
        data.url = "/Pages/WebFinancial/NewOrEdit.aspx?FinancialType=Receive";
        BindFlexigridWithoutAdd(data);
        */
        var fileModel = [
             { display: '序号', name: 'RowId', width: 50, sortable: false, align: 'center', hide: true },
            { display: '附件类型', name: 'FileType', width: 120, sortable: false, align: 'center' },
            { display: '附件名称', name: 'FileName', width: 100, sortable: false, align: 'center' },
            { display: '附件大小(KB)', name: 'FileSize', width: 100, sortable: false, align: 'center' },
            { display: '上传时间', name: 'UpLoadTime', width: 100, sortable: false, align: 'center' },
            { display: '附件ID', name: 'FileId', width: 100, sortable: false, align: 'center', hide: true },
            { display: '下载', name: 'Url', width: 120, sortable: false, align: 'center'}];
        data.id = "table_files";
        data.requestType = "getfile";
        data.title = "附件";
        data.colModel = fileModel;
        data.url = "";
        BindFileGrid(data);
    },

    getBelongPerson: function (url, inputId) {

        var spanInputId = "spanforbelongperson_" + inputId;
        //POST获取客户代表方法
        var fun_GetBelongPerson = function (postCustomerId) {
            $.post(url, { customerId: postCustomerId }, function (data) {
                $("#" + spanInputId).html("客户代表:" + data);
            });
        }
        //下拉框选中值变化事件
        var fun_selectedChanged = function () {
            var customerId = $("#" + inputId).find("option:selected").val();
            if (customerId != "") {
                fun_GetBelongPerson(customerId);
            }
            else {
                $("#" + spanInputId).html("");
            }
        }
        //判断是否存在客户代表显示控件 
        if ($("#" + spanInputId).length == 0) {
            var spanStr = "<span style='margin-left:10px' id='" + spanInputId + "'></span>";
            if ($("#" + inputId + "_chzn").length > 0)          //这里是启用了chosen控件，需要加到Chosen后面去
                $("#" + inputId + "_chzn").after(spanStr);
            else
                $("#" + inputId).after(spanStr);
        }
        //根据下拉框选中值判断当前页面是否为编辑页
        var customerId = $("#" + inputId).find("option:selected").val();
        if (customerId != "")  //编辑状态
            fun_GetBelongPerson(customerId);
        $("#" + inputId).change(fun_selectedChanged);
    }
};