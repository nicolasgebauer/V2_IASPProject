resource "aws_ecs_service" "hopesolutions_service" {
  name            = "hopesolutions_service"
  cluster         = var.ecs_cluster_name
  task_definition = aws_ecs_task_definition.hopesolutions_task.arn
  desired_count   = 1
  launch_type     = "FARGATE"

  load_balancer {
    target_group_arn = aws_lb_target_group.hopesolutions_target_group.arn
    container_name   = "hopesolutions-container"
    container_port   = 8005
  }

  network_configuration {
    subnets          = [var.aws_subnet_a_private_id, var.aws_subnet_b_private_id, var.aws_subnet_c_private_id, var.aws_subnet_d_private_id]
    assign_public_ip = true
    security_groups  = [var.aws_security_group_id]
  }
}