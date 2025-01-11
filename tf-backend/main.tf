terraform {
    required_providers {
        aws = {
            source  = "hashicorp/aws"
            version = "~> 5.1.0"
        }
    }
}

provider "aws" {
    region = "us-east-1"
}

resource "aws_s3_bucket" "terraform-state-storage-s3" {
  bucket = "fluff-tf-state"
}

resource "aws_dynamodb_table" "dynamodb-terraform-state-lock" {
  name = "fluff-tf-state-lock"
  hash_key = "LockID"
  read_capacity = 5
  write_capacity = 5

  attribute {
    name = "LockID"
    type = "S"
  }
}