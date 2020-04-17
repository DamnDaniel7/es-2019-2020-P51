pipeline {
   
   agent any
   stages {
      stage('Build') {
         agent {
            docker{
                image 'maven:3-alpine' 
                args '-v $HOME/.m2:/root/.m2'
             }
         }
         steps {
            // ~eWd<<:4y#[znWBH
            git 'https://github.com/DamnDaniel7/es-2019-2020-P51.git'
            git branch: "javaee8", url: 'https://github.com/DamnDaniel7/es-2019-2020-P51.git'
            // Run Maven on a Unix agent.
           
          //  sh "cd Test && mvn -Dmaven.test.failure.ignore=true clean package"

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
           agent any
           steps {
                echo 'Deploy'
                sshagent (credentials: ['esp51v2']) {
                   sh '''
                        scp Dockerfile esp51@192.168.160.103:~
                        scp Test/target/Test-1.0-SNAPSHOT.war  esp51@192.168.160.103:~


                   '''
                 // sh "ssh -o StrictHostKeyChecking=no esp51@192.168.160.103 uname -a"
                  //sh "mvn"
               }

            }
        }
     
   }
}
