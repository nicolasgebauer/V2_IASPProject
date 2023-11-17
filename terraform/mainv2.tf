# module "ecr" {
#   source = "./ecr"
  
#   aws_repository_name = var.aws_repository_name
# }

# module "rds" {
#   source = "./rds"
  
#   aws_repository_name      = var.aws_repository_name
#   aws_subnet_a_private_id  = var.aws_subnet_a_private_id
#   aws_subnet_b_private_id  = var.aws_subnet_b_private_id
#   aws_subnet_c_private_id  = var.aws_subnet_c_private_id
#   aws_subnet_d_private_id  = var.aws_subnet_d_private_id
#   db_username              = var.db_username
#   db_password              = var.db_password
#   aws_security_group_id    = var.aws_security_group_id
# }


# module "lb" {
#   source = "./lb"

#   aws_access_key          = var.aws_access_key          
#   aws_secret_key          = var.aws_secret_key          
#   aws_region              = var.aws_region              
#   aws_security_group_id   = var.aws_security_group_id  
#   aws_subnet_a_private_id  = var.aws_subnet_a_private_id  
#   aws_subnet_b_private_id  = var.aws_subnet_b_private_id 
#   aws_subnet_c_private_id  = var.aws_subnet_c_private_id 
#   aws_subnet_d_private_id  = var.aws_subnet_d_private_id 
#   aws_vpc_id              = var.aws_vpc_id              
# }


# module "cluster" {
#   source = "./cluster"

#   ecs_cluster_name = var.ecs_cluster_name
# }

# module "ec2_task" {
#   source              = "./ec2_task"
#   ecr_repository_url  = module.ecr.ecr_repository_url
#   ecs_cluster_id      = module.cluster.id
#   aws_subnet_a_private_id  = var.aws_subnet_a_private_id
#   aws_subnet_b_private_id  = var.aws_subnet_b_private_id
#   aws_security_group_id = var.aws_security_group_id
# }