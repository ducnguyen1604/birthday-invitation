// ===== UTILS FILE =====

// ===== EXCEL GENERATION =====
function downloadExcel(planningData) {
    if (typeof XLSX === 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.min.js';
        script.onload = () => createAndDownloadExcel(planningData);
        document.head.appendChild(script);
    } else {
        createAndDownloadExcel(planningData);
    }
}

function createAndDownloadExcel(planningData) {
    const wb = XLSX.utils.book_new();
    const wsData = [];

    wsData.push(['LỊCH SINH NHẬT - ĐÀ NẴNG']);
    wsData.push(['']);
    wsData.push(['Từ: 2/4/2025 (tối) đến 5/4/2025 (trưa)']);
    wsData.push(['']);

    wsData.push(['NGÀY 2/4 - TỐI']);
    if (planningData.day2Evening) {
        wsData.push(['Bữa ăn:', planningData.day2Evening.restaurant || 'Chưa chọn']);
    }
    wsData.push(['']);

    wsData.push(['NGÀY 3/4 (THỨ SÁU)']);
    wsData.push(['BUỔI SÁNG']);
    if (planningData.day3Morning) {
        wsData.push(['Hoạt động:', planningData.day3Morning.activities?.join(', ') || 'Chưa chọn']);
    }
    if (planningData.day3Breakfast) {
        wsData.push(['Ăn sáng:', planningData.day3Breakfast.restaurant || 'Chưa chọn']);
    }
    wsData.push(['']);

    wsData.push(['BUỔI CHIỀU']);
    if (planningData.day3Afternoon) {
        wsData.push(['Hoạt động:', planningData.day3Afternoon.activities?.join(', ') || 'Chưa chọn']);
    }
    if (planningData.day3Lunch) {
        wsData.push(['Ăn trưa:', planningData.day3Lunch.restaurant || 'Chưa chọn']);
    }
    wsData.push(['']);

    wsData.push(['BUỔI TỐI - FINE DINING']);
    if (planningData.day3Evening) {
        const fdDetails = planningData.day3Evening.restaurant ? 
            `${planningData.day3Evening.restaurant}` :
            'Chưa chọn';
        wsData.push(['Fine Dining:', fdDetails]);
    }
    wsData.push(['']);

    wsData.push(['NGÀY 4/4 (THỨ BẢY)']);
    if (planningData.day4) {
        wsData.push(['Lịch làm việc:', planningData.day4.shift || 'Chưa chọn']);
        if (planningData.day4.activities && planningData.day4.activities.length > 0) {
            wsData.push(['Hoạt động:', planningData.day4.activities.join(', ')]);
        }
        if (planningData.day4.restaurant) {
            wsData.push(['Bữa ăn:', planningData.day4.restaurant]);
        }
    }

    const ws = XLSX.utils.aoa_to_sheet(wsData);
    ws['!cols'] = [{ wch: 20 }, { wch: 40 }];
    
    XLSX.utils.book_append_sheet(wb, ws, 'Lịch Trình');
    XLSX.writeFile(wb, `Lich-sinh-nhat-${new Date().toISOString().slice(0, 10)}.xlsx`);
}

// ===== LOCAL STORAGE =====
const STORAGE_KEY = 'loveLetter_planning';

function savePlanningData(data) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        console.log('✓ Dữ liệu đã được lưu');
    } catch (e) {
        console.error('Lỗi lưu dữ liệu:', e);
    }
}

function getPlanningData() {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : null;
    } catch (e) {
        console.error('Lỗi đọc dữ liệu:', e);
        return null;
    }
}

// ===== VALIDATION =====
function validateCheckboxCount(checkbox, maxCount) {
    const checkboxes = document.querySelectorAll(
        `input[name="${checkbox.name}"]:checked`
    );
    
    if (checkboxes.length > maxCount) {
        checkbox.checked = false;
        createToast(`⚠️ Tối đa chọn ${maxCount} hoạt động`);
    }
}

// ===== TOAST =====
function createToast(message, duration = 3000) {
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: rgba(217, 70, 166, 0.9);
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        font-size: 14px;
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, duration);
}

// ===== TYPE EFFECT =====
function typeText(element, text, speed = 50) {
    return new Promise(resolve => {
        let index = 0;
        element.textContent = '';
        element.classList.add('typing');
        
        function type() {
            if (index < text.length) {
                element.textContent += text.charAt(index);
                index++;
                setTimeout(type, speed);
            } else {
                element.classList.remove('typing');
                resolve();
            }
        }
        type();
    });
}