# AWS S3 bucket for static hosting
resource "aws_s3_bucket" "website" {
  bucket = "${var.website_bucket_name}"
  acl = "public-read"

  cors_rule {
    allowed_headers = ["*"]
    allowed_methods = ["PUT","POST"]
    allowed_origins = ["*"]
    expose_headers = ["ETag"]
    max_age_seconds = 3000
  }

  policy = <<EOF
{
  "Version": "2008-10-17",
  "Statement": [
    {
      "Sid": "PublicReadForGetBucketObjects",
      "Effect": "Allow",
      "Principal": {
        "AWS": "*"
      },
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::${var.website_bucket_name}/*"
    }
  ]
}
EOF

  website {
    index_document = "index.html"
    error_document = "error.html"
  }
}

# AWS S3 bucket for www-redirect
resource "aws_s3_bucket" "website_redirect" {
  bucket = "www.${var.website_bucket_name}"
  acl = "public-read"

  website {
    redirect_all_requests_to = "${var.website_bucket_name}.s3-website.${var.aws_region}.amazonaws.com"
  }
}

resource "aws_s3_bucket_object" "index_file" {
  bucket = "${var.website_bucket_name}"
  key    = "index.html"
  source = "${var.index_file}"
  content_type = "text/html"

  # The filemd5() function is available in Terraform 0.11.12 and later
  # For Terraform 0.11.11 and earlier, use the md5() function and the file() function:
  # etag = "${md5(file("path/to/file"))}"
  etag = "${var.js_file_1}"
}

resource "aws_s3_bucket_object" "js_file_main" {
  bucket = "${var.website_bucket_name}"
  key    = "app.js"
  source = "${var.js_file_main}"
  content_type = "text/javascript"

  # The filemd5() function is available in Terraform 0.11.12 and later
  # For Terraform 0.11.11 and earlier, use the md5() function and the file() function:
  # etag = "${md5(file("path/to/file"))}"
  etag = "${var.js_file_main}"
}
resource "aws_s3_bucket_object" "js_file_1" {
  bucket = "${var.website_bucket_name}"
  key    = "0.app.js"
  source = "${var.js_file_1}"
  content_type = "text/javascript"

  # The filemd5() function is available in Terraform 0.11.12 and later
  # For Terraform 0.11.11 and earlier, use the md5() function and the file() function:
  # etag = "${md5(file("path/to/file"))}"
  etag = "${var.js_file_1}"
}

resource "aws_s3_bucket_object" "js_file_2" {
  bucket = "${var.website_bucket_name}"
  key    = "2.app.js"
  source = "${var.js_file_2}"
  content_type = "text/javascript"

  # The filemd5() function is available in Terraform 0.11.12 and later
  # For Terraform 0.11.11 and earlier, use the md5() function and the file() function:
  # etag = "${md5(file("path/to/file"))}"
  etag = "${var.js_file_2}"
}

resource "aws_s3_bucket_object" "cssFile" {
  bucket = "${var.website_bucket_name}"
  key    = "main.css"
  source = "${var.cssFile}"
  content_type = "text/javascript"

  # The filemd5() function is available in Terraform 0.11.12 and later
  # For Terraform 0.11.11 and earlier, use the md5() function and the file() function:
  # etag = "${md5(file("path/to/file"))}"
  etag = "${var.cssFile}"
}

resource "aws_cognito_user_pool" "pool" {
  name = "pool"
}

resource "aws_cognito_user_pool_client" "client" {
  name = "client"
  explicit_auth_flows = [
    "ADMIN_NO_SRP_AUTH",
    "USER_PASSWORD_AUTH",
  ]
  user_pool_id = "${aws_cognito_user_pool.pool.id}"
  allowed_oauth_flows = ["code"]
  generate_secret     = false
  allowed_oauth_scopes = ["openid","aws.cognito.signin.user.admin"]
  callback_urls = ["https://${var.website_bucket_name}.s3-website.${var.aws_region}.amazonaws.com?isRedirected=true", "http://localhost:8080?isRedirected=true"]
  logout_urls = ["https://${var.website_bucket_name}.s3-website.${var.aws_region}.amazonaws.com?signout=true", "http://localhost:8080?signout=true"]
}

resource "aws_cognito_user_pool_domain" "main" {
  domain       = "taxcalculator.pool"
  user_pool_id = "${aws_cognito_user_pool.pool.id}"
}
# resource "aws_acm_certificate" "certificate" {
#   // We want a wildcard cert so we can host subdomains later.
#   domain_name       = "coderland.taxcalculator.s3-website-us-east-1.amazonaws.com"
#   validation_method = "DNS"

#   // We also want the cert to be valid for the root domain even though we'll be
#   // redirecting to the www. domain immediately.
#   subject_alternative_names = ["www.coderland.taxcalculator.s3-website-us-east-1.amazonaws.com"]
# }
output "config" {
   value = "{\n    \"region\": \"${var.aws_region}\",\n    \"userPool\": \"${aws_cognito_user_pool.pool.id}\",\n    \"userPoolBaseUri\": \"https://${aws_cognito_user_pool.pool.name}.${var.aws_region}.amazoncognito.com\",\n    \"clientId\": \"${aws_cognito_user_pool_client.client.id}\",\n    \"callbackUri\": {\n        \"development\": \"http://localhost:8080?isRedirected=true\",\n        \"production\": \"https://${var.website_bucket_name}.s3-website.${var.aws_region}.amazonaws.com?isRedirected=true\"\n    },\n    \"signoutUri\": {\n        \"development\": \"http://localhost:8080\",\n        \"production\": \"https://${var.website_bucket_name}.s3-website.${var.aws_region}.amazonaws.com?signout=true\"\n    },\n    \"tokenScopes\": [\"aws.cognito.signin.user.admin\"]\n, \"website_endpoint\":\"${aws_s3_bucket.website.website_endpoint}\"}"
}

# resource "aws_cloudfront_distribution" "www_distribution" {
#   // origin is where CloudFront gets its content from.
#   origin {
#     // We need to set up a "custom" origin because otherwise CloudFront won't
#     // redirect traffic from the root domain to the www domain, that is from
#     // runatlantis.io to www.runatlantis.io.
#     custom_origin_config {
#       // These are all the defaults.
#       http_port              = "80"
#       https_port             = "443"
#       origin_protocol_policy = "http-only"
#       origin_ssl_protocols   = ["TLSv1", "TLSv1.1", "TLSv1.2"]
#     }

#     // Here we're using our S3 bucket's URL!
#     domain_name = "coderland.taxcalculator.s3-website-us-east-1.amazonaws.com"
#     // This can be any name to identify this origin.
#     origin_id   = "coderland.taxcalculator.s3-website-us-east-1.amazonaws.com"
#   }

#   enabled             = true
#   default_root_object = "index.html"

#   // All values are defaults from the AWS console.
#   default_cache_behavior {
#     viewer_protocol_policy = "redirect-to-https"
#     compress               = true
#     allowed_methods        = ["GET", "HEAD"]
#     cached_methods         = ["GET", "HEAD"]
#     // This needs to match the `origin_id` above.
#     target_origin_id       = "coderland.taxcalculator.s3-website-us-east-1.amazonaws.com"
#     min_ttl                = 0
#     default_ttl            = 86400
#     max_ttl                = 31536000

#     forwarded_values {
#       query_string = false
#       cookies {
#         forward = "none"
#       }
#     }
#   }

#   // Here we're ensuring we can hit this distribution using www.runatlantis.io
#   // rather than the domain name CloudFront gives us.
#   aliases = ["www.coderland.taxcalculator.s3-website-us-east-1.amazonaws.com"]

#   restrictions {
#     geo_restriction {
#       restriction_type = "none"
#     }
#   }

#   // Here's where our certificate is loaded in!
#   viewer_certificate {
#     acm_certificate_arn = "${aws_acm_certificate.certificate.arn}"
#     ssl_support_method  = "sni-only"
#   }
# }
