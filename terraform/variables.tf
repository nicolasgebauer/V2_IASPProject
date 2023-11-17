variable "aws_access_key" {
  type = string
}

variable "aws_secret_key" {
  type = string
}

variable "aws_region" {
  type = string
}

variable "aws_account_id" {
  type = string
}

variable "aws_repository_name" {
  type = string
}

variable "db_name" {
  type = string
}

variable "db_username" {
  type = string
}

variable "db_password" {
  type = string
}

variable "aws_vpc_id" {
  type = string
}

variable "aws_subnet_a_public_id" {
  type = string
}

variable "aws_subnet_a_private_id" {
  type = string
}

variable "aws_subnet_b_public_id" {
  type = string
}

variable "aws_subnet_b_private_id" {
  type = string
}

variable "aws_subnet_c_public_id" {
  type = string
}

variable "aws_subnet_c_private_id" {
  type = string
}

variable "aws_subnet_d_public_id" {
  type = string
}

variable "aws_subnet_d_private_id" {
  type = string
}

variable "aws_security_group_id" {
  type = string
}

variable "ecs_cluster_name" {
  type = string
}

variable "ecs_task_family" {
  type = string
}

variable "ecs_service_name" {
  type = string
}

variable "ecs_desired_count" {
  type = number
}
