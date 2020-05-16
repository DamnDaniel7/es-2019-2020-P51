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
                 sh 'cd opo_bus && mvn clean deploy -s .m2/settings.xml'
               }
      }
      stage('Push Docker Images'){
           agent any
           steps {
                 sh 'docker rmi -f esp51-app || echo "No container up. Continue"'
                 sh 'cd opo_bus_frontend/ && docker build -t esp51-app .'
                 sh 'docker tag esp51-app 192.168.160.99:5000/esp51-app'
                 sh 'docker push 192.168.160.99:5000/esp51-app'
              
                 sh 'docker rmi -f esp51springboot || echo "No container up. Continue"'
                 sh 'pwd'
                 sh 'cd ../opo_bus/ && docker build -t esp51springboot .'
                 sh 'docker tag esp51springboot 192.168.160.99:5000/esp51springboot'
                 sh 'docker push 192.168.160.99:5000/esp51springboot'

           }
      }
        stage('Deploy') {
           agent any
           steps {
                echo 'Deploy'
                sshagent (credentials: ['esp51v2']) {
                   sh '''
                        ssh -o StrictHostKeyChecking=no esp51@192.168.160.103 docker rm -f Esp51Server || echo "No container up. Continue"
                        ssh -o StrictHostKeyChecking=no esp51@192.168.160.103 docker run -d -p 51080:8080 --name Esp51Server --network es51-network 192.168.160.99:5000/esp51springboot
                        ssh -o StrictHostKeyChecking=no esp51@192.168.160.103 docker rm -f Esp51Frontend || echo "No container up. Continue"
                        ssh -o StrictHostKeyChecking=no esp51@192.168.160.103 docker run -d -it -p 51880:80 --name Esp51Frontend 192.168.160.99:5000/esp51-app
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


