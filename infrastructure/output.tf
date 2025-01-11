# Output value definitions
output "s3_bucket_name" {
  description = "Name of the S3 bucket used to store function code."

  value = aws_s3_bucket.lambda_bucket.id
}

# Used to define your Lambda function and related resources.
output "function_name" {
  description = "Name of the Lambda function."

  value = aws_lambda_function.paste_lambda.function_name
}

# The API Gateway stage will publish your API to a URL managed by AWS
output "api_gateway_base_url" {
  description = "Base URL for API Gateway stage."

  value = aws_apigatewayv2_stage.lambda.invoke_url
}

output "cloudfront_distribution_url" {
  description = "Cloudfront distribution"

  value = aws_cloudfront_distribution.frontend.domain_name
}
