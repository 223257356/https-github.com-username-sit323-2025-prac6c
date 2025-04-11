
# sit323-2025-prac6p

## Deploying the Calculator Microservice to Kubernetes

This task extends the containerised Calculator Microservice by deploying it to a Kubernetes cluster.

### Prerequisites
- Docker and Docker CLI
- Kubernetes cluster (Docker Desktop with Kubernetes enabled)
- kubectl installed and configured

### Implementation Steps

1. **Create Kubernetes Configuration Files:**

   Created two Kubernetes manifest files:

   **k8s-deployment.yaml:** This defines a Kubernetes Deployment with 3 replicas
   ```yaml
   apiVersion: apps/v1
   kind: Deployment
   metadata:
     name: calculator-deployment
     labels:
       app: calculator
   spec:
     replicas: 3
     selector:
       matchLabels:
         app: calculator
     template:
       metadata:
         labels:
           app: calculator
       spec:
         containers:
         - name: calculator
           image: calculator-app:latest
           imagePullPolicy: IfNotPresent
           ports:
           - containerPort: 3000
           resources:
             limits:
               cpu: "0.5"
               memory: "512Mi"
             requests:
               cpu: "0.2"
               memory: "256Mi"
   ```

   **k8s-service.yaml:** This creates a NodePort Service to expose the application
   ```yaml
   apiVersion: v1
   kind: Service
   metadata:
     name: calculator-service
     labels:
       app: calculator
   spec:
     type: NodePort
     selector:
       app: calculator
     ports:
     - port: 3000
       targetPort: 3000
       nodePort: 30080
       protocol: TCP
   ```

2. **Build the Docker Image:**

The below command is used to build the image for Docker.
   ```
   docker build -t calculator-app:latest .
   ```


3. **Start Kubernetes:**

   Enabled Kubernetes in Docker Desktop settings.

4. **Deploy the Application to Kubernetes:**
   ```
   kubectl apply -f k8s-deployment.yaml
   kubectl apply -f k8s-service.yaml
   ```

   The deployment and service were successfully created:
   ```
   deployment.apps/calculator-deployment created
   service/calculator-service created
   ```

5. **Verify the Deployment:**
   ```
   kubectl get deployments
   ```
   Output showed:
   ```
   NAME                    READY   UP-TO-DATE   AVAILABLE   AGE
   calculator-deployment   3/3     3            3           57s
   ```

   ```
   kubectl get pods
   ```
   Output showed three running pods:
   ```
   NAME                                     READY   STATUS    RESTARTS   AGE
   calculator-deployment-6ff658447b-687p8   1/1     Running   0          2m22s
   calculator-deployment-6ff658447b-w2mwm   1/1     Running   0          2m22s
   calculator-deployment-6ff658447b-zgnzq   1/1     Running   0          2m22s
   ```

   ```
   kubectl get services
   ```
   Output confirmed the service was running:
   ```
   NAME                 TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)          AGE
   calculator-service   NodePort    10.107.246.93   <none>        3000:30080/TCP   2m7s
   kubernetes           ClusterIP   10.96.0.1       <none>        443/TCP          3m37s
   ```

6. **Access the Application:**

   The application was accessible through the NodePort service at:
   ```
   http://localhost:30080
   ```

   The calculator API endpoints were available at:
   - http://localhost:30080/add?num1=5&num2=3
   - http://localhost:30080/subtract?num1=10&num2=4
   - http://localhost:30080/multiply?num1=6&num2=7
   - http://localhost:30080/divide?num1=20&num2=5

7. **Scale the Deployment:**
   ```
   kubectl scale deployment calculator-deployment --replicas=5
   ```

   Verifying the scaling:
   ```
   kubectl get pods
   ```

   Output showed the deployment scaled to 5 pods:
   ```
   NAME                                     READY   STATUS    RESTARTS   AGE
   calculator-deployment-6ff658447b-687p8   1/1     Running   0          4m28s
   calculator-deployment-6ff658447b-dz6z8   1/1     Running   0          6s
   calculator-deployment-6ff658447b-w2mwm   1/1     Running   0          4m28s
   calculator-deployment-6ff658447b-xft5x   1/1     Running   0          6s
   calculator-deployment-6ff658447b-zgnzq   1/1     Running   0          4m28s
   ```

8. **Clean Up Resources (Optional):**
   ```
   kubectl delete -f k8s-deployment.yaml -f k8s-service.yaml
   ```

### Summary
The implementation successfully achieved the following:
1. Created Kubernetes deployment and service configurations
2. Built and deployed a containerized Node.js calculator application
3. Verified the deployment with multiple replicas
4. Scaled the application to demonstrate Kubernetes' scaling capabilities
5. Accessed the application through a NodePort service

# https-github.com-username-sit323-2025-prac6c
