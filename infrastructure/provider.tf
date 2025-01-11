terraform {
    backend "s3" {
        bucket         = "fluff-tf-state"
        key            = "terraform.tfstate"
        region         = "us-east-1"
        dynamodb_table = "fluff-tf-state-lock"
    }
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
