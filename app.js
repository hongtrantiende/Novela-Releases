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

    // Selection Bar elements
    const selectionBar = document.getElementById('selection-bar');
    const selectionCount = document.getElementById('selection-count');
    const selectionImportBtn = document.getElementById('selection-import-btn');
    const selectionCopyBtn = document.getElementById('selection-copy-btn');
    const selectionClearBtn = document.getElementById('selection-clear-btn');
    const selectAllBtn = document.getElementById('select-all-btn');
    const deselectAllBtn = document.getElementById('deselect-all-btn');
    const resultsCount = document.getElementById('results-count');

    let allSources = [];
    let filteredSources = [];
    let currentTag = 'all';
    let searchQuery = '';

    // Selection State
    let selectedIds = new Set();

    // Pagination / Lazy Loading
    let currentPage = 1;
    const limitPerPage = 40; // Render 40 cards initially for instant loads

    // Translation helper dicts
    const tagTranslations = {
        '搜': 'Tìm kiếm',
        '发': 'Khám phá',
        '图': 'Manga',
        '声': 'Audio'
    };

    function translateTag(tag) {
        if (!tag) return '';
        const clean = tag.trim();
        return tagTranslations[clean] || clean;
    }

    function translateTags(tagsStr) {
        if (!tagsStr) return '';
        return tagsStr.split(/\s+/).map(t => translateTag(t)).join(' ');
    }

    function translateTime(timeStr) {
        if (!timeStr) return '';
        return timeStr
            .replace(/刚刚/g, 'Vừa xong')
            .replace(/小时前/g, ' giờ trước')
            .replace(/天前/g, ' ngày trước')
            .replace(/分钟前/g, ' phút trước')
            .replace(/秒前/g, ' giây trước');
    }

    // Fetch source items
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
            
            // Initial filter & render
            updateFilteredSources();
            
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
        const categories = [
            { id: 'all', name: 'Tất cả', class: 'tag-all', icon: 'fa-layer-group' },
            { id: '搜', name: 'Tìm kiếm', class: 'tag-search', icon: 'fa-magnifying-glass' },
            { id: '发', name: 'Khám phá', class: 'tag-explore', icon: 'fa-compass' },
            { id: '图', name: 'Manga', class: 'tag-manga', icon: 'fa-image' },
            { id: '声', name: 'Audio', class: 'tag-audio', icon: 'fa-volume-high' }
        ];

        tagsFilter.innerHTML = '';

        categories.forEach(cat => {
            const btn = document.createElement('button');
            btn.className = `tag-btn ${cat.class}${cat.id === 'all' ? ' active' : ''}`;
            btn.innerHTML = `<i class="fa-solid ${cat.icon}"></i> ${cat.name}`;
            btn.dataset.tag = cat.id;
            tagsFilter.appendChild(btn);
        });
    }

    function updateFilteredSources() {
        filteredSources = allSources.filter(item => {
            // Tag check
            let matchesTag = true;
            if (currentTag !== 'all') {
                matchesTag = item.tags && item.tags.split(/\s+/).includes(currentTag);
            }
            
            // Search query check
            let matchesSearch = true;
            if (searchQuery) {
                const q = searchQuery.toLowerCase();
                const nameMatch = item.name && item.name.toLowerCase().includes(q);
                const authorMatch = item.author && item.author.toLowerCase().includes(q);
                const urlMatch = item.url && item.url.toLowerCase().includes(q);
                
                // Also search the translated tags!
                const translatedTags = translateTags(item.tags).toLowerCase();
                const tagMatch = translatedTags.includes(q) || (item.tags && item.tags.toLowerCase().includes(q));
                
                // Search in update time
                const vietTime = translateTime(item.time).toLowerCase();
                const rawTime = item.time ? item.time.toLowerCase() : '';
                const timeMatch = vietTime.includes(q) || rawTime.includes(q);
                
                matchesSearch = nameMatch || authorMatch || urlMatch || tagMatch || timeMatch;
            }
            
            return matchesTag && matchesSearch;
        });

        renderSources(false);
    }

    function renderSources(append = false) {
        if (!append) {
            sourcesGrid.innerHTML = '';
            currentPage = 1;
        }

        const start = (currentPage - 1) * limitPerPage;
        const end = start + limitPerPage;
        const pageItems = filteredSources.slice(start, end);

        if (filteredSources.length === 0) {
            noResults.style.display = 'block';
            sourcesGrid.style.display = 'none';
            if (resultsCount) resultsCount.textContent = 'Tìm thấy 0 nguồn';
        } else {
            noResults.style.display = 'none';
            sourcesGrid.style.display = 'grid';
            if (resultsCount) {
                const loadedCount = Math.min(currentPage * limitPerPage, filteredSources.length);
                resultsCount.textContent = `Đang hiển thị ${loadedCount} / ${filteredSources.length} nguồn`;
            }

            pageItems.forEach(item => {
                const card = createCard(item);
                sourcesGrid.appendChild(card);
            });
        }
    }

    function createCard(item) {
        const div = document.createElement('div');
        div.className = 'source-card';

        // Extract badges (only valid translated tags)
        const tagsList = item.tags ? item.tags.split(/\s+/) : [];
        const badgeHTML = tagsList
            .filter(t => tagTranslations[t.trim()])
            .map((tag, i) => {
                const vietTag = translateTag(tag);
                const badgeClass = vietTag === 'Tìm kiếm' ? 'blue' : (vietTag === 'Khám phá' ? 'purple' : (vietTag === 'Manga' ? 'gold' : 'green'));
                return `<span class="badge-tag ${badgeClass}">${vietTag}</span>`;
            }).join('') || '<span class="badge-tag gray">Nguồn Sách</span>';

        const rawUrl = item.url || '';
        
        // Correct JSON export URL from yckceo
        const jsonExportUrl = `https://www.yckceo.com/yuedu/shuyuan/json/id/${item.id}.json`;
        const isChecked = selectedIds.has(item.id) ? 'checked' : '';

        div.innerHTML = `
            <div>
                <div class="card-header">
                    <div style="display: flex; align-items: flex-start; gap: 0.65rem;">
                        <label class="card-select-label">
                            <input type="checkbox" class="card-checkbox" data-id="${item.id}" ${isChecked}>
                            <span class="checkbox-custom"></span>
                        </label>
                        <span class="source-title">${escapeHTML(item.name)}</span>
                    </div>
                    <div class="source-badges">${badgeHTML}</div>
                </div>
                <div class="card-body">
                    <div class="source-url" title="${escapeHTML(rawUrl)}">${escapeHTML(rawUrl)}</div>
                    <div class="source-meta">
                        <span class="meta-item"><i class="fa-solid fa-user-pen"></i> Tác giả: <span class="meta-author">${escapeHTML(item.author || 'Ẩn Danh')}</span></span>
                        <span class="meta-item"><i class="fa-solid fa-download"></i> Lượt tải: <span class="meta-dl">${item.downloads || 0}</span></span>
                    </div>
                    <div class="source-time-row">
                        <i class="fa-solid fa-clock"></i> Cập nhật: <span class="meta-time-val">${escapeHTML(translateTime(item.time))}</span>
                    </div>
                </div>
            </div>
            <div class="card-actions">
                <a href="legado://import/bookSource?src=${encodeURIComponent(jsonExportUrl)}" class="btn btn-import">
                    <i class="fa-solid fa-circle-down"></i> Nhập vào ứng dụng
                </a>
                <button class="btn btn-copy" data-url="${escapeHTML(jsonExportUrl)}" title="Sao chép địa chỉ nguồn">
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

        // Register checkbox select state
        const checkbox = div.querySelector('.card-checkbox');
        checkbox.addEventListener('change', (e) => {
            if (e.target.checked) {
                selectedIds.add(item.id);
            } else {
                selectedIds.delete(item.id);
            }
            updateSelectionBar();
        });

        // Toggle checkbox on card body clicks (excluding buttons)
        div.addEventListener('click', (e) => {
            if (e.target.closest('.btn') || e.target.closest('.card-select-label') || e.target.closest('.btn-copy')) {
                return;
            }
            checkbox.checked = !checkbox.checked;
            checkbox.dispatchEvent(new Event('change'));
        });

        return div;
    }

    function updateSelectionBar() {
        const count = selectedIds.size;
        if (count > 0) {
            selectionCount.textContent = count;
            selectionBar.classList.add('show');
            
            // Build the yckceo import link
            const idArray = Array.from(selectedIds);
            const combinedUrl = `https://www.yckceo.com/yuedu/shuyuan/json/id/${idArray.join(',')}.json`;
            
            selectionImportBtn.href = `legado://import/bookSource?src=${encodeURIComponent(combinedUrl)}`;
            selectionCopyBtn.dataset.url = combinedUrl;
        } else {
            selectionBar.classList.remove('show');
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
            updateFilteredSources();
        });

        // Clear Search
        clearSearch.addEventListener('click', () => {
            searchInput.value = '';
            searchQuery = '';
            clearSearch.style.display = 'none';
            updateFilteredSources();
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
            
            updateFilteredSources();
        });

        // Infinite Scroll
        window.addEventListener('scroll', () => {
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 400) {
                if (currentPage * limitPerPage < filteredSources.length) {
                    currentPage++;
                    renderSources(true);
                }
            }
        });

        // Select All Visible Sources
        if (selectAllBtn) {
            selectAllBtn.addEventListener('click', () => {
                const start = (currentPage - 1) * limitPerPage;
                const end = start + limitPerPage;
                const pageItems = filteredSources.slice(start, end);
                
                pageItems.forEach(item => {
                    selectedIds.add(item.id);
                });
                
                // Sync checkbox state in current view
                document.querySelectorAll('.card-checkbox').forEach(cb => {
                    const id = cb.dataset.id;
                    if (selectedIds.has(id)) {
                        cb.checked = true;
                    }
                });
                
                updateSelectionBar();
            });
        }

        // Deselect All Sources
        if (deselectAllBtn) {
            deselectAllBtn.addEventListener('click', () => {
                selectedIds.clear();
                document.querySelectorAll('.card-checkbox').forEach(cb => cb.checked = false);
                updateSelectionBar();
            });
        }

        // Clear Selection from selection bar
        if (selectionClearBtn) {
            selectionClearBtn.addEventListener('click', () => {
                selectedIds.clear();
                document.querySelectorAll('.card-checkbox').forEach(cb => cb.checked = false);
                updateSelectionBar();
            });
        }

        // Copy Selection URL
        if (selectionCopyBtn) {
            selectionCopyBtn.addEventListener('click', () => {
                const url = selectionCopyBtn.dataset.url;
                copyToClipboard(url);
            });
        }
    }
});
