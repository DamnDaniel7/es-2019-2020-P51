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
            git branch: "master", url: 'https://github.com/DamnDaniel7/es-2019-2020-P51.git'
            // Run Maven on a Unix agent.
           
            sh "cd opo_bus && mvn -Dmaven.test.failure.ignore=true clean install"

            // To run Maven on a Windows agent, use
            // bat "mvn -Dmaven.test.failure.ignore=true clean package"
         }
        
         
      }
      stage('Test') {
            agent any
            steps {
                 sh "cd cucumbertests && mvn test"
               }
        }
      stage('Artifactory Deployment'){
         agent any
            steps {
                 sh "cd opo_bus && mvn deploy"
               }
      }
        stage('Deploy') {
           agent any
           steps {
                echo 'Deploy'
                sshagent (credentials: ['esp51v2']) {
                   sh '''
                        scp opo_bus/Dockerfile esp51@192.168.160.103:~
                        scp opo_bus/target/opo_bus-0.0.1-SNAPSHOT.jar  esp51@192.168.160.103:~
                        ssh -o StrictHostKeyChecking=no esp51@192.168.160.103 "docker build -t esp51springboot ."
                        ssh -o StrictHostKeyChecking=no esp51@192.168.160.103 docker rm -f Esp51Server || echo "No container up. Continue"
                        ssh -o StrictHostKeyChecking=no esp51@192.168.160.103 docker run -d -p 51080:8080 --name Esp51Server --network es51-network esp51springboot
                        ssh -o StrictHostKeyChecking=no esp51@192.168.160.103 rm Dockerfile
                        ssh -o StrictHostKeyChecking=no esp51@192.168.160.103 rm opo_bus-0.0.1-SNAPSHOT.jar
                        ssh -o StrictHostKeyChecking=no esp51@192.168.160.103 cd es-2019-2020-P51/opo_bus_frontend ; git pull origin master
                        ssh -o StrictHostKeyChecking=no esp51@192.168.160.103 "docker build -t es51-app es-2019-2020-P51/opo_bus_frontend/"
                        ssh -o StrictHostKeyChecking=no esp51@192.168.160.103 docker rm -f Esp51Frontend || echo "No container up. Continue"
                        ssh -o StrictHostKeyChecking=no esp51@192.168.160.103 docker run -d -it -p 51880:80 --name Esp51Frontend es51-app
                   '''
                 // sh "ssh -o StrictHostKeyChecking=no esp51@192.168.160.103 uname -a"
                  /*
                     ssh -o StrictHostKeyChecking=no esp51@192.168.160.103 "docker build -t esp51springboot ."
                        ssh -o StrictHostKeyChecking=no esp51@192.168.160.103 docker rm -f Esp51Server || echo "No container up. Continue"
                        ssh -o StrictHostKeyChecking=no esp51@192.168.160.103 docker run -d -p 51080:8080 --name Esp51Server esp51springboot
                        ssh -o StrictHostKeyChecking=no esp51@192.168.160.103 rm Dockerfile
                        ssh -o StrictHostKeyChecking=no esp51@192.168.160.103 rm opo_bus-0.0.1-SNAPSHOT.jar
                  */
               }

            }
        }
     
   }
}


