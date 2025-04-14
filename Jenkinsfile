pipeline {
    agent any

    environment {
        REPO_URL = 'https://github.com/Bharathbk2002/Podman_CreateImage_PushImage.git'
        IMAGE_NAME = 'web-app'  
        IMAGE_TAG = 'latest'  
        REGISTRY_URL = 'docker.io'  
        REGISTRY_CREDENTIALS = 'dockerhub-credentials'
        JNEKINS_CREDENTIALS='inter1-credentials'
    }
    parameters {
  choice choices: ['PushImage_yes', 'Pushimage_no'], name: 'Push_image'
}

    stages {
        stage('Checkout') {
            steps {
                git url: REPO_URL, branch: 'main'
            }
        }
        stage('gitleaks')
        {
            steps{
                sh """
                    if ! command -v gitleaks &> /dev/null; then
                        echo "installing gitleaks"
                        brew install gitleaks
                    fi

                    if [ -d "Podman_CreateImage_PushImage" ]; then
                        echo "Repository already cloned. Pulling the latest changes..."
                        cd Podman_CreateImage_PushImage
                        git pull
                    else
                        git clone https://github.com/Bharathbk2002/Podman_CreateImage_PushImage.git
                        cd Podman_CreateImage_PushImage
                    fi
                   """    
            }
        }
        
        stage('Build Image and test image') {
            parallel
            {
            stage('Build Image')
            {
            steps {
                script {
                    sh """
                        podman build --layers=true -t bharathbk02/${IMAGE_NAME}:${IMAGE_TAG} .
                    """
                }
            }
        }
        stage('Test') {
            steps {
                script {
                    sh """
                        podman run --rm bharathbk02/${IMAGE_NAME}:${IMAGE_TAG}
                    """
                }
            }
        }
        }
        }
        stage('Scanning Image..!')
        {
            steps
            {
                sh """
                    if ! command -v trivy &> /dev/null;
                    then
                    brew install aquasecurity/trivy/trivy
                    fi
                    echo "scanning filesystems for vulnerabilites"
                    trivy fs . --exit-code 0 --severity CRITICAL,HIGH || true
                    #echo "Scanning images..!"
                    #trivy image bharathbk02/${IMAGE_NAME}:${IMAGE_TAG} --exit-code 1 --severity CRITICAL,HIGH 
                  """
            }
        }
        stage('Push Image') {
            steps {
                script {
                    if(params.Push_image=='PushImage_yes')
                    {
                    withCredentials([usernamePassword(credentialsId: "${REGISTRY_CREDENTIALS}", usernameVariable: 'REGISTRY_USER', passwordVariable: 'REGISTRY_PASS')]) {
                        sh """
                            podman login -u $REGISTRY_USER -p $REGISTRY_PASS ${REGISTRY_URL}
                            podman push bharathbk02/${IMAGE_NAME}:${IMAGE_TAG} 
                        """
                    }
                    }
                    else if(params.PUSH_image=='PushImage_no')
                    {

                        echo "Push imagged skipped"
                    }
                    
                }
            }
        }
        stage('Deployment')
        {
            steps
            {
                script
                {
                    sh """
                        podman rm ${IMAGE_NAME}
                        podman run -d -p 4002:4000 --name ${IMAGE_NAME} bharathbk02/${IMAGE_NAME}:${IMAGE_TAG}
                        curl http://localhost:4002
                    """
                }
            }
        }

        stage('cloud deployment')
        {
        steps
        {
withCredentials([usernamePassword(credentialsId: 'intern1', passwordVariable: 'passed', usernameVariable: 'user')]) {

            sh "sshpass -p $passed ssh $user@intern1.fyre.ibm.com 'pwd ; ls -ltr ; uname -a'"


}
        }
        }
        
    }

    post {
        success {
            echo 'Image built,tested,pushed and deployed locally and to cloud VM Sucessfully!'
        }
        failure {
            echo 'Pipeline failed.'
        }
    }
}
