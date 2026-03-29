// ===== PLANNING PAGE =====

function renderPlanningPage() {
    return `
        <div class="page page-planning">
            <div class="planning-header">
                <h1>📅 Lên Kế Hoạch Sinh Nhật</h1>
                <p>Cùng nhau quyết định những kỷ niệm đẹp nhất</p>
            </div>

            <form id="planningForm">
                <div class="timeline-section">
                    <!-- NGÀY 2/4 - TỐI -->
                    <div class="timeline-slot">
                        <div class="slot-title">🌙 Tối Ngày 2/4 (Thứ 5)</div>
                        <div class="slot-category">Bữa ăn tối</div>
                        <div class="select-group">
                            <label for="day2Evening">Em muốn ăn gì?</label>
                            <select id="day2Evening" name="day2Evening" required>
                                <option value="">-- Chọn quán --</option>
                                ${DATA.restaurants.dinner.map(r => `<option value="${r}">${r}</option>`).join('')}
                            </select>
                        </div>
                    </div>

                    <!-- NGÀY 3/4 - SÁNG -->
                    <div class="timeline-slot">
                        <div class="slot-title">🌅 Sáng Ngày 3/4 (Thứ 6)</div>
                        
                        <div style="margin-bottom: 20px;">
                            <div class="slot-category">Hoạt động (chọn tối đa 3)</div>
                            <div class="checkbox-group">
                                ${DATA.activities.morning.map(activity => `
                                    <div class="checkbox-item">
                                        <input type="checkbox" id="day3MorningActivity_${activity.id}" 
                                               name="day3MorningActivities" value="${activity.name}" 
                                               onchange="validateCheckboxCount(this, 3)">
                                        <label for="day3MorningActivity_${activity.id}">${activity.name}</label>
                                    </div>
                                `).join('')}
                            </div>
                        </div>

                        <div class="select-group">
                            <label for="day3Breakfast">Ăn sáng</label>
                            <select id="day3Breakfast" name="day3Breakfast" required>
                                <option value="">-- Chọn --</option>
                                ${DATA.restaurants.breakfast.map(r => `<option value="${r}">${r}</option>`).join('')}
                            </select>
                        </div>
                    </div>

                    <!-- NGÀY 3/4 - CHIỀU -->
                    <div class="timeline-slot">
                        <div class="slot-title">☀️ Chiều Ngày 3/4</div>
                        
                        <div style="margin-bottom: 20px;">
                            <div class="slot-category">Hoạt động (chọn tối đa 3) - PHOTOBOOTH BẮT BUỘC ✨</div>
                            <div class="checkbox-group">
                                ${DATA.activities.afternoon.map(activity => {
                                    const isPhotobooth = activity.id === 'a5';
                                    const disabled = isPhotobooth ? 'checked disabled' : '';
                                    return `
                                        <div class="checkbox-item">
                                            <input type="checkbox" id="day3AfternoonActivity_${activity.id}" 
                                                   name="day3AfternoonActivities" value="${activity.name}" 
                                                   ${disabled}
                                                   onchange="validateCheckboxCount(this, 3)">
                                            <label for="day3AfternoonActivity_${activity.id}">
                                                ${activity.name} ${isPhotobooth ? '(bắt buộc)' : ''}
                                            </label>
                                        </div>
                                    `;
                                }).join('')}
                            </div>
                        </div>

                        <div class="select-group">
                            <label for="day3Lunch">Ăn trưa</label>
                            <select id="day3Lunch" name="day3Lunch" required>
                                <option value="">-- Chọn --</option>
                                ${DATA.restaurants.lunch.map(r => `<option value="${r}">${r}</option>`).join('')}
                            </select>
                        </div>
                    </div>

                    <!-- NGÀY 3/4 - TỐI (FINE DINING) -->
                    <div class="timeline-slot">
                        <div class="slot-title">🍽️ Tối Ngày 3/4 - Fine Dining 🎉</div>
                        <div class="slot-category">Nhà hàng sang trọng</div>
                        <div class="select-group">
                            <label for="day3Evening">Chọn nhà hàng fine dining</label>
                            <select id="day3Evening" name="day3Evening" required>
                                <option value="">-- Chọn --</option>
                                ${DATA.fineDining.map(fd => 
                                    `<option value="${fd.name}">${fd.name} (${fd.cuisine})</option>`
                                ).join('')}
                            </select>
                        </div>
                    </div>

                    <!-- NGÀY 4/4 - SHIFT & ACTIVITIES -->
                    <div class="timeline-slot">
                        <div class="slot-title">🌞 Ngày 4/4 (Thứ 7)</div>
                        
                        <div class="shift-box" style="margin-bottom: 20px;">
                            <div class="slot-category" style="margin-bottom: 15px;">Em có lịch làm việc gì?</div>
                            <div class="radio-group">
                                <div class="radio-item">
                                    <input type="radio" id="shift_morning" name="day4Shift" value="morning" 
                                           onchange="handleDay4ShiftChange()">
                                    <label for="shift_morning">Ca sáng (4h - 2h chiều)</label>
                                </div>
                                <div class="radio-item">
                                    <input type="radio" id="shift_evening" name="day4Shift" value="evening"
                                           onchange="handleDay4ShiftChange()">
                                    <label for="shift_evening">Ca tối (2h chiều - 11h đêm)</label>
                                </div>
                                <div class="radio-item">
                                    <input type="radio" id="shift_off" name="day4Shift" value="off"
                                           onchange="handleDay4ShiftChange()">
                                    <label for="shift_off">Em được nghỉ 🎊</label>
                                </div>
                            </div>
                        </div>

                        <!-- Day 4 Activities & Meals (ẩn đầu tiên) -->
                        <div id="day4ActivitiesSection" style="display: none;">
                            <div style="margin-bottom: 20px;">
                                <div class="slot-category">Hoạt động (chọn tối đa 3)</div>
                                <div class="checkbox-group">
                                    ${DATA.activities.afternoon.map(activity => `
                                        <div class="checkbox-item">
                                            <input type="checkbox" id="day4Activity_${activity.id}" 
                                                   name="day4Activities" value="${activity.name}"
                                                   onchange="validateCheckboxCount(this, 3)">
                                            <label for="day4Activity_${activity.id}">${activity.name}</label>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>

                            <div class="select-group">
                                <label id="day4MealLabel">Ăn sáng</label>
                                <select id="day4Meal" name="day4Meal">
                                    <option value="">-- Chọn --</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- BUTTONS -->
                <div class="button-group">
                    <button type="button" class="btn btn-secondary" onclick="goToLoveLetter()">
                        ← Quay Lại
                    </button>
                    <button type="submit" class="btn btn-primary" id="submitBtn">
                        Lưu & Tải Xuống Excel 📊
                    </button>
                </div>
            </form>
        </div>
    `;
}

// ===== PLANNING PAGE LOGIC =====

function initPlanningPage() {
    const form = document.getElementById('planningForm');
    if (!form) return;

    form.addEventListener('submit', handlePlanningSubmit);

    // Load saved data nếu có
    const savedData = getPlanningData();
    if (savedData) {
        loadPlanningDataToForm(savedData);
    }
}

function handleDay4ShiftChange() {
    const selectedShift = document.querySelector('input[name="day4Shift"]:checked');
    const activitiesSection = document.getElementById('day4ActivitiesSection');
    const mealLabel = document.getElementById('day4MealLabel');
    const mealSelect = document.getElementById('day4Meal');

    if (!selectedShift) {
        activitiesSection.style.display = 'none';
        return;
    }

    if (selectedShift.value === 'off') {
        mealLabel.textContent = 'Chọn bữa ăn & quán';
        activitiesSection.style.display = 'block';
        populateDay4MealOptions('full');
    } else if (selectedShift.value === 'morning') {
        mealLabel.textContent = 'Ăn tối';
        activitiesSection.style.display = 'block';
        populateDay4MealOptions('dinner');
    } else if (selectedShift.value === 'evening') {
        mealLabel.textContent = 'Ăn sáng';
        activitiesSection.style.display = 'block';
        populateDay4MealOptions('breakfast');
    }
}

function populateDay4MealOptions(mealType) {
    const mealSelect = document.getElementById('day4Meal');
    let options = '<option value="">-- Chọn --</option>';

    if (mealType === 'full') {
        const allMeals = [
            ...DATA.restaurants.breakfast,
            ...DATA.restaurants.lunch,
            ...DATA.restaurants.dinner
        ];
        options += allMeals.map(m => `<option value="${m}">${m}</option>`).join('');
    } else if (mealType === 'breakfast') {
        options += DATA.restaurants.breakfast.map(m => `<option value="${m}">${m}</option>`).join('');
    } else if (mealType === 'dinner') {
        options += DATA.restaurants.dinner.map(m => `<option value="${m}">${m}</option>`).join('');
    }

    mealSelect.innerHTML = options;
}

function collectPlanningData() {
    const formData = new FormData(document.getElementById('planningForm'));
    
    const day3MorningActivities = formData.getAll('day3MorningActivities');
    const day3AfternoonActivities = formData.getAll('day3AfternoonActivities');
    const day4Activities = formData.getAll('day4Activities');

    return {
        day2Evening: {
            restaurant: formData.get('day2Evening')
        },
        day3Morning: {
            activities: day3MorningActivities
        },
        day3Breakfast: {
            restaurant: formData.get('day3Breakfast')
        },
        day3Afternoon: {
            activities: day3AfternoonActivities
        },
        day3Lunch: {
            restaurant: formData.get('day3Lunch')
        },
        day3Evening: {
            restaurant: formData.get('day3Evening')
        },
        day4: {
            shift: formData.get('day4Shift'),
            activities: day4Activities,
            restaurant: formData.get('day4Meal')
        }
    };
}

function validatePlanningForm() {
    const data = collectPlanningData();

    if (!data.day2Evening.restaurant) {
        createToast('❌ Chọn bữa ăn tối ngày 2/4');
        return false;
    }
    if (data.day3Morning.activities.length === 0) {
        createToast('❌ Chọn ít nhất 1 hoạt động sáng ngày 3/4');
        return false;
    }
    if (!data.day3Breakfast.restaurant) {
        createToast('❌ Chọn ăn sáng ngày 3/4');
        return false;
    }
    if (data.day3Afternoon.activities.length === 0) {
        createToast('❌ Chọn ít nhất 1 hoạt động chiều ngày 3/4');
        return false;
    }
    if (!data.day3Lunch.restaurant) {
        createToast('❌ Chọn ăn trưa ngày 3/4');
        return false;
    }
    if (!data.day3Evening.restaurant) {
        createToast('❌ Chọn nhà hàng fine dining');
        return false;
    }
    if (!data.day4.shift) {
        createToast('❌ Chọn lịch làm việc ngày 4/4');
        return false;
    }
    if (data.day4.activities.length === 0) {
        createToast('❌ Chọn ít nhất 1 hoạt động ngày 4/4');
        return false;
    }
    if (!data.day4.restaurant) {
        createToast('❌ Chọn bữa ăn ngày 4/4');
        return false;
    }

    return true;
}

function handlePlanningSubmit(e) {
    e.preventDefault();

    if (!validatePlanningForm()) {
        return;
    }

    const planningData = collectPlanningData();
    savePlanningData(planningData);
    createToast('✅ Dữ liệu đã lưu thành công!');

    setTimeout(() => {
        downloadExcel(planningData);
        createToast('📊 File Excel đã được tải xuống!');
    }, 500);
}

function loadPlanningDataToForm(savedData) {
    if (savedData.day2Evening?.restaurant) {
        const day2Select = document.getElementById('day2Evening');
        if (day2Select) day2Select.value = savedData.day2Evening.restaurant;
    }

    if (savedData.day3Morning?.activities) {
        savedData.day3Morning.activities.forEach(activity => {
            const checkboxes = document.querySelectorAll('input[name="day3MorningActivities"]');
            checkboxes.forEach(cb => {
                if (cb.value === activity) cb.checked = true;
            });
        });
    }

    if (savedData.day3Breakfast?.restaurant) {
        const breakfast = document.getElementById('day3Breakfast');
        if (breakfast) breakfast.value = savedData.day3Breakfast.restaurant;
    }

    if (savedData.day3Afternoon?.activities) {
        savedData.day3Afternoon.activities.forEach(activity => {
            const checkboxes = document.querySelectorAll('input[name="day3AfternoonActivities"]');
            checkboxes.forEach(cb => {
                if (cb.value === activity) cb.checked = true;
            });
        });
    }

    if (savedData.day3Lunch?.restaurant) {
        const lunch = document.getElementById('day3Lunch');
        if (lunch) lunch.value = savedData.day3Lunch.restaurant;
    }

    if (savedData.day3Evening?.restaurant) {
        const evening = document.getElementById('day3Evening');
        if (evening) evening.value = savedData.day3Evening.restaurant;
    }

    if (savedData.day4?.shift) {
        const shiftRadio = document.querySelector(`input[name="day4Shift"][value="${savedData.day4.shift}"]`);
        if (shiftRadio) {
            shiftRadio.checked = true;
            handleDay4ShiftChange();

            setTimeout(() => {
                if (savedData.day4.activities) {
                    savedData.day4.activities.forEach(activity => {
                        const checkboxes = document.querySelectorAll('input[name="day4Activities"]');
                        checkboxes.forEach(cb => {
                            if (cb.value === activity) cb.checked = true;
                        });
                    });
                }

                if (savedData.day4.restaurant) {
                    const mealSelect = document.getElementById('day4Meal');
                    if (mealSelect) mealSelect.value = savedData.day4.restaurant;
                }
            }, 100);
        }
    }
}