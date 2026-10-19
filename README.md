# เปรียบเทียบอุปกรณ์กีฬา (Sports equipment comparison, Thailand)

Static, neutral price-comparison catalog built from public product data of Thai sports retailers.

## Rebuild
```
python3 scrape_supersports.py                     # Supersports (Shopify /products.json)
python3 scrape_decathlon.py 3500                  # Decathlon TH (sitemap + page data), N items
python3 scrape_shopify.py www.hoka.co.th HOKA
python3 scrape_shopify.py www.skechers.co.th Skechers 25
python3 build.py && python3 build_finder.py   # -> products.csv/json, index.html (inline), site/ (deploy)
python3 test_headless.py                          # headless smoke test + screenshots
```
## Deploy (GitHub Pages)
Publish the `site/` folder as-is (index.html + data.json + favicon.svg + .nojekyll).

## Neutrality / affiliate
`stores.json` has an optional `affiliate_url_template` per store (e.g. `https://aff.example/?u={url}`), empty by default.
Ordering and filters never use affiliate status; default order is the scrape order, sorting is by price only.

## Fields
id, group_id (same model across stores), group_stores, price_tier (per-category 33/67 percentile: ประหยัด/กลาง/พรีเมียม),
brand_tier (manual list), link, name, brand, category, price, sale_price, store, image, url, source_type, scraped.
Prices are as of `scraped` date; orders, shipping and returns are handled by each store.
