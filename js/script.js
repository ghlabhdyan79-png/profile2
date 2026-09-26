/* =========================================================
   Portfolio - script.js
   غلاب هديان
   ========================================================= */


/* =========================================================
   1. قائمة الهاتف Mobile Menu
   ========================================================= */

const menuToggle = document.querySelector(".menu-toggle");
const navList = document.querySelector(".nav-list");

if (menuToggle && navList) {
    menuToggle.addEventListener("click", () => {
        navList.classList.toggle("active");

        const isOpen = navList.classList.contains("active");

        menuToggle.setAttribute("aria-expanded", isOpen);
    });
}


/* إغلاق القائمة عند الضغط على أحد الروابط */

const navLinks = document.querySelectorAll(".nav-link");

navLinks.forEach((link) => {
    link.addEventListener("click", () => {
        if (navList) {
            navList.classList.remove("active");
        }

        if (menuToggle) {
            menuToggle.setAttribute("aria-expanded", "false");
        }
    });
});


/* =========================================================
   2. التبديل بين العربية والإنجليزية
   ========================================================= */

const languageBtn = document.querySelector(".language-btn");

if (languageBtn) {

    languageBtn.addEventListener("click", () => {

        document.body.classList.toggle("en-mode");

        const englishMode =
            document.body.classList.contains("en-mode");

        document.documentElement.lang =
            englishMode ? "en" : "ar";

        document.documentElement.dir =
            englishMode ? "ltr" : "rtl";

        languageBtn.textContent =
            englishMode ? "العربية" : "English";

    });

}


/* =========================================================
   3. شهاداتي - Accordion
   ========================================================= */

const accordionButtons =
    document.querySelectorAll(".accordion-btn");

accordionButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const item = button.parentElement;

        if (!item) return;

        item.classList.toggle("active");

    });

});


/* =========================================================
   4. عرض صورة الشهادة في نافذة كبيرة
   ========================================================= */

const certificateImages =
    document.querySelectorAll(".certificate-image");

const certificateModal =
    document.querySelector(".certificate-modal");

const modalImage =
    document.querySelector(".certificate-modal img");

const modalClose =
    document.querySelector(".modal-close");


certificateImages.forEach((image) => {

    image.addEventListener("click", () => {

        if (!certificateModal || !modalImage) return;

        modalImage.src = image.src;

        modalImage.alt =
            image.alt || "Certificate";

        certificateModal.classList.add("active");

        document.body.style.overflow = "hidden";

    });

});


/* إغلاق نافذة الشهادة */

if (modalClose) {

    modalClose.addEventListener("click", closeCertificateModal);

}


if (certificateModal) {

    certificateModal.addEventListener("click", (event) => {

        if (event.target === certificateModal) {
            closeCertificateModal();
        }

    });

}


function closeCertificateModal() {

    if (!certificateModal) return;

    certificateModal.classList.remove("active");

    document.body.style.overflow = "";

}


/* إغلاق النافذة بزر Escape */

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {
        closeCertificateModal();
    }

});


/* =========================================================
   5. فلترة المشاريع
   ========================================================= */

const filterButtons =
    document.querySelectorAll(".filter-btn");

const projectCards =
    document.querySelectorAll(".project-card");


filterButtons.forEach((button) => {

    button.addEventListener("click", () => {

        /* إزالة التفعيل من جميع الأزرار */

        filterButtons.forEach((btn) => {
            btn.classList.remove("active");
        });

        /* تفعيل الزر الحالي */

        button.classList.add("active");

        /* معرفة نوع المشاريع */

        const filter =
            button.getAttribute("data-filter");

        projectCards.forEach((card) => {

            const category =
                card.getAttribute("data-category");

            if (
                filter === "all" ||
                filter === category
            ) {

                card.style.display = "block";

            } else {

                card.style.display = "none";

            }

        });

    });

});


/* =========================================================
   6. زر العودة إلى الأعلى
   ========================================================= */

const backToTop =
    document.querySelector(".back-to-top");


if (backToTop) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 400) {

            backToTop.classList.add("show");

        } else {

            backToTop.classList.remove("show");

        }

    });


    backToTop.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}


/* =========================================================
   7. تأثير ظهور العناصر أثناء النزول
   ========================================================= */

const revealElements =
    document.querySelectorAll(".reveal");


const revealObserver =
    new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("active");

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.15
        }
    );


revealElements.forEach((element) => {

    revealObserver.observe(element);

});


/* =========================================================
   8. التحقق من نموذج التواصل
   ========================================================= */

const contactForm =
    document.querySelector(".contact-form");


if (contactForm) {

    contactForm.addEventListener("submit", (event) => {

        event.preventDefault();

        const formInputs =
            contactForm.querySelectorAll(
                "input, textarea"
            );

        let valid = true;


        formInputs.forEach((input) => {

            if (
                input.hasAttribute("required") &&
                input.value.trim() === ""
            ) {

                input.classList.add("error");

                valid = false;

            } else {

                input.classList.remove("error");

            }

        });


        /* التحقق من البريد الإلكتروني */

        const emailInput =
            contactForm.querySelector(
                'input[type="email"]'
            );


        if (
            emailInput &&
            emailInput.value.trim() !== ""
        ) {

            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


            if (!emailPattern.test(emailInput.value)) {

                emailInput.classList.add("error");

                valid = false;

            }

        }


        if (!valid) {

            alert(
                "يرجى تعبئة جميع الحقول المطلوبة بشكل صحيح."
            );

            return;

        }


        alert(
            "تم إرسال رسالتك بنجاح."
        );


        contactForm.reset();

    });

}


/* =========================================================
   9. إزالة حالة الخطأ أثناء الكتابة
   ========================================================= */

const formInputs =
    document.querySelectorAll(
        ".contact-form input, .contact-form textarea"
    );


formInputs.forEach((input) => {

    input.addEventListener("input", () => {

        input.classList.remove("error");

    });

});


/* =========================================================
   10. روابط الخدمات
   ========================================================= */

const serviceCards =
    document.querySelectorAll(".service-card");


serviceCards.forEach((card) => {

    const serviceLink =
        card.querySelector("a");


    if (serviceLink) {

        card.addEventListener("click", (event) => {

            /* إذا ضغط المستخدم على الرابط مباشرة
               لا نكرر الانتقال */

            if (event.target.closest("a")) {
                return;
            }

            serviceLink.click();

        });

    }

});


/* =========================================================
   11. السنة الحالية في الفوتر
   ========================================================= */

const currentYear =
    document.querySelector("#current-year");


if (currentYear) {

    currentYear.textContent =
        new Date().getFullYear();

}


/* =========================================================
   12. تحديد الرابط النشط أثناء التنقل
   ========================================================= */

const sections =
    document.querySelectorAll("section[id]");


window.addEventListener("scroll", () => {

    let currentSection = "";

    sections.forEach((section) => {

        const sectionTop =
            section.offsetTop - 150;

        const sectionHeight =
            section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {

            currentSection =
                section.getAttribute("id");

        }

    });


    navLinks.forEach((link) => {

        link.classList.remove("active");

        const href =
            link.getAttribute("href");

        if (href === `#${currentSection}`) {

            link.classList.add("active");

        }

    });

});


/* =========================================================
   13. منع أخطاء الصور
   ========================================================= */

const images =
    document.querySelectorAll("img");


images.forEach((image) => {

    image.addEventListener("error", () => {

        console.warn(
            "تعذر تحميل الصورة:",
            image.src
        );

    });

});


/* =========================================================
   نهاية script.js
   ========================================================= */

console.log(
    "Portfolio - غلاب هديان يعمل بنجاح."
);