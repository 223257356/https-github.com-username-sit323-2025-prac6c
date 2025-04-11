# https-github.com-username-sit323-2025-prac6c

### Interacting with the Deployed Application

To interact with the calculator microservice deployed on Kubernetes, follow these steps:

1. **Verify the Application is Running:**
   ```
   kubectl get pods
   ```
   Output showed multiple running pods:
   ```
   NAME                                     READY   STATUS    RESTARTS      AGE
   calculator-deployment-6ff658447b-687p8   1/1     Running   1 (40m ago)   77m
   calculator-deployment-6ff658447b-dz6z8   1/1     Running   1 (40m ago)   73m
   calculator-deployment-6ff658447b-w2mwm   1/1     Running   1 (40m ago)   77m
   calculator-deployment-6ff658447b-xft5x   1/1     Running   1 (40m ago)   73m
   calculator-deployment-6ff658447b-zgnzq   1/1     Running   1 (40m ago)   77m
   ```

2. **Check the Kubernetes Services:**
   ```
   kubectl get services
   ```
   Output showed the calculator service:
   ```
   NAME                 TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)          AGE
   calculator-service   NodePort    10.107.246.93   <none>        3000:30080/TCP   77m
   kubernetes           ClusterIP   10.96.0.1       <none>        443/TCP          78m
   ```

3. **Forward a Local Port to the Service:**
   ```
   kubectl port-forward service/calculator-service 8080:3000
   ```
   This command forwards traffic from local port 8080 to port 3000 in the cluster:
   ```
   Forwarding from 127.0.0.1:8080 -> 3000
   Forwarding from [::1]:8080 -> 3000
   ```

4. **Access the Application in a Web Browser:**
   With port forwarding active, you can access the application at:
   ```
   http://localhost:8080
   ```

5. **Test the Calculator Functions:**
   The calculator API endpoints are available at:
   - http://localhost:8080/add?num1=5&num2=3
   - http://localhost:8080/subtract?num1=10&num2=4
   - http://localhost:8080/multiply?num1=6&num2=7
   - http://localhost:8080/divide?num1=20&num2=5

These steps demonstrate how to interact with a Kubernetes-deployed application using port forwarding and using kubectl commands.
