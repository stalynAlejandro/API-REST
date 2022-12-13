namespace clienteNet
{
    partial class Form1
    {
        /// <summary>
        /// Variable del diseñador necesaria.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Limpiar los recursos que se estén usando.
        /// </summary>
        /// <param name="disposing">true si los recursos administrados se deben desechar; false en caso contrario.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Código generado por el Diseñador de Windows Forms

        /// <summary>
        /// Método necesario para admitir el Diseñador. No se puede modificar
        /// el contenido de este método con el editor de código.
        /// </summary>
        private void InitializeComponent()
        {
            this.tbAddSonda = new System.Windows.Forms.TextBox();
            this.cbSondasConsultar = new System.Windows.Forms.ComboBox();
            this.cbAtributos = new System.Windows.Forms.ComboBox();
            this.descAddSonda = new System.Windows.Forms.TextBox();
            this.descConsultar = new System.Windows.Forms.TextBox();
            this.cbSondasModificar = new System.Windows.Forms.ComboBox();
            this.tbValor = new System.Windows.Forms.TextBox();
            this.descModificar = new System.Windows.Forms.TextBox();
            this.bConsultar = new System.Windows.Forms.Button();
            this.bEstablecer = new System.Windows.Forms.Button();
            this.label1 = new System.Windows.Forms.Label();
            this.label2 = new System.Windows.Forms.Label();
            this.label3 = new System.Windows.Forms.Label();
            this.button1 = new System.Windows.Forms.Button();
            this.SuspendLayout();
            // 
            // tbAddSonda
            // 
            this.tbAddSonda.Location = new System.Drawing.Point(49, 54);
            this.tbAddSonda.Name = "tbAddSonda";
            this.tbAddSonda.Size = new System.Drawing.Size(220, 20);
            this.tbAddSonda.TabIndex = 3;
            // 
            // cbSondasConsultar
            // 
            this.cbSondasConsultar.FormattingEnabled = true;
            this.cbSondasConsultar.Location = new System.Drawing.Point(49, 202);
            this.cbSondasConsultar.Name = "cbSondasConsultar";
            this.cbSondasConsultar.Size = new System.Drawing.Size(121, 21);
            this.cbSondasConsultar.TabIndex = 4;
            this.cbSondasConsultar.SelectedIndexChanged += new System.EventHandler(this.ComboBox1_SelectedIndexChanged);
            // 
            // cbAtributos
            // 
            this.cbAtributos.FormattingEnabled = true;
            this.cbAtributos.Location = new System.Drawing.Point(176, 202);
            this.cbAtributos.Name = "cbAtributos";
            this.cbAtributos.Size = new System.Drawing.Size(121, 21);
            this.cbAtributos.TabIndex = 5;
            this.cbAtributos.SelectedIndexChanged += new System.EventHandler(this.ComboBox2_SelectedIndexChanged);
            // 
            // descAddSonda
            // 
            this.descAddSonda.Location = new System.Drawing.Point(457, 40);
            this.descAddSonda.Multiline = true;
            this.descAddSonda.Name = "descAddSonda";
            this.descAddSonda.Size = new System.Drawing.Size(220, 84);
            this.descAddSonda.TabIndex = 6;
            this.descAddSonda.Text = "\r\n";
            // 
            // descConsultar
            // 
            this.descConsultar.Location = new System.Drawing.Point(457, 185);
            this.descConsultar.Multiline = true;
            this.descConsultar.Name = "descConsultar";
            this.descConsultar.Size = new System.Drawing.Size(220, 84);
            this.descConsultar.TabIndex = 7;
            this.descConsultar.TextChanged += new System.EventHandler(this.TextBox3_TextChanged);
            // 
            // cbSondasModificar
            // 
            this.cbSondasModificar.FormattingEnabled = true;
            this.cbSondasModificar.Location = new System.Drawing.Point(49, 357);
            this.cbSondasModificar.Name = "cbSondasModificar";
            this.cbSondasModificar.Size = new System.Drawing.Size(121, 21);
            this.cbSondasModificar.TabIndex = 8;
            // 
            // tbValor
            // 
            this.tbValor.Location = new System.Drawing.Point(188, 358);
            this.tbValor.Name = "tbValor";
            this.tbValor.Size = new System.Drawing.Size(121, 20);
            this.tbValor.TabIndex = 9;
            // 
            // descModificar
            // 
            this.descModificar.Location = new System.Drawing.Point(457, 344);
            this.descModificar.Multiline = true;
            this.descModificar.Name = "descModificar";
            this.descModificar.Size = new System.Drawing.Size(220, 84);
            this.descModificar.TabIndex = 10;
            this.descModificar.TextChanged += new System.EventHandler(this.DescModificar_TextChanged);
            // 
            // bConsultar
            // 
            this.bConsultar.Location = new System.Drawing.Point(327, 189);
            this.bConsultar.Name = "bConsultar";
            this.bConsultar.Size = new System.Drawing.Size(88, 34);
            this.bConsultar.TabIndex = 11;
            this.bConsultar.Text = "Consultar";
            this.bConsultar.UseVisualStyleBackColor = true;
            this.bConsultar.Click += new System.EventHandler(this.BConsultar_Click);
            // 
            // bEstablecer
            // 
            this.bEstablecer.Location = new System.Drawing.Point(327, 344);
            this.bEstablecer.Name = "bEstablecer";
            this.bEstablecer.Size = new System.Drawing.Size(88, 34);
            this.bEstablecer.TabIndex = 12;
            this.bEstablecer.Text = "Establecer";
            this.bEstablecer.UseVisualStyleBackColor = true;
            this.bEstablecer.Click += new System.EventHandler(this.Button3_Click);
            // 
            // label1
            // 
            this.label1.Font = new System.Drawing.Font("Arial Narrow", 14.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.label1.Location = new System.Drawing.Point(49, 23);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(131, 20);
            this.label1.TabIndex = 13;
            this.label1.Text = "Añadir Sondas";
            this.label1.Click += new System.EventHandler(this.Label1_Click);
            // 
            // label2
            // 
            this.label2.Font = new System.Drawing.Font("Arial Narrow", 14.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.label2.Location = new System.Drawing.Point(49, 179);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(131, 20);
            this.label2.TabIndex = 14;
            this.label2.Text = "Consultar valores";
            // 
            // label3
            // 
            this.label3.Font = new System.Drawing.Font("Arial Narrow", 14.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.label3.Location = new System.Drawing.Point(49, 334);
            this.label3.Name = "label3";
            this.label3.Size = new System.Drawing.Size(148, 20);
            this.label3.TabIndex = 15;
            this.label3.Text = "Modificar valor LED";
            // 
            // button1
            // 
            this.button1.Location = new System.Drawing.Point(327, 54);
            this.button1.Name = "button1";
            this.button1.Size = new System.Drawing.Size(88, 34);
            this.button1.TabIndex = 16;
            this.button1.Text = "Añadir Sonda";
            this.button1.UseVisualStyleBackColor = true;
            this.button1.Click += new System.EventHandler(this.Button1_Click);
            // 
            // Form1
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(699, 446);
            this.Controls.Add(this.button1);
            this.Controls.Add(this.label3);
            this.Controls.Add(this.label2);
            this.Controls.Add(this.label1);
            this.Controls.Add(this.bEstablecer);
            this.Controls.Add(this.bConsultar);
            this.Controls.Add(this.descModificar);
            this.Controls.Add(this.tbValor);
            this.Controls.Add(this.cbSondasModificar);
            this.Controls.Add(this.descConsultar);
            this.Controls.Add(this.descAddSonda);
            this.Controls.Add(this.cbAtributos);
            this.Controls.Add(this.cbSondasConsultar);
            this.Controls.Add(this.tbAddSonda);
            this.Name = "Form1";
            this.Text = "Aplicación.NET";
            this.Load += new System.EventHandler(this.Form1_Load);
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.TextBox tbAddSonda;
        private System.Windows.Forms.ComboBox cbSondasConsultar;
        private System.Windows.Forms.ComboBox cbAtributos;
        private System.Windows.Forms.TextBox descAddSonda;
        private System.Windows.Forms.TextBox descConsultar;
        private System.Windows.Forms.ComboBox cbSondasModificar;
        private System.Windows.Forms.TextBox tbValor;
        private System.Windows.Forms.TextBox descModificar;
        private System.Windows.Forms.Button bConsultar;
        private System.Windows.Forms.Button bEstablecer;
        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.Label label2;
        private System.Windows.Forms.Label label3;
        private System.Windows.Forms.Button button1;
    }
}

