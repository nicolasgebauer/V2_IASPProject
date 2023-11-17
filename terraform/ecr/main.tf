resource "aws_ecr_repository" "hopesolutions" {
  name = var.aws_repository_name

  image_tag_mutability = "MUTABLE"

  image_scanning_configuration {
    scan_on_push = true
  }

  tags = {
    Terraform   = "true"
    Environment = "production"
  }

  lifecycle {
    prevent_destroy = false
  }
}

output "ecr_repository_url" {
  value = aws_ecr_repository.hopesolutions.repository_url
}
