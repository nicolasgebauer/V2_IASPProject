data "aws_iam_role" "ecs_task_execution_role" {
  name = "ecs-task-execution-role"
}

resource "aws_cloudwatch_log_group" "hopesolutions_log_group" {
  name = "ecs/hopesolutions"
  tags = {
    Environment = "production"
    Application = "HopeSolutions"
  }
}

resource "aws_iam_role_policy_attachment" "ecs_task_execution_role_attachment" {
  policy_arn = "arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryReadOnly"
  role       = data.aws_iam_role.ecs_task_execution_role.name
}

resource "aws_ecs_task_definition" "hopesolutions_task" {
  family                   = "hopesolutions-task"
  requires_compatibilities = ["FARGATE"]
  memory                   = 512
  cpu                      = 256
  network_mode             = "awsvpc"

  execution_role_arn = data.aws_iam_role.ecs_task_execution_role.arn

  container_definitions = jsonencode([
    {
      name      = "hopesolutions-container"
      image     = "165822899401.dkr.ecr.us-west-2.amazonaws.com/hopesolutions:product-api"
      cpu       = 0
      essential = true

      portMappings = [
        {
          containerPort = 8005,
          hostPort      = 8005,
          protocol      = "tcp"
        }
      ],
      logConfiguration = {
        logDriver = "awslogs",
        options = {
          "awslogs-group"         = "ecs/hopesolutions"
          "awslogs-region"        = "us-west-2"
          "awslogs-stream-prefix" = "hopesolutions-container"
        }
      }
    }
  ])
}