data "archive_file" "lambda_for_pastes" {
  type = "zip"

  source_dir  = "${path.module}/lambda"
  output_path = "${path.module}/lambda.zip"
}

data "aws_caller_identity" "current" {}