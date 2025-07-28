// Navigation button blur fix
document.querySelectorAll('#home-btn, #email-btn').forEach(btn => {
  btn.addEventListener('mouseup', () => btn.blur());
  btn.addEventListener('touchend', () => btn.blur());
});

// Set current year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Modal functionality - only run if modal exists
const modal = document.getElementById("imageModal");
if (modal) {
  const modalImg = document.getElementById("modalImage");

  document.querySelectorAll(".showcase img").forEach(img => {
    img.addEventListener("click", () => {
      modal.classList.add("show");
      modalImg.src = img.src;
      modalImg.alt = img.alt;

      // Reset animation
      modalImg.style.animation = "none";
      void modalImg.offsetWidth;
      modalImg.style.animation = null;
    });
  });

  // Close when clicking outside the image
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("show");
    }
  });

  // Close with ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      modal.classList.remove("show");
    }
  });
}

// Dynamic Banner Class
class DynamicBanner {
  constructor(containerId, options = {}) {
    console.log('Initializing DynamicBanner with container:', containerId);
    this.container = document.querySelector(containerId);
    
    if (!this.container) {
      console.error('Banner container not found:', containerId);
      return;
    }
    
    this.images = this.container.querySelectorAll('.banner-image');
    console.log('Found banner images:', this.images.length);
    
    if (this.images.length === 0) {
      console.error('No banner images found with class .banner-image');
      return;
    }
    
    this.currentIndex = 0;
    
    // Configuration
    this.interval = options.interval || 4000; // 4 seconds
    this.transitionDuration = options.transitionDuration || 1200; // 1.2 seconds
    this.autoStart = options.autoStart !== false;
    
    this.intervalId = null;
    
    // Log all images for debugging
    this.images.forEach((img, index) => {
      console.log(`Image ${index}:`, img.src, 'Active:', img.classList.contains('active'));
      
      // Check if image loaded successfully
      img.addEventListener('load', () => {
        console.log(`Image ${index} loaded successfully:`, img.src);
      });
      
      img.addEventListener('error', () => {
        console.error(`Image ${index} failed to load:`, img.src);
      });
    });
    
    if (this.autoStart && this.images.length > 1) {
      console.log('Starting banner auto-rotation...');
      this.start();
    } else {
      console.log('Banner not starting - autoStart:', this.autoStart, 'image count:', this.images.length);
    }
  }
  
  start() {
    if (this.intervalId) {
      console.log('Banner already running');
      return;
    }
    
    this.intervalId = setInterval(() => {
      console.log('Banner: switching to next image');
      this.nextImage();
    }, this.interval);
    
    console.log('Banner started with interval:', this.interval + 'ms');
  }
  
  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
      console.log('Banner stopped');
    }
  }
  
  nextImage() {
    // Remove active class from current image
    this.images[this.currentIndex].classList.remove('active');
    console.log('Removed active from image', this.currentIndex);
    
    // Move to next image (loop back to 0 if at end)
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
    
    // Add active class to new current image
    this.images[this.currentIndex].classList.add('active');
    console.log('Added active to image', this.currentIndex, 'src:', this.images[this.currentIndex].src);
  }
  
  pauseOnHover() {
    this.container.addEventListener('mouseenter', () => {
      console.log('Mouse entered banner - pausing');
      this.stop();
    });
    this.container.addEventListener('mouseleave', () => {
      console.log('Mouse left banner - resuming');
      this.start();
    });
  }
}

// Initialize banner when page loads
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded - initializing banner...');
  
  // Small delay to ensure images are loaded
  setTimeout(() => {
    const banner = new DynamicBanner('.banner-container', {
      interval: 2100, // Change every 3.5 seconds
    });
    
  }, 100); // 100ms delay
});

// Debug info
console.log('Script loaded successfully!');
