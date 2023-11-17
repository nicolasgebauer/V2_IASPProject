# resource "aws_lb" "load_balancer" {
#   name               = "hopesolutions-load-balancer-2"
#   load_balancer_type = "application"
#   security_groups    = [aws_security_group.sg_lb.id]
#   subnets = [
#     var.aws_subnet_a_private_id,
#     var.aws_subnet_b_private_id,
#     var.aws_subnet_c_private_id,
#     var.aws_subnet_d_private_id
#   ]

#   enable_deletion_protection = false 

#   tags       = {
#     Name    = "hopesolutions-load-balancer-2"
#   }
#   depends_on = [aws_autoscaling_group.as-ubuntu]
# }

# resource "aws_lb_target_group" "lb_target" {
#   name        = "hopesolutions-load-balancer-2"
#   port        = 80
#   protocol    = "HTTP"
#   target_type = "instance"
#   vpc_id      = var.aws_vpc_id

#   depends_on = [aws_lb.load_balancer]
# }

# resource "aws_lb_listener" "front_end_80" {
#   load_balancer_arn = aws_lb.load_balancer.arn
#   port              = 80
#   protocol          = "HTTP"
#   default_action {
#     type             = "forward"
#     target_group_arn = aws_lb_target_group.lb_target.arn
#   }
#   depends_on        = [aws_lb_target_group.lb_target]
# }

# resource "aws_lb_listener" "front_end_8080" {
#   load_balancer_arn = aws_lb.load_balancer.arn
#   port              = 8080
#   protocol          = "HTTP"
#   default_action {
#     type             = "forward"
#     target_group_arn = aws_lb_target_group.lb_target.arn
#   }
#   depends_on        = [aws_lb_target_group.lb_target]
# }

# resource "aws_autoscaling_attachment" "asg_attachment_lb" {
#   autoscaling_group_name = aws_autoscaling_group.as-ubuntu.name
#   lb_target_group_arn   = aws_lb_target_group.lb_target.arn
#   depends_on             = [aws_autoscaling_group.as-ubuntu, aws_lb_target_group.lb_target]
# }