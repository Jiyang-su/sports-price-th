# วิ่งดี VingDee — ไกด์อุปกรณ์และไลฟ์สไตล์การวิ่งแบบคุ้มค่า (static site)

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

## เพิ่มบทความใหม่ (บทความ / articles)

1. สร้างไฟล์ `v3src/articles/<slug>.md` (slug ใช้ a-z 0-9 และ - เท่านั้น เช่น `first-10k.md`) จะกลายเป็น `https://vingdee.com/articles/<slug>.html`
2. ใส่ front matter ด้านบนไฟล์:
   ```
   ---
   title: ชื่อบทความ
   date: 2026-10-20
   category: เรื่องเล่านักวิ่ง   # ไกด์เลือกอุปกรณ์ | เรื่องเล่านักวิ่ง | รีวิวจากการใช้จริง | เตรียมตัวลงงานวิ่ง
   author: ชื่อผู้เขียน
   column: ชื่อคอลัมน์           # ไม่บังคับ
   cover: img/trail.jpg          # ไม่บังคับ (ค่าเริ่มต้น img/forest-run.jpg)
   summary: สรุปสั้น 1–2 ประโยค   # ไม่บังคับ (ใช้ย่อหน้าแรก)
   products: รองเท้าวิ่ง, ถุงเท้า  # ไม่บังคับ: หมวดในแคตตาล็อกสำหรับบล็อก "อุปกรณ์การวิ่งที่เกี่ยวข้อง"
   ---
   ```
3. เนื้อหาเขียนแบบ Markdown อย่างง่าย: เว้นบรรทัดระหว่างย่อหน้า, `## หัวข้อ`, `- รายการ`, `1. ลำดับ`, `**ตัวหนา**`, `[ลิงก์](url)`, `> คำพูด`
4. รัน `./deploy.sh --no-scrape` (สร้างหน้า, articles.json, sitemap.xml, robots.txt, ทดสอบ แล้ว deploy)

กฎ: ห้ามใช้คำว่า "ของวิ่ง" (build จะหยุด) ใช้ "อุปกรณ์การวิ่ง" / "ไลฟ์สไตล์การวิ่ง" · ไม่แนะนำสินค้าอาหาร/เครื่องดื่ม (บล็อกสินค้ากรองออกอัตโนมัติ) · เรื่องสุขภาพให้เขียนว่าไม่ใช่คำแนะนำทางการแพทย์
