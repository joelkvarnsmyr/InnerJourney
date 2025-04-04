# 🛡️ Security Document: InnerJourney

## 📝 Metadata

*   **Version:** `3`
*   **Date:** `2025-03-21`
*   **Author:** Bo Joel Kvarnsmyr
*   **Last revised by:** Bo Joel Kvarnsmyr

## 🎯 Purpose

This document describes the security measures implemented and planned for the `InnerJourney` project.

The focus is on firewall configuration, authentication of API endpoints, handling of sensitive data (secrets), and system monitoring. The purpose is to protect the system against unauthorized access and ensure compliance with relevant regulations such as `GDPR`.

## 🔥 Firewall

### Current Status

The `UFW` (Uncomplicated Firewall) is active and configured to allow traffic on the following ports:

*   `80` (HTTP) - For initial connection and redirection to HTTPS.
*   `443` (HTTPS) - For encrypted web traffic.
*   `8000` (Application Server) - Direct access to the backend application (planned to be restricted).
*   `22` (SSH) - For secure remote administration.

### Planned Actions 🛠️

To strengthen security regarding network access, the following actions are planned:

1.  **➡️ Restrict SSH Access (Port `22`):**
    Only allow SSH connections from trusted IP addresses (e.g., the development team's fixed IP or VPN range) to minimize the attack surface.

    ```bash
    # Replace <team-ip> with the actual IP address or network (e.g., 192.168.1.100 or 10.0.0.0/24)
    sudo ufw allow from <team-ip> to any port 22 proto tcp

    # Then deny all other external traffic to port 22
    sudo ufw deny 22/tcp
    ```

2.  **🔒 Restrict Application Server Access (Port `8000`):**
    The application server (e.g., the `FastAPI` app) should only be directly reachable from `localhost` (`127.0.0.1`). All external traffic should go through a reverse proxy (like `Nginx` or `Apache`) on port `443`.

    ```bash
    # Allow only traffic from localhost (127.0.0.1) to port 8000
    sudo ufw allow from 127.0.0.1 to any port 8000 proto tcp

    # Deny all other external traffic to port 8000
    sudo ufw deny 8000/tcp
    ```

3.  **🔍 Regular Review:**
    Conduct periodic reviews of active `UFW` rules to ensure no unnecessary ports are open.

    ```bash
    # Show current UFW status and all active rules
    sudo ufw status verbose

    # Example: Close an identified unnecessary port <port>
    sudo ufw deny <port>/tcp
    ```

## 🔑 Authentication

### Current Status ⚠️

The `/dialogflow-webhook` webhook endpoint currently lacks specific authentication. This means anyone who knows the URL can potentially send data to it.

### Planned Actions 🔐

To secure the webhook, the following is planned:

1.  **Implement API Key Authentication:**
    A simple but effective method is to require a secret API key sent in the `HTTP Header` (e.g., `X-API-Key`). `FastAPI`'s dependency injection (`Depends`) is well-suited for this.

    ```python
    from fastapi import Depends, HTTPException, Header, status
    from starlette.requests import Request # Needed for the endpoint definition below

    # TODO: Retrieve the actual key from a secure source (environment variable, secret manager)
    SECRET_API_KEY = "your-secret-key"

    async def verify_api_key(x_api_key: str = Header(None)): # Make it optional initially for better error handling
        """Verifies that a valid API key exists in the X-API-Key header."""
        if x_api_key is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="API Key missing in X-API-Key header"
            )
        if x_api_key != SECRET_API_KEY:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid API Key provided"
            )
        # No return is needed if the key is valid; FastAPI continues to the endpoint function.
    ```

2.  **✨ Protect Webhook Endpoint:**
    Apply the `verify_api_key` function as a dependency to the `/dialogflow-webhook` route.

    ```python
    # Import 'app' from your FastAPI instance and Request if not already imported
    # from main import app # Example
    # from fastapi import Request

    @app.post("/dialogflow-webhook", dependencies=[Depends(verify_api_key)])
    async def dialogflow_webhook(request: Request):
        """Receives and processes calls from Dialogflow after API key verification."""
        # Your existing webhook logic here...
        # The code here runs only if Depends(verify_api_key) succeeded without raising an HTTPException.
        webhook_data = await request.json()
        # Process webhook_data...
        print("Webhook data received successfully.") # Example logging
        return {"fulfillmentText": "Webhook received and authenticated successfully!"} # Example response
    ```

## 🔒 SSL/TLS Certificates

### Current Status ✅

A valid `Let’s Encrypt` certificate is installed and correctly configured for the domain `api.backend.kvarnsmyr.se`. This ensures all communication between clients and the server is encrypted via `HTTPS`.

### Procedures 🔄

To ensure continuous `HTTPS` protection:

*   **✅ Verify Automatic Renewal:**
    The `certbot` tool, which manages `Let’s Encrypt` certificates, is normally configured via `cron` or `systemd timers` to automatically renew certificates before they expire. Test the configuration without actually performing a renewal:

    ```bash
    # Run a simulated renewal ('dry run') to test the entire process
    sudo certbot renew --dry-run
    ```
    *Check the output for any errors.*

*   **🧪 Test Certificate Validity:**
    Manually verify that the server presents a valid certificate and that the certificate chain is correct.

    ```bash
    # Use openssl to connect to the server and inspect the presented certificate
    openssl s_client -connect api.backend.kvarnsmyr.se:443 -servername api.backend.kvarnsmyr.se
    ```
    *Review the information about the issuer, validity period, and chain.*

## 🤫 Handling of Sensitive Data

### Current Status ⚠️

Sensitive data, such as API keys for external services (e.g., `Sinch`, `Dialogflow`) and the internal `SECRET_API_KEY` for the webhook, are currently stored in plaintext in a local `.env` file in the development environment.

### Planned Actions 🔐

To handle secrets more securely, especially in production:

1.  **🏦 Use a Dedicated Secret Manager:**
    In production and staging environments, a robust secret management solution should be used instead of `.env` files. Examples include:
    *   `HashiCorp Vault`
    *   `AWS Secrets Manager`
    *   `Google Secret Manager`
    *   Cloud provider-specific services (e.g., Azure Key Vault)
    *   Environment variables injected via CI/CD or container orchestration systems.

    This minimizes the risk of secrets being exposed in code, logs, or through accidental version control.

2.  **🚫 Ensure the `.env` File is *Not* Version Controlled:**
    The `.env` file must **never** be checked into the `Git` repository. Add it to the project's `.gitignore` file.

    ```bash
    # Add .env on a new line in the .gitignore file (if it's not already there)
    # This command adds the line to the end of the file.
    echo "" >> .gitignore # Add a blank line just in case
    echo "# Environment-specific variables and secrets" >> .gitignore
    echo ".env" >> .gitignore
    ```
    ***Important:*** *Verify the contents of the `.gitignore` file afterwards and ensure that `.env` is actually included there before committing changes.*

## 📊 Monitoring and Logging

### Planned Actions 🛠️

Proactive measures to monitor system health and detect potential security incidents:

1.  **📈 Implement System Monitoring:**
    Install and configure tools to collect and visualize system metrics:
    *   `Prometheus`: For collecting time-series data (metrics) from the server and application (via exporters like `node_exporter`).
    *   `Grafana`: For creating dashboards and visualizing metrics from Prometheus (e.g., CPU usage, memory consumption, disk space, network traffic).

    *Example installation for Debian/Ubuntu (steps may vary):*
    ```bash
    sudo apt update
    sudo apt install prometheus prometheus-node-exporter grafana -y

    # Start and enable the services so they run automatically on reboot
    sudo systemctl start prometheus node_exporter grafana-server
    sudo systemctl enable prometheus node_exporter grafana-server
    ```
    *Then configure Prometheus to scrape data from `node_exporter` and Grafana to use Prometheus as a data source.*

2.  **🛡️ Configure Protection Against Intrusion Attempts:**
    Install `fail2ban`, a tool that analyzes log files (e.g., SSH logs, web server logs) and automatically blocks IP addresses exhibiting malicious behavior (e.g., repeated failed login attempts).

    *Example installation for Debian/Ubuntu:*
    ```bash
    sudo apt update
    sudo apt install fail2ban -y

    # fail2ban usually starts and enables automatically after installation
    sudo systemctl enable fail2ban
    sudo systemctl start fail2ban
    sudo systemctl status fail2ban # Verify that the service is running
    ```
    *Create a local configuration file to customize settings:*
    ```bash
    # Changes are made in the .local file to prevent them from being overwritten during updates
    sudo cp /etc/fail2ban/jail.conf /etc/fail2ban/jail.local
    ```
    *Edit the local configuration file (`sudo nano /etc/fail2ban/jail.local`) to enable and customize protection (e.g., for SSH, Nginx authentication, etc.). Restart `fail2ban` after configuration changes: `sudo systemctl restart fail2ban`.*