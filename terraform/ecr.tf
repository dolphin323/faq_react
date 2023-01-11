
# Production Repository

resource "aws_ecr_repository" "simple-web-app" {
  name = "simple-web-app"
  image_tag_mutability = "MUTABLE"

  image_scanning_configuration {
    scan_on_push = true
  }

  tags = {
    Name = "Elastic Container Registry to store Docker Artifacts"
  }
}