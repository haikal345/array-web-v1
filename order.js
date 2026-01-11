document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Data Produk (Updated Image Links) ---
    const products = {
        'bambu': {
            name: 'Tirai Bambu Autentik',
            price: 60000,
            // Link gambar Bambu diperbarui
            image: 'https://i.ibb.co.com/hp7MDPp/Whats-App-Image-2025-12-20-at-12-46-57.jpg',
            material: 'Bambu Pilihan'
        },
        'pvc': {
            name: 'Tirai PVC Premium',
            price: 130000,
            // Gambar default untuk PVC (bisa diganti jika ada link baru)
            image: 'https://images.unsplash.com/photo-1574352067721-72d5913bd35c?auto=format&fit=crop&q=80&w=600',
            material: 'PVC Tahan Air'
        },
        'edging': {
            name: 'Tirai Modern Edging',
            price: 150000,
            // Link gambar Edging diperbarui
            image: 'https://i.ibb.co.com/dwdY5PzL/Whats-App-Image-2025-12-20-at-12-46-56.jpg',
            material: 'Polyester Blend'
        }
    };

    // --- 2. Selectors (Menghubungkan ke HTML) ---
    const productSelect = document.getElementById('productSelect');
    const widthInput = document.getElementById('widthInput');
    const heightInput = document.getElementById('heightInput');
    const colorInput = document.getElementById('colorInput');
    const warningText = document.getElementById('widthWarning');
    const totalPriceEl = document.getElementById('totalPrice');
    
    // Preview Selectors
    const previewImg = document.getElementById('preview-img');
    const previewName = document.getElementById('product-name');
    const specMaterial = document.getElementById('spec-material');
    const specPrice = document.getElementById('spec-price');
    
    // Buttons
    const btnWa = document.getElementById('btnWhatsapp');
    const btnShopee = document.getElementById('btnShopee');

    // --- 3. Logic: Update Display (Ganti Gambar & Teks) ---
    function updateProductInfo() {
        const key = productSelect.value;
        
        if (key && products[key]) {
            const data = products[key];
            
            // Efek transisi halus saat ganti gambar
            previewImg.style.opacity = 0;
            
            setTimeout(() => {
                previewImg.src = data.image; // Mengambil link gambar baru
                previewImg.style.opacity = 1;
            }, 200);

            previewName.textContent = data.name;
            specMaterial.textContent = data.material;
            specPrice.textContent = `Rp ${data.price.toLocaleString('id-ID')} / m`;
        } else {
            // Reset jika opsi default dipilih
            previewName.textContent = 'Pilih Jenis Tirai';
            specMaterial.textContent = '-';
            specPrice.textContent = '-';
            // Opsional: Gambar default saat reset
            previewImg.src = 'https://i.ibb.co.com/dwdY5PzL/Whats-App-Image-2025-12-20-at-12-46-56.jpg';
            previewImg.style.opacity = 1;
        }
        calculatePrice();
    }

    // --- 4. Logic: Calculate (Hitung Harga) ---
    function calculatePrice() {
        const key = productSelect.value;
        const width = parseFloat(widthInput.value) || 0;
        const height = parseFloat(heightInput.value) || 0;

        // Tampilkan warning jika lebar > 3m
        warningText.style.display = (width > 3) ? 'block' : 'none';

        if (key && products[key] && width > 0 && height > 0) {
            const total = products[key].price * width * height;
            // Pembulatan ke atas (Math.ceil) agar harga rapi
            totalPriceEl.textContent = `Rp ${Math.ceil(total).toLocaleString('id-ID')}`;
        } else {
            totalPriceEl.textContent = 'Rp 0';
        }
    }

    // --- 5. Logic: URL Params (Integrasi Index -> Order) ---
    // Menerima data ?sku=... dari halaman depan
    const urlParams = new URLSearchParams(window.location.search);
    const productSku = urlParams.get('sku');
    
    if (productSku && products[productSku]) {
        productSelect.value = productSku;
        // Paksa browser menjalankan fungsi update saat halaman dimuat
        productSelect.dispatchEvent(new Event('change'));
    }

    // --- 6. Action Buttons (Kirim Pesan) ---
    btnWa.addEventListener('click', () => {
        const key = productSelect.value;
        const width = widthInput.value;
        const height = heightInput.value;
        const total = totalPriceEl.textContent;
        const color = colorInput.value || '-';

        if (!key || !width || !height) {
            alert('Harap lengkapi jenis tirai dan ukuran.'); return;
        }
        if (parseFloat(width) > 3) {
            alert('Lebar maksimal adalah 3 meter.'); return;
        }

        const message = `Halo Array, saya ingin order custom:\n\n*Produk:* ${products[key].name}\n*Ukuran:* ${width}m x ${height}m\n*Warna:* ${color}\n*Estimasi:* ${total}\n\nMohon info selanjutnya.`;
        window.open(`https://wa.me/6285314787893?text=${encodeURIComponent(message)}`, '_blank');
    });

    btnShopee.addEventListener('click', () => {
        window.open('https://shopee.co.id/tokoanda', '_blank');
    });

    // --- Listeners (Pemicu Event) ---
    productSelect.addEventListener('change', updateProductInfo);
    widthInput.addEventListener('input', calculatePrice);
    heightInput.addEventListener('input', calculatePrice);
});