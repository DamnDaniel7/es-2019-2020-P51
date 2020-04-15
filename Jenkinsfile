pipeline {
   agent {
       docker 'maven:3'
   }

   stages {
      stage('Build') {
         steps {
            // ~eWd<<:4y#[znWBH
            git 'https://github.com/DamnDaniel7/es-2019-2020-P51.git'
            git branch: "javaee8", url: 'https://github.com/DamnDaniel7/es-2019-2020-P51.git'
            // Run Maven on a Unix agent.
           
            sh "cd Test && mvn -Dmaven.test.failure.ignore=true clean package"

            // To run Maven on a Windows agent, use
            // bat "mvn -Dmaven.test.failure.ignore=true clean package"
         }
        
         
      }
      stage('Test') {
            steps {
                echo 'Testing'
               }
        }
        
        stage('Deploy') {
           steps {
                echo 'Deploy'
                sshagent (credentials: ['myuser-myserver-ssh-access']) {
                  sh "ssh -o StrictHostKeyChecking=no esp51v2@myserver uname -a"
               }

            }
        }
     
   }
}
