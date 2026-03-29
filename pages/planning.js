// ===== PLANNING PAGE =====

function renderPlanningPage() {
    return `
        <div class="page page-planning">
            <div class="planning-header">
                <h1>📅 Lên Kế Hoạch Sinh Nhật</h1>
                <p>Cùng nhau tạo kỷ niệm đẹp nhất 💖</p>
            </div>

            <form id="planningForm">

                <div class="timeline-section">

                    <!-- NGÀY 2/4 -->
                    <div class="timeline-slot">
                        <div class="slot-title">🌙 Tối Ngày 2/4</div>

                        <div class="select-group">
                            <label>Em có muốn ăn đêm không?</label>
                            <select name="day2Evening" required>
                                <option value="">-- Chọn --</option>
                                ${DATA.restaurants.dinner.map(r => `<option value="${r}">${r}</option>`).join('')}
                            </select>
                        </div>
                    </div>

                    <!-- NGÀY 3/4 -->
                    <div class="timeline-slot">
                        <div class="slot-title">🌅 Ngày 3/4</div>

                        <!-- ĂN TRƯỚC -->
                        <div class="select-group">
                            <label>Ăn sáng</label>
                            <select name="day3Breakfast" required>
                                <option value="">-- Chọn --</option>
                                ${DATA.restaurants.breakfast.map(r => `<option value="${r}">${r}</option>`).join('')}
                            </select>
                        </div>

                        <div class="select-group">
                            <label>Ăn trưa</label>
                            <select name="day3Lunch" required>
                                <option value="">-- Chọn --</option>
                                ${DATA.restaurants.lunch.map(r => `<option value="${r}">${r}</option>`).join('')}
                            </select>
                        </div>

                        <div class="select-group">
                            <label>Fine Dining buổi tối 🎉</label>
                            <select name="day3Dinner" required>
                                <option value="">-- Chọn --</option>
                                ${DATA.fineDining.map(fd => 
                                    `<option value="${fd.name}">${fd.name} (${fd.cuisine})</option>`
                                ).join('')}
                            </select>
                        </div>

                        <!-- HOẠT ĐỘNG -->
                        <div class="slot-category">Hoạt động buổi sáng</div>
                        ${renderCheckboxGroup("day3MorningActivities", DATA.activities.morning)}

                        <div class="slot-category">Hoạt động buổi chiều (photobooth bắt buộc ✨)</div>
                        ${renderCheckboxGroup("day3AfternoonActivities", DATA.activities.afternoon, true)}

                        <div class="slot-category">Hoạt động buổi tối 🌙</div>
                        ${renderCheckboxGroup("day3EveningActivities", DATA.activities.evening)}

                    </div>

                    <!-- NGÀY 4/4 -->
                    <div class="timeline-slot">
                        <div class="slot-title">🌞 Ngày 4/4 (Cả ngày bên nhau 💕)</div>

                        <!-- ĂN -->
                        <div class="select-group">
                            <label>Ăn sáng</label>
                            <select name="day4Breakfast" required>
                                <option value="">-- Chọn --</option>
                                ${DATA.restaurants.breakfast.map(r => `<option value="${r}">${r}</option>`).join('')}
                            </select>
                        </div>

                        <div class="select-group">
                            <label>Ăn trưa</label>
                            <select name="day4Lunch" required>
                                <option value="">-- Chọn --</option>
                                ${DATA.restaurants.lunch.map(r => `<option value="${r}">${r}</option>`).join('')}
                            </select>
                        </div>

                        <div class="select-group">
                            <label>Ăn tối</label>
                            <select name="day4Dinner" required>
                                <option value="">-- Chọn --</option>
                                ${DATA.restaurants.dinner.map(r => `<option value="${r}">${r}</option>`).join('')}
                            </select>
                        </div>

                        <!-- HOẠT ĐỘNG -->
                        <div class="slot-category">Hoạt động buổi sáng</div>
                        ${renderCheckboxGroup("day4MorningActivities", DATA.activities.morning)}

                        <div class="slot-category">Hoạt động buổi chiều</div>
                        ${renderCheckboxGroup("day4AfternoonActivities", DATA.activities.afternoon)}

                        <div class="slot-category">Hoạt động buổi tối 🌙</div>
                        ${renderCheckboxGroup("day4EveningActivities", DATA.activities.evening)}

                    </div>

                </div>

                <!-- BUTTON -->
                <div class="button-group">
                    <button type="button" class="btn btn-secondary" onclick="goToLoveLetter()">
                        ← Quay Lại
                    </button>
                    <button type="submit" class="btn btn-primary">
                        In thiệp ra 💌
                    </button>
                </div>

            </form>
        </div>
    `;
}


// ===== COMPONENT: CHECKBOX GROUP =====

function renderCheckboxGroup(name, activities, hasRequired = false) {
    return `
        <div class="checkbox-group">
            ${activities.map(a => {
                const isRequired = hasRequired && a.id === 'a5';
                return `
                    <div class="checkbox-item">
                        <input type="checkbox"
                               name="${name}"
                               value="${a.name}"
                               ${isRequired ? 'checked disabled' : ''}
                               onchange="validateCheckboxCount(this, 3)">
                        <label>${a.name} ${isRequired ? '(bắt buộc)' : ''}</label>
                    </div>
                `;
            }).join('')}
        </div>
    `;
}


// ===== LOGIC =====

function initPlanningPage() {
    const form = document.getElementById('planningForm');
    if (!form) return;

    form.addEventListener('submit', handlePlanningSubmit);
}


// ===== DATA COLLECT =====

function collectPlanningData() {
    const formData = new FormData(document.getElementById('planningForm'));

    return {
        day2: {
            dinner: formData.get('day2Evening')
        },
        day3: {
            meals: {
                breakfast: formData.get('day3Breakfast'),
                lunch: formData.get('day3Lunch'),
                dinner: formData.get('day3Dinner')
            },
            activities: {
                morning: formData.getAll('day3MorningActivities'),
                afternoon: formData.getAll('day3AfternoonActivities'),
                evening: formData.getAll('day3EveningActivities')
            }
        },
        day4: {
            meals: {
                breakfast: formData.get('day4Breakfast'),
                lunch: formData.get('day4Lunch'),
                dinner: formData.get('day4Dinner')
            },
            activities: {
                morning: formData.getAll('day4MorningActivities'),
                afternoon: formData.getAll('day4AfternoonActivities'),
                evening: formData.getAll('day4EveningActivities')
            }
        }
    };
}


// ===== VALIDATE =====

function validatePlanningForm(data) {

    if (!data.day2.dinner) {
        createToast('❌ Chọn ăn đêm ngày 2/4');
        return false;
    }

    if (!data.day3.meals.breakfast || !data.day3.meals.lunch || !data.day3.meals.dinner) {
        createToast('❌ Điền đầy đủ ăn uống ngày 3');
        return false;
    }

    if (!data.day4.meals.breakfast || !data.day4.meals.lunch || !data.day4.meals.dinner) {
        createToast('❌ Điền đầy đủ ăn uống ngày 4');
        return false;
    }

    return true;
}


// ===== SUBMIT =====

function handlePlanningSubmit(e) {
    e.preventDefault();

    const data = collectPlanningData();

    if (!validatePlanningForm(data)) return;

    savePlanningData(data);

    // render thiệp
    document.body.innerHTML = renderPrintCard(data);

    setTimeout(() => {
        window.print();
    }, 300);
}

function renderPrintCard(data) {
    return `
        <div class="print-card">

            <div class="invite-title">
                💖 Birthday Date 💖
            </div>

            <div class="invite-sub">
                "Chỉ cần là đi cùng nhau, làm gì cũng được"
            </div>

            <div class="heart">— 💕 —</div>

            <!-- DAY 2 -->
            <div class="section">
                <h3>🌙 Ngày 2/4</h3>
                <div class="item">Ăn đêm: ${data.day2.dinner}</div>
            </div>

            <!-- DAY 3 -->
            <div class="section">
                <h3>🌅 Ngày 3/4</h3>

                <div class="item">🍳 Ăn Sáng: ${data.day3.meals.breakfast}</div>
                <div class="item">✨ Chơi Sáng: ${data.day3.activities.morning.join(', ')}</div>

                <div class="item">🍜 Ăn Trưa: ${data.day3.meals.lunch}</div>
                <div class="item">📸 Chơi Chiều: ${data.day3.activities.afternoon.join(', ')}</div>
                
                <div class="item">🍷 Fine Dining: ${data.day3.meals.dinner}</div>                
                <div class="item">🌙 Chơi Tối: ${data.day3.activities.evening.join(', ')}</div>
            </div>

            <!-- DAY 4 -->
            <div class="section">
                <h3>🌞 Ngày 4/4</h3>

                <div class="item">🍳 Ăn Sáng: ${data.day4.meals.breakfast}</div>
                <div class="item">✨ Chơi Sáng: ${data.day4.activities.morning.join(', ')}</div>

                <div class="item">🍜 Ăn Trưa: ${data.day4.meals.lunch}</div>
                <div class="item">🎡 Chơi Chiều: ${data.day4.activities.afternoon.join(', ')}</div>
                
                <div class="item">🍷 ĂnTối: ${data.day4.meals.dinner}</div>
                <div class="item">🌙 Tối: ${data.day4.activities.evening.join(', ')}</div>
            </div>

            <div class="heart">💌</div>

            <div class="invite-sub">
                "Anh chỉ cần em chọn. Còn lại để anh lo."
            </div>

        </div>
    `;
}

