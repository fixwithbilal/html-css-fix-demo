document.addEventListener('DOMContentLoaded', function() {
    // Photo Gallery Variables
    const viewPhotosBtn = document.querySelector('.view-photos');
    const galleryModal = document.getElementById('photoGallery');
    const galleryClose = document.querySelector('.gallery-close');
    const galleryMainImage = document.getElementById('galleryMainImage');
    const galleryThumbs = document.querySelectorAll('.gallery-thumb');
    const galleryPrev = document.querySelector('.gallery-prev');
    const galleryNext = document.querySelector('.gallery-next');
    
    // Car images array
    const carImages = [
        '0-02-0a-0e85f61e8a9602e18bca2ac5fea73a46814fbbb6e4a2c67f67746d02d2e42fdc_bc2a8de0.jpg',
        '0-02-0a-4ba89d0c9b2d814f405e67bd28512ab48eae4f29052eca1c35ff4287769dee10_22306c8f.jpg',
        '0-02-0a-5d9dcbf3f64ba6ed1debf8532b621961fc4b37112845d6ebdc10d927efcbf77c_34a4eea0.jpg',
        '0-02-0a-33e31a16927b14e13eeb11903c4bcb301b4f4f1c8027cfaa63aa9d44af5f55b7_8047faed.jpg',
        '0-02-0a-576258b6eb47532cc849724254c5dbb03d2b104381eeaca7517119ba7a7498d2_cf950111.jpg'
    ];
    
    let currentImageIndex = 0;
    
    // Open gallery when View Photos is clicked
    if (viewPhotosBtn) {
        viewPhotosBtn.addEventListener('click', function() {
            galleryModal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Prevent scrolling when gallery is open
            setActiveImage(0);
        });
    }
    
    // Close gallery when X is clicked
    if (galleryClose) {
        galleryClose.addEventListener('click', function() {
            galleryModal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Re-enable scrolling
        });
    }
    
    // Close gallery when clicking outside the content
    window.addEventListener('click', function(e) {
        if (e.target === galleryModal) {
            galleryModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Navigate to previous image
    if (galleryPrev) {
        galleryPrev.addEventListener('click', function() {
            currentImageIndex = (currentImageIndex - 1 + carImages.length) % carImages.length;
            setActiveImage(currentImageIndex);
        });
    }
    
    // Navigate to next image
    if (galleryNext) {
        galleryNext.addEventListener('click', function() {
            currentImageIndex = (currentImageIndex + 1) % carImages.length;
            setActiveImage(currentImageIndex);
        });
    }
    
    // Thumbnail click functionality
    galleryThumbs.forEach(function(thumb, index) {
        thumb.addEventListener('click', function() {
            setActiveImage(index);
        });
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (galleryModal.style.display === 'block') {
            if (e.key === 'ArrowLeft') {
                currentImageIndex = (currentImageIndex - 1 + carImages.length) % carImages.length;
                setActiveImage(currentImageIndex);
            } else if (e.key === 'ArrowRight') {
                currentImageIndex = (currentImageIndex + 1) % carImages.length;
                setActiveImage(currentImageIndex);
            } else if (e.key === 'Escape') {
                galleryModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        }
    });
    
    // Function to set the active image
    function setActiveImage(index) {
        currentImageIndex = index;
        
        // Update main image
        galleryMainImage.src = carImages[index];
        
        // Update active thumbnail
        galleryThumbs.forEach(function(thumb, i) {
            if (i === index) {
                thumb.classList.add('active');
                // Scroll thumbnail into view if needed
                thumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            } else {
                thumb.classList.remove('active');
            }
        });
    }
    
    // Form submission handling (if needed)
    const contactForm = document.querySelector('.contact-form');
    const reviewForm = document.querySelector('.review-form');
    
    if (contactForm) {
        const submitBtn = contactForm.querySelector('.submit-btn');
        if (submitBtn) {
            submitBtn.addEventListener('click', function(e) {
                e.preventDefault();
                // Form validation would go here
                alert('Thank you for your inquiry. We will get back to you soon.');
            });
        }
    }
    
    if (reviewForm) {
        const postReviewBtn = reviewForm.querySelector('.post-review-btn');
        if (postReviewBtn) {
            postReviewBtn.addEventListener('click', function(e) {
                e.preventDefault();
                // Form validation would go here
                alert('Thank you for your review!');
            });
        }
    }
    
    // Share car functionality
    const shareBtn = document.querySelector('.share-btn');
    if (shareBtn) {
        shareBtn.addEventListener('click', function() {
            if (navigator.share) {
                navigator.share({
                    title: 'LA13 JWK - MEER',
                    text: 'Check out this car on MEER',
                    url: window.location.href
                }).catch(console.error);
            } else {
                alert('Share functionality not supported on this browser');
            }
        });
    }
});