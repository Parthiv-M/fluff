#! /bin/bash

cd "$(dirname "${BASH_SOURCE[0]}")"/
cd ../infrastructure
terraform plan -out infra.tfplan
terraform apply infra.tfplan