adding the chatbot feature here

# Wink & Wear

**Production Link** https://winkandwear.com/

**Repository:** [https://github.com/PriyanshuSingh10114/winkwear](https://github.com/PriyanshuSingh10114/winkwear)

---

## Project overview

**Wink & Wear** is a modern, dark-theme e-commerce storefront built with React. The site aims to deliver a premium fashion shopping experience with a matte‑dark aesthetic, gold accents, and polished UI components. The app includes category-based product listings, product detail pages, cart & checkout flows, and responsive layouts for desktop/tablet/mobile.

This README turns the current repo into a professional, contributor-friendly project by documenting setup, architecture, recommended improvements, deployment steps, and a roadmap for future enhancements.

---

## Key features

* Matte dark theme with consistent root CSS variables
* Category filtering, sorting, and load-more pagination
* Product details with image gallery and size selection
* Cart and checkout flow (current COD placeholder)
* Responsive layout and modular React components
* Context API used for global cart/shop state

---

## Live demo & screenshots

* **Live app:** [https://winkandwear-1.onrender.com/](https://winkandwear-1.onrender.com/)

> (Add high-resolution screenshots in `/assets/screenshots/` and reference them in this README for a better store listing experience on GitHub.)

---

## Tech stack

* React (functional components + hooks)
* React Router for client routing
* Context API for app-level state
* Vanilla CSS with component-level styles
* Optional: `axios` or `fetch` for API calls

---

## Getting started (local development)

1. Clone the repo

```bash
git clone https://github.com/PriyanshuSingh10114/winkwear.git
cd winkwear
```

2. Install dependencies

```bash
npm install
```

3. Start dev server

```bash
npm run dev

```

4. Open [http://localhost:5173](http://localhost:5173)

### Useful npm scripts (recommend adding/standardizing)

* `npm start` — start dev server
* `npm run build` — create production build

---

<h1>AWS Configuration for production Read</h1>

<h1>Step 1: IAM Configuration</h1>

    Create a user eks-admin with AdministratorAccess.
    
Generate Security Credentials: Access Key and Secret Access Key.

<h1>Step 2: EC2 Setup</h1>

    ubuntu Instance
    t2.micro
    25GBi
    create access key with .pem
    region ap-south-1

    connect it with ssh client with command line in your system

after login 

    sudo-apt get update
    

SSH into the instance from your local machine.

<h3>Step 3: Install AWS CLI v2</h3>

    curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
    sudo apt install unzip
    unzip awscliv2.zip
    sudo ./aws/install -i /usr/local/aws-cli -b /usr/local/bin --update

aws configure

    Enter public access key
    Enter private access key 
    Select Region ap-south-1
    In fourth option make blank entry

<h1>Dockerfile Execution</h1>

<h5>Installation</h5>

    sudo apt-get update
    sudo apt install docker.io
    docker ps
    sudo chown $USER /var/run/docker.sock

<h5>Frontend Image creation</h5>

    cd Frontend
    docker build -t winkwear-frontend .
    docker run -p 5173:5173 winkwear-frontend

<h5>Backend Image creation</h5>

    cd Backend
    docker build -t winkwear-backend .
    docker run -d \
    -p 4000:4000 \
    --env-file .env \
    --name winkwear-backend \
    winkwear-backend
    
Retrieve an authentication token and authenticate your Docker client to your registry. Use the AWS CLI:

    aws ecr-public get-login-password --region us-east-1 | docker login --username AWS --password-stdin public.ecr.aws/r7m1r0t0
    
Note: If you receive an error using the AWS CLI, make sure that you have the latest version of the AWS CLI and Docker installed. Build your Docker image using the following command. For information on building a Docker file from scratch see the instructions here . You can skip this step if your image is already built:

    docker build -t winkwear-frontend-app .
    
After the build completes, tag your image so you can push the image to this repository:

    docker tag blogverse-client-app:latest public.ecr.aws/r7m1r0t0/winkwear-frontend-app:latest
    
Run the following command to push this image to your newly created AWS repository:

    docker push public.ecr.aws/r7m1r0t0/winkwear-frontend-app:latest

Retrieve an authentication token and authenticate your Docker client to your registry. Use the AWS CLI:

    aws ecr-public get-login-password --region us-east-1 | docker login --username AWS --password-stdin public.ecr.aws/r7m1r0t0
    
Note: If you receive an error using the AWS CLI, make sure that you have the latest version of the AWS CLI and Docker installed.
Build your Docker image using the following command. For information on building a Docker file from scratch see the instructions here . You can skip this step if your image is already built:

    docker build -t winkwear-backend-app .
    
After the build completes, tag your image so you can push the image to this repository:

    docker tag blogverse-server-app:latest public.ecr.aws/r7m1r0t0/winkwear-backend-app:latest
    
Run the following command to push this image to your newly created AWS repository:

    docker push public.ecr.aws/r7m1r0t0/winkwear-backend-app:latest

<h1>Step 5: Install kubectl</h1>

    curl -o kubectl https://amazon-eks.s3.us-west-2.amazonaws.com/1.19.6/2021-01-05/bin/linux/amd64/kubectl
    chmod +x ./kubectl
    sudo mv ./kubectl /usr/local/bin
    kubectl version --short --client

<h1>Step 6: Install eksctl</h1>

    curl --silent --location "https://github.com/weaveworks/eksctl/releases/latest/download/eksctl_$(uname -s)_amd64.tar.gz" | tar xz -C /tmp
    sudo mv /tmp/eksctl /usr/local/bin
    eksctl version

<h1>Step 7: Setup EKS Cluster</h1>

    eksctl create cluster --name wink-wear-cluster --region ap-south-1
    --node-type t2.medium --nodes-min 2 --nodes-max 2
    aws eks update-kubeconfig --region us-west-2 --name three-tier-cluster
    kubectl get nodes
    
<h1>Step 8: Run Manifests</h1>

    kubectl create namespace wink-wear
    kubectl apply -f .
    kubectl delete -f .

<h1>Step 9: Install AWS Load Balancer</h1>

    curl -O https://raw.githubusercontent.com/kubernetes-sigs/aws-load-balancer-controller/v2.5.4/docs/install/iam_policy.json
    aws iam create-policy --policy-name AWSLoadBalancerControllerIAMPolicy --policy-document file://iam_policy.json
    eksctl utils associate-iam-oidc-provider --region=ap-south-1 --cluster=wink-wear --approve
    eksctl create iamserviceaccount --cluster=wink-wear-cluster --namespace=kube-system --name=aws-load-balancer-controller --role-name AmazonEKSLoadBalancerControllerRole --attach-policy-         arn=arn:aws:iam::626072240565:policy/AWSLoadBalancerControllerIAMPolicy --approve --region=ap-south-1

<h1>Step 10: Deploy AWS Load Balancer Controller</h1>

    sudo snap install helm --classic
    helm repo add eks https://aws.github.io/eks-charts
    helm repo update eks
    helm install aws-load-balancer-controller eks/aws-load-balancer-controller -n kube-system --set clusterName=my-cluster --set serviceAccount.create=false --set serviceAccount.name=aws-load-balancer-controller
    kubectl get deployment -n kube-system aws-load-balancer-controller    

---

## Recommended environment variables

Create a `.env.local` (add to `.gitignore`):

```
REACT_APP_API_BASE_URL=https://api.example.com
REACT_APP_RENDER_URL=https://winkandwear-1.onrender.com
```

Keep secrets out of source control. Use Render / Vercel / Netlify environment variables for production.

---

## Project structure (recommended)

```
/src
  /assets
    /images
    /icons
    /screenshots
  /components
    /Common (Navbar, Footer, Button)
    /Product (ProductCard, ProductList, Gallery)
    /Cart
    /Checkout
  /context
    CartContext.jsx
    ShopContext.jsx
  /pages
    Home.jsx
    Shop.jsx
    Product.jsx
    Cart.jsx
    Checkout.jsx
  /utils
    api.js
    currency.js
    helpers.js
  /hooks
    useLocalStorage.js
    useDebounce.js
  index.js
  App.js
```

## Deployment

Current live demo hosted on Render (`winkandwear-1.onrender.com`).

Recommended deployment steps:

* Create a Render web service or Vercel/Netlify site linked to the repo.
* Set environment variables in the hosting provider's dashboard.
* Configure a `build` command (`npm run build`) and `start` command for production.
* Use a `render.yaml` or `netlify.toml` / `vercel.json` for more control.

---
<h1>Welcome to Wink & Wear—where fashion meets individuality!</h1>
At Wink & Wear, we believe that clothing is more than just fabric—it's a statement, a mood, and an extension of your unique personality. Our carefully curated collection blends bold designs, timeless elegance, and playful creativity to help you stand out in every crowd.

From effortlessly chic everyday wear to head-turning statement pieces, each item in our collection is handpicked to inspire confidence and self-expression. Whether you're dressing up for a special occasion or keeping it cool for a casual day out, Wink & Wear has something to match your vibe.

Why choose us?

✨ Unique Designs – No mass-market repeats here! Our pieces are as distinctive as you are.
✨ Quality & Comfort – Fashion shouldn't compromise comfort—our fabrics feel as good as they look.
✨ Affordable Luxury – Style shouldn't break the bank. We offer premium looks at accessible prices.

At Wink & Wear, we're not just selling clothes—we're celebrating individuality. So go ahead, wink at the world and wear your confidence!

Stay Bold. Stay You. 💫
Wink & Wear

Meet the Minds Behind Wink & Wear

At Wink & Wear, we’re more than just a brand—we’re a passionate team of dreamers, designers, and tech enthusiasts dedicated to redefining online fashion. Here’s a little about the people who brought Wink & Wear to life:

The Tech Brains

Priyanshu Singh – Lead Developer/Visionary
A coding wizard with a passion for seamless user experiences, Priyanshu didn’t just build Wink & Wear’s e-commerce platform from scratch—he envisioned its very foundation. As our Lead Developer, his technical mastery brought the brand’s identity to life, crafting a website as stylish as our clothes. From smooth browsing to secure payments, every pixel and function reflects his relentless pursuit of innovation, ensuring Wink & Wear isn’t just a platform, but an experience.


Priyansh Singh – Frontend Developer/Logic Analyzer
A visionary tech innovator, Priyansh spearheaded the complete AI-powered transformation of Wink & Wear’s e-commerce platform. Leveraging cutting-edge AI tools and his deep full-stack expertise His meticulous approach eliminated critical bugs, optimized performance, and crafted a dynamic, secure shopping experience as sleek as Wink & Wear’s fashion.


— The Wink & Wear Team !!

---
## Contact

Project is owned and maintained by **Priyanshu Singh**. For questions, open an issue or create a PR.

Email: priyanshusingh22340@gmail.com


