var isSubmittingFnancial = false;
var isSubmittingGoodPrice = false;
function queryContractGood(weburl) {

    var text = $("#search_contract_good").val();
    var productmodel = $("#text_productmodel").val()
    var params = { rp: Math.floor(Number.MAX_VALUE), page: 1, name: text, productmodel: productmodel };
    var url = weburl;
    $.post(url, params, function (data) {
        var html = '';
        $.each($(data.rows), function (index, value) {
            html = html + "<tr class='tr_cur' dataValue=" + value.Id + "><td><input type=\"checkbox\"></td>"
                              + "<td class='td_1'>" + value.Name + "</td>"
                                    + "<td class='td_1'>" + value.Unit + "</td>"
                                    + "<td class='td_1'>" + value.SuggestedPrice + "</td>"
                                    + "<td class='td_1'>" + value.ProductModel + "</td>"
                                    + "<td class='td_1'>" + value.TechParams + "</td>"
                                    + "</tr>";
        });
        $('#ContactGoodTable tbody').html(html);
    });
}
function AddGood() {
    $('#ContractGoodDiv').dialog('close');
    $("#AddGoodDiv").dialog('open');
}
function AddGoodFinish() {
    $('#ContractGoodDiv').dialog('open');
    $("#AddGoodDiv").dialog('close');
    QueryGood();
}
function formValidate(form) {
    form.validate({
        rules: {
            Customer: "required",
            ChargePerson: "required",
            Name: { required: true, maxlength: 100 },
            TreatResult: { maxlength: 1000 },
            Remark: { maxlength: 1000 },
            CustomerChargeMan: { required: true },
            FinancialDate: { required: true },
            SumPrice: { number: true },
            ActualPrice: { number: true }
        },
        ajaxFormValidation: true,
        submitHandler: function (f) {
            $(f).ajaxSubmit({
                success: function (responseText, statusText) {
                    $('#ContractFinancialDiv').dialog('close');
                    isSubmittingFnancial = false;
                    alert("提交成功");
                    FinancialReload();
                },
                error: function (response) {
                    alert("提交失败，确认网络连接是否正常");
                    isSubmittingFnancial = false;
                }
            });
        },
        invalidHandler: function (f) { isSubmittingFnancial = false; },
        ignore: ':hidden:not(.chzn-select)',
        errorPlacement: function (error, element) {
            if (element.is(":hidden")) {
                element.next().parent().append(error);
            }
            else {
                error.insertAfter(element);
            }
        }
    });
}
function ValidateAddGoodPriceForm(form) {
    form.validate({
        rules: {
            SuggestedPrice: { required: true, number: true },
            Name: "required",
            Unit: {
                required: true
            },
            Amount:
                    {
                        required: true, number: true
                    },
            MaxAmount: {
                number: true
            },
            Remark: {
                maxlength: 1000
            }

        },
        ignore: ':hidden:not(.chzn-select)',
        errorPlacement: function (error, element) {
            if (element.is(":hidden")) {
                element.next().parent().append(error);
            }
            else {
                error.insertAfter(element);
            }
        },
        submitHandler: function (f) {
            $(f).ajaxSubmit({
                success: function (responseText, statusText) {
                    AddGoodFinish();
                    isSubmittingGoodPrice = false;
                    alert("提交成功");
                },
                error: function (response) {
                    alert("提交失败，确认网络连接是否正常");
                    isSubmittingGoodPrice = false;
                }
            });
        },
        invalidHandler: function (f) { isSubmittingGoodPrice = false; }
    });
}
function ReLoadFinancialTable(weburl, id) {
    var url = weburl;
    var params = { id: id };
    $.post(url, params, FinancialTable, 'json');
}
function FinancialTable(data) {
    var html = '';
    $.each($(data), function (index, value) {
        html = html + "<tr class='tr_cur'>"
                              + " <td  class='td_1'>" + value.rowNum + "</td>"
                              + "<td  class='td_1'>" + value.Name + "</td>"
                              + "<td  class='td_1'>" + value.Customer + "</td>"
                              + "<td  class='td_1'>" + value.SumPrice + "</td>"
                              + "<td  class='td_1'>" + value.ActualPrice + "</td>"
                              + "<td  class='td_1'>" + value.State + "</td>"
                              + "<td  class='td_1'>" + value.FinancialDate + "</td>"
                              + "<td  class='td_1'>" + value.ChargePerson + "</td>"
                              + "<td class='td_1'>" + value.TreatResult + "</td>"
                              + "</tr>";
    });
    $('#ContractFinancialTable tbody').html(html);
}
function UnionInfo() {
    try {
        var json = new Array();
        //报价体系
        $('#GoodDetailTable tbody tr').each(function (index, obj) {
            json.push($(obj).attr('dataValue').replace("¥", ""));
        });
        $('#GoodHiddenID').val(json.join(","));
    }
    catch (Error) {
        alert(Error);
        return false;
    }
    return true;
}
function arrayToJson(o) {
    var r = [];
    if (typeof o == "string") return "\"" + o.replace(/([\'\"\\])/g, "\\$1").replace(/(\n)/g, "\\n").replace(/(\r)/g, "\\r").replace(/(\t)/g, "\\t") + "\"";
    if (typeof o == "object") {
        if (!o.sort) {
            for (var i in o)
                r.push(i + ":" + arrayToJson(o[i]));
            if (!!document.all && !/^\n?function\s*toString\(\)\s*\{\n?\s*\[native code\]\n?\s*\}\n?\s*$/.test(o.toString)) {
                r.push("toString:" + o.toString.toString());
            }
            r = "{" + r.join() + "}";
        } else {
            for (var i = 0; i < o.length; i++) {
                r.push(arrayToJson(o[i]));
            }
            r = "[" + r.join() + "]";
        }
        return r;
    }
    return o.toString();
}
function Initialize(contractId) {
    //合同报价体系对话框
    $("#ContractGoodDiv").dialog({
        minHeight: 200,
        autoOpen: false,
        title: '合同报价体系',
        modal: true,
        maxHeight: 600,
        width: 650,
        height: 450,
        buttons: [{
            text: '确定',
            handler: function () {
                var html = '';
                $.each($("#ContactGoodTable tbody tr"), function (index, value) {
                    var checked = $(value).find("input[type='checkbox']").eq(0).prop("checked");
                    if (checked) {
                        html = html
                         + "<tr class='contract_good_add tr_cur' dataValue=" + $(value).attr("dataValue") + "><td  class='td_1'>" + $(value).find('td').eq(1).html() + "</td>"
                         + "<td class='value-unit td_1'>" + $(value).find('td').eq(2).html().replace("¥", "") + "</td>"
                         + "<td  class='td_1'>" + $(value).find('td').eq(3).html().replace("¥", "") + "</td>"
                         + "<td  class='td_1' >" + $(value).find('td').eq(4).html().replace("¥", "") + "</td>"
                         + "<td  class='td_1' >" + $(value).find('td').eq(5).html().replace("¥", "") + "</td>"
                         + "<td  class='td_1'><a href='javascript:void(0)' onclick='$(this).parent().parent().remove()'>删除</a></td>"
                         + "</tr>";
                    }
                });
                $('#GoodDetailTable  tbody').append(html);
                $('#ContractGoodDiv').dialog('close');
            }
        },
                    { text: '取消', handler: function () { $('#ContractGoodDiv').dialog('close'); } }
                ]
    });
    //添加报价体系对话框
    $("#AddGoodDiv").dialog({
        modal: true,
        minHeight: 200,
        autoOpen: false,
        href: "/GoodPrice/NewGood",
        modal: true,
        maxHeight: 600,
        width: 600,
        height: 540,
        onOpen: function () {
            var f = $("#AddGoodDiv").find('#form1');
            f.find('#res').click();
            f.find(".chzn-select").trigger("liszt:updated");
        },
        onLoad: function () {

            var f = $("#AddGoodDiv").find('#form1');
            f.find('.tool_2').remove();
            f.find('.r_tit1').remove();
            f.find('.rightArea').removeClass("rightArea");
            f.find('.chzn-select').chosen();
            f.find('.r_ContentNav').css("margin", "0px");
            f.find('.tableNav_2').css("padding", "0px");
            f.find("#ProductUsesID").change(function () {
                var ids = new Array();
                f.find("#ProductUsesID option:selected").each(function (index, element) {
                    ids.push($(this).val());
                });
                f.find("#ProductUses").val(ids.join(","));
            });
            ValidateAddGoodPriceForm(f);
        },
        buttons: [{
            text: '保存',
            handler: function () {
                var f = $("#AddGoodDiv").find('#form1');
                f.submit();
            }
        }, { text: '取消', handler: function () { $('#AddGoodDiv').dialog('close'); } }]
    });
    //添加收款项对话框
    $("#ContractFinancialDiv").dialog({
        modal: true,
        minHeight: 200,
        autoOpen: false,
        href: "/WebFinancial/SaveOrUpdate?" + "asPatial=true&" + "financialType=receive&" + "contractId=" + contractId,
        modal: true,
        maxHeight: 600,
        width: 680,
        height: 580,
        onOpen: function () {
            var f = $("#ContractFinancialDiv").find('#form1');
            f.find('#res').click();
            f.find('#Customer').attr("disabled", "disabled");
            f.find('#Contract').attr("disabled", "disabled");
            $("#ChargePerson").trigger("liszt:updated");
        },
        onLoad: function () {
            var f = $("#ContractFinancialDiv").find('#form1');
            f.find('.tool_2').remove();
            f.find('.r_tit1').remove();
            f.find('.rightArea').removeClass("rightArea");
            f.find('#Customer').attr("disabled", "disabled");
            f.find('#Contract').attr("disabled", "disabled");
            f.find('.r_ContentNav').css("margin", "0px");
            f.find('.r_ContentNav').css("border", "0px solid #95B8E7");
            f.find('.tableNav_2').css("padding", "0px");
            f.find('#ChargePerson').chosen();
            f.find('#attach_files').remove();
            f.append("<input type='checkbox' id='isAjax' style='display:none' name='isAjax' checked='checked' value='true'/>")
            formValidate(f);
        },
        buttons: [{
            text: '保存',
            handler: function () {
                if (isSubmittingFnancial == true) {
                    alert("正在保存数据,请勿重复提交...");
                    return;
                }
                isSubmittingFnancial = true;
                var f = $("#ContractFinancialDiv").find('#form1');
                f.find('#Customer').removeAttr("disabled");
                f.find('#Contract').removeAttr("disabled")
                f.find("#form_submit").click();
            }
        }, { text: '取消', handler: function () { $('#ContractFinancialDiv').dialog('close'); } }]
    });

    $("#form1").validate({
        rules: {
            ProjectID: "required",
            SumID: { required: true, number: true },
            SignPersonID: {
                required: true
            },
            StateId: {
                required: true
            },
            ChargePersonID: {
                required: false
            },
            ContractNameID:
                    { required: true,
                        maxlength: 50
                    },
            CustomerNameID:
                    {
                        maxlength: 50
                    },
            CustomerSignPersonID:
                    {
                        maxlength: 50
                    },
            StorePlaceID:
                    {
                        maxlength: 50
                    },
            SignAddressID:
                    {
                        maxlength: 50
                    },
            CodeID: {
                required: true,
                maxlength: 50
            },
            ContentID:
                    {
                        maxlength: 1000
                    },
            RemarkID:
                    {
                        maxlength: 1000
                    }
        },
        ignore: ':hidden:not(.chzn-select)',
        errorPlacement: function (error, element) {
            if (element.next().html() == "*") {
                error.insertAfter(element.next());
            }
            else {
                if (element.is(":hidden")) {
                    //console.log(element.next().parent());
                    element.next().parent().append(error);
                }
                else {
                    error.insertAfter(element);
                }
            }
        }
    });
}