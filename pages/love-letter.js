// ===== LOVE LETTER / BIRTHDAY INVITE PAGE =====

function renderLoveLetterPage() {
    return `
        <div class="page page-love-letter">
            <div class="love-letter-content">
                <h1>💕 Dành riêng cho em, Ngân yêu dấu</h1>
                
                <p class="typing" data-text="Gửi em yêu của anh,"></p>
                
                <p class="typing" data-text="Anh muốn em biết rằng, trong cả thế giới này, em là duy nhất với anh. 
Mỗi ngày, mỗi khoảnh khắc, trái tim anh luôn chọn em."></p>
                
                <p class="typing" data-text="Sinh nhật năm nay, điều anh mong nhất là được ở bên em. 
Anh muốn mời em cùng anh kỷ niệm ngày đặc biệt này, không chỉ là ngày của anh, 
mà là khoảng thời gian chúng ta dành cho nhau, tràn đầy niềm vui và tiếng cười."></p>
                
                <p class="typing" data-text="Anh yêu em không chỉ bằng lời nói, mà bằng tất cả những hành động và suy nghĩ của anh."></p>
                
                <p class="typing" 
data-text="Em là người đặc biệt nhất trong cuộc đời anh. Anh muốn dành trọn mọi yêu thương cho em."
data-highlight="Em là người đặc biệt nhất trong cuộc đời anh.">
</p>
                
                <p class="typing" data-text="Cảm ơn em đã tin anh, đã chọn anh, và đã là ánh sáng trong cuộc sống anh. 
Anh hạnh phúc vì có em bên cạnh, và anh rất mong được cùng em tạo nên những kỷ niệm tuyệt vời trong những ngày mình gặp nhau."></p>
                
                <p class="signature typing" data-text="Luôn yêu em, hết lòng, hết dạ,
Người yêu của em 💕"></p>
            </div>
            
            <div style="text-align: center;">
                <button class="page-button" onclick="goToPlanning()">
                   Giờ em hãy cùng anh lên kế hoạch nha 💑
                </button>
            </div>
        </div>
    `;
}


// ===== TYPING EFFECT =====

function startTypingEffect() {

    const elements = document.querySelectorAll(".typing");
    let index = 0;

    function typeNext() {

        if (index >= elements.length) return;

        const el = elements[index];
        const text = el.getAttribute("data-text");
        let charIndex = 0;

        el.classList.add("blink");

        function typeChar() {

            if (charIndex < text.length) {
                el.textContent += text.charAt(charIndex);
                charIndex++;
                setTimeout(typeChar, 35);
            } 
            else {
                el.classList.remove("blink");
                index++;
                setTimeout(typeNext, 400);
            }

        }

        typeChar();
    }

    typeNext();
}



// ===== AUTO START WHEN PAGE LOAD =====

document.addEventListener("DOMContentLoaded", function () {

    const observer = new MutationObserver(() => {

        const page = document.querySelector(".page-love-letter");

        if (page) {
            setTimeout(() => {
                startTypingEffect();
            }, 300);

            observer.disconnect();
        }

    });

    observer.observe(document.body, { childList: true, subtree: true });

});