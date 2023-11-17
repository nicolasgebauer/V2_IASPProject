

# main.tf

resource "aws_ecs_cluster" "hopesolutions-cluster" {
  name = var.ecs_cluster_name
}

output "ecs_cluster_id" {
  value = aws_ecs_cluster.hopesolutions-cluster.id
}

# Define un servicio ECS
resource "aws_ecs_service" "example_service" {
  name            = "example-service"
  cluster         = aws_ecs_cluster.hopesolutions-cluster.id
  task_definition = aws_ecs_task_definition.example_task.arn
  launch_type     = "EC2"
  desired_count   = 1
}

# Define una tarea ECS
resource "aws_ecs_task_definition" "example_task" {
  family                   = "example-task"
  network_mode             = "awsvpc"
  requires_compatibilities = ["EC2"]

  execution_role_arn = aws_iam_role.ecs_task_execution_role.arn

  container_definitions = jsonencode([{
    name  = "example-container"
    image = "tu-repo-de-ecr/tu-imagen:tu-tag",  # Reemplaza con la información de tu imagen en ECR
    memory = 512  # Puedes ajustar este valor según tus necesidades
  }])
}

# Define un rol IAM para la tarea ECS
resource "aws_iam_role" "ecs_task_execution_role" {
  name = "ecs-task-execution-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [{
      Action = "sts:AssumeRole",
      Effect = "Allow",
      Principal = {
        Service = "ecs-tasks.amazonaws.com"
      }
    }]
  })
}

# Adjunta una política de ejecución a la tarea ECS
resource "aws_iam_role_policy_attachment" "ecs_task_execution_role_attachment" {
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
  role       = aws_iam_role.ecs_task_execution_role.name
}
