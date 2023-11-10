# main.tf
provider "aws" {
  region = "us-east-1"  # Cambia a tu región preferida
}

resource "aws_db_instance" "mydb" {
  identifier           = "mydb-instance"
  allocated_storage    = 20
  engine               = "postgres"
  instance_class       = "db.t2.micro"
  name                 = "mydb"
  username             = "admin"
  password             = "your_password"  # Cambia a tu contraseña
  parameter_group_name = "default.postgres11"
}
