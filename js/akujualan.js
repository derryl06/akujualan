const loadAkujualanPortfolio = async () => {
    const portfolioGrid = document.getElementById("akujualan-portfolio");
    if (!portfolioGrid) return;

    // Fetch only items for akujualan
    const { data, error } = await window.supabaseClient
        .from("portfolio_items")
        .select("id, title, category, description, image_url, image_urls, sort_order, created_at")
        .eq("brand", "akujualan")
        .order("sort_order", { ascending: true })
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Error loading portfolio:", error);
        portfolioGrid.innerHTML = `<p class="muted">Gagal memuat karya: ${error.message}</p>`;
        return;
    }

    if (!data || data.length === 0) {
        portfolioGrid.innerHTML = `<p class="muted">Belum ada karya untuk ditampilkan.</p>`;
        return;
    }

    portfolioGrid.innerHTML = "";

    // Create grid container using existing styles
    const gridDiv = document.createElement("div");
    gridDiv.className = "card-grid reveal-stagger";

    // Simple 3-column layout for akujualan
    data.forEach(item => {
        const card = document.createElement("div");
        card.className = "card work-card";
        card.setAttribute("data-title", item.title || "");
        card.setAttribute("data-description", item.description || "");
        card.setAttribute("data-images", JSON.stringify(item.image_urls || [item.image_url]));

        card.innerHTML = `
            <img class="card-thumb" src="${item.image_url}" alt="${item.title}" style="width: 100%; height: 100%; object-fit: cover;">
            <div class="card-overlay" style="position: absolute; inset: 0; background: rgba(0,0,0,0.3); opacity: 0; transition: opacity 0.3s; display: flex; align-items: center; justify-content: center; color: #white;">
                <span style="font-weight: 700; color: white;">LIHAT DETAIL</span>
            </div>
        `;

        // Interaction for lightbox
        card.addEventListener("click", () => {
            const images = JSON.parse(card.getAttribute("data-images"));
            if (window.openLightbox) {
                window.openLightbox(images, 0, item.title, item.description);
            }
        });

        gridDiv.appendChild(card);
    });

    portfolioGrid.appendChild(gridDiv);

    // Re-init reveal animations if available
    if (window.initReveal) window.initReveal();
};

// Polling for supabase client
const checkSupabase = setInterval(() => {
    if (window.supabaseClient) {
        clearInterval(checkSupabase);
        loadAkujualanPortfolio();
    }
}, 100);
