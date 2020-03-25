
variable "aws_access_key" {}

variable "aws_secret_key" {
  type    = string
}
variable "aws_region" {
  type    = string
  default = "us-east-1"
}

variable "website_bucket_name" {
  type    = string
}

variable "index_file" {
  type    = string
  default = "../dist/index.html"
}

variable "js_file_main" {
  type    = string
  default = "../dist/app.js"
}

variable "js_file_1" {
  type    = string
  default = "../dist/0.app.js"
}

variable "js_file_2" {
  type    = string
  default = "../dist/2.app.js"
}

variable "cssFile" {
  type    = string
  default = "../dist/css/main.css"
}