using Microsoft.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataContext.MyDbQuery
{

    public class MyQuery
    {
        public static async Task<DataTable> GetData(string sql,string strConn ,CommandType type,SqlParameter[] parameters)
        {
            using(SqlConnection conn=new SqlConnection(strConn))
            {
                await conn.OpenAsync();
                try
                {
                    using (SqlCommand cmd = new SqlCommand(sql,conn))
                    {
                        cmd.CommandType = type;
                        cmd.Parameters.Clear();
                        if (parameters != null)
                        {
                            foreach (var i in parameters)
                            {
                                cmd.Parameters.Add(i);
                            }
                        }

                        DataTable dt = new DataTable();
                        dt.Load(await cmd.ExecuteReaderAsync());
                        return dt;

                    }
                }
                catch (Exception ex) {
                    throw ex;
                }
                finally { await conn.CloseAsync(); }
            }
        }

        public static async Task<int> ThaoTacBang(string sql, string strConn, CommandType type,SqlParameter[] parameters)
        {
            using(SqlConnection con=new SqlConnection(strConn))
            {
                await con.OpenAsync();
                try
                {
                    using (SqlCommand cmd = new SqlCommand(sql,con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;

                        cmd.Parameters.Clear();
                        if (parameters != null)
                        {
                            foreach (var i in parameters)
                            {
                                cmd.Parameters.Add(i);
                            }
                        }

                        return await cmd.ExecuteNonQueryAsync();
                    }
                }
                catch (Exception ex) {
                    throw ex;
                }finally { await con.CloseAsync(); }
            }
        }


    }
}
