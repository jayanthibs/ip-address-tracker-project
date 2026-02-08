Building the IP Address Tracker was a great learning experience. I started by designing a clean and responsive layout so the app works well on both desktop and mobile. I added Leaflet.js for the interactive map and made sure it resizes properly on smaller screens using CSS and dynamic zoom levels.

One of the biggest challenges was keeping the IPify API key safe. At first, I had it directly in the code, but that’s not secure. I solved this by creating a Node.js script (make-secret.js) that generates a secret.js file at build time using an environment variable. Setting this up with Netlify took some trial and error, especially with paths and environment settings, but now the key is safe and the app still works.

I also added input validation for IP addresses and error handling for network or API issues.

In the future, I could add features like tracking multiple IPs or caching results. Overall, this project helped me improve my API integration, responsive design, and deployment skills.