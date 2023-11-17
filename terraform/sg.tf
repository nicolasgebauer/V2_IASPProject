# resource "aws_security_group" "sg_lb" {
#   name        = "HopeSolutions Security Group"
#   description = "HS - Security Group"
#   vpc_id      = var.aws_vpc_id

#   ingress {
#     from_port   = "80"
#     to_port     = "80"
#     protocol    = "tcp"
#     cidr_blocks = ["0.0.0.0/0"]
#     description = "Habilita el acceso HTTP al puerto 80"
#   }

#   ingress {
#     from_port   = "8080"
#     to_port     = "8080"
#     protocol    = "tcp"
#     cidr_blocks = ["0.0.0.0/0"]
#     description = "Habilita el acceso HTTP al puerto 8080"
#   }

#   egress {
#     from_port   = "0"
#     to_port     = "0"
#     protocol    = "-1"
#     cidr_blocks = ["0.0.0.0/0"]
#   }

#   tags = {
#     Name    = "HopeSolutions Security Group"
#   }
# }

# resource "aws_security_group" "sg_service" {
#   name        = "HopeSolutions Security Group_001"
#   description = "$HopeSolutions - Security Group"
#   vpc_id      = var.aws_vpc_id

#   # INGRESS RULES
#   ingress {
#     from_port       = "80"
#     to_port         = "80"
#     protocol        = "tcp"
#     security_groups = [aws_security_group.sg_lb.id]
#     description     = "Habilita el acceso HTTP al puerto 80"
#   }

#   ingress {
#     from_port       = "8080"
#     to_port         = "8080"
#     protocol        = "tcp"
#     security_groups = [aws_security_group.sg_lb.id]
#     description     = "Habilita el acceso HTTP al puerto 8080"
#   }

#   egress {
#     from_port   = "0"
#     to_port     = "0"
#     protocol    = "-1"
#     cidr_blocks = ["0.0.0.0/0"]
#   }

#   tags = {
#     Name    = "HopeSolutions Security Group_001"
#   }
# }