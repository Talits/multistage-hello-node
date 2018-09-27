try {
    timeout(time: 20, unit: 'MINUTES') {
        node('') {
            
            stage('artifact-build') {
                openshiftBuild(buildConfig: 'nodejs-build', showBuildLogs: 'true')
            }
            
            stage('image-build') {
                openshiftBuild(buildConfig: 'nodejs', showBuildLogs: 'true')
            }

            stage('deploy') {
                openshiftDeploy(deploymentConfig: 'nodejs')
                openshiftVerifyDeployment(depCfg: 'nodejs',replicaCount: 1 )

            }
            
            stage('artifact-build-promotion') {
                openshiftBuild(namespace:'outro', buildConfig: 'nodejs-build', showBuildLogs: 'true')
            }
            
            stage('image-build-promotion') {
                openshiftBuild(namespace:'outro',buildConfig: 'nodejs', showBuildLogs: 'true')
            }

            stage('deploy-promotion') {
                openshiftDeploy(namespace:'outro',deploymentConfig: 'nodejs')
                openshiftVerifyDeployment(namespace:'outro', depCfg: 'nodejs',replicaCount: 1 )
            } 
        }
    }
} catch (err) {
    echo "in catch block"
    echo "Caught: ${err}"
    currentBuild.result = 'FAILURE'
    throw err
}
