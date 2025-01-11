#! /bin/bash

cd "$(dirname "${BASH_SOURCE[0]}")"/
cd ../tf-backend
terraform plan -out tfbackend.tfplan
terraform apply tfbackend.tfplan -auto-approve