using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Netposa.Framework;


namespace WebCrm.Web.Admin
{
    public partial class default_easyui : Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
                GetAllPlugList();
        }
        public IList<Plug> plugList;
        public IList<Plug> allPlugList;
        private void GetAllPlugList()
        {
            allPlugList = new List<Plug>();
            plugList = new List<Plug>();
        }
    }
    public class Plug
    {
        public virtual int Id { get; set; }
        public virtual Plug Parent { get; set; }

        /// <summary>
        /// 填写插件文件的文件名
        /// </summary>
        public virtual string PlugCode { get; set; }

        /// <summary>
        /// 模块名称
        /// </summary>
        public virtual string PlugName { get; set; }

        /// <summary>
        /// 线下插件文件名，具体模块文件名称
        /// </summary>
        public virtual string PlugFile { get; set; }

        /// <summary>
        /// 页面地址
        /// </summary>
        public virtual string PlugWebFile { get; set; }


        public virtual int FileType { get; set; }


        public virtual int PlugType { get; set; }


        public virtual int Sort { get; set; }

        /// <summary>
        /// 启用状态：0、不启用 1、启用
        /// </summary>
        public virtual bool State { get; set; }


        public virtual string Version { get; set; }


        public virtual string VersionWeb { get; set; }


        public virtual string ShortCut { get; set; }


        public virtual int ImageIndex { get; set; }


        public virtual int GroupHead { get; set; }


        public virtual int RefreshData { get; set; }


        public virtual int SaveData { get; set; }


        public virtual int SaveToExcel { get; set; }


        public virtual int ImportData { get; set; }


        public virtual int ExportData { get; set; }


        public virtual int PrintSetup { get; set; }


        public virtual int PrintFlag { get; set; }


        public virtual int PrintPreview { get; set; }


        public virtual int FindValue { get; set; }

        /// <summary>
        /// 备注
        /// </summary>
        public virtual string Remark { get; set; }

        /// <summary>
        /// 操作员
        /// </summary>
        public virtual string OptorCode { get; set; }
        public virtual string RunArgs { get; set; }
    }
}