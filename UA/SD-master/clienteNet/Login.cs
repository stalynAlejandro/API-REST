using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace clienteNet
{
    public partial class Login : Form
    {

        public static string user = "";

        string pass = " ";


        public Login()
        {
            InitializeComponent();
            tbPassword.UseSystemPasswordChar = true;

        }

        private void Button1_Click(object sender, EventArgs e)
        {
            string password = tbPassword.Text;
            string scr = EncryptAlgorithm.Encrypt(password);
            Console.WriteLine("Cadena encriptada >> " + scr + " <<");
            string dscr = EncryptAlgorithm.Decrypt(scr);
            Console.WriteLine("Cadena desencriptada >> " + dscr + " <<");

            if (user == tbUser.Text && scr == pass)
            {
                this.Hide();
                Form1 f1 = new Form1();
                f1.Show();

                using (System.IO.StreamWriter file =
                new System.IO.StreamWriter(@"C:\Users\EPS\Desktop\SD\clienteNet\log.txt", true))
                {
                    file.WriteLine("Usuario " + user + " conectado el " + DateTime.Now);
                }
            }
            else
            {
                Console.WriteLine(user + "/" + tbUser.Text);
                Console.WriteLine("Pas: " + pass);
                Console.WriteLine("SCR: " + scr);
            }
        }

        public bool validar(string user, string password)
        {
            return true;
        }

        private void Login_Load(object sender, EventArgs e)
        {
            string[] lines = System.IO.File.ReadAllLines(@"C:\Users\EPS\Desktop\SD\clienteNet\users.txt");
            user = lines[0];
            pass = lines[1];
        }
    }
}