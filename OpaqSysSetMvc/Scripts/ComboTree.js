(function ($) {
    'use strict';
    var ComboTree = function (setting, this_input) {
        this.targetDrop = this_input;   //下拉框控件
        this.setting = setting;         //配置参数
        return this;
    };

    ComboTree.prototype = {
        init: function () {

            var dropDown = $("#" + this.targetDrop.attr("id"));
            if (0) {
                alert(this.controllerIndex);
            }
            else {
                var controllerIndex = $(".ztree").length + 1;
                this.controllerIndex = controllerIndex;
                var currentCombo = this;
                this.targetDrop.attr("controllerIndex", controllerIndex);
                // this.targetDrop.attr("disabled", 'disabled');
                this.targetDrop.addClass("ComboTree");
                /*
                *	初始化Dom树
                */
                var divToParent = '<div id="artDialog_' + controllerIndex + '" style="display: none; background: #FFFFFF; border: 1px solid #000000">' +
            '<ul id="treeDemo_' + controllerIndex + '" class="ztree"></ul> </div>';
                var span = '<span id="DropDownListSelectedText_' + controllerIndex + '"></span>';
                $('body').append(divToParent);
                var tbStr = '<table id="ComboTreeTable_' + controllerIndex + '" cellspacing="0" cellpadding="0" style="border-style:none;"><tbody><tr><td class="ali01" style="border-style:none;padding:0;margin:0;">'
             + '  <input id="DropDownListSelectedText_' + controllerIndex + '" type="text" class="selectbox" autocomplete="off" readonly="readonly" tabindex="0" style="width: '
             + currentCombo.setting.width + ';height: ' + currentCombo.setting.height + '; cursor: pointer;">'
             + '</td><td class="ali01" style="border-style:none;;padding:0;margin:0;">'
             + '<input type="button" value=" " class="selBtn" id="button_' + controllerIndex + '"></td></tr></tbody></table>';
                $('body').append(tbStr);

                WindowResize();

                //    BindControler(this.targetDrop, controllerIndex);

                /*
                *	绑定下拉框点击事件
                */
                $(document).click(function (event) {
                    var target = $(event.target);
                    if (!target.is('#artDialog_' + currentCombo.controllerIndex) && !target.is('#ComboTreeTable_' + currentCombo.controllerIndex)
                 && !target.is('#ComboTreeTable_' + controllerIndex)) {
                        if (target.parents('#artDialog_' + currentCombo.controllerIndex).length == 0 &&
                     $('#artDialog_' + currentCombo.controllerIndex).is(":visible") && target.parents('#ComboTreeTable_' + currentCombo.controllerIndex).length == 0) {
                            $('#artDialog_' + currentCombo.controllerIndex).hide();
                        }
                    }
                });

                $('#ComboTreeTable_' + controllerIndex).click(function (evt) {
                    var iSShow = $('#artDialog_' + controllerIndex).is(":visible");
                    if (iSShow) {
                        $('#artDialog_' + controllerIndex).hide();
                        return;
                    }
                    $('#artDialog_' + currentCombo.controllerIndex).show();
                    WindowResize();
                });
                $('#artDialog_' + currentCombo.controllerIndex).css("overflow-x", "hidden");
                $('#artDialog_' + currentCombo.controllerIndex).css("overflow-y", "auto");
                BindTreeData(currentCombo.setting, currentCombo.controllerIndex, this.targetDrop);
                //窗口大小调整监听
                $(window).resize(currentCombo, WindowResize);
            }
        }
    };

    function BindTreeData(setting, comboIndex, controller) {
        $('#DropDownListSelectedText_' + comboIndex).val("请选择");
        var DeptSetting = { data: {
            simpleData: {
                enable: true
            }
        },
            callback: { onClick: function () {
                var zTree = $.fn.zTree.getZTreeObj("treeDemo_" + comboIndex);
                var nodes = zTree.getSelectedNodes();
                $('#artDialog_' + comboIndex).hide();
                var currentChoosedItem = nodes.length > 0 ? nodes[0] : null;

                SetSelectedValue(comboIndex, currentChoosedItem, controller);
                //调用回调函数
                setting.callback(currentChoosedItem);
            }
            }
        };
        $.post(setting.HandlerUrl, setting.postParams, function InitialCallBack(data) {
            if (data.Success) {
                $.fn.zTree.init($("#treeDemo_" + comboIndex), DeptSetting, data.Data);

                //加载完树以后，绑定初始数据
                if (setting.selectedId) {
                    SetTreeSelectedItem(comboIndex, setting.selectedId, controller);
                }
                WindowResize();
            }
        }, 'json');
    }

    function WindowResize() {
        $(".ComboTree").each(function (i, e) {
            var cob = $(this);
            var comboIndex = $(this).attr("controllerIndex");
            var artWidth = parseInt($('#DropDownListSelectedText_' + comboIndex).css("width").replace("px", "")) + 20;
            $(this).css({ width: artWidth.toString() + "px" });
            var posAbsolute = GetPostion(document.getElementById($(this).prop("id")));
            $("#ComboTreeTable_" + comboIndex).css({ position: "absolute", top: posAbsolute.y, left: posAbsolute.x });

            var pos = GetPostion(document.getElementById("ComboTreeTable_" + comboIndex));
            var height = $(this).css("fontSize").replace("px", "");
            var allheight = parseInt(height) + pos.y + 12;
            var artWidth = parseInt($("#artDialog_" + comboIndex).css("fontSize").replace("px", ""));
            $("#artDialog_" + comboIndex).css({ position: "absolute", width: 'auto', top: allheight, left: pos.x - artWidth * 0.5, maxHeight: 350 });
        });
    }

    function BindControler(controller, index) {
        var artWidth = parseInt($('#DropDownListSelectedText_' + index).css("width").replace("px", "")) + 15;
        controller.css({ width: artWidth });
        var posAbsolute = GetPostion(document.getElementById(controller.prop("id")));
        $("#ComboTreeTable_" + index).css({ position: "absolute", top: posAbsolute.y - 2, left: posAbsolute.x });
    }

    function SetSelectedValue(index, item, controller) {
        var controllerId = controller.attr("id");
        $("#" + controllerId).find("option").remove();
        var myStr = "<option  selected='selected' value='" + item.id + "'>" + item.name + "</option>";
        $("#" + controllerId).val(item.id);
        $('#DropDownListSelectedText_' + index).val(item != null ? item.name : "请选择");
    }

    function SetTreeSelectedItem(index, selectedId, controller) {
        var zTree = $.fn.zTree.getZTreeObj("treeDemo_" + index);
        var selectedNode = zTree.getNodesByParam("id", selectedId, null); ;
        if (selectedNode) {
            var currentChoosedItem = selectedNode[0];
            zTree.selectNode(currentChoosedItem);
            SetSelectedValue(index, currentChoosedItem, controller);
        }
    }
    function GetPostion(e) {
        var x = e.offsetLeft;
        var y = e.offsetTop;
        while (e = e.offsetParent) {
            x += e.offsetLeft;
            y += e.offsetTop;
        }
        return { x: x, y: y };
    }
    $.fn.Refresh = function (setting) {
        return this.each(function () {
            var comboIndex = $(this).attr("controllerIndex");
            $(this).val("");
            BindTreeData(setting, comboIndex, $(this));
        });
    };
    $.fn.ComboTree = function (config) {
        return this.each(function () {
            var combotree, setting = $.extend({}, $.fn.ComboTree.config, config);
            combotree = new ComboTree(setting, $(this));
            combotree.init();
        });
    }
    $.fn.ComboTree.config = {
        width: '124px',
        height: '20px',
        callback: function (data) {
            return false;
        }
    }
})(jQuery);
