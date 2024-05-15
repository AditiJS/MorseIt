pipeline {
    agent any
    
    stages {
        stage('Build') {
            steps {
                sh 'python --version' // Check Python version
            }
        }
        stage('Test') {
            steps {
            }
        }
        stage('Deploy') {
            steps {
                sh 'python temp.py' // Execute your Python script
            }
        }
    }
}
