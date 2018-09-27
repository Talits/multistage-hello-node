try {
    timeout(time: 20, unit: 'MINUTES') {
        node('nodejs') {
            
         ansiColor('xterm') {
         timestamps {
            
            stage('artifact-build') {
                openshiftBuild(buildConfig: 'nodejs-build', showBuildLogs: 'true', waitTime: 180000)
            }
            
            stage('image-build') {
                openshiftBuild(buildConfig: 'nodejs', showBuildLogs: 'true',  waitTime: 180000)
            }

            stage('deploy') {
                openshiftDeploy(deploymentConfig: 'nodejs', waitTime: 180000)
                openshiftVerifyDeployment(depCfg: 'nodejs',replicaCount: 1,  waitTime: 180000)

            }
            
            stage('artifact-build-promotion') {
                openshiftBuild(namespace:'outro', buildConfig: 'nodejs-build', showBuildLogs: 'true' ,  waitTime: 180000)
            }
            
            stage('image-build-promotion') {
                openshiftBuild(namespace:'outro',buildConfig: 'nodejs', showBuildLogs: 'true',  waitTime: 180000)
            }

            stage('deploy-promotion') {
                openshiftDeploy(namespace:'outro',deploymentConfig: 'nodejs', waitTime: 180000)
                openshiftVerifyDeployment(namespace:'outro', depCfg: 'nodejs',replicaCount: 1,  waitTime: 180000 )
            } 
         }
         }
        }
    }   
} catch (err) {
    echo "in catch block"
    echo "Caught: ${err}"
    currentBuild.result = 'FAILURE'
    throw err
}
