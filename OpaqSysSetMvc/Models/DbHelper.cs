using System;
using System.Configuration;
using System.Data;
using MySql.Data.MySqlClient;
using NHibernate;

namespace OpaqSysSetMvc.Models
{
    public static class DbHelper //: IDisposable
    {
        public static int GetSqlCount(this ISession session,string sql)
        {
            return int.Parse(
                 session.CreateSQLQuery(string.Format("Select Count(1) As RowCount From ({0})  _NewTable ", sql)).
                    UniqueResult().ToString());
        }

        //MySqlConnection _mysqlcon = null;
        //public string ConnectionString
        //{
        //    get
        //    {
        //        return ConfigurationManager.ConnectionStrings["opaqset"].ConnectionString;
        //    }
        //}
        //public void NewConnect()
        //{
        //    try
        //    {
        //        _mysqlcon = new MySqlConnection(ConnectionString);
        //        _mysqlcon.Open();

        //    }
        //    catch (System.Exception ex)
        //    {
        //        throw new Exception(ex.Message);
        //    }

        //}
        //public DataTable Query(string sqlstr)
        //{
        //    MySqlDataAdapter mda = new MySqlDataAdapter(sqlstr, _mysqlcon);
        //    DataTable dt = new DataTable();
        //    try
        //    {
        //        mda.Fill(dt);
        //    }
        //    catch (System.Data.SqlClient.SqlException ex)
        //    {
        //    }
        //    return dt;
        //}
        //public void Exec(string sqlstr)
        //{
        //    MySqlCommand cmd = new MySqlCommand(sqlstr);

        //    cmd.Connection = _mysqlcon;
        //    cmd.Prepare();
        //    cmd.ExecuteNonQuery();
        //}
        //public void CloseConnect()
        //{
        //    _mysqlcon.Close();
        //}

        //public void Dispose()
        //{
        //    this.CloseConnect();
        //}
    }
}