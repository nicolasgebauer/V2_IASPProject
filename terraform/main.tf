##################### RDS #####################

# resource "aws_db_instance" "postgres_instance" {
#   identifier            = "my-postgres-db"
#   allocated_storage    = 20
#   engine               = "postgres"
#   engine_version       = "15.4"
#   instance_class       = "db.t3.micro"  # Cambia a una clase de instancia compatible
#   username             = var.db_username
#   password             = var.db_password
#   vpc_security_group_ids = [var.aws_security_group_id]
#   skip_final_snapshot  = true
#   multi_az             = true
#   publicly_accessible  = false
#   db_subnet_group_name = aws_db_subnet_group.my_db_subnet_group.name

#   tags = {
#     Name = "MyPostgresDB"
#   }
# }


# output "rds_endpoint" {
#   value = aws_db_instance.postgres_instance.endpoint
# }


# data "aws_iam_role" "administrator_access_role" {
#   name = "AWSReservedSSO_AWSAdministratorAccess_975251f0d84d1f83"
# }

# resource "aws_db_subnet_group" "my_db_subnet_group" {
#   name       = "my-db-subnet-group"
#   subnet_ids = [
#     var.aws_subnet_a_private_id,
#     var.aws_subnet_b_private_id,
#     var.aws_subnet_c_private_id,
#     var.aws_subnet_d_private_id,
#   ]
# }

# resource "aws_cloudwatch_log_group" "hopesolutions_log_group" {
#   name = "/ecs/hopesolutions-task"
# }

module "ecr" {
  source              = "./ecr"
  aws_repository_name = var.aws_repository_name
}