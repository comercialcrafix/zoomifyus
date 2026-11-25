// Wait for 5 seconds, then hide splash screen and show content
        window.onload = function() {
            setTimeout(function() {
                document.getElementById('splashScreen').style.display = 'none';
                document.getElementById('mainContent').classList.add('show');
            }, 2000); // 2000ms = 2 seconds
        };