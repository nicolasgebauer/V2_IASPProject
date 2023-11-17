resource "aws_lb" "my_load_balancer" {
  name               = "my-load-balancer"
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
  enable_http2                      = true

  tags = {
    Name = "MyLoadBalancer"
  }
}

resource "aws_lb_listener" "web" {
  load_balancer_arn = aws_lb.my_load_balancer.arn
  port              = 80
  protocol          = "HTTP"

  default_action {
    type             = "fixed-response"
    fixed_response {
      content_type = "text/plain"
      status_code  = "200"
      message_body = "OK"
    }
  }
}

resource "aws_lb_target_group" "my_target_group" {
  name     = "my-target-group"
  port     = 8000
  protocol = "HTTP"

  vpc_id = var.aws_vpc_id
}

resource "aws_lb_listener_rule" "web" {
  listener_arn = aws_lb_listener.web.arn

  action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.my_target_group.arn
  }

  condition {
    path_pattern {
      values = ["/"]
    }
  }
}
