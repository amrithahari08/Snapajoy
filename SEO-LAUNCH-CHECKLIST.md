# SEO and Discoverability Launch Checklist

## 1) Production domain and indexing
- Replace canonical and structured-data URLs with final production domain.
- Confirm `https://www.snapajoy.in/robots.txt` and `https://www.snapajoy.in/sitemap.xml` are publicly reachable.
- Confirm homepage returns HTTP 200 and is not blocked by auth or geofencing.

## 2) Search engine setup
- Verify property in Google Search Console.
- Submit sitemap in Google Search Console.
- Verify property in Bing Webmaster Tools.
- Submit sitemap in Bing Webmaster Tools.

## 3) Crawl controls and AI policy
- Keep allowlist bots: Googlebot, Bingbot, OAI-SearchBot.
- Keep blocked bots: GPTBot, ClaudeBot, Google-Extended.
- Keep PerplexityBot blocked until logs are reviewed.
- Re-check robots file after each policy update.

## 4) IndexNow (post-launch)
- Generate and host IndexNow key file at site root.
- Submit key and first URL set to IndexNow endpoint.
- Automate URL push for homepage and future major pages.

## 5) Quality checks
- Validate structured data in Rich Results Test and schema validators.
- Validate title/meta/OG tags via page source and social debugger tools.
- Check Core Web Vitals and image payload sizes.
- Confirm all primary images have descriptive alt text.

## 6) Monitoring
- Track impressions and indexing coverage weekly for first 4 weeks.
- Track crawl hits by user-agent in server logs.
- Review AI/search visibility and revise allowlist in controlled steps.
