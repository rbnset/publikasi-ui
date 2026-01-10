document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".tab-menu");
  const indicators = document.querySelectorAll(".tab-indicator");

  const tabContents = [
    {
      title: "Tahap 1 — Daftar author",
      description: "Buat akun untuk mengelola profil dan naskah.",
      features: [
        "Buka halaman Daftar author.",
        "Isi nama, email, dan kata sandi.",
        "Lengkapi profil penulis.",
        "Klik Daftar lalu masuk ke dashboard.",
      ],
      image: "../../public/assets/images/thumbnails/image.png",
    },
    {
      title: "Tahap 2 — Unggah naskah",
      description: "Kirim naskah dari dashboard sampai status “Terkirim”.",
      features: [
        "Masuk ke dashboard author.",
        "Pilih Unggah naskah.",
        "Isi judul, ringkasan, dan kata kunci.",
        "Unggah file lalu Kirim.",
      ],
      image: "../../public/assets/images/thumbnails/image.png",
    },
    {
      title: "Tahap 3 — Review editorial",
      description: "Terima catatan editorial, revisi, lalu kirim ulang.",
      features: [
        "Cek status di dashboard.",
        "Baca catatan editorial.",
        "Perbaiki naskah dan sitasi.",
        "Unggah revisi lalu kirim ulang.",
      ],
      image: "../../public/assets/images/thumbnails/image.png",
    },
    {
      title: "Tahap 4 — Terbit",
      description: "Saat status “Diterima”, naskah akan terbit otomatis dan bisa dibaca publik.",
      features: [
        "Pastikan status sudah “Diterima” di dashboard.",
        "Buka halaman Publikasi.",
        "Cek bagian Publikasi terbaru untuk menemukan naskahmu.",
        "Salin tautan publikasi untuk dibagikan.",
      ],
      image: "../../public/assets/images/thumbnails/image.png",
    },
  ];




  function updateTabContent(index) {
    const tabContent = document.querySelector(".tab-content");
    const selectedContent = tabContents[index];
    if (!tabContent || !selectedContent) return;

    const img = tabContent.querySelector(".tab-img img");
    if (img) img.src = selectedContent.image;

    const title = tabContent.querySelector(".tab-title");
    if (title) title.innerHTML = selectedContent.title;

    const desc = tabContent.querySelector(".tab-description");
    if (desc) desc.textContent = selectedContent.description;

    const featuresContainer = tabContent.querySelector(".tab-features");
    if (!featuresContainer) return;

    featuresContainer.innerHTML = "";
    selectedContent.features.forEach((feature) => {
      const featureElement = document.createElement("div");
      featureElement.className = "flex gap-3 items-center";

      featureElement.innerHTML = `
        <div class="flex items-center justify-center w-[30px] h-[30px] bg-[#FF6B18] rounded-full">
          <img src="../../public/assets/images/icons/ic_check.svg" alt="check icon" />
        </div>
        <p class="text-sm sm:text-base font-semibold text-[#111827]">${feature}</p>
      `;

      featuresContainer.appendChild(featureElement);
    });
  }

  function moveIndicator(index) {
    indicators.forEach((indicator, i) => {
      const bar = indicator.querySelector("div");
      if (!bar) return;

      if (i === index) {
        bar.classList.remove("bg-transparent");
        bar.classList.add("bg-[#111827]");
      } else {
        bar.classList.remove("bg-[#111827]");
        bar.classList.add("bg-transparent");
      }
    });
  }

  function setActiveTab(index) {
    tabs.forEach((t, i) => {
      const h3 = t.querySelector("h3");
      const iconContainer = t.querySelector(".tab-icon-container");
      const icon = t.querySelector(".tab-icon");

      const active = i === index;

      t.classList.toggle("active", active);

      if (h3) {
        h3.classList.toggle("font-semibold", active);
        h3.classList.toggle("font-medium", !active);
      }

      // Icon container bg
      if (iconContainer) {
        iconContainer.classList.toggle("bg-[#FF6B18]", active);
        iconContainer.classList.toggle("bg-[#EEF0F7]", !active);
      }

      // Icon bg (opsional, mengikuti style HTML kamu)
      if (icon) {
        icon.classList.toggle("bg-white", true);
      }
    });

    moveIndicator(index);
    updateTabContent(index);
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => setActiveTab(index));
  });

  // init
  if (tabs.length) setActiveTab(0);
});
