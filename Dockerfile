FROM payara/server-full

COPY Test/target/Test-1.0-SNAPSHOT.war $DEPLOY_DIR/test.war 

