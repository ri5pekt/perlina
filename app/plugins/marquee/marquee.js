function EndlessMarquee(el, direction = 1, originalSpeed = 0.08, pauseOnHover = false) {
    var _this = this;

    this.el = el;
    this.originalSpeed = originalSpeed;
    this.speed = this.originalSpeed;
    this.direction = direction;
    this.originalContentWidth = this.el.scrollWidth;
    this.updateInterval = 5000;

    this.getGap = function() {
        var style = window.getComputedStyle(_this.el);
        var gapValue = style.getPropertyValue('gap') || '0px';
        return parseFloat(gapValue);
    };

    this.widthOffset = this.getGap() / 2;

    var originalContent = this.el.innerHTML;
    this.el.innerHTML += originalContent;

    this.currentPosition = this.direction === 1 ? -this.originalContentWidth : 0;
    this.lastFrameTime = Date.now();

    this.targetSpeed = this.originalSpeed; // Added to smoothly adjust speed
    this.speedAdjustmentFactor = 0.1; // Control the rate of speed adjustment

    this.animate = function() {
        var now = Date.now();
        var deltaTime = now - _this.lastFrameTime;
        _this.lastFrameTime = now;

        // Smoothly adjust speed towards target speed
        _this.speed += (_this.targetSpeed - _this.speed) * _this.speedAdjustmentFactor;

        _this.currentPosition += _this.speed * deltaTime * _this.direction;

        if (_this.direction === 1 && (_this.currentPosition + _this.speed) >= 0) {
            _this.currentPosition = -_this.originalContentWidth;
        } else if (_this.direction === -1 && _this.currentPosition <= -_this.originalContentWidth) {
            _this.currentPosition = 0;
        }

        _this.el.style.transform = 'translateX(' + _this.currentPosition + 'px)';
    };

    this.updateWidth = function() {
        var newWidth = _this.el.scrollWidth / 2; // Assuming content is duplicated
        //_this.widthOffset = newWidth / 60;
        if (newWidth !== _this.originalContentWidth) {
            _this.originalContentWidth = newWidth + _this.widthOffset;
        }
    };

    this.render = function() {
        _this.animate();
        window.requestAnimationFrame(_this.render);
    };

    if (pauseOnHover) {
        this.el.addEventListener('mouseover', function() {
            _this.targetSpeed = 0; // Set target speed to 0 on hover
        });

        this.el.addEventListener('mouseout', function() {
            _this.targetSpeed = _this.originalSpeed; // Reset target speed on mouse out
        });
    }

    // Variables for drag functionality
    let isDragging = false;
    let startX, scrollStart;

    function startDrag(event) {
        isDragging = true;
        startX = event.type === 'mousedown' ? event.pageX : event.touches[0].pageX;
        startX -= _this.el.offsetLeft;
        scrollStart = _this.currentPosition;
        _this.targetSpeed = 0; // Stop animation on drag
    }

    function drag(event) {
        if (!isDragging) return;
        event.preventDefault();
        const x = event.type === 'mousemove' ? event.pageX : event.touches[0].pageX;
        const walk = (x - startX) * 2; // Scroll-fast
        _this.currentPosition = scrollStart + walk;

        // Prevent dragging beyond the edge
        if (_this.currentPosition > 0) {
            _this.currentPosition = 0;
        } else if (_this.currentPosition < -_this.originalContentWidth) {
            _this.currentPosition = -_this.originalContentWidth;
        }

        _this.el.style.transform = 'translateX(' + _this.currentPosition + 'px)';
    }

    function stopDrag() {
        if (!isDragging) return;
        isDragging = false;
        _this.targetSpeed = _this.originalSpeed; // Resume animation
    }

    /*
    this.el.addEventListener('mousedown', startDrag);
    window.addEventListener('mousemove', drag);
    window.addEventListener('mouseup', stopDrag);

    this.el.addEventListener('touchstart', startDrag);
    window.addEventListener('touchmove', drag);
    window.addEventListener('touchend', stopDrag);
    */
   
    setInterval(this.updateWidth, this.updateInterval);
    this.render();
}
