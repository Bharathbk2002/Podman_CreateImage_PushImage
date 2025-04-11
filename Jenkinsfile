pipeline {
    agent any

    environment {
        REPO_URL = 'https://github.com/Bharathbk2002/Podman_CreateImage_PushImage.git'
        IMAGE_NAME = 'web-app'  
        IMAGE_TAG = 'latest'  
        REGISTRY_URL = 'docker.io'  
        REGISTRY_CREDENTIALS = 'dockerhub-credentials'  
    }

    stages {
        stage('Checkout') {
            steps {
                git url: REPO_URL, branch: 'main'
            }
        }
        
        stage('Build Image') {
            steps {
                script {
                    sh """
                        podman build -t bharathbk02/${IMAGE_NAME}:${IMAGE_TAG} .
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
        
        stage('Push Image') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: "${REGISTRY_CREDENTIALS}", usernameVariable: 'REGISTRY_USER', passwordVariable: 'REGISTRY_PASS')]) {
                        sh """
                            podman login -u $REGISTRY_USER -p $REGISTRY_PASS ${REGISTRY_URL}
                            podman push bharathbk02/${IMAGE_NAME}:${IMAGE_TAG} 
                        """
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
                        podman run -d -p 4000:4000 --name ${IMAGE_NAME} bharathbk02/${IMAGE_NAME}:${IMAGE_TAG}
                        curl http://localhost:4000
                    """
                }
            }
        }
        stage('Cloud VM Deployment')
        {
            steps
            {
                script
                {
                    sh """
                        ssh ubuntu@16.171.36.54 'podman pull docker.io/bharathbk02/${IMAGE_NAME}:${IMAGE_TAG}'
                        ssh ubuntu@16.171.36.54 'podman run -d -p 4000:4000 --name ${IMAGE_NAME} bharathbk02/${IMAGE_NAME}:${IMAGE_TAG}'
                        ssh ubuntu@16.171.36.54 'curl http://localhost:4000' 
                       """
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
