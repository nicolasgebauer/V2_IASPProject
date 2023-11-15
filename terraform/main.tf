# main.tf

module "ecr" {
  source = "./ecr"
  
  aws_repository_name = var.aws_repository_name
}

module "rds" {
  source = "./rds"
  
  aws_repository_name = var.aws_repository_name
  aws_subnet_a_private_id = var.aws_subnet_a_private_id
  aws_subnet_b_private_id = var.aws_subnet_b_private_id
  aws_subnet_c_private_id = var.aws_subnet_c_private_id
  aws_subnet_d_private_id = var.aws_subnet_d_private_id
  db_username = var.db_username
  db_password = var.db_password
  aws_security_group_id = var.aws_security_group_id
}


