resource "aws_instance" "ec2_instances" {
  ami           = "ami-093467ec28ae4fe03"
  instance_type = "t2.micro"
  subnet_id     = var.aws_subnet_a_public_id
  key_name      = "hopesolutions"  # Reemplaza con el nombre real de tu clave existente
  iam_instance_profile = "terraform_prod"  # Usa el nombre del perfil IAM

  # Otras configuraciones necesarias, como grupos de seguridad, etc.

  user_data = <<-EOF
    #!/bin/bash
    docker run -d -p 8000:8000 165822899401.dkr.ecr.us-west-2.amazonaws.com/hopesolutions/sale-api:latest
    docker run -d -p 8001:8001 165822899401.dkr.ecr.us-west-2.amazonaws.com/hopesolutions/integration-api:latest
    docker run -d -p 8002:8002 165822899401.dkr.ecr.us-west-2.amazonaws.com/hopesolutions/inventory-api:latest
    docker run -d -p 8003:8003 165822899401.dkr.ecr.us-west-2.amazonaws.com/hopesolutions/warehouse-api:latest
    docker run -d -p 8004:8004 165822899401.dkr.ecr.us-west-2.amazonaws.com/hopesolutions/product-api:latest
    docker run -d -p 8005:8005 165822899401.dkr.ecr.us-west-2.amazonaws.com/hopesolutions/frontend:latest
  EOF
}
