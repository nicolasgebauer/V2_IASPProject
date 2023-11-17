# # ec2_task/iam.tf

# resource "aws_iam_role" "ecs_task_execution_role" {
#   name = "ecs-task-execution-role"

#   assume_role_policy = jsonencode({
#     Version = "2012-10-17",
#     Statement = [{
#       Action = "sts:AssumeRole",
#       Effect = "Allow",
#       Principal = {
#         Service = "ecs-tasks.amazonaws.com",
#       },
#     }],
#   })
# }

# resource "aws_iam_role_policy_attachment" "ecs_task_execution_role_attachment" {
#   policy_arn = "arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryFullAccess"  # Ejemplo de permisos de ECR
#   role       = aws_iam_role.ecs_task_execution_role.name
# }

# # Otras políticas de permisos pueden agregarse según sea necesario
