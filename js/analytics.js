(function () {
    const logVisit = async () => {
        // Wait for Supabase to be ready
        if (!window.supabaseClient) {
            setTimeout(logVisit, 1000);
            return;
        }

        const { data: { session } } = await window.supabaseClient.auth.getSession();
        // Don't log admin visits
        if (session) return;

        const path = window.location.pathname;
        const referrer = document.referrer || "Direct";
        const ua = navigator.userAgent;

        // Simple detect browser/device
        let browser = "Other";
        if (ua.includes("Chrome")) browser = "Chrome";
        else if (ua.includes("Firefox")) browser = "Firefox";
        else if (ua.includes("Safari") && !ua.includes("Chrome")) browser = "Safari";

        let device = "Desktop";
        if (/Mobi|Android|iPhone/i.test(ua)) device = "Mobile";

        try {
            await window.supabaseClient
                .from("page_visits")
                .insert([{
                    page_path: path,
                    referrer: referrer,
                    browser: browser,
                    device: device
                }]);
        } catch (e) {
            console.error("Analytics error:", e);
        }
    };

    if (document.readyState === "complete") {
        logVisit();
    } else {
        window.addEventListener("load", logVisit);
    }
})();
