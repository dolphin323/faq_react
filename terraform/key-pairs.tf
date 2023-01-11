# SSH key - Web App

resource "aws_key_pair" "simple-web-app-key" {
  key_name = "faq_react"
  public_key = file("./faq_react.pem")
}

# SSH key - Jenkins

resource "aws_key_pair" "jenkins-key" {
  key_name = "jenkins_new"
  public_key = file("./jenkins.pem")
}