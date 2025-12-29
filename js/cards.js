
function openModal(type) {
    const modal = document.getElementById('detailModal');
    const body = document.getElementById('modalBody');

    let content = '';

    if (type === 'luxury') {
        content = `
                    <h2>Luxury Sedan (e.g., Mercedes-Benz S-Class)</h2>
                    <p>The pinnacle of comfort and technology. Smooth ride, premium leather seats, advanced driver assistance, and ultra-quiet cabin.</p>
                    <ul>
                        <li>Engine: V6 or V8 options</li>
                        <li>0-60 mph: ~4.5 seconds</li>
                        <li>Top features: Massaging seats, ambient lighting, rear entertainment screens</li>
                        <li>Fuel economy: 20-30 mpg</li>
                    </ul>
                    <h3>Gallery</h3>
                    <div class="detail-images">
                        <img src="https://cdn-ds.com/blogs-media/sites/177/2024/06/24110700/2024-Mercedes-Benz-S-Class-Sedan-01-B_o.jpg" alt="Luxury exterior">
                        <img src="https://i.ytimg.com/vi/212vF60LkaM/hq720.jpg" alt="Luxury detail">
                        <img src="https://i.ytimg.com/vi/zUOWTV8dujM/hq720.jpg" alt="Luxury interior">
                        <img src="https://assets.bwbx.io/images/users/iqjWHBFdfxIU/iG4_HruAGac4/v1/-1x-1.webp" alt="Luxury side view">
                    </div>
                `;
    } else if (type === 'sports') {
        content = `
                    <h2>Sports Car (e.g., Porsche 911)</h2>
                    <p>Designed for thrilling performance and precise handling. Iconic design with rear-engine layout.</p>
                    <ul>
                        <li>Engine: Flat-6 turbocharged</li>
                        <li>0-60 mph: ~3.0 seconds</li>
                        <li>Top features: Adaptive suspension, sport exhaust, track modes</li>
                        <li>Horsepower: 400-600+ hp</li>
                    </ul>
                    <h3>Gallery</h3>
                    <div class="detail-images">
                        <img src="https://porschepictures.flowcenter.de/pmdb/thumbnail.cgi?id=298382&w=1935&h=1089&crop=1&public=1&cs=ddbe541a03109d8b" alt="Sports cockpit">
                        <img src="https://i.ytimg.com/vi/C68V5AktPWw/hq720.jpg" alt="Sports exterior">
                        <img src="https://images.cars.com/cldstatic/wp-content/uploads/porsche-911-turbo-s-2021-1-front-row--interior--red.jpg" alt="Sports interior">
                        <img src="https://i.ytimg.com/vi/kIQf06nrBSA/maxresdefault.jpg" alt="Sports detail">
                    </div>
                `;
    } else if (type === 'suv') {
        content = `
                    <h2>SUV (e.g., Toyota Land Cruiser)</h2>
                    <p>Rugged, spacious, and capable off-road while comfortable for daily driving and family use.</p>
                    <ul>
                        <li>Seating: Up to 8 passengers</li>
                        <li>Off-road: Full-time 4WD, crawl control</li>
                        <li>Cargo space: 80+ cubic feet</li>
                        <li>Towing: Up to 8,000 lbs</li>
                    </ul>
                    <h3>Gallery</h3>
                    <div class="detail-images">
                        <img src="https://hips.hearstapps.com/hmg-prod/images/2024-toyota-land-cruiser-interior-101-64c92cc536245.jpg" alt="SUV interior">
                        <img src="https://di-uploads-pod44.dealerinspire.com/nyetoyota/uploads/2024/05/2024-Toyota-Land-Cruiser-Interior-1.jpg" alt="SUV dashboard">
                        <img src="https://di-uploads-pod19.dealerinspire.com/hendricktoyotaconcord/uploads/2025/01/mlp-img-int-2025-land-cruiser.jpg" alt="SUV seats">
                        <img src="https://hips.hearstapps.com/hmg-prod/images/2024-toyota-land-cruiser-interior-103-64c92cc55a589.jpg?crop=0.8888888888888888xw:1xh;center,top&resize=1200:*" alt="SUV rear">
                    </div>
                `;
    } else if (type === 'electric') {
        content = `
                    <h2>Electric Car (e.g., Lucid Air / Tesla Model S)</h2>
                    <p>Cutting-edge EV with instant torque, long range, and minimalist high-tech interior.</p>
                    <ul>
                        <li>Range: 400-500+ miles</li>
                        <li>0-60 mph: Under 3 seconds</li>
                        <li>Charging: Ultra-fast DC support</li>
                        <li>Features: Large touchscreen, autopilot capabilities</li>
                    </ul>
                    <h3>Gallery</h3>
                    <div class="detail-images">
                        <img src="https://www.slashgear.com/img/gallery/lucid-air-vs-tesla-model-s-which-is-the-better-electric-car/l-intro-1652295513.jpg" alt="Electric exterior">
                        <img src="https://carconfections.com/wp-content/uploads/2022/07/maxresdefault-1.jpeg" alt="Electric comparison">
                        <img src="https://i.ytimg.com/vi/1ZyPkiPypSM/hq720.jpg" alt="Electric interior">
                        <img src="https://theevreport.com/wp-content/uploads/2025/10/Model-S-vs-Lucid-Air.jpg" alt="Electric side">
                    </div>
                `;
    }

    body.innerHTML = content;
    modal.style.display = 'flex';
}

function closeModal() {
    document.getElementById('detailModal').style.display = 'none';
}

// Close modal when clicking outside
window.onclick = function (event) {
    const modal = document.getElementById('detailModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}
// closeModal and window.onclick same as before
