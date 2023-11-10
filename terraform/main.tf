# main.tf

module "rds" {
  source = "./rds"
  
  aws_access_key            = var.aws_access_key
  aws_secret_key            = var.aws_secret_key
  aws_region                = var.aws_region
  db_name                   = var.db_name
  db_username               = var.db_username
  db_password               = var.db_password
  aws_vpc_id                = var.aws_vpc_id
  aws_subnet_a_private_id   = var.aws_subnet_a_private_id
  aws_subnet_b_private_id   = var.aws_subnet_b_private_id
  aws_subnet_c_private_id   = var.aws_subnet_c_private_id
  aws_subnet_d_private_id   = var.aws_subnet_d_private_id
  aws_subnet_a_public_id    = var.aws_subnet_a_public_id
  aws_subnet_b_public_id    = var.aws_subnet_b_public_id
  aws_subnet_c_public_id    = var.aws_subnet_c_public_id
  aws_subnet_d_public_id    = var.aws_subnet_d_public_id
  aws_security_group_id     = var.aws_security_group_id
}
