resource "aws_lb" "hopesolutions_load_balancer" {
  name               = "hopesolutions-load-balancer"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [var.aws_security_group_id]
  subnets = [
    var.aws_subnet_a_private_id,
    var.aws_subnet_b_private_id,
    var.aws_subnet_c_private_id,
    var.aws_subnet_d_private_id
  ]


  enable_deletion_protection = false

  enable_cross_zone_load_balancing = true
  enable_http2                     = true

  tags = {
    Name = "HopeSolutionsLoadBalancer"
  }
}

resource "aws_lb_listener" "web" {
  load_balancer_arn = aws_lb.hopesolutions_load_balancer.arn
  port              = 80
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.hopesolutions_target_group.arn
  }
}

resource "aws_lb_target_group" "hopesolutions_target_group" {
  name                 = "hopesolutions-target-group"
  port                 = 8000
  protocol             = "HTTP"
  vpc_id               = var.aws_vpc_id
  deregistration_delay = 30
  target_type          = "ip"

  health_check {
    enabled             = true
    path                = "/"
    healthy_threshold   = 3
    unhealthy_threshold = 3
    timeout             = 30
    interval            = 60
    protocol            = "HTTP"
  }
}