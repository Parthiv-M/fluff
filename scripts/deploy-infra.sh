#! /bin/bash

cd "$(dirname "${BASH_SOURCE[0]}")"/
cd ../infrasructure
terraform plan -out infra.tfplan
terraform apply infra.tfplan