// Application logic for Kho Nguồn Truyện - Novela
document.addEventListener('DOMContentLoaded', () => {
    const JSON_URL = 'yckceo_sources.json';
    
    // UI elements
    const loader = document.getElementById('loader');
    const errorBox = document.getElementById('error-box');
    const errorMessage = document.getElementById('error-message');
    const sourcesGrid = document.getElementById('sources-grid');
    const noResults = document.getElementById('no-results');
    const searchInput = document.getElementById('search-input');
    const clearSearch = document.getElementById('clear-search');
    const tagsFilter = document.getElementById('tags-filter');
    const totalSourcesVal = document.getElementById('total-sources-val');
    const totalDownloadsVal = document.getElementById('total-downloads-val');
    const toast = document.getElementById('toast');
    const toastText = document.getElementById('toast-text');

    let allSources = [];
    let currentTag = 'all';
    let searchQuery = '';

    // Fetch source items from GitHub
    fetchSources();

    async function fetchSources() {
        try {
            const response = await fetch(JSON_URL + '?t=' + Date.now());
            if (!response.ok) {
                throw new Error(`Lỗi kết nối máy chủ: HTTP ${response.status}`);
            }
            const data = await response.json();
            if (!Array.isArray(data)) {
                throw new Error("Định dạng dữ liệu không hợp lệ.");
            }
            
            allSources = data;
            
            // Hide loader
            loader.style.display = 'none';
            
            // Calculate and display stats
            updateStats();
            
            // Generate tags
            generateTagFilters();
            
            // Initial render
            renderSources();
            
            // Register input events
            registerEvents();
            
        } catch (error) {
            loader.style.display = 'none';
            errorBox.style.display = 'block';
            errorMessage.textContent = error.message || "Không thể đồng bộ danh sách nguồn truyện.";
            console.error("Fetch error:", error);
        }
    }

    function updateStats() {
        totalSourcesVal.textContent = allSources.length;
        
        const totalDl = allSources.reduce((sum, item) => sum + (item.downloads || 0), 0);
        totalDownloadsVal.textContent = formatDownloads(totalDl);
    }

    function formatDownloads(num) {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        }
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num;
    }

    function generateTagFilters() {
        // Collect tags
        const tagsSet = new Set();
        allSources.forEach(item => {
            if (item.tags) {
                item.tags.split(/[,，|]/).forEach(t => {
                    const cleanTag = t.trim();
                    if (cleanTag && cleanTag.length < 15) {
                        tagsSet.add(cleanTag);
                    }
                });
            }
        });

        // Add typical Vietnamese content tags if list is too short
        const tags = Array.from(tagsSet).slice(0, 8); // Limit to top 8 tags

        tags.forEach(tag => {
            const btn = document.createElement('button');
            btn.className = 'tag-btn';
            btn.textContent = tag;
            btn.dataset.tag = tag;
            tagsFilter.appendChild(btn);
        });
    }

    function renderSources() {
        // Filter sources
        const filtered = allSources.filter(item => {
            // Tag check
            let matchesTag = true;
            if (currentTag !== 'all') {
                matchesTag = item.tags && item.tags.toLowerCase().includes(currentTag.toLowerCase());
            }
            
            // Search query check
            let matchesSearch = true;
            if (searchQuery) {
                const q = searchQuery.toLowerCase();
                const nameMatch = item.name && item.name.toLowerCase().includes(q);
                const authorMatch = item.author && item.author.toLowerCase().includes(q);
                const urlMatch = item.url && item.url.toLowerCase().includes(q);
                const tagMatch = item.tags && item.tags.toLowerCase().includes(q);
                matchesSearch = nameMatch || authorMatch || urlMatch || tagMatch;
            }
            
            return matchesTag && matchesSearch;
        });

        // Clear grid
        sourcesGrid.innerHTML = '';

        if (filtered.length === 0) {
            noResults.style.display = 'block';
            sourcesGrid.style.display = 'none';
        } else {
            noResults.style.display = 'none';
            sourcesGrid.style.display = 'grid';

            filtered.forEach(item => {
                const card = createCard(item);
                sourcesGrid.appendChild(card);
            });
        }
    }

    function createCard(item) {
        const div = document.createElement('div');
        div.className = 'source-card';

        // Extract badges
        const tagsList = item.tags ? item.tags.split(/[,，|]/).slice(0, 2) : [];
        const badgeHTML = tagsList.map((tag, i) => {
            const badgeClass = i === 0 ? 'blue' : 'purple';
            return `<span class="badge-tag ${badgeClass}">${tag.trim()}</span>`;
        }).join('') || '<span class="badge-tag gray">Nguồn Sách</span>';

        const rawUrl = item.url || '';
        const host = getDomain(rawUrl);

        div.innerHTML = `
            <div>
                <div class="card-header">
                    <span class="source-title">${escapeHTML(item.name)}</span>
                    <div class="source-badges">${badgeHTML}</div>
                </div>
                <div class="card-body">
                    <div class="source-url" title="${escapeHTML(rawUrl)}">${escapeHTML(rawUrl)}</div>
                    <div class="source-meta">
                        <span class="meta-item"><i class="fa-solid fa-user-pen"></i> Tác giả: <span class="meta-author">${escapeHTML(item.author || 'Ẩn Danh')}</span></span>
                        <span class="meta-item"><i class="fa-solid fa-download"></i> Lượt tải: <span class="meta-dl">${item.downloads || 0}</span></span>
                    </div>
                </div>
            </div>
            <div class="card-actions">
                <a href="legado://import/bookSource?src=${encodeURIComponent(rawUrl)}" class="btn btn-import">
                    <i class="fa-solid fa-circle-down"></i> Nhập vào ứng dụng
                </a>
                <button class="btn btn-copy" data-url="${escapeHTML(rawUrl)}" title="Sao chép địa chỉ nguồn">
                    <i class="fa-solid fa-copy"></i>
                </button>
            </div>
        `;

        // Register Copy action
        const copyBtn = div.querySelector('.btn-copy');
        copyBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const url = copyBtn.getAttribute('data-url');
            copyToClipboard(url);
        });

        return div;
    }

    function getDomain(url) {
        try {
            return new URL(url).hostname;
        } catch (e) {
            return url;
        }
    }

    function escapeHTML(str) {
        if (!str) return '';
        return str.replace(/[&<>'"]/g, 
            tag => ({
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                "'": '&#39;',
                '"': '&quot;'
            }[tag] || tag)
        );
    }

    function copyToClipboard(text) {
        navigator.clipboard.writeText(text).then(() => {
            showToast("Đã sao chép liên kết nguồn truyện!");
        }).catch(err => {
            // Fallback
            const textArea = document.createElement("textarea");
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            try {
                document.execCommand('copy');
                showToast("Đã sao chép liên kết nguồn truyện!");
            } catch (err) {
                showToast("Lỗi sao chép liên kết!");
            }
            document.body.removeChild(textArea);
        });
    }

    function showToast(message) {
        toastText.textContent = message;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 2500);
    }

    function registerEvents() {
        // Search Input
        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value;
            if (searchQuery) {
                clearSearch.style.display = 'flex';
            } else {
                clearSearch.style.display = 'none';
            }
            renderSources();
        });

        // Clear Search
        clearSearch.addEventListener('click', () => {
            searchInput.value = '';
            searchQuery = '';
            clearSearch.style.display = 'none';
            renderSources();
        });

        // Tags Selection Click
        tagsFilter.addEventListener('click', (e) => {
            const btn = e.target.closest('.tag-btn');
            if (!btn) return;
            
            // Remove active from all
            tagsFilter.querySelectorAll('.tag-btn').forEach(b => b.classList.remove('active'));
            
            // Make clicked active
            btn.classList.add('active');
            currentTag = btn.dataset.tag;
            
            renderSources();
        });
    }
});
