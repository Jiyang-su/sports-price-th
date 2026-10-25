// Chill running places by province (shared by places.html). Edit here only.
// Fields: id, province, name, area, blurb, image, lat, lng, tips (optional short)
const PLACES=[
{id:'bkk-rotfai',province:'กรุงเทพฯ',name:'สวนวชิรเบญจทัศ (สวนรถไฟ)',area:'จตุจักร',blurb:'สวนใหญ่ร่มรื่น เส้นทางเดิน–วิ่งวนยาว วิ่งเช้าหรือเย็นได้สบาย ไม่ต้องเร่งเวลา',image:'img/places/bkk-rotfai.jpg',lat:13.8119,lng:100.5550,tips:'มีที่เช่าจักรยาน · เหมาะวิ่งยาวชิล'},
{id:'bkk-benjakitti',province:'กรุงเทพฯ',name:'สวนเบญจกิติ / สวนป่าเบญจกิติ',area:'คลองเตย',blurb:'ทะเลสาบ + ทางวิ่งยกสูง วิวเมืองแต่ยังรู้สึกโล่ง วิ่งวนรอบน้ำหรือขึ้นสกายวอล์กก็ได้',image:'img/places/bkk-benjakitti.jpg',lat:13.7293,lng:100.5546,tips:'ใกล้ MRT ศูนย์ประชุมแห่งชาติสิริกิติ์'},
{id:'bkk-lumphini',province:'กรุงเทพฯ',name:'สวนลุมพินี',area:'ปทุมวัน',blurb:'สวนกลางเมืองคลาสสิก ทางวิ่งรอบทะเลสาบชัดเจน คนเยอะช่วงเย็น แต่เช้ามืดยังชิล',image:'img/places/bkk-lumphini.jpg',lat:13.7308,lng:100.5414,tips:'วนรอบน้ำประมาณ 2.5 กม.'},
{id:'bkk-rama9',province:'กรุงเทพฯ',name:'สวนหลวง ร.9',area:'ประเวศ',blurb:'สวนกว้างที่สุดในกทม. วนหลักยาวประมาณ 5 กม. เหมาะวันหยุดที่อยากวิ่งยาวๆ แบบไม่เร่ง',image:'img/places/bkk-rama9.jpg',lat:13.6875,lng:100.6628,tips:'เปิดเช้า–เย็น · มีค่าเข้าช่วงกลางวัน'},
{id:'cnx-moat',province:'เชียงใหม่',name:'คูเมืองเชียงใหม่',area:'เมืองเก่า',blurb:'วิ่งวนรอบคูเมืองประมาณ 6 กม. วิวกำแพงเมืองโบราณ เหมาะเช้ามืดก่อนรถเยอะ ก้าวสบายไม่ต้องแข่งใคร',image:'img/places/cnx-moat.jpg',lat:18.7878,lng:98.9933,tips:'เริ่มที่ประตูท่าแพได้ · ระวังฟุตบาทสูง'},
{id:'cnx-angkaew',province:'เชียงใหม่',name:'อ่างแก้ว มช.',area:'สุเทพ / มช.',blurb:'ทางวิ่งรอบอ่างใน มช. ร่มรื่น วิวดอยสุเทพ วนประมาณ 2–3 กม. ชิลและปลอดภัยจากรถ',image:'img/places/cnx-angkaew.jpg',lat:18.8059,lng:98.9509,tips:'เข้าจากใน มช. · เปิดเช้า–ค่ำ'},
{id:'cnx-buakhard',province:'เชียงใหม่',name:'สวนสาธารณะหนองบวกหาด',area:'ในเมืองเก่า',blurb:'สวนเล็กกลางเมืองเก่า มุมออกกำลังกายเช้า–เย็น วิ่งวนสั้นๆ หรือวอร์มอัพก่อนไปคูเมืองก็ดี',image:'img/places/cnx-buakhard.jpg',lat:18.7822,lng:98.9794,tips:'มุมตะวันตกเฉียงใต้ของคูเมือง'},
{id:'cnx-huaytungtao',province:'เชียงใหม่',name:'ห้วยตึงเฒ่า',area:'แม่ริม',blurb:'อ่างเก็บน้ำเชิงดอยสุเทพ มีทางวิ่ง–ปั่นและวนรอบน้ำ โล่งๆ วิวดี เหมาะวันหยุดที่อยากวิ่งชิลนอกเมือง',image:'img/places/cnx-huaytungtao.jpg',lat:18.8679,lng:98.9401,tips:'มีค่าเข้าเล็กน้อย · ทางวิ่งภายนอก ~5 กม.'}
];
