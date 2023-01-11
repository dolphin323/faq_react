pipeline {
  agent any
  stages {
    
    stage("Set Up") {
        steps {
          echo "Logging into the private AWS Elastic Container Registry" 
          script {
            // Set environment variables
            GIT_COMMIT_HASH = sh (script: "git log -n 1 --pretty=format:'%H'", returnStdout: true)
            REPOSITORY = sh (script: "cat \$HOME/opt/repository_url", returnStdout: true)
            REPOSITORY_TEST = sh (script: "cat \$HOME/opt/repository_test_url", returnStdout: true)
            REPOSITORY_STAGING = sh (script: "cat \$HOME/opt/repository_staging_url", returnStdout: true)
            INSTANCE_ID = sh (script: "cat \$HOME/opt/instance_id", returnStdout: true)
            S3_LOGS = sh (script: "cat \$HOME/opt/bucket_name", returnStdout: true)
            DATE_NOW = sh (script: "date +%Y%m%d", returnStdout: true)
      

            REPOSITORY = REPOSITORY.trim()
            REPOSITORY_TEST = REPOSITORY_TEST.trim()
            REPOSITORY_STAGING = REPOSITORY_STAGING.trim()
            S3_LOGS = S3_LOGS.trim()
            DATE_NOW = DATE_NOW.trim()
      
            ACCOUNT_REGISTRY_PREFIX = (REPOSITORY.split("/"))[0]
      
            // Log into ECR
            sh """
            /bin/sh -e -c 'echo \$(aws ecr get-login-password --region us-east-1)  | docker login -u AWS --password-stdin $ACCOUNT_REGISTRY_PREFIX'
            """
          } 
        }
    }
    
    stage("Deploy to Fixed Server") {
      steps {
        echo 'Deploy release to production'
        script {
          productionImage = docker.build("$REPOSITORY:release")
          productionImage.push()
          sh """
            aws ec2 reboot-instances --region us-east-1 --instance-ids $INSTANCE_ID
          """
        }
      }
    }


    stage("Clean Up") {
      steps {
        echo 'Clean up local docker images'
        script {
          sh """
          # Change the :latest with the current ones
          docker tag $REPOSITORY:release  $REPOSITORY:latest
          # Remove the images
          docker image rm $REPOSITORY_TEST:$GIT_COMMIT_HASH
          docker image rm $REPOSITORY:release
          
          # Remove dangling images
          docker image prune -f
          """
        }
        echo 'Clean up config.json file with ECR Docker Credentials'
        script {
          sh """
          rm $HOME/.docker/config.json
          """
        }
      }
    }
  }
}