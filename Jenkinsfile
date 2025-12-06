pipeline {
    agent any

    environment {
        DOCKERHUB_USERNAME = "jeyashkrishna"
        IMAGE_NAME = "login-app"
        EC2_USER = "ubuntu"
        EC2_HOST = "13.204.93.177"
    }

    stages {
        
        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    sh """
                    docker build -t ${DOCKERHUB_USERNAME}/${IMAGE_NAME}:latest .
                    """
                }
            }
        }

        stage('Login to Docker Hub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-user',
                        usernameVariable: 'DOCKER_USER',
                        passwordVariable: 'DOCKER_PASS')]) {

                    sh """
                    echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
                    """
                }
            }
        }

        stage('Push Image to Docker Hub') {
            steps {
                sh """
                docker push ${DOCKERHUB_USERNAME}/${IMAGE_NAME}:latest
                """
            }
        }

        stage('Deploy to EC2') {
            steps {
                sshagent(['ec2-ssh-key']) {
                    sh """
                    ssh -o StrictHostKeyChecking=no ${EC2_USER}@${EC2_HOST} '
                        sudo docker pull ${DOCKERHUB_USERNAME}/${IMAGE_NAME}:latest &&
                        sudo docker stop login-container || true &&
                        sudo docker rm login-container || true &&
                        sudo docker run -d -p 3000:3000 --name login-container ${DOCKERHUB_USERNAME}/${IMAGE_NAME}:latest
                    '
                    """
                }
            }
        }
    }

    post {
        always {
            sh "docker logout"
        }
    }
}
