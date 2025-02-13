variable "aws_region" {
  description = "AWS region for all resources."

  type    = string
  default = "us-east-1"
}

variable "bucket_name" {
  default = "fluff-client-bucket"
}
