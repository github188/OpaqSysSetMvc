/// <reference path="jquery-2.0.0.min.js" />

(function ($) {
    'use strict';
    var AreaSelect = function (setting, this_input) {
        this.targetDrop = this_input;   //下拉框控件
        this.setting = setting;         //配置参数
        return this;
    };

    AreaSelect.prototype = {
        init: function () {

            var current = $(this).get(0);
            var className = "area_select_dialog";
            var currentIndex = $(className).length + 1;
            var targetInput = current.targetDrop
            targetInput.addClass(className);
            targetInput.attr("cursor", "pointer");

            var initialing = true;
            var divContent = $('<div id="area_select_dialog_id_' + currentIndex + '" style="display: none;z-index:2000;width:500px;height:50px; background: #FFFFFF; border: 2px solid #000000"></div>');
            var selectProvince = $('<select id="province_select_id_' + currentIndex + '" style="width: 100px;margin-left:10px;margin-top:10px"></select>');
            var selectCity = $('<select id="city_select_id_' + currentIndex + '" style="width: 100px;margin-left:10px;margin-top:10px"></select>');
            var selectArea = $('<select id="area_select_id_' + currentIndex + '" style="width: 100px;margin-left:10px;margin-top:10px"></select>');
            var inputClose = $('<input type="button" value="关闭" style="margin-left:10px;margin-top:10px" />');
            var selectCountryArea = $('<select id="country_area_select_id_' + currentIndex + '" style="width: 100px;margin-left:10px;margin-top:10px"></select>');

            if (current.setting.enablecCountryArea) {
                divContent.append(selectCountryArea);
            }
            divContent.append(selectProvince);
            divContent.append(selectCity);
            divContent.append(selectArea);
            divContent.append(inputClose);
            targetInput.after(divContent);

            var resize = function () {
                WindowResize(divContent, targetInput);
            }
            resize();

            targetInput.click(function (event) {
                if (divContent.is(":visible")) {
                    divContent.hide();
                }
                else
                    divContent.show();
            });
            inputClose.click(function (event) {
                divContent.hide();
            });

            //国家区域选定回调
            var postBackProvince = function () {
                var countryAreaId = selectCountryArea.find("option:selected").val();
                getData(current.setting.url, { countryArea: countryAreaId, categoryCode: current.setting.categoryCode }, selectProvince, postBackCity, current.setting.EmptyText);
            };
            //省份选定回调
            var postBackCity = function () {
                var provinceId = selectProvince.find("option:selected").val();
                getData(current.setting.url, { parentId: provinceId }, selectCity, postBackArea, current.setting.EmptyText);
            };
            //城市选定回调
            var postBackArea = function () {
                var cityId = selectCity.find("option:selected").val();
                getData(current.setting.url, { parentId: cityId }, selectArea, areaBack, current.setting.EmptyText);
            };

            //选中值显示在控件上
            var areaBack = function () {
                var combinedValue;      //组合起来的文本
                var areaId;             //最后一级的Id
                var minLevel = current.setting.minLevel;    //配置的最后一级

                //启用区域分级
                if (!current.setting.EmptyText) {
                    if (minLevel == "area") {
                        combinedValue = (provinceValue != "" ? selectProvince.find("option:selected").text() : "") + selectCity.find("option:selected").text() + selectArea.find("option:selected").text();
                        areaId = selectArea.find("option:selected").val();
                    }
                    else if (minLevel == "city") {
                        combinedValue = selectProvince.find("option:selected").text() + selectCity.find("option:selected").text();
                        areaId = selectCity.find("option:selected").val();
                    }
                    else if (minLevel == "province") {
                        combinedValue = selectProvince.find("option:selected").text();
                        areaId = selectProvince.find("option:selected").val();
                    }
                }
                //有'请选择'文本，则不启用区域分级
                else {
                    var countryAreaValue = selectCountryArea.find("option:selected").val();
                    var provinceValue = selectProvince.find("option:selected").val();
                    var provinceText = selectProvince.find("option:selected").text();
                    var cityValue = selectCity.find("option:selected").val();
                    var cityText = selectCity.find("option:selected").text();
                    var areaValue = selectArea.find("option:selected").val();
                    var areaText = selectArea.find("option:selected").text();
                    combinedValue = (provinceValue != "" ? provinceText : "") +
                     (cityValue != "" ? cityText : "") + (areaValue != "" ? areaText : "");
                    if (!combinedValue)
                    { combinedValue = selectCountryArea.find("option:selected").text(); }
                    minLevel = (areaValue != "" ? "area" : (cityValue != "" ? "city" : (provinceValue != "" ? "province" : "countryArea")));
                    areaId = (areaValue != "" ? areaValue : (cityValue != "" ? cityValue : (provinceValue != "" ? provinceValue : countryAreaValue)));
                }

                //显示控件值绑定
                if (!initialing) {
                                    targetInput.val(combinedValue);
                    targetInput.attr("title", combinedValue);
                    targetInput.attr("AreaId", areaId);
                    targetInput.attr("AreaLevel", minLevel);
                }


                //隐藏控件值绑定
                if (current.setting.aspHideId) {
                    var aspHideValue = $("#" + current.setting.aspHideId).val();
                    if (initialing) {
                        if (aspHideValue && !isNaN(aspHideValue)) {
                            getAreaData(current.setting.url, { id: aspHideValue }, targetInput, $("#" + current.setting.aspHideId));
                        }
                        else if (isNaN(aspHideValue)) {
                            // selectCountryArea.find("option[value='" + aspHideValue + "']").attr("selected", true);
                            //显示控件值绑定
                            targetInput.val(aspHideValue);
                        }
                        initialing = false;
                     //   if (!aspHideValue) {
                           // $("#" + current.setting.aspHideId).val(areaId);
                      //  }
                    }
                    else {
                        $("#" + current.setting.aspHideId).val(areaId);
                    }
                }

                if (current.setting.aspHideTypeId) {
                    $("#" + current.setting.aspHideTypeId).val(minLevel);
                }
            };

            //初始化  不启用国家区域，初始化省份
            if (!current.setting.enablecCountryArea) {
                getData(current.setting.url, { categoryCode: current.setting.categoryCode }, selectProvince, postBackCity, current.setting.EmptyText);
            }
            //初始化国家区域
            else {
                selectCountryArea.html(GetOptionHtml(current.setting.countryAreas));
                postBackProvince();
            }
            //各下拉框选定触发 
            selectCountryArea.change(postBackProvince);
            selectProvince.change(postBackCity);
            selectCity.change(postBackArea);
            selectArea.change(areaBack);
            //窗口大小调整监听
            $(window).resize(resize);
        }
    };

    function WindowResize(element, targetEle) {
        var offset = targetEle.offset();
        var leftPos;
        if (offset.left + element.width() > $(window).width()) {
            leftPos = offset.left + targetEle.width() - element.width();
        }
        else {
            leftPos = offset.left;
        }
        $(element).css({ position: "absolute", top: offset.top + targetEle.height() + 8, left: leftPos });
    }
    function getData(url, params, targetInput, postBack, EmptyText) {
        $.post(url, params, function (data) {
            targetInput.html(GetOptionHtml(data, EmptyText));
            postBack();
        }, 'json');
    }

    function getAreaData(url, params, targetInput, hideInput) {
        $.post(url, params, function (data) {
            targetInput.val(data.name);
            targetInput.attr("title", data.name);
            hideInput.val(data.id);
        }, 'json');
    }

    function GetOptionHtml(options, EmptyText) {
        var optionHtml = "";
        if (EmptyText) {
            optionHtml += "<option value='' selected='selected' >请选择</option>";
        }
        $(options).each(function (index, element) {
            var selected = "";
            if (index == 0 && !EmptyText) selected = " selected='selected' "
            optionHtml += "<option value='" + element.id + "' " + selected + ">" + element.name + "</option>";
        });
        return optionHtml;
    }

    $.fn.AreaSelect = function (config) {

        return this.each(function () {
            var areaSelect, setting = $.extend({}, $.fn.AreaSelect.config, config);
            areaSelect = new AreaSelect(setting, $(this));
            areaSelect.init();
        });
    }

    $.fn.AreaSelect.config = {
        enablecCountryArea: true,
        callback: function (data) {
            return false;
        },
        countryAreas: [{ id: "", name: "全部" }, { id: "华东地区", name: "华东地区" },
        { id: "东北地区", name: "东北地区" }, { id: "华北地区", name: "华北地区" },
         { id: "西南地区", name: "西南地区" }, { id: "中南地区", name: "中南地区" },
         { id: "西北地区", name: "西北地区"}],
        categoryCode: "CustomerArea",
        aspHideId: "SysArea",
        minLevel: "area",
        aspHideTypeId: "HiddenAreaType",
        showEmptyRow: false
    }
})(jQuery);
