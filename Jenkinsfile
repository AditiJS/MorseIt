pipeline {
    agent any
    
    stages {
        stage('version') {
            steps {
                sh 'python --version' // Check Python version
            }
        }
        stage('Output') {
            steps {
                sh 'python temp.py' // Run your tests here if available
            }
        }
    }
}
