# Domain Redirects

We occasionally get requests to acquire a domain name to redirect to a specific action or other unique URL. Doing so can either be handed off to a registrar (incurring additional fees indefinitely) or with a server running indefinitely (requiring further expense and maintenance). In the interests of reducing the amount of maintenance involved, however, we came up with this simple redirection service using Netlify. With this in place a little one-time setup provides an essentially maintenance-free option which is either free (or, in this case, no additional cost beyond our existing use of the service).

Setting up a redirection requires a few steps.

1. Register your domain and update your DNS records:
-  Add an A record for the apex domain to `75.2.60.5` (which is [the Netlify load balancer](https://docs.netlify.com/domains-https/custom-domains/configure-external-dns/#configure-an-apex-domain)).
-  Add a CNAME record for `www` to `YOUR_NETLIFY_SITE.netlify.app`.
2. Add the domains to Netlify.
- Add a Domain Aliases for _domain-name.tld_ and www._domain-name.tld_ in the Netlify site's Domain Settings.
- Once those resolve for http, click "Renew Certificate" in Netlify Domain Settings to provision a certificate that your new domains.
- At this point, you should be able to see your domain, with or without www, over http or https getting redirected to your `defaultDomain`, as set in `index.js`.
3. Add your domain and its destination to `src/data.tsv`.
- Each domain goes on its own line, with the apex domain, tab, and the full URL of the destination.
- You can test locally by simply running `node index` and checking `public/_redirects` to ensure you're seeing expected results. That `_redirects` file is not included in the repo, but will be built upon deployment.
- When you commit and push the changes to your repo, Netlify will automatically rebuild and create redirects for http and https, with and without www.

Todo (which we admittedly don't need right now, but might be nice to have):

- Make [adding domain aliases and SSL certs a part of the build script](https://open-api.netlify.com/#operation/updateSite). So any update to `data.tsv` results in automatically adding any new domain aliases and provisioning the certificates necessary without having to log into the dashboard and add them manually.
- If making API calls, add instructions for API key and `defaultDomain` settings in the Netlify dashboard for the site. Fallbacks can go in `netlify.toml`.
- Expand to include link-shortening options (potentially checking `line[0]` to see if it's a domain or a path? Based upon starting with a `/` or with a flag of some kind?). 
- If adding link-shortening capabilities, update readme with making the default domain `YOUR-SHORTLINK-SUBDOMAIN.YOUR-SITE.TLD` the primary domain and examples in `src/data.tsv` and move default fallback to `data.tsv`.
- Change from simple single tab matching to any amount of whitespace between source and destination, allowing optional alignment in `data.tsv` for legibility.