using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using NHibernate;
using NHibernate.Linq;
using OpaqSysSetMvc.Models;

namespace OpaqSysSetMvc.Controllers
{
    [HandleError]
    public class HomeController : Controller
    {
        public ISession DbSession
        {
            get
            {
                return Netposa.Framework.Repositories.NHibernateDatabaseFactory.GetSession();
            }
        }
        public ActionResult Index()
        {
            ViewData["Message"] = "Welcome to ASP.NET MVC!";

            var session = Netposa.Framework.Repositories.NHibernateDatabaseFactory.GetSession();
            var sqls = new List<string>
                           {
                               "SELECT * FROM opaq_2.opaq_sys_big_table",
                               "select * from opaq_2.opaq_sys_database ",
                               "select * from opaq_2.opaq_sys_biginfo"
                           };
            sqls.ForEach(m =>
            {
                var list = session.CreateSQLQuery(m).List();
                Console.WriteLine(list.Count);
            });
            return View();
        }

        public ActionResult About()
        {
            return View();
        }

        public JsonResult DbPage(int? p = 0)
        {

            return Json("");
        }
        public ActionResult DbList()
        {
            return View("DbList");
        }
        public ActionResult DbQuery(int page = 1, int rows = 10)
        {
            //string sql = "select * from opaq_2.opaq_sys_database";
            //var query = DbSession.CreateSQLQuery(sql);

            //var list = query.SetMaxResults(rows).SetFirstResult((page - 1) * rows).List();
            var query = this.DbSession.Query<OpaqSysSet.Model.Database>();
            var list = this.DbSession.Query<OpaqSysSet.Model.Database>().Take(rows).Skip((page - 1) * rows).ToList();
            var data = new
                           {
                               total = query.Count(),
                               rows = list.Select(m => new { Id = m.Id, m.Host, m.Pass, m.Port, m.User, m.DbType ,m.Db})
                           }
                ;
            return Json(data, JsonRequestBehavior.AllowGet);
        }

        public ActionResult BigTableList()
        {
            return View("BigTableList");
        }
        public ActionResult BigTableQuery(int page = 1, int rows = 10)
        {
            string sql = "SELECT * FROM opaq_2.opaq_sys_big_table";
            var query = DbSession.CreateSQLQuery(sql);

            var list = query.SetMaxResults(rows).SetFirstResult((page - 1) * rows).List();
            var data = new
            {
                total = DbSession.GetSqlCount(sql),
                rows = new object[0]
            }
                ;
            return Json(data, JsonRequestBehavior.AllowGet);
        }
        public ActionResult BiginfoList()
        {
            return View("BiginfoList");
        }
        public ActionResult BiginfoQuery(int page = 1, int rows = 10)
        {
            string sql = "select * from opaq_2.opaq_sys_biginfo";
            var query = DbSession.CreateSQLQuery(sql);

            var list = query.SetMaxResults(rows).SetFirstResult((page - 1) * rows).List();
            var data = new
            {
                total = DbSession.GetSqlCount(sql),
                rows = new object[0]
            }
                ;
            return Json(data, JsonRequestBehavior.AllowGet);
        }
    }
}
