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
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        List<localhost.Sensor> listaSensores = new List<localhost.Sensor>();
        static int cont = 0;

        private void Button1_Click(object sender, EventArgs e)
        {
            String ip_port = tbAddSonda.Text;
            localhost.Sensor sensor = new localhost.Sensor();

            sensor.Url = "http://" + ip_port + "/Sensor/services/Sensor.SensorHttpSoap11Endpoint/";
            sensor.readSonda();

            bool exist = false;
            for (int i = 0; i < listaSensores.Count; i++)
            {
                if (sensor.Url == listaSensores[i].Url)
                {
                    exist = true;
                }
            }

            if (exist == false)
            {
                sensor.setNombre("Sensor " + ip_port);
                sensor.readSonda();
                listaSensores.Add(sensor);
            }
            escribirSondas();
        }
            
        private void escribirSondas()
        {

            cbAtributos.Items.Clear();
            descAddSonda.Clear();
            cbSondasConsultar.Items.Clear();
            cbSondasModificar.Items.Clear();

            descAddSonda.Text = "";
            for (int i = 0; i < listaSensores.Count; i++)
            {
                descAddSonda.Text += listaSensores[i].getNombre() + "\r\n";
                cbSondasConsultar.Items.Add(listaSensores[i].getNombre());
                cbSondasModificar.Items.Add(listaSensores[i].getNombre());
            }

            cbAtributos.Items.Add("Volumen");
            cbAtributos.Items.Add("Fecha");
            cbAtributos.Items.Add("Led");
        }


        private void Button3_Click(object sender, EventArgs e)
        {
            string nombreSensor = cbSondasModificar.Text;
            string newValue = tbValor.Text;

            for (int i = 0; i < listaSensores.Count; i++)
            {
                if (nombreSensor == listaSensores[i].getNombre())
                {
                    listaSensores[i].setLed(int.Parse(newValue), Login.user);
                    listaSensores[i].saveSensor();
                    descModificar.Text = listaSensores[i].getNombre() + " modificando.";
                    listaSensores[i].readSonda();
                }
            }

        }


        private void BConsultar_Click(object sender, EventArgs e)
        {
            string nombreSensor = cbSondasConsultar.Text;
            string valor = cbAtributos.Text;

            for (int i = 0; i < listaSensores.Count; i++)
            {
                if (nombreSensor == listaSensores[i].getNombre())
                {
                    descConsultar.Text = listaSensores[i].consultar(Encryptar(valor), Login.user);
                }
            }

        }

        private String Encryptar(string valor) {

            char[] ctr = valor.ToCharArray();

            StringBuilder s = new StringBuilder("");

            for (int i = 0; i < ctr.Length; i++) {
                s.Append(Char.ToString((char)(ctr[i] + (char)23)));
            }
            Console.WriteLine("Petición encriptada : " + s);
            return s.ToString();
        }

        private void Form1_Load(object sender, EventArgs e)
        {

        }
        private void Button2_Click(object sender, EventArgs e)
        {

        }
        private void TextBox3_TextChanged(object sender, EventArgs e)
        {

        }
        private void ComboBox2_SelectedIndexChanged(object sender, EventArgs e)
        {

        }
        private void ComboBox1_SelectedIndexChanged(object sender, EventArgs e)
        {

        }
        private void Label1_Click(object sender, EventArgs e)
        {

        }
        private void DescModificar_TextChanged(object sender, EventArgs e)
        {

        }
    }
}
