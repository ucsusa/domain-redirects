# Domain Redirects

We occasionally get requests to acquire a domain name to redirect to a specific action or other unique URL. Doing so can either be handed off to a registrar (incurring additional fees indefinitely) or with a server running indefinitely (requiring further expense and maintenance). In the interests of reducing the amount of maintenance involved, however, we came up with this simple redirection service using Netlify. With this in place a little one-time setup provides an essentially maintenance-free option which is either free (or, in this case, no additional cost beyond our existing use of the service).

Setting up a redirection requires a few steps.

1. Register your domain and update your DNS records:
-  Add an A record for the apex domain to `75.2.60.5` (the Netlify load balancer).
-  Add a CNAME record for `www` to `YOUR_NETLIFY_SITE.netlify.app`.
2. Add the domains to Netlify.
- Add a Domain Aliases for _domain-name.tld_ and www._domain-name.tld_ in the Netlify site's Domain Settings.
- Once those resolve for http, click "Renew Certificate" in Netlify Domain Settings to provision a certificate that your new domains.
- At this point, you should be able to see your domain, with or without www, over http or https getting redirected to your `defaultDomain`, as set in `index.js`.
3. Add your domain and its destination to `src/data.tsv`.
- Each domain goes on its own line, with the apex domain, tab, and the full URL of the destination.
- You can test locally by simply running `node index` and checking `public/_redirects` to ensure you're seeing expected results. That `_redirects` file is not included in the repo, but will be built upon deployment.
- When you commit and push the changes to your repo, Netlify will automatically rebuild and create redirects for http and https, with and without www.
