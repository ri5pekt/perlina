(function($) {
    $.fn.startCount = function(targetDate) {
        return this.each(function() {
            var $counter = $(this);
            // Parse the target date
            var countDownDate;

            if (typeof targetDate === 'string' || targetDate instanceof String) {
                countDownDate = new Date(targetDate).getTime();
            } else if (targetDate instanceof Date) {
                countDownDate = targetDate.getTime();
            } else {
                console.error('Invalid date format for countdown.');
                return;
            }

            // Initialize previous values
            var prevValues = {
                days: '',
                hours: '',
                minutes: '',
                seconds: ''
            };

            // Function to pad numbers to two digits
            function pad(number) {
                return number < 10 ? '0' + number : number.toString();
            }

            // Function to create digit elements
            function createDigitElements(unit, digits) {
                var digitsContainer = $counter.find('.' + unit + ' .digits');
                digitsContainer.empty(); // Clear any existing digits

                for (let i = 0; i < digits.length; i++) {
                    var digitDiv = $('<div>').addClass('digit');
                    var digitInner = $('<div>').addClass('digit-inner');
                    var spanCurrent = $('<span>').addClass('current').html(digits[i]);

                    digitInner.append(spanCurrent);
                    digitDiv.append(digitInner);
                    digitsContainer.append(digitDiv);
                }
            }

            // Function to update digits
            function updateDigits(unit, value) {
                var paddedValue = pad(value);
                var digits = paddedValue.split('');

                // If it's the first time, create digit elements
                if (prevValues[unit] === '') {
                    createDigitElements(unit, digits);
                    prevValues[unit] = digits;
                    return;
                }

                // Update each digit individually
                for (let i = 0; i < digits.length; i++) {
                    if (prevValues[unit][i] !== digits[i]) {
                        animateDigit(unit, i, digits[i]);
                    }
                }

                prevValues[unit] = digits;
            }

            // Function to animate a digit
            function animateDigit(unit, index, newValue) {
                var digitsContainer = $counter.find('.' + unit + ' .digits');
                var digitDiv = digitsContainer.children().eq(index);
                var digitInner = digitDiv.find('.digit-inner');

                // Remove any existing animation class
                digitDiv.removeClass('animate');

                // Create a new span for the new value
                var spanNew = $('<span>').addClass('new').html(newValue);

                // Append the new span below the current one
                digitInner.append(spanNew);

                // Trigger reflow to restart the animation
                digitDiv[0].offsetWidth;

                // Add the animation class
                digitDiv.addClass('animate');

                // After the animation, reset the digit
                setTimeout(function() {
                    // Remove the old span
                    var spanCurrent = digitInner.find('span.current');
                    spanCurrent.remove();

                    // Set the new span as current
                    spanNew.removeClass('new').addClass('current');

                    // Reset the position
                    digitInner.css('transform', 'translateY(0)');

                    // Remove the animation class
                    digitDiv.removeClass('animate');
                }, 500);
            }

            // Update the count down every 1 second
            var intervalId = setInterval(function() {

                // Get current date and time
                var now = new Date().getTime();

                // Find the time remaining
                var distance = countDownDate - now;

                // If the countdown is over, stop the timer
                if (distance < 0) {
                    clearInterval(intervalId);
                    // You can add code here to display a message or perform an action when the countdown ends
                    return;
                }

                // Time calculations for days, hours, minutes, and seconds
                var days = Math.floor(distance / (1000 * 60 * 60 * 24));
                var hours = Math.floor((distance % (1000 * 60 * 60 * 24))  / (1000 * 60 * 60));
                var minutes = Math.floor((distance % (1000 * 60 * 60))  / (1000 * 60));
                var seconds = Math.floor((distance % (1000 * 60)) / 1000);

                // Update the display
                updateDigits('days', days);
                updateDigits('hours', hours);
                updateDigits('minutes', minutes);
                updateDigits('seconds', seconds);

            }, 1000);
        });
    };
})(jQuery);
