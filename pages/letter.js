// ===== LETTER PAGE =====

function renderLetterPage() {
    return `
        <div class="page page-letter">
            <div class="letter-wrapper">
                <div class="letter-container" id="letterContainer" onclick="openLetter()">
                    <div class="letter-flap"></div>
                    <div class="letter-content">
                        <div class="letter-subtitle">Gửi Em Yêu</div>
                        <div class="letter-title">Khánh Ngân</div>
                    </div>
                    
                </div>
                <div class="letter-hint">👆 Em yêu bấm để mở thư nghen</div>
            </div>
        </div>
    `;
}

function openLetter() {
    const letterContainer = document.getElementById('letterContainer');
    if (letterContainer && !letterContainer.classList.contains('open')) {
        letterContainer.classList.add('open');
        
        // Sau 1.2s chuyển sang page tiếp theo
        setTimeout(() => {
            goToLoveLetter();
        }, 2000);
    }
}