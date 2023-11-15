resource "aws_ecr_repository" "hopesolutions_repository" {
  name = var.aws_repository_name

  image_tag_mutability = "MUTABLE"  # Esto permite sobrescribir las imágenes en el repositorio

  # Política de retención para eliminar imágenes antiguas (ajusta según tus necesidades)
  image_scanning_configuration {
    scan_on_push = true
  }

  tags = {
    Terraform   = "true"
    Environment = "production"
  }
}
